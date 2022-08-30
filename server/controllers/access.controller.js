const mongoose = require("mongoose");
const Access = mongoose.model("Access");
const NodeRSA = require('node-rsa');
const key= new NodeRSA({b: 1024});
//var private_key= key.exportKey('private');
//var public_key= key.exportKey('public');

private_key="-----BEGIN RSA PRIVATE KEY-----\n"+
"MIICXgIBAAKBgQDcwpuzG64D+JbrhrddvF/WCDN39lVSWJ6PhPSmSXzntkNkxcKY\n"+
"VTz+m9vJ8/+z6O0wSZFfTodEcGnPjfrf/fnNmgfveV53kiSoHI+t0yy7+dTn8Hgw\n"+
"0STwI0bNxXJqO1AjMQ6X9p666qPI4IrgpeUXLnH2A+yJEpuf/mIMjRr9eQIDAQAB\n"+
"AoGBALjsQ+TLAP/Okw2EccGRdG4jvIl2zY4HMftjElThJkIrSVT228UjUc6t3HTV\n"+
"cZLRQS670YyWiXTo/Zmhg09yvnbO/NOUmKkOhrK2JT9aIY/Q4DNIDuWuuEGXB30G\n"+
"98tP5RvvcD6fVvroNJJOszrMWtRviz1RzMXWDL5aP7QHaGGhAkEA+v14TcTfdSJl\n"+
"QJD3TUmru3fQGBPkpnrt40xUPqDrSCeL2f/WlT50YjCe9KukysxtbEscxW+inGOb\n"+
"SEKOdm4GLQJBAOEqqrhOWbuftBZLXnArvoYVX1vbD5pWqrATmYhc2XbAfacTw2y/\n"+
"Lf/Dx1Xlg0d9RcJW/MXU/VqvQ4K7/1GzT/0CQQDw7PBXTnzlln+1C7Kn2OjlSixR\n"+
"gH8Co4vInRNdDuDq4TMorqGPn2TegCeFW2ITXUpIIo3ao79m+WIsad8Qpap9AkEA\n"+
"hIhnqko72Qr8pi7ArIejAissUNXVDkQ6/Z7bvP7h5VsR2rjwS18QRT5IY0/PgNHE\n"+
"sMogyJVAdxM4Sog7lSxVRQJAPh7TfzF8InhZv64yj6D626HUPrlGkHbkwvrjGNG2\n"+
"SqJiJvOyw0Ytm88d+zNjnpWxR9GPxfxBHGuVh5t9be0f1w==\n"+
"-----END RSA PRIVATE KEY-----";













module.exports.ajouterAccess = (req, res, next) => {
    var access = new Access(); 
    access.username= req.body.username;
    access.passwordA = req.body.passwordA;
    access.view = false; 
    access.hostA= req.body.hostA;
    access.portA = req.body.portA;
    access.subscribe = req.body.subscribe;
    access.url = req.body.url;
    access.six="* * * * * *"
    access.publickey=req.body.publickey;
    access.privatekey="";
    access.save((err, doc) => {
      if (!err) res.send(doc);
      else console.log(err);
    });
  };

  module.exports.afficherAccess = (req, res, next) => {
    Access.find((err, docs) => {
        if (!err) {
          //for(let i=0;i<docs.length;i++){

                

                //P=docs[i].get('passwordA');
                //if(P!=""){
                //decrP=key_private.decrypt(P,'utf8');
                //docs[i].set({'passwordA':decrP});
                //}
 
                
                
        //}
          res.send(docs);
        } else {
          console.log(err);
        }
      });
    };

    
  module.exports.afficherAccessdecr = (req, res, next) => {
    Access.find((err, docs) => {
        if (!err) {
          let key_private = new NodeRSA(req.body.privatekey);
          for(let i=0;i<docs.length;i++){

                

                P=docs[i].get('passwordA');
                if(P!=""){
                decrP=key_private.decrypt(P,'utf8');
                docs[i].set({'passwordA':decrP});
                }
 
                
                
        }
          res.send(docs);
        } else {
          console.log(err);
        }
      });
    };

    module.exports.DelAllAccess = (req, res, next) => {
      Access.remove((err, docs) => {
          if (!err) {
            res.send(docs);
          } else {
            console.log("Error");
          }
        });
      };