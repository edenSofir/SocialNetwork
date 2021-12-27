const express = require('express');
const admin_router = require('./routers/admin_router');
const post_router = require('./routers/post_router');
const message_router = require('./routers/message_router');
const user_router = require('./routers/user_router');
const data_base = require('./JavaScript/data_base');
const app = express();
const admin = require('./models/admin');

app.use(express.urlencoded(
   {
      extended: true
   }));
app.use(express.json());
app.use("/admin", admin_router);
app.use("/post", post_router);
app.use("/message", message_router);
app.use("/user", user_router);
app.listen(2718, () => {
    data_base.read_data_from_file().then(r => {admin.create_admin().then(r => console.log("admin create") );});
});
