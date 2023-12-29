let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

let UserSchema = require("../models/user");

router.get("/", (req, res) => {
    res.json({
        msg: "hello"
    })
});

router.post("/create-user", async (req, res, next) => {
    try {

        const { name, email, picture } = req.body;

        let user = await UserSchema.create({
            name,
            email,
            picture
        });
        if (user) {
            res.status(200).json({
                user: user,
                meta: {
                    msg: 'User Added Successfully.',
                },
            });
        } else {
            return res.status(500).json({
                user: user,
                meta: {
                    msg: 'Something Went wrong',
                },
            });

        }
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: 'Internal Server Error',
                },
            ],
        });
    }
});


module.exports = router;
