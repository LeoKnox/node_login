const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const User = require('/models/User');
const db = require('./mysetup/myurl').myurl;

mongoose
    .connect(db)
    .then(() => {
        console.log('Database is connected.');
    })
    .catch(err => {
        console.log("Error is ", err.message);
    });

app.get('/', (req,res) => {
    res.status(200).send(`Hi Welcome to the Login and Signup API`);
});

app.post("/signup", async(req, res) => {
    var newUser = new User ({
        name: req.body.name,
        password: req.body.password
    });
    await newUser
        .save()
        .then(() => {
            res.status(200).send(newUser);
        })
        .catch(err => {
            console.log("Error is ", err.message);
    });
});

app.post('/login', async (req,res) => {
    var newUser = {};
    newUser.name = req.body.name;
    newUser.password = req.body.password;

    await User.findOne({ name: newUser.name })
        .then(profile => {
            if (!profile) {
                res.send('User does not exist');
            } else {
                if (profile.password == newUser.password) {
                    res.send("User authenticated");
                } else {
                    res.send("User Unauthorized Access");
                }
            }
        })
        .catch(err => {
            console.log("Error is ", err.message);
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});