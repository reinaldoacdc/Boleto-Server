const express = require("express");
const router = express.Router();
const firestore = require("../controllers/firestoreContollers");

router.get("/api/user", firestore.get_all_user);
router.get("/api/user/:id", firestore.get_user);
router.get("/api/mylist", firestore.get_intervalo);

router.put("/api/user/update/:id", firestore.update_user);
router.delete("/api/user/delete/:id", firestore.delete_user);
router.post("/api/user/create", firestore.create_user);


router.get("/", (req, res) => {
  res.status(200).send("hello from firebase");
});
module.exports = router;
