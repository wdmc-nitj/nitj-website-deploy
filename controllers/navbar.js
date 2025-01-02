const Navbar = require("../models/navbar");
const uuid = require("uuid");

const obj = {
  Administration: [
    "About Us",
    "Leadership",
    "Governing Bodies",
    "Cells",
    "Committees",
  ],
  Academics: [
    "Departments",
    "Centers",
    "Academic System",
    "Academic Services",
    "Allied facilities",
    "Programs of study",
    "convocation",
    "other links",
  ],
  Admissions: [
    "Prospective Students",
    "Anti Raging",
    "Join NITJ",
    "Institute Flyers",
  ],
  Research: [
    "Research @NITJ",
    "Incubation @NITJ",
    "Consultancy @NITJ",
    "Upcoming Events",
  ],
  Alumni: ["SARC"],
  LifeatNITJ: [
    "Cultural Club",
    "Cultural club",
    "Technical Club",
    "Scholarships",
    "Campus Amenities",
    "Health And Wellness",
    "NITJ Festivals",
    "Accomodation",
    "SAMP",
  ],
};  

exports.show = async (req, res) => {
  Navbar.findOne({}, (err, data) => {
    if (err) {
      res.status(500).send("Something wrong happend");
    } else {
      res.status(200).send(data);
    }
  });
};

function navSort(arr) {
  
  for(let i=2;i<arr.length;i++){
    for(let j=2;j<arr.length;j++){
      if(arr[j].order>arr[j-1].order){
        let temp = arr[j];
        arr[j] = arr[j-1];
        arr[j-1] = temp;
      }
    }
  }
  return arr;
}

exports.sort = async (req, res) => {
  Navbar.findOne({}, (err, data) => {
    if (err) {
      res.Status(500).send("Something wrong happend");
    } else {
      const type = req.body.menu;
      const subtype = req.body.submenu;
      
      let idx = obj[`${type}`].indexOf(`${subtype}`);
      data[`${type}`][idx]=navSort(data[`${type}`][idx])

      Navbar.findOneAndUpdate({}, { $set: data }, (err, data) => {
        if (err) {
          res.send("Something wrong happend");
        } else {
          res.send(data);
        }
      });
    }
  });
}

exports.update = async (req, res) => {
  Navbar.findOne({}, (err, data) => {
    if (err) {
      res.Status(500).send("Something wrong happend");
    } else {
      const type = req.body.menu;
      const subtype = req.body.submenu;
      const link = req.body.link;
      const name = req.body.name;
      const id = uuid.v4();
      let order = req.body.order || 0;

      if(typeof(order)!="number")
        order=Number(order);
      
      

      let idx = obj[`${type}`].indexOf(`${subtype}`);
      data[`${type}`][idx].push({ name, link, id, order });
      
      data[`${type}`][idx]=navSort(data[`${type}`][idx])

      Navbar.findOneAndUpdate({}, { $set: data }, (err, data) => {
        if (err) {
          res.send("Something wrong happend");
        } else {
          console.log("done");
          res.send(data);
        }
      });

     
    }
  });
};


//----------------------------------------------------------------------->
exports.delete = async (req, res) => {
  Navbar.findOne({}, async (err, data) => {
    if (err) {
      res.Status(500).send("Something wrong happend");
    } else {
      const type = req.body.menu;
      const subtype = req.body.submenu;
      const id = req.body.id;

      let data = await Navbar.findOne({});
      let ind = -1;

      for (let i = 0; i < data[`${type}`].length; i++) {
        if (data[`${type}`][i][0] === subtype) {
          ind = i;
          break;
        }
      }
      

      if(ind==-1) return res.send("Something wrong happend");


      for (let i = 2; i < data[`${type}`][ind].length; i++) {
        if (data[`${type}`][ind][i].id === id) {
          data[`${type}`][ind].splice(i,1);
          break;
        }
      }

      Navbar.findOneAndUpdate({}, { $set: data }, (err, data) => {
        if (err) {
          res.send("Something wrong happend");
        } else {
          res.send(data);
        }
      });
    }
  });
};

exports.create = async (req, res) => {
  //check if already exists
  Navbar.findOne({}, async (err, data) => {
    if (err) {
      return res.status(500).send("Something wrong happend");
    } else if (data) {
      return res.status(200).send("Already exists");
    } else {
      const navbar = new Navbar({
        Administration: [
          ["About Us", false],
          ["Leadership", false],
          ["Governing Bodies", false],
          ["Cells", false],
          ["Committees", false],
        ],
        Academics: [
          ["Departments", false],
          ["Centers", false],
          ["Academic System", true],
          ["Academic Services", false],
          ["Academic facilities", true],
          ["Programs of study", false],
          ["convocation", true],
          ["other links", true],
        ],
        Admissions: [
          ["Prospective Students", false],
          ["Anti Raging", true],
          ["Join NITJ", false],
          ["Institute Flyers", true],
        ],
        Research: [
          ["Research @NITJ", false],
          ["Incubation @NITJ", true],
          ["Consultancy @NITJ", false],
          ["Upcoming Events", true],
        ],
        Alumni: [],
        LifeatNITJ: [
          ["Cultural Club", false],
          ["Cultural club", false],
          ["Technical Club", true],
          ["Scholarships", true],
          ["Campus Amenities", false],
          ["Health And Wellness", true],
          ["NITJ Festivals", false],
          ["Accomodation", true],
          ["SAMP", true],
        ],
      });
      await navbar.save();
      res.status(200).send("Navbar created");
    }
  });
};

exports.edit = async (req, res) => {

  Navbar.findOne({}, (err, data) => {
    if (err) {
      res.Status(500).send("Something wrong happend");
    } else {
      const type = req.body.menu;
      const subtype = req.body.submenu;
      const link = req.body.link;
      const name = req.body.name;
      const id = req.body.id;
      const order = req.body.order;


      let idx = obj[`${type}`].indexOf(`${subtype}`);
      let ind = -1;

      
      for (let i = 2; i < data[`${type}`][idx].length; i++) {
        if (data[`${type}`][idx][i].id === id) {
          ind = i;
          break;
        }
      }

      if (ind === -1) return res.send("Something wrong happend");
      

      data[`${type}`][idx][ind].name = name;
      data[`${type}`][idx][ind].link = link;
      data[`${type}`][idx][ind].order = order;

      

      Navbar.findOneAndUpdate({}, { $set: data }, (err, data) => {
        if (err) {
          res.send("Something wrong happend");
        } else {
          res.send(data);
        }
      });
    }
  });
};
