
const model = require("../models/model");

module.exports.account = function (req, res) {
    if (!req.session.isLoggedIn) {
        res.redirect('/');
    }
    else {
        model.find({ id: req.session.user})
            .then(result => {
                const user = result[0]
                res.render("Account/account",
                {
                    title: `Profile ${user.name}`,
                    user_name: user.name,
                    expenses : user.expenses
                })
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            })
    }
};

module.exports.expense = function (req, res) {
    const id = req.params.id;
    const uid = req.session.user
    model.findOne({id: uid})
    .then(result=>{
        const expense = result.expenses[id]
        res.render("Account/expense",{expense});
    })
    .catch(err=>{
        res.json(err)
    })
    
};

module.exports.add = function (req, res) {
    const body = req.body
    const id = req.session.user;
    model.findOne({id:id})
    .then(result=>{
        const {cost, tax} = req.body
        const total = eval(`${cost}+${tax}`)
        result.expenses.push({
            title : req.body.title,
            cost : req.body.cost,
            tax : req.body.tax,
            description : req.body.description,
            total : total,
            DateAdded : new Date()
        });
        result.save()
        .then(r=>{
            res.redirect('/account');
        })
    })
    .catch(err=>{
         console.log(err);
    })
};

module.exports.delete = function (req, res) {
    const uid = req.params.id;
    model.findOne({id: uid})
    .then(result=>{
        result.expenses.pop(uid);
        result.save()
        .then(r=>{
            res.redirect("/account")
        })
    })
    .catch(err=>{
        res.json(err)
    })
};