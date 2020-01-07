// async function firstM(){
//var t = require('./test.js');  
var b= null;
var serviceUrl = 'http://cloud-eu.ocrsdk.com';
// Name of application you created
var appId = '571e6dcd-137a-4487-8e4f-690441ee7c45';
// Password should be sent to your e-mail after application was created
var password = '54gOzGhEDXxnSnb8BYX+sZY8';
var ocrsdkModule = require('./tests/ocrsdk.js');
var xml2js = require('xml2js');
var json1 = new Object();
//var imagePath = 'scan.jpg';
var outputPath = 'result2277.xml';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var postURL = 'http://cloud-eu.ocrsdk.com/processBusinessCard?language=German&exportFormat=xml'
var encodedString = Buffer.from(appId+':'+password).toString('base64')
var parser1 = require('fast-xml-parser');
//var he = require('he');
var response = null;
var taskID=null
var taskStatus=null
const fetch = require("node-fetch");
var flag= false
var myVar;
     module.exports = srv => {
         const { BusinessCard } = cds.entities
         srv.on('demo', 'BusinessCard', (req) => {
             getBusinessCard(req).then(businessCard => {
                 var businesscardID = businessCard[0].ID;
                 console.log(businesscardID);
                 businessCardImage = businessCard[0].photoFile 
                 // json = await getJsonOfBusinessCard(businessCardImage)
                 /* json.taskId = uuidv1();
                 console.log(json)
                 businessCard[0].taskId = json.taskId
                 return businessCard[0]   */
                  
                 /* setTimeout(function (){//console.log(response.response.task[0].id)
                console.log('JSON1:\n\n'+json1+'\n\n '+JSON.stringify(json1));
                } ,5000) ; */
                getJson(businessCardImage)
                
                
               
               let timerId = setTimeout(function request() {
                if (flag !==true) {
                  // increase the interval to the next run
                  //delay += 2000;
                  timerId = setTimeout(request, 500);
                }
                else{
                    clearTimeout(timerId)
                    console.log('JSON1:\n\n'+JSON.stringify(json1))
                    console.log(json1.Phone);
                    
                   cds.run(UPDATE('my_i_BusinessCard').set({
                    phone:json1.Phone
                  }).where({ID:businesscardID}))  
                }
              }, 500);
                
             });
         })
     }
     
     async function getBusinessCard(req) {
         const tx = await cds.transaction(req);
         // Read BusinessCard Entity with Query from Environment
         return await tx.run( req.query );
     }
     
    
     
    async function a (blob) {
        // console.log(blob+"-------------------")
       
 
        console.log("ABBYY Cloud OCR SDK Sample for Node.js")
         if (appId.length == 0 || password.length == 0) {
             throw new Error("Please provide your application id and password!")}
            
     
             var xhr = new XMLHttpRequest();
             xhr.open("POST", postURL, true);
             xhr.setRequestHeader('Content-Type', 'application/octet-stream');
             xhr.setRequestHeader('Authorization','Basic ' + encodedString );
             xhr.setRequestHeader('User-Agent' , 'node.js client library')
             xhr.send(blob);
              xhr.onload = await function xhrOnLoad() {
                 console.log("HELLO")
                 var data=this.readyState
                 console.log('Ready state ='+data+'\n\n')
                 console.log("Hello from xhrOnLoad :" +this.responseText);
                 var parser = new xml2js.Parser({
                     explicitCharKey : false,
                     trim : true,
                     explicitRoot : true,
                     mergeAttrs : true
                 });//console.log(this.responseText);
                parser.parseString(this.responseText, function jParsing(err, objResult) {
                
                    response=objResult
                     taskID= objResult.response.task[0].id 
                     taskStatus= objResult.response.task[0].status 
                     
                 })
                 
                 
                 
                 
                 }
                 /* while (response ===null) {
                     if (response !== null) {
                         break
                     }
                 } */
            // console.log(response);
            //console.log(JSON.stringify(xhr.onload));
            
             
             }
    
     function getJson(blob) {
         try {
             //var parser = new xml2js.Parser();
             console.log("ABBYY Cloud OCR SDK Sample for Node.js");
     
             if (appId.length == 0 || password.length == 0) {
                 throw new Error("Please provide your application id and password!");
             }
                         
             var ocrsdk = ocrsdkModule.create(appId, password, serviceUrl);
     
             function downloadCompleted(json, error) {
                 if(typeof(json) !== 'undefined') {
                    json1=json; 
                    flag=true
                    //console.log(json);
                     //console.log("Done.");
                     //return json;
                 }
                 if (error) {
                     console.log("Error: " + error.message);
                     return;
                 }
                 
             }
     
             function processingCompleted(error, taskData) {
                 if (error) {
                     console.log("Error: " + error.message);
                     return;
                 }
     
                 if (taskData.status != 'Completed') {
                     console.log("Error processing the task.");
                     if (taskData.error) {
                         console.log("Message: " + taskData.error);
                     }
                 }
     
                 console.log("Processing completed.");
                 console.log("Downloading result to " + outputPath);
     
                     ocrsdk
                         .downloadResult(taskData.resultUrl.toString(), outputPath,
                                 downloadCompleted);
     
     
             }
     
             function uploadCompleted(error, taskData) {
                 if (error) {
                     console.log("Error: " + error.message);
                     return;
                 }
     
                 console.log("Upload completed.");
                 console.log("Task id = " + taskData.id + ", status is " + taskData.status);
                 if (!ocrsdk.isTaskActive(taskData)) {
                     console.log("Unexpected task status " + taskData.status);
                     return;
                 }
     
                 ocrsdk.waitForCompletion(taskData.id, processingCompleted);
             }
     
             var settings = new ocrsdkModule.ProcessingSettings();
             // Set your own recognition language and output format here
             settings.language = "German"; // Can be comma-separated list, e.g. "German,French".
             settings.exportFormat = "xml"; // All possible values are listed in 'exportFormat' parameter description 
                                             // at https://ocrsdk.com/documentation/apireference/processImage/
     
             console.log("Uploading image..");
             
             //ocrsdk.processImage(blob, settings, uploadCompleted);
             
             ocrsdk.processImage(blob, settings, uploadCompleted);
         } catch (err) {
             console.log("Error: " + err.message);
             return null;
         } 

     }