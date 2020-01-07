namespace my.i;
using {  cuid, managed } from '@sap/cds/common';

entity BusinessCard : cuid, managed {
  @Core.MediaType: fileType
  imageFile				: LargeBinary;
  
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
   rawXML         :LargeString;
   status         :String(2)@( title: 'Status', ) enum {
        inProcessing = 'P' @( title: 'In Processing');
        finished   = 'F' @( title: 'Finished');
        
    };
 
};

entity Contacts {
  key ID : Integer;
  name : String;
  emails  : Association to many EmailAddresses on emails.contact=$self;
};

entity EmailAddresses {
  key contact : Association to Contacts;
  key address : String(256);
}