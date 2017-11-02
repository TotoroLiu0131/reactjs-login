import express from "express" ;
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body.credentials;
    User.findOne({ email }).then(user => {
        if (user && user.isValidPassword(password)) {
            res.json({user : user.toAuthJSON() });
        }else {
            res.status(400).json({ errors: { global: "Email或密碼錯誤！" } })
        }
    });
});

router.post("/signup", (req, res) => {
    const { email, password } = req.body.data;
    const user = new User({email});
    user.setPassword(password);
    user.save()
        .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default router
