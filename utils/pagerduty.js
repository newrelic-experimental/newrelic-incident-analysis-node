
const moment = require('moment');

const ih = require('../controllers/insightshandler');

exports.handlerequest = function(req, res)
{
    try {
        console.log("got pager duty request")
        if(req.body.messages.length <= 0)
        {
            res.status(500).json({message : "no messages found"});
            // throw error
            return ;
        }
        else
        {
            console.log("recieved messages: " + req.body.messages.length);
            var elements = [];
            for(var i = 0; i < req.body.messages.length; i++)
            {
                var pdi = req.body.messages[i];

               // console.log(JSON.stringify(pdi,null,4));

                var created = moment(pdi.incident.created_at);
                var lastupdate = moment(pdi.incident.last_status_change_at);

                var ele = {};
                ele.eventType = "pdnick1";// title. (todo template this )

                ele.event = pdi.event;  // triggered, ack, resolved...
                ele.number = pdi.incident.incident_number;
                ele.title = pdi.incident.title;
                ele.created_at = pdi.incident.created_at;
                ele.updated_at = pdi.incident.last_status_change_at;
                ele.status = pdi.incident.status;
                ele.description = pdi.incident.description;
                ele.service_id = pdi.incident.service.id;
                ele.service_name = pdi.incident.service.name;
                ele.urgency = pdi.incident.urgency;

                ele.assignment = "Unknown";
                if(pdi.incident.assignments.length > 0)
                    ele.assignment = pdi.incident.assignments[0].assignee.summary;

                // calc a duration min,,,
                var diff = lastupdate.diff(created, 'minutes');
                ele.calculated_duration_min = diff;
                ele.created_on_hour = created.hour();

                elements.push(ele);

                console.log("to insights: " + JSON.stringify(ele, null, 4))
            } //end loop of messages

            if(elements.length > 0)
            {
                ih.enqueue(elements);
            }


            res.status(200).json({message : "parsed request"});
        }
    } catch(err1)
    {
        res.status(500).json({message : err1.message});
    }
}
