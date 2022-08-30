const mongoose = require("mongoose");
const NodeRSA = require('node-rsa');
const key = NodeRSA({b: 1024});
//var public_key = key.exportKey('public');
//var private_key = key.exportKey('private');


//console.log(public_key);
//console.log(private_key);




//console.log(key_public.isPrivate())
//console.log(key_private.isPublic())






var accessSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true, 
    },
      
     
    passwordA: {
      type: String,
      
    },

    view:{ 
      type : Boolean
    },
   
    hostA: {
      type: String, 
      
    },
    portA: { 
      type: String,
      
    },
    subscribe:{
      type: Boolean,
    },
    url:{
      type:Boolean,
    },
   
    six:{
      type:String
    },
    publickey:{
      type: String
    },
    privatekey:{
      type:String
    }
  
   
  });



  accessSchema.pre("save", function (next,req) {
    if(this.passwordA!=null){
      let key_public = new NodeRSA(this.publickey);
      if(this.publickey!=null){
  ps=key_public.encrypt(this.passwordA, 'base64');
  this.passwordA=ps;
  next();}
  else{
    next();
  }
  }
});




 


  
     
  
    
  

  mongoose.model("Access", accessSchema);