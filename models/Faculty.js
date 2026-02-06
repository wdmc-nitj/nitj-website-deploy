const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    department: {
        type: String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cw', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf', 'cee', 'cai']
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    img: {
        type: String
    },
    position: {
        type: String
    },
    guest: {
        type: {
            "isGuest": Boolean,
        },
        default: {
            "isGuest": false
        }
    },
    education_qualification: {
        type: [
            {
                "column": {
                    type: String
                },
                "degree": {
                    type: String
                },
                "field": {
                    type: String
                },
                "clg": {
                    type: String
                },
                "year": {
                    type: String
                },
            }
        ],
        default: []
    },
    address: {
        type:
        {
            "address1": {
                type: String
            },
            "address2": {
                type: String
            },
            "city": {
                type: String
            },
            "state": {
                type: String
            },
            "eid": {
                type: String
            },
            "pin": {
                type: String
            },
            "phone": {
                type: String
            },
            "fax": {
                type: String
            },
        }
        ,
        default: {
            "address1": "",
            "address2": "",
            "city": "",
            "state": "",
            "eid": "",
            "pin": "",
            "phone": "",
            "fax": ""
        }
    },
    correspondence_address: {
        type:
        {
            "address": {
                type: String
            },
            "city": {
                type: String
            },
            "state": {
                type: String
            },
            "pin": {
                type: String
            },
            "phone": {
                type: String
            }
        }
        ,
        default: {
            "address": "",
            "city": "",
            "state": "",
            "pin": "",
            "phone": ""
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    password: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        default: ''
    },
    father_name: {
        type: String
    },
    designation: {
        type: String
    },
    nationality: {
        type: String
    },
    book_publications: {
        type: [
            {
                "Title": {
                    type: String
                },
                "Publisher": {
                    type: String
                },
                "Authors": {
                    type: String
                },
                "ISBN/ISSN": {
                    type: String
                },
                "Type": {
                    type: String
                },
                "Year": {
                    type: String
                },
            }
        ],
        default: []
    },
    conference_publications: {
        type: [
            {
                "Title": {
                    type: String
                },
                "Publisher": {
                    type: String
                },
                "Link": {
                    type: String
                },
                "Year": {
                    type: String
                },
            }
        ],
        default: []
    },
    admin_responsibility: {
        type: [
            {
                "Position Held": {
                    type: String
                },
                "Organization": {
                    type: String
                },
                "From": {
                    type: String
                },
                "To": {
                    type: String
                },
            }
        ],
        default: []
    },
    patent: {
        type: [
            {
                "Name": {
                    type: String
                },
                "Reg/Ref Number": {
                    type: String
                },
                "Date of Award/Filling": {
                    type: String
                },
                "Status": {
                    type: String
                },
                "Organization": {
                    type: String
                }
            }
        ],
        default: []
    },
    phd_supervised: {
        type: [
            {
                "Scholar Name": {
                    type: String
                },
                "Research Topic": {
                    type: String
                },
                "Date of Award/Filling": {
                    type: String
                },
                "Co-Supervisor": {
                    type: String
                },
                "Status": {
                    type: String
                },
                "Year": {
                    type: String
                }
            }
        ],
        default: []
    },
    phd_dissertion: {
        type: [
            {
                "Student Name": {
                    type: String
                },
                "Dissertation Title": {
                    type: String
                },
                "Co-Supervisor": {
                    type: String
                },
                "Status": {
                    type: String
                },
                "Year": {
                    type: String
                }
            }
        ],
        default: []
    },
    awards: {
        type: [
            {
                "Title": {
                    type: String
                },
                "Activity": {
                    type: String
                },
                "Given by": {
                    type: String
                },
                "Year": {
                    type: String
                }
            }
        ],
        default: []
    },
    affiliations: {
        type: [
            {
                "Designation": {
                    type: String
                },
                "Organisation": {
                    type: String
                }
            }
        ],
        default: []
    },
    research_profile: {
        type:
        {
            "Research Interests": {
                type: [String]
            },
            "Brief Research Profile": {
                type: [String]
            },
            "Research Id": {
                type: [
                    {
                        title: {
                            type: String
                        },
                        link: {
                            type: String
                        }
                    }
                ]
            }
        },
        default: {
            "Research Interests": [],
            "Brief Research Profile": [],
            "Research Id": []
        }
    },
    research_collaboration: {
        type: [
            {
                "professor": {
                    type: String
                },
                "university": {
                    type: String
                },
                "Link": {
                    type: String
                }
            }
        ],
        default: []
    },
    research_project: {
        type: [
            {
                "Role": {
                    type: String
                },
                "Project Type": {
                    type: String
                },
                "Title": {
                    type: String
                },
                "Funding Agency": {
                    type: String
                },
                "From": {
                    type: String
                },
                "To": {
                    type: String
                },
                "Amount": {
                    type: String
                },
                "Status": {
                    type: String
                },
                "Co-investigator": {
                    type: String
                }
            }
        ],
        default: []
    },
    consultancy: {
        type: [
            {
                "Role": {
                    type: String
                },
                "Consultancy Type": {
                    type: String
                },
                "Title": {
                    type: String
                },
                "Funding Agency": {
                    type: String
                },
                "From": {
                    type: String
                },
                "To": {
                    type: String
                },
                "Amount": {
                    type: String
                },
                "Status": {
                    type: String
                },
                "Co-investigator": {
                    type: String
                }
            }
        ],
        default: []
    },
    personal_link: {
        type: {
            "Google Scholar Link": {
                type: String
            },
            "Personal Link": {
                type: [
                    {
                        title: {
                            type: String
                        },
                        link: {
                            type: String
                        }
                    }
                ]
            }
        },
        default: {
            "Google Scholar Link": "",
            "Personal Link": []
        }
    },
    journal: {
        type: [
            {
                "Aurthor + Title": {
                    type: String
                },
                "Name": {
                    type: String
                },
                "Link": {
                    type: String
                },
                "Year": {
                    type: String
                }
            }
        ],
        default: []
    },
    event: {
        type: [
            {
                "Category": {
                    type: String
                },
                "Title": {
                    type: String
                },
                "Type": {
                    type: String
                },
                "Venue": {
                    type: String
                },
                "From": {
                    type: String
                },
                "To": {
                    type: String
                },
                "Designation": {
                    type: String
                }
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    __v: {
        type: Number,
    },
    show: { type: Boolean, default: true },
    order: {
        type: Number,
    },
    sourceOfInfo: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model("faculty_test", Schema);