const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ctrlUser = require("../controllers/user.controller");
const ctrlProjet = require("../controllers/projet.controller");
const ctrlAccess = require("../controllers/access.controller");
const jwtHelper = require("../config/jwtHelper");
const { ObjectUnsubscribedError } = require("rxjs");
const { compareSync } = require("bcryptjs");
const Project = mongoose.model("Project");
const Access = mongoose.model("Access");
var ObjectId= require("mongoose").Types.ObjectId;
const toId= mongoose.Types.ObjectId;
var cryptr= require("cryptr");
crypto = new cryptr("roustem");
const NodeRSA = require('node-rsa');
const fs = require('fs');

public_key="-----BEGIN PUBLIC KEY-----\n"+
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDcwpuzG64D+JbrhrddvF/WCDN3\n"+
"9lVSWJ6PhPSmSXzntkNkxcKYVTz+m9vJ8/+z6O0wSZFfTodEcGnPjfrf/fnNmgfv\n"+
"eV53kiSoHI+t0yy7+dTn8Hgw0STwI0bNxXJqO1AjMQ6X9p666qPI4IrgpeUXLnH2\n"+
"A+yJEpuf/mIMjRr9eQIDAQAB\n"+
"-----END PUBLIC KEY-----"

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

let key_public = new NodeRSA(public_key);


router.post("/register", ctrlUser.register);
router.post("/authenticate", ctrlUser.authenticate);
router.get("/jwtAuth", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post("/twoFauthVerify", ctrlUser.twoFauthVerify);
router.post("/twoFauthValidate", ctrlUser.twoFauthValidate);
router.post("/qrcode", ctrlUser.getqrcode);
router.get("/users", ctrlUser.listofusers);
router.post("/ajouterprojet", ctrlProjet.ajouterP);
router.get("/afficherprojet", ctrlProjet.afficherP);
router.post("/ajouterAccess", ctrlAccess.ajouterAccess);
router.get("/afficherAccess", ctrlAccess.afficherAccess);
router.delete("/DelAllAccess", ctrlAccess.DelAllAccess);
router.put("/afficherAccessdecr",ctrlAccess.afficherAccessdecr)



router.put('/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id : ${req.params.id}`);

    var pjet = {
        projectName: req.body.projectName,
        Company: req.body.Company,
        Category: req.body.Category,
        
    };

    Project.findByIdAndUpdate(req.params.id, {$set: pjet}, {new: true}, (err, doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Project Delete:' + JSON.stringify(err,undefined,2));}
    });
})

router.delete('/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id : ${req.params.id}`);

    Project.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Project Delete:' + JSON.stringify(err,undefined,2));}
    });
})

router.delete('/deleteAccess/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id : ${req.params.id}`);

    Access.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){res.send(doc);}
        else{console.log('Error in Project Delete:' + JSON.stringify(err,undefined,2));}
        
    });
})


router.get('/get/:project/:access', async (req,res)=>{
    req.params.access = toId(req.params.access);
    var project = await Project.findById(req.params.project);  
        project.Access.push(req.params.access);
    project.save((err, doc) => {
        if (!err) 
        res.send(doc)
    })

 //const access = Access.findByIdAndUpdate(req.params.access, {Project: req.params.project})
    
})

router.get("/publicprivatekey",async ( req,res)=>{
    fs.writeFile("C:/Users/dell/Desktop/PassProject/server/public_private_key.txt", public_key+"\n\n"+private_key, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
})

router.get("/Afficher", async (req,res)=>{
    const projects = await Project.find({}).populate({path:"Access", model:"Access"})
    res.json(projects)
});

router.get("/AfficherAccess/:id", async (req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id : ${req.params.id}`);

        Access.findById(req.params.id, (err, doc)=>{
            if(!err){res.send(doc);}
            else{console.log('Error in Project Delete:' + JSON.stringify(err,undefined,2));}
            
        });
});

router.put('/Access/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id : ${req.params.id}`);

        
        P=req.body.passwordA;
        if(req.body.passwordA!=null){
            P=req.body.passwordA;
        encrP=key_public.encrypt(P,'base64');
        }else encrP="";

        
        

    var Acc = {
        username:req.body.username,
        passwordA: encrP,
        view: false,
        hostA: req.body.hostA, 
        portA : req.body.portA,
        subscribe : req.body.subscribe,
        url: req.body.url,
        
        six:"* * * * * *",
        publickey:req.body.publickey
    
        
    };

    Access.findByIdAndUpdate(req.params.id, {$set: Acc}, {new: true}, (err, doc)=>{
        if(!err){
            
            res.send(doc);}
        else{console.log('Error in Project Delete:' + JSON.stringify(err,undefined,2));}
    });
})



    




module.exports = router;
