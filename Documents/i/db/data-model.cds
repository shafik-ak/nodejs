namespace my.i;
using {  cuid, managed } from '@sap/cds/common';

entity BusinessCard : cuid, managed {
  @Core.MediaType: fileType
  photoFile				: LargeBinary;
  
  @Core.IsMediaType: true
  fileType				: String;
  
   name           :String(255);
   phone          :String(60);
   fax            :String(60);
   mobile         :String(80);
   email          :String(255);
   web            :String(300);
   address        :String(500);
   company        :String(200);
   job            :String(200);
   allText        :String(800);
   taskId         :UUID;


  
} 