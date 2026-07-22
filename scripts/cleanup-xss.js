/**
 * Incident cleanup: scan every MongoDB collection for injected XSS / SSRF
 * payloads and (optionally) strip them in place.
 *
 * Usage:
 *   node scripts/cleanup-xss.js            # DRY RUN - only reports what it finds
 *   node scripts/cleanup-xss.js --clean    # sanitizes offending fields in place
 *
 * Safe by design:
 *   - Dry run is the default; nothing is written unless you pass --clean.
 *   - It sanitizes the malicious *fields*, it does NOT delete whole records,
 *     so legitimate data is preserved. (Junk records created entirely by the
 *     attacker will remain as harmless text - review/delete those by hand.)
 *   - It never recurses into ObjectIds, Dates or other BSON types, so those
 *     values cannot be corrupted.
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");

const URI = process.env.URI;
if (!URI) {
  console.error("URI is not set in .env - aborting.");
  process.exit(1);
}

const CLEAN = process.argv.includes("--clean");

// --- Same neutralizing sanitizer the server applies to incoming writes. ---
const DANGEROUS_TAG = /<\s*\/?\s*(script|iframe|object|embed|svg|link|meta|base|form)\b[^>]*>/gi;
const EVENT_HANDLER_ATTR = /\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const DANGEROUS_SCHEME = /(href|src|xlink:href|action|formaction)\s*=\s*("|'|)\s*(javascript|vbscript|file|data)\s*:/gi;

function sanitizeString(str) {
  return str
    .replace(DANGEROUS_TAG, "")
    .replace(EVENT_HANDLER_ATTR, "")
    .replace(DANGEROUS_SCHEME, (match, attr, quote) => `${attr}=${quote}#`);
}

// --- Broader detectors, only used to FLAG suspicious values for the report. ---
const DETECTORS = [
  /<\s*script/i,
  /<\s*iframe/i,
  /<\s*svg/i,
  /<\s*img[^>]*\son\w+\s*=/i,
  /\son(error|load|click|mouseover|focus|animationstart)\s*=/i,
  /javascript\s*:/i,
  /vbscript\s*:/i,
  /file\s*:\s*\/\//i,
  /data\s*:\s*text\/html/i,
  /169\.254\.169\.254/,
];

function isSuspicious(str) {
  return DETECTORS.some((re) => re.test(str));
}

// Only recurse into plain objects / arrays. Leave BSON types (ObjectId, Date,
// Buffer, Decimal128, ...) untouched.
function isPlainObject(v) {
  return v !== null && typeof v === "object" && (v.constructor === Object || v.constructor === undefined);
}

/**
 * Walk a document. Records every suspicious string it finds (with its dotted
 * path) and, if `mutate` is true, sanitizes those strings in place.
 */
function walk(value, mutate, keyPath, findings, state) {
  if (typeof value === "string") {
    if (isSuspicious(value)) {
      const after = sanitizeString(value);
      findings.push({ path: keyPath, before: value, after });
      if (mutate && after !== value) state.changed = true;
      return after;
    }
    return value;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      value[i] = walk(value[i], mutate, `${keyPath}[${i}]`, findings, state);
    }
    return value;
  }
  if (isPlainObject(value)) {
    for (const key of Object.keys(value)) {
      if (key === "_id") continue; // never touch the id
      value[key] = walk(value[key], mutate, keyPath ? `${keyPath}.${key}` : key, findings, state);
    }
    return value;
  }
  return value; // numbers, booleans, ObjectId, Date, Buffer, null, etc.
}

(async () => {
  await mongoose.connect(URI, { useNewUrlParser: true });
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  let totalDocs = 0;
  let flaggedDocs = 0;
  let cleanedDocs = 0;

  console.log(`\n${CLEAN ? "CLEAN MODE" : "DRY RUN"} - scanning ${collections.length} collections\n`);

  for (const { name } of collections) {
    const col = db.collection(name);
    const cursor = col.find({});
    let colFlagged = 0;

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      totalDocs++;
      const findings = [];
      const state = { changed: false };
      walk(doc, CLEAN, "", findings, state);

      if (findings.length > 0) {
        flaggedDocs++;
        colFlagged++;
        console.log(`  [${name}] _id=${doc._id}`);
        for (const f of findings) {
          const shown = f.before.length > 120 ? f.before.slice(0, 120) + "..." : f.before;
          console.log(`      ${f.path}: ${JSON.stringify(shown)}`);
        }

        if (CLEAN && state.changed) {
          await col.replaceOne({ _id: doc._id }, doc);
          cleanedDocs++;
        }
      }
    }

    if (colFlagged > 0) {
      console.log(`  -> ${name}: ${colFlagged} document(s) flagged\n`);
    }
  }

  console.log("----------------------------------------------------");
  console.log(`Scanned:  ${totalDocs} documents across ${collections.length} collections`);
  console.log(`Flagged:  ${flaggedDocs} document(s) with suspicious content`);
  if (CLEAN) {
    console.log(`Cleaned:  ${cleanedDocs} document(s) sanitized in place`);
  } else {
    console.log(`\nThis was a DRY RUN - nothing was modified.`);
    console.log(`Re-run with --clean to sanitize the fields shown above:`);
    console.log(`    node scripts/cleanup-xss.js --clean`);
  }
  console.log("----------------------------------------------------");

  await mongoose.disconnect();
  process.exit(0);
})().catch((err) => {
  console.error("Cleanup failed:", err);
  process.exit(1);
});
