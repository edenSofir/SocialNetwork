const express = require('express');
const admin_router = require('./routers/admin_router');
const post_router = require('./routers/post_router');
const message_router = require('./routers/message_router');
const user_router = require('./routers/user_router');
const data_base = require('./JavaScript/data_base');
const app = express();
const admin = require('./models/admin');
const path = require("path");
const reExt = /\.([a-z]+)/i;

function content_type_from_extension( url) {
   const m = url.match( reExt );
   if ( !m ) return 'application/json'
   const ext = m[1].toLowerCase();

   switch( ext )
   {
       case 'js': return 'text/javascript';
       case 'css': return 'text/css';
       case 'html': return 'text/html';
   }

   return 'text/plain'
}

const set_content_type = function (req, res, next) {

   const content_type = req.baseUrl === '/api' ? "application/json; charset=utf-8" : content_type_from_extension( req.url)
   res.setHeader("Content-Type", content_type);
   next()
}

app.use(set_content_type);
app.use(express.urlencoded(
   {
      extended: true
   }));
app.use(express.json());
app.use("/admin", admin_router);
app.use("/post", post_router);
app.use("/message", message_router);
app.use("/user", user_router);
app.use(express.static(path.join(__dirname, 'Ex3')));
app.listen(2718, () => {
    data_base.read_data_from_file().then(r => {admin.create_admin().then(r => console.log("admin create") );});
});
