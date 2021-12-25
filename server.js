const express = require('express');
const admin_router = require('./routers/admin_router');
const message_router = require('./routers/message_router');
const post_router = require('./routers/post_router');
const package = require('./package.json');
const app = express();

app.use(express.json());
app.use('/users',admin_router);
app.use('/messages',message_router);
app.use('/post', post_router);

const server = app.listen(2718, () => console.log(`server started on port ${2718}`))
module.exports = { app, server }
