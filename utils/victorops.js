
const moment = require('moment');
const ih = require('../controllers/insightshandler');

exports.handlerequest = function(req, res)
{
    try {
        console.log("got victor-ops request")
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
            var created = moment(Number(pdi.state_inc_ts));
            var lastupdate = moment(Number(pdi.state_ack_ts));

            var ele = {};
            ele.eventType = "victorops_2"; //pdi.eventType;// title. (todo template this )

            ele.incident_type = pdi.incident_type;
            ele.alert_svcstate = pdi.alert_svcstate;
            ele.alert_recieve_ts = moment(Number(pdi.alert_recieve_ts)).toISOString();
            ele.alert_url = pdi.alert_url;
            ele.alert_dispalyname = pdi.alert_dispname;


            ele.alert_entitystate = pdi.alert_ent_state;
            ele.alert_messagetype = pdi.alert_mess_type;
            ele.alert_monitorname = pdi.alert_mon_name;
            ele.alert_monitortool = pdi.alert_mon_tool;
            ele.alert_routekey = pdi.alert_routekey;
            ele.alert_ts = pdi.alert_timestamp;
            ele.state_ackmessage = pdi.state_ackmsg;


            ele.state_ackuser = pdi.state_ack_user;

            ele.state_ack_ts = moment(Number(pdi.state_ack_ts)).toISOString();
            ele.state_alertcount = pdi.state_alert_count;
            ele.state_alert_phase = pdi.state_alert_phase;
            ele.state_current = pdi.state_current_state;
            ele.state_entityid = pdi.state_ent_id;
            ele.state_host = pdi.state_host;
            ele.state_incidentname = pdi.state_inc_name;
            ele.state_incident_ts = moment(Number(pdi.state_inc_ts)).toISOString();

            ele.state_last_ts = moment(Number(pdi.state_last_ts)).toISOString();
            ele.state_monitor_type = pdi.state_mon_type;

            ele.state_service = pdi.state_svc;


            // redundant,  but could be changed to match... pd..etc
            //ele.assignment = ele.state_ackuser

            // calc a duration min,,,
            var diff = lastupdate.diff(created, 'minutes');
            ele.calculated_duration_min = 0;
            if(pdi.state_alert_phase != "UNACKED")  // if we are passed the initial triggerd phase.. then calc in duration.
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
    } catch(err1)
    {
        console.log(err1.message)
        res.status(500).json({message : err1.message});
    }
}
