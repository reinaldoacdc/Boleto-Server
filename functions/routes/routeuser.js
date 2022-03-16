const express = require("express");
const router = express.Router();
const firebase = require("../controllers/firebaseAuthController");

// router.get("/api/users", firestore.get_all_user);
// router.get("/api/user/:id", firestore.get_user);

// router.put("/api/user/update/:id", firestore.update_user);
// router.delete("/api/user/delete/:id", firestore.delete_user);
router.post("/api/user/create", firestore.create_boleto);

module.exports = router;
