
const Users = require('../models/users')

exports.getAllUser=(req,res)=>{
    Users.find()
    .then(Users => {
      res.send(
        Users
      )
    })
    .catch(err => {
      res.send(err)
    });
}
exports.deleteUserById=(req,res)=>{
    const idUser = req.params.id;
    Users.deleteOne({"_id": idUser})
    .then(() => {
      res.send(
      'success delete'
      )
    })
    .catch(err => {
      res.send(err)
    });
}

