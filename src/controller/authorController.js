const authorModels = require("../model/authorModels");
const  jwt = require('jsonwebtoken');



const createAuthor = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            let savedData = await authorModels.create(data)
           return res.status(201).send({ msg: savedData })
        }
        const{fname, lname, title, emailId, password} = data
        if(!fname){
            res.status(400).send({msg:"first name is required"})
        }
        if(!lname){
            res.status(400).send({msg:"last name is required"})   
        }   
        if(!title){
            res.status(400).send({msg:"title is required"})   
        }  
        if(!emailId){
            res.status(400).send({msg:"email is required"})   
        }    
        if(!password){
            res.status(400).send({msg:"password is required"})   
        }                                                                   
                                                               
        else {
           return res.status(400).send({ msg: "Bad Request" })      // (400) = {the server cannot or will not process the request due to something that is perceived to be a client error}
        }
    }
    catch (err) {
        console.log(err)
       return res.status(500).send({ msg: "error", err: err.message })
    }
}


module.exports.createAuthor = createAuthor