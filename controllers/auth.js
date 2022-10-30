const model = require('../models/model');

module.exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        model.findOne({ email })
            .then(result => {
                if (result) {
                    if (result.password == password) {
                        req.session.user = result.id
                        req.session.isLoggedIn = true;
                        res.redirect("/account");
                    }
                    else {
                        res.render("Entry/login", { error: "Incorrect Password. Please enter a valid email and password." });
                    }
                } else {
                    res.render("Entry/login", { error: "Email not registered. Please sign up first to continue." });
                }
            })
            .catch(e => {
                res.render("Error/ServerError");
            })
    }
    catch (err) {
        console.log(err);
        res.render("Error/ServerError");
    }

}

module.exports.register = async function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        
        model.findOne({ email })
            .then(result => {
            if (result) {
                res.render("Entry/register", { error: "Email is already registered." });
            }
            else {
                const userModel = new model({
                    name, email, password, expenses: []
                });
                userModel.save()
                    .then(result => {
                        req.session.user = result.id
                        req.session.isLoggedIn = true;
                        res.redirect("/account")
                    })
                    .catch(err => {
                        console.log(err);
                        res.render("Entry/register", { error: err })
                    })
            }
            })
            .catch(err=>{
                res.render("Entry/register", { error: err });
            })

    }
    catch (err) {
        res.render("Entry/register", { error: err });
    }
}

module.exports.logout = function (req, res) {
    try{
        req.session.isLoggedIn = false;
        req.session.destroy((err => {
            if(err){
                res.render("Error/error")
            }
            else{
                res.redirect('/');
            }
        }))
    }
    catch(err){
        console.log(err);
        res.render("Error/error");
    }
}