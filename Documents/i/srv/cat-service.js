// async function firstM(){
//var t = require('./test.js');  
var serviceUrl = 'http://cloud-eu.ocrsdk.com';
// Name of application you created
var appId = '';
// Password should be sent to your e-mail after application was created
var password = '';
var ocrsdkModule = require('./tests/ocrsdk.js');
//var xml2js = require('xml2js');

const fileType = require('file-type');

var businesscardID = null;

module.exports = async srv => {
    const { BusinessCard } = cds.entities
    await srv.on('extractBusinessCardInfo', 'BusinessCard', async (req) => {
        const tx = await cds.transaction(req);
        // Read BusinessCard Entity with Query from Environment
        var businessCardResultSet = await tx.run(req.query);
        var businessCard = businessCardResultSet[0]
        businesscardID = businessCard.ID;
        console.log(businesscardID);
        //todo in fileType mime update
        console.log(fileType(businessCard.imageFile).mime)
        console.log(fileType(businessCard.imageFile).ext)
        extractBusinessCardInfo(businessCard)
    })
}

function extractBusinessCardInfo(businessCard) {
    try {
        console.log("ABBYY Cloud OCR SDK Sample for Node.js");
        if (appId.length == 0 || password.length == 0) {
            throw new Error("Please provide your application id and password!");
        }

        var ocrsdk = ocrsdkModule.create(appId, password, serviceUrl);

        async function downloadCompleted(json, error) {
            console.log(json);
            
            if (typeof (json) !== 'undefined') {

                
                await cds.run(UPDATE('my_i_BusinessCard').set({
                    name: json.Name,
                    phone: json.Phone,
                    fax:json.Fax,
                    mobile: json.Mobile,
                    email: json.Email,
                    web: json.Web,
                    address: json.Address,
                    company: json.Company,
                    job: json.Job,
                    allText: json.Text,
                    status: 'F'
                }).where({ ID: businessCard.ID }))
                json = null
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
            //console.log("Downloading result to " + outputPath);

            ocrsdk
                .downloadResult(taskData.resultUrl.toString(),
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

        ocrsdk.processImage(businessCard.imageFile, settings, uploadCompleted);

        cds.run(UPDATE('my_i_BusinessCard').set({
            status: 'P'
        }).where({ ID: businessCard.ID }))

    } catch (err) {
        console.log("Error: " + err.message);
        return null;
    }

}