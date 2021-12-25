const express = require('express');
//const admin_router = require('./routers/admin_router');
//const message_router = require('./routers/message_router');
//const post_router = require('./routers/post_router');
const app = express();
//app.use(express.urlencoded(
//   {
//      extended: true
//   }));
app.use(express.json());
app.use(require("./routers"));
/*app.use('/messages',message_router);
app.use('/post', post_router);
*/
app.listen(2718, () => console.log(`server started on port ${2718}`));
