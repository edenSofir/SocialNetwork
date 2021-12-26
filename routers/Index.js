const router = require('express').Router();

router.use("/admin_router", require("./admin_router"));
router.use("/message_router", require("./message_router"));
router.use("/post_router", require("./post_router"));

module.exports = router;