const express = require('express');
const app = express();
app.use(express.urlencoded(
   {
      extended: true
   }));
app.use(express.json());
app.use(require("./routers"));
app.listen(2718, () => console.log(`server started on port ${2718}`));
