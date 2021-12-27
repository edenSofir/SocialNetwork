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
app.use(express.urlencoded(
   {
      extended: true
   }));
app.use(express.json());
app.use("/admin", admin_router);
app.use("/post", post_router);
app.use("/message", message_router);

app.listen(2718, () => {
    data_base.read_data_from_file().then(r => {console.log("starts admin creation"); g_state.create_admin();});
});

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await g_state.find_user_by_email(email) ;

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.id, email },
                "kjnkjnhkjnljn35213541dgvrf351",
                {
                    expiresIn: "10min",
                }
            );
            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});