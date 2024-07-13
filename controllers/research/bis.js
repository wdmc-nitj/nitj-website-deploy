const axios = require('axios');
const FormData = require('form-data');
const { sendError } = require('../../utils');

const getBIS = (req, res) => {

    let data = new FormData();
    data.append('Instemailid', 'bedir@nitj.ac.in');
    data.append('Loginid', 'bisscmd');
    data.append('Loginpwd', 'SNr@12#$%&!Rk');
    data.append('Added_after', 'DD-MM-YYYY');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.services.bis.gov.in/php/BIS_2.0/dgdashboard/Standards_master/get_academic_dashboard_banner_scroll_items',
      headers: { 
        'Cookie': 'ci_session=35d2edb6bd34e2c2efcafa797fa9f8b44d89573f', 
        ...data.getHeaders()
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });



};

module.exports = {
    getBIS
    
};