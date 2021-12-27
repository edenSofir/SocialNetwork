const express = require('express');
const admin_router = require('./routers/admin_router');
const post_router = require('./routers/post_router');
const message_router = require('./routers/message_router');
const data_base = require('./JavaScript/data_base');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('./models/User');
const g_state = require("./JavaScript/g_state");
const admin = require('./models/admin');

app.use(express.urlencoded(
   {
      extended: true
   }));
app.use(express.json());
app.use("/admin", admin_router);
app.use("/post", post_router);
app.use("/message", message_router);

app.listen(2718, () => {
    data_base.read_data_from_file().then(r => {console.log("starts admin creation"); admin.create_admin().then(r => console.log("admin create") );});
});
