var express = require('express');
var router = express.Router();


var pagerduty = require('../utils/pagerduty');
var victorops = require('../utils/victorops');
var opsgenie = require('../utils/opsgenie');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/pagerduty', async (req, res) => {
  try {
    pagerduty.handlerequest(req,res);
  } catch (err) {
    res.status(500).json({message : err.message});
  }
});


router.post('/victorops', async (req, res) => {
  try {
    victorops.handlerequest(req,res);
  } catch (err) {
    res.status(500).json({message : err.message});
  }
});


router.post('/opsgenie', async (req, res) => {
  try {

    // PLace you api-key parser here  example auth key parser below,
    // e.g
    //console.log(JSON.stringify(req.headers, null , 4))

    /*console.log("api key value : " + req.headers["api-key"]) // .api-key)
    if(req.headers["api-key"] != undefined)
    {
      // test for the value:
      if(req.headers["api-key"] === "12347")
      {
           // key is OK,  take it.
           opsgenie.handlerequest(req,res); // authorized, handle request
      }
      else
      {
        console.log("bad api key")
        res.status(401).json({message : "bad api key"});  // return 401 error ,
      }
    }
    else
    {
      console.log("no api key")
      res.status(401).json({message : "no api key"});
    }

     */

    // **************************************** requires not auth (comment out below if using auth above ) *********

    opsgenie.handlerequest(req,res); // authorized, handle request

    // ********************************************************************************

  } catch (err) {
    res.status(500).json({message : err.message});
  }
});


module.exports = router;
