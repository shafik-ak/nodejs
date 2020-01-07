module.exports.a= a

 function a (blob) {
    // console.log(blob+"-------------------")
   var response     = null
   var taskID       = null
   var taskStatus   = null

    console.log("ABBYY Cloud OCR SDK Sample for Node.js")
     if (appId.length == 0 || password.length == 0) {
         throw new Error("Please provide your application id and password!")
        }

         var xhr = new XMLHttpRequest();
         xhr.open("POST", postURL, true);
         xhr.setRequestHeader('Content-Type', 'application/octet-stream');
         xhr.setRequestHeader('Authorization','Basic ' + encodedString );
         xhr.setRequestHeader('User-Agent' , 'node.js client library')
         xhr.send(blob);
         xhr.onload =  xhrOnLoad
         
         }

         function xhrOnLoad() {
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
           parser.parseString(this.responseText,jParsing(err,objResult,response))
            
            
            
            }

         function jParsing(err, objResult,response) {
            response = objResult
            // taskID= objResult.response.task[0].id 
            // taskStatus= objResult.response.task[0].status 
       
        }