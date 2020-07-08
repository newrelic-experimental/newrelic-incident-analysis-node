[![Community Project header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Community_Project.png)](https://opensource.newrelic.com/oss-category/#community-project)

# newrelic-incident-analysis-node

>Nodejs/Express.js project that transforms 3rd party (Pager Duty/Opsgenie/VictorOps) incidents into New Relic Insight events.  These events can then be used to help calculate MTTR and correlate incidents to entities for better root cause analysis. 


## Installing and using newrelic-incident-analysis-node

>Requires Nodejs 8.X or higher to run.  
To install it,  run npm install from the root directory, this will install all dependecies.   

Next, manually edit the /controllers/insightshandler.js file.  At the top of the file there are two constants which must be set that 
come from your New Relic account:  insights_api_key and insights_url.  Examples of these are provided in the file. 


## Getting Started
>Once installed and configured, from the root directory run the app :   node bin/www    This will start the nodejs server at 
port 3000.  

## Usage
>The incidents from each of the 3rd party services are handled on seperate routes, which use seperate parsers.  The 
incidents are transformed inside a utility parser, and a insights event object gets created.  The obj is passed to the 
insightshandler, where it is queued up,  and eventually sent out to New Relic.

The code flow is :   inbound route --> parser/transformer --->   insights handler

the pagerduty route is at:  /pagerduty

the victorops route is at: /victorops. 

the opsgenie route is at: /opsgeine. 

Should be run as a service,  or could be migrated into a AWS Lambda function.  Remember, the service is currently configured to run 
on port 3000, this can be changed inside the bin/www file.   


## Support

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here:

>

## Contributing
We encourage your contributions to improve newrelic-incident-analysis-node! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company,  please drop us an email at opensource@newrelic.com.

## License
[Project Name] is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.
>[If applicable: The newrelic-incident-analysis-node also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the third-party notices document.]
