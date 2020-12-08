
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



const ngrok = require('ngrok');
const mc_port = process.env.MC_PORT || 25565
let url

const ngrok_runner = () => {
    if (!url) {
         ngrok.connect({
            proto: 'tcp',
            addr: mc_port,
            region: 'in',
            authtoken: '1lBvXaBvawLrBI39dJ3fW16y4Od_4sYJhCoQbaunLjVcwjgWE'
        })
        .then(url => {
            console.log('ip: '+ url);
            db.collection('bhayanak').doc('minecraft-server').set({
                ip: url
            });
        })
        .catch((reason) => console.info(reason));
    }
};

ngrok_runner()