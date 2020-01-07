var json={"Phone":null,"Fax":null,"Mobile":null,"Email":null,"Web":null,"Address":null,"Name":null,"Company":null,"Job":null,"Text":null}

var json1={"Phone":"+49(89)205071-311","Mobile":"+49(172)8280 265","Email":"pkoerner@redhat.com","Web":"www.redhat.com","Address":"Werner-von-Siemens-RIng 14 Technopark II 85630 Grasbrunn (Munich","Name":"Peter Körner","Company":"Red Hat GmbH","Job":"Business Development Manager","Text":"• redhat.\r\nRed Hat GmbH\r\nWerner-von-Siemens-RIng 14\r\nTechnopark II\r\n85630 Grasbrunn (Munich Office)\r\nGermany\r\nwww.redhat.com\r\nPETER KÖRNER\r\nBusiness Development Manager\r\nEnterprise Cloud Computing\r\npkoerner@redhat.com\r\nD: +49(89)205071-311\r\nF: @pkoerner81929\r\nM: +49(172)8280 265"}


json1["Mobile"] = json1["Mobile"].concat("<]]","qqqqqqqqq")
console.log(json1["Mobile"]);
var v=json1["Mobile"].split('<]]')
console.log(typeof(v));

