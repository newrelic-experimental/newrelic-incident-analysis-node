

var axios = require('axios')
// insights url and key hard coded for now.
// Please set to your own account / key..
var insights_api_key = ""; //""  // e.g you insights api key "NRII-slkfsjfksljdlksj32432432l4";
var insights_url = ""; //  // e.g . https://insights-collector.newrelic.com/v1/accounts/<your rpm account >/events"

var transmitequeue = [];

var insights_headers = {
    headers: {
        'Content-Type': 'application/json',
        'X-Insert-Key': insights_api_key
    }
}

var txquetimer = undefined;

function sendToInsights(post_data)
{
   // console.log("sending data item to insights")
    axios.post(insights_url, post_data, insights_headers)
        .then((response) => {
            try {
                console.log("insights inserts response: " + response.status);
            } catch (ex1) {
                console.log("exception during call to NR insights: ");
            }

        });
}

exports.init = function()
{
    txquetimer = setInterval(function () {
       // console.log("checking queue..");
        tranmitDequeueloop();
    }, 15000);  // 15 sec,  check the queue.
}

exports.cleanup = function()
{
    if(txquetimer != undefined)
    {
        clearInterval(txquetimer);
    }
}

exports.enqueue = function(message)
{
    //console.log("added item(s) to queue..");
   transmitequeue.push(message);
}



function tranmitDequeueloop() {

    if (transmitequeue.length > 0) {
        var element = transmitequeue.splice(0, 1)[0];  //remove index 0  moved up top... //transmitequeue[0];
        sendToInsights(element);
    }
}



