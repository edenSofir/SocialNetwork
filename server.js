const express = require('express');
const admin_router = require('./routers/admin_router');
const post_router = require('./routers/post_router');
const message_router = require('./routers/message_router');
const data_base = require('./JavaScript/data_base');
const app = express();
const jwt = require('jsonwebtoken');
const user = require('./models/User');
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

app.post('/register', async (req, res) =>
{
    try{
       const { full_name, email ,password, user_id} = req.body;

       if(!(password && email && full_name && user_id))
       {
           res.status(400).send("all input required. please try again");

           const is_user_exist = await user.find_user_by_id(user_id);

           if(is_user_exist)
           {
               return res.status(409).send("user is already exist. please preform login");
           }

           const encrypted_password = await bcrypt.hash(password, 10);

           const new_user = await user.User.constructor(full_name, user_id, email.toLowerCase(), encrypted_password);

           const token = jwt.sign(
               {
                   user_id: new_user.id ,email},
                    process.env.TOKEN_KEY,
               {
                   expiresIn: "10min",
               }
           );
           new_user.token = token;
           res.status(201).json(new_user);
       }
    }
    catch (err)
    {
        console.log(err);
    }
})

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await user.find_user_by_email(email) ;

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "10h",
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