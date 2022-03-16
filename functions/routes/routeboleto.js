const express = require("express");
const router = express.Router();
const firestore = require("../controllers/firestoreContollers");

router.get("/api/boleto", firestore.get_all_boleto);
router.get("/api/boleto/:id", firestore.get_boleto);
router.get("/api/boletobydate", firestore.get_intervalo);

router.put("/api/boleto/update/:id", firestore.update_boleto);
router.delete("/api/boleto/delete/:id", firestore.delete_boleto);
router.post("/api/boleto/create", firestore.create_boleto);


router.get("/", (req, res) => {
  res.status(200).send("hello from firebase");
});
module.exports = router;
