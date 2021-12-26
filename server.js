const express = require('express');
const data_base = require('./JavaScript/data_base');
const admin_router = require('./routers/admin_router');
const post_router = require('./routers/post_router');
const message_router = require('./routers/message_router');
const app = express();

app.use(express.urlencoded(
   {
      extended: true
   }));
app.use(express.json());
app.use(require("./routers"));
app.use("/admin", admin_router);
app.use("/post", post_router);
app.use("/message", message_router);

app.get("/",(req, res) => {
    data_base.read_data_from_file().then(r => console.log("data read."));
    res.status(200).send("date read");
});


app.listen(2718, () => console.log(`server started on port ${2718}`));
