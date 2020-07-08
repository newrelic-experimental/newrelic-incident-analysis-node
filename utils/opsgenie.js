
const moment = require('moment');
const ih = require('../controllers/insightshandler');

exports.handlerequest = function(req, res)
{
    try {
        console.log("got ops-genie request")
        if(req.body == undefined)
        {
            res.status(500).json({message : "no messages found"});
            return ;
        }
        else
        {
            console.log("recieved message: ");
            var elements = [];
            var pdi = req.body;

            console.log(JSON.stringify(pdi,null,4));
            var created = moment(Number(pdi.alert.createdAt));

            var lastupdate = moment(Number(pdi.alert.updatedAt)/1000000);
            var ele = {};
            ele.eventType = "opsgenie_alert"; // title. (todo template this )
            ele.action = pdi.action;




            // nested "alert"obj flattend out.
            ele.alertId = pdi.alert.alertId;
            ele.alertmessage = pdi.alert.message;
            ele.createdAt = moment(Number(pdi.alert.createdAt)).toISOString();
            ele.updatedAt = moment(Number(pdi.alert.updatedAt)/1000000).toISOString();

            ele.createdAtEpoch = moment(Number(pdi.alert.createdAt)).valueOf();

            ele.username = pdi.alert.username;
            ele.description = pdi.alert.description;

            // grab first repsonder in list
            if(pdi.alert.responders.length > 0)
                ele.responder1 = pdi.alert.responders[0].name;

            // to do:
            //  add teams and actions parser  here.

            ele.alertpriority = pdi.alert.priority;
            ele.alertsource = pdi.alert.source;

          //  ele.appName =
          //   calc a duration min,,,
            var diff = lastupdate.diff(created, 'minutes');
            ele.calculated_duration_min = diff;
            ele.created_on_hour = created.hour();
            elements.push(ele);

            console.log("to insights:(element debug)  " + JSON.stringify(ele, null, 4))
        } //end loop of messages

        if(elements.length > 0)
        {
            ih.enqueue(elements);
        }
        res.status(200).json({message : "parsed request"});
    } catch(err1)
    {
        console.log(err1.message)
        res.status(500).json({message : err1.message});
    }
}
