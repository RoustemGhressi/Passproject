require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const speakeasy = require("speakeasy");
const rtsIndex = require("./routes/index.router");
const { register } = require("./controllers/user.controller");
const { spawn } = require("child_process");
const path = require("path");
const cron = require("node-cron");
var app = express();
const http = require('http');
const fs = require("fs");
const { Storage } = require('megajs');



app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api", rtsIndex);



const DB_NAME = "passDB";
const ARCHIVE_PATH = path.join(
  "C:/Users/dell/Desktop/PassProject/server",
  `${DB_NAME}.gzip`
);

//creation un backup pour la base chque 5min
// pour tester on va changer chaque 5 sec



cron.schedule("*/5 * * * *", () => backupMongoDB());
Upload();

function backupMongoDB() {
  const child = spawn(
    "mongodump",
    [`--db=${DB_NAME}`, `--archive=${ARCHIVE_PATH}`, `--gzip`],
    {
      env: {
        PATH: process.env.PATH,
      },
    }
  );

 
   
    
 

  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });
  child.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });
  child.on("error", (error) => {
    console.log("error:\n", error);
  });
  child.on("exit", (code, signal) => {
    if (code) console.log("process exit with code:", code);
    else if (signal) console.log("Process killed with signal:", signal);
    else {
      console.log("Backup is successfull");
      //
    }
  });
}

async function Upload() {
  const storage = await new Storage({
    email: 'roustem12345@gmail.com',
    password: '96624191newZ'
  }).ready

  const fileStream = fs.createReadStream('C:/Users/dell/Desktop/PassProject/server/passDB.gzip')

 
  const UploadStream = await storage.upload({
    name:"passDB.gzip",
    allowUploadBuffering: true
    
  })

  fileStream.pipe(UploadStream)
  const file = await fileStream.complete

  console.log('The file was uploaded!', file)
}

const httpsOptions = {
  cert:  fs.readFileSync(path.join(__dirname,'..','localhost.crt')),
  key: fs.readFileSync(path.join(__dirname,'..','localhost.key'))
}


http.createServer(httpsOptions, app).listen(process.env.PORT, function(){
  console.log(`Serving at port ${process.env.PORT}`);
});