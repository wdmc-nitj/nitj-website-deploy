const mongoose = require('mongoose');

// List of countries for the dropdown (optional: can be generated dynamically)
const countries = ['Aruba', 'Afghanistan', 'Angola', 'Anguilla', 'Albania', 'Aland', 'Andorra', 'United Arab Emirates', 'Argentina', 'Armenia', 'American Samoa', 'Antarctica', 'Ashmore and Cartier Islands', 'French Southern and Antarctic Lands', 'Antigua and Barbuda', 'Australia', 'Austria', 'Azerbaijan', 'Burundi', 'Belgium', 'Benin', 'Burkina Faso', 'Bangladesh', 'Bulgaria', 'Bahrain', 'The Bahamas', 'Bosnia and Herzegovina', 'Bajo Nuevo Bank (Petrel Is.)', 'Saint Barthelemy', 'Belarus', 'Belize', 'Bermuda', 'Bolivia', 'Brazil', 'Barbados', 'Brunei', 'Bhutan', 'Botswana', 'Central African Republic', 'Canada', 'Switzerland', 'Chile', 'China', 'Ivory Coast', 'Clipperton Island', 'Cameroon', 'Cyprus No Mans Area', 'Democratic Republic of the Congo', 'Republic of Congo', 'Cook Islands', 'Colombia', 'Comoros', 'Cape Verde', 'Costa Rica', 'Coral Sea Islands', 'Cuba', 'Curaçao', 'Cayman Islands', 'Northern Cyprus', 'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Dominica', 'Denmark', 'Dominican Republic', 'Algeria', 'Ecuador', 'Egypt', 'Eritrea', 'Dhekelia Sovereign Base Area', 'Spain', 'Estonia', 'Ethiopia', 'Finland', 'Fiji', 'Falkland Islands', 'France', 'Faroe Islands', 'Federated States of Micronesia', 'Gabon', 'United Kingdom', 'Georgia', 'Guernsey', 'Ghana', 'Gibraltar', 'Guinea', 'Gambia', 'Guinea Bissau', 'Equatorial Guinea', 'Greece', 'Grenada', 'Greenland', 'Guatemala', 'Guam', 'Guyana', 'Hong Kong S.A.R.', 'Heard Island and McDonald Islands', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'Isle of Man', 'India', 'Indian Ocean Territories', 'British Indian Ocean Territory', 'Ireland', 'Iran', 'Iraq', 'Iceland', 'Israel', 'Italy', 'Jamaica', 'Jersey', 'Jordan', 'Japan', 'Baykonur Cosmodrome', 'Siachen Glacier', 'Kazakhstan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'Saint Kitts and Nevis', 'South Korea', 'Kosovo', 'Kuwait', 'Laos', 'Lebanon', 'Liberia', 'Libya', 'Saint Lucia', 'Liechtenstein', 'Sri Lanka', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Macao S.A.R', 'Saint Martin', 'Morocco', 'Monaco', 'Moldova', 'Madagascar', 'Maldives', 'Mexico', 'Marshall Islands', 'Macedonia', 'Mali', 'Malta', 'Myanmar', 'Montenegro', 'Mongolia', 'Northern Mariana Islands', 'Mozambique', 'Mauritania', 'Montserrat', 'Mauritius', 'Malawi', 'Malaysia', 'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island', 'Nigeria', 'Nicaragua', 'Niue', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'New Zealand', 'Oman', 'Pakistan', 'Panama', 'Pitcairn Islands', 'Peru', 'Spratly Islands', 'Philippines', 'Palau', 'Papua New Guinea', 'Poland', 'Puerto Rico', 'North Korea', 'Portugal', 'Paraguay', 'Palestine', 'French Polynesia', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Western Sahara', 'Saudi Arabia', 'Scarborough Reef', 'Sudan', 'South Sudan', 'Senegal', 'Serranilla Bank', 'Singapore', 'South Georgia and South Sandwich Islands', 'Saint Helena', 'Solomon Islands', 'Sierra Leone', 'El Salvador', 'San Marino', 'Somaliland', 'Somalia', 'Saint Pierre and Miquelon', 'Republic of Serbia', 'Sao Tome and Principe', 'Suriname', 'Slovakia', 'Slovenia', 'Sweden', 'Swaziland', 'Sint Maarten', 'Seychelles', 'Syria', 'Turks and Caicos Islands', 'Chad', 'Togo', 'Thailand', 'Tajikistan', 'Turkmenistan', 'East Timor', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Tuvalu', 'Taiwan', 'United Republic of Tanzania', 'Uganda', 'Ukraine', 'United States Minor Outlying Islands', 'Uruguay', 'United States of America', 'US Naval Base Guantanamo Bay', 'Uzbekistan', 'Vatican', 'Saint Vincent and the Grenadines', 'Venezuela', 'British Virgin Islands', 'United States Virgin Islands', 'Vietnam', 'Vanuatu', 'Wallis and Futuna', 'Akrotiri Sovereign Base Area', 'Samoa', 'Yemen', 'South Africa', 'Zambia', 'Zimbabwe'];

const DiiaMapSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Batch: {
        type: String,  // Could be a string like '2020', '2021', etc.
    },
    Department: {
        type: String,
        enum:  [
            "Bio Technology",
            "Chemical Engineering",
            "Civil Engineering",
            "Computer Science and Engineering",
            "Data Science and Engineering",
            "Electrical Engineering",
            "Electronics and Communication Engineering",
            "Electronics and VLSI Engineering",
            "Industrial and Production Engineering",
            "Information Technology",
            "Instrumental and Control Engineering",
            "Mathematics and Computing",
            "Mechanical Engineering",
            "Textile Technology"
          ]
    },
    country: {
        type: String,
        enum: countries,  // Dropdown with country name or code
        required: true,
    },
    color: {
        type: String,  // Hex code or color name
        required: true,
    },
    type: {
        type: String,
        enum: ['Student', 'Research', 'Alumni'],  // Dropdown for types
        required: true,
    },
    maptext: {
        type: String,  // Text shown on the map
    },
    show: {
        type: Boolean,
        default: true,
    },
    link: {
        type: String,  // Optional link
    },
    disable: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("DiiaMap", DiiaMapSchema);
