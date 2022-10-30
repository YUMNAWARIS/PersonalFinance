const model = require('../models/model');

module.exports.login = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    model.find({email})
    .then(result=>{
        if(result[0].password == password){
            req.sesson.user = result[0].id
            req.session.isLoggedIn = true;
            res.redirect("/account");
        }
        else{
            res.json({error:"Password Error"});
        }
    })
    .catch(e=>{
        console.log(e);
        res.json({error:e});
    })
}

module.exports.register = async function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const userModel = new model({
            name,email,password,expenses:[]
        });
        const newUser = await userModel.save();
        req.session.isLoggedIn = true;
        res.redirect("/account")
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
}

module.exports.logout = function(req,res){
    req.session.isLoggedIn = false;
    req.session.destroy((err=>{
        console.log(err);
        res.redirect('/');
    }))
}