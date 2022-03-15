const admin = require("firebase-admin");
//  acessing Cloud Firestore using the admin SDK locally
let serviceAccount = require("../boleto-server-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// creates a firestore instance
const db = admin.firestore();

const create_user = (req, res) => {
  let users = db.collection("users");
  return users
    .add(req.body)
    .then(() => {
      return res.status(201).json({ response: "user successfully created" });
    })
    .catch(error => {
      return res.status(500).json({ error: error });
    });
};


const get_user = async (req, res) => {
  const userDocument = db.collection("users").doc(req.params.id);
  return userDocument
    .get()
    .then(doc => {
      let response = doc.data();
      return res.status(200).json({ response: response });
    })
    .catch(error => {
      return res.status(500).json({ error: error });
    });
};


const delete_user = async (req, res) => {
  const userDocument = db.collection("users").doc(req.params.id);
  return userDocument
    .delete()
    .then(() => {
      return res.status(204);
    })
    .catch(error => {
      return res.status(500).json({ error: error });
    });
};

const update_user = (req, res) => {
  const userDocument = db.collection("users").doc(req.params.id);
  return userDocument
    .update({
      email: req.body.email,
      first_name: req.body.first_name,
      second_name: req.body.second_name
    })
    .then(() => {
      return res
        .status(200)
        .json({ response: "user data successfully updated" });
    })
    .catch(() => {
      return res.status(500).json({ error: error });
    });
};
const get_all_user = (req, res) => {
  console.log('get all')
  let users = db.collection("users");
  let response = [];
  return users
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const id = doc.id
        const data = doc.data()
        response.push({ id, ...data });
      });
      return res.status(200).json({ response: response });
    })
    .catch(() => {
      return res.status(500).json({ error: error });
    });
};

const get_intervalo = (req, res) => {
  const userDocument = db.collection("users").where('DATA_BOLETO', '>=', req.query.inicio).where('DATA_BOLETO', '<=', req.query.final)
  let response = [];
  response.push(req.params)
  return userDocument
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const id = doc.id
        const data = doc.data()
        response.push({ id, ...data });
      });
      return res.status(200).json({ response: response });
    })
    .catch(error => {
      return res.status(500).json({ error: error });
    });
};


module.exports = {
  create_user,
  get_user,
  delete_user,
  update_user,
  get_all_user,
  get_intervalo
};
