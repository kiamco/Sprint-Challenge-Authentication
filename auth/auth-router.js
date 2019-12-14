const router = require('express').Router();
const Users = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

router.post('/register', (req, res) => {
    // implement registration
    const credentials = req.body;
    const hash = bcrypt.hashSync(credentials.password, 14);
    credentials.password = hash
    Users.addUser(credentials)
        .then(user => {
            res.status(201).json({ user, credentials });
        })
        .catch(err => console.error(err));
});

router.post('/login', (req, res) => {
    // implement login
    const {
        username,
        password
    } = req.body;

    Users.findUser(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user[0].password)) {
                res.status(200).json({
                    message: `Welcome ${user[0].username}!`
                });
                req.session.username = user[0].username
                console.log(req.session);
                req.session.save()
            } else {
                res.status(401).json({
                    message: "Invalid Credentials"
                });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;