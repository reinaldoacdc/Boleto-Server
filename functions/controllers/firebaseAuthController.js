const { initializeApp } = require('firebase-admin/app');
const { getAuth, deleteUser, createUserWithEmailAndPassword } = require("firebase/auth")

const admin = require("firebase-admin");
let serviceAccount = require("../boleto-server-firebase-adminsdk.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
// const firebaseConfig = {
//     credential: admin.credential.cert(serviceAccount)
// };
// const app = initializeApp(firebaseConfig);

// initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

const create_user = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return res.status(200).json({ response: user });
        })
        .catch((error) => {
            return res.status(500).json({ error: error });
        });
};

const delete_user = (req, res) => {
    admin.auth().deleteUser(req.body.id).then(() => {
        return res.status(200).json({ response: 'ok' });
    }).catch((error) => {
        return res.status(500).json({ error: error });
    });
};


const list_all = (req, res) => {
    getAuth()
        .listUsers(50)
        .then((listUsersResult) => {
            // listUsersResult.users.forEach((userRecord) => {
            //     console.log('user', userRecord.toJSON());
            // });
            return res.status(200).json({ response: listUsersResult });
        })
        .catch((error) => {
            return res.status(500).json({ error: error });
        });
};

module.exports = {
    create_user,
    delete_user,
    list_all
};
