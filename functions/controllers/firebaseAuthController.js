const admin = require("firebase-admin");
//  acessing Cloud Firestore using the admin SDK locally
let serviceAccount = require("../boleto-server-firebase-adminsdk.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// creates a firestore instance
const db = admin.firestore();

const create_user = (req, res) => {
    let users = db.collection("boletos");
    return users
        .add(req.body)
        .then(() => {
            return res.status(201).json({ response: "user successfully created" });
        })
        .catch(error => {
            return res.status(500).json({ error: error });
        });
};

module.exports = {
    create_user
};
