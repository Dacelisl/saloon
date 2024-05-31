const functions = require("firebase-functions");
const dotenv = require("dotenv");

dotenv.config();

exports.getConfig = functions.https.onRequest((req, res) => {
  res.json({
    apiKey: process.env.VITE_APIKEY,
    authDomain: process.env.VITE_AUTHDOMAIN,
    projectId: process.env.VITE_PROJECTID,
    storageBucket: process.env.VITE_STORAGEBUCKET,
    messagingSenderId: process.env.VITE_MESSAGINGSENDERID,
    appId: process.env.VITE_APPID,
  });
});
