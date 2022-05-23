const Item = require('../models/items')

exports.getAllItem=(req,res)=>{
    console.log("yes");
    Item.find()
    .then(Item => {
      res.send(Item)
    })
    .catch(err => {
      res.send(err)
    });
}
exports.deleteItemById=(req,res)=>{
    const idItem = req.params.id;
    Item.deleteOne({"_id": idItem})
    .then(() => {
      res.send('success delete')
    })
    .catch(err => {
      res.send(err)
    });
}
exports.updateItem = (req, res) => {
  console.log("000000000000000000000",req.params.id);
  const id = req.params.id
  Item.findOneAndUpdate({ _id: id }, { $inc: { ready: 1 } })
      .then(result => {
          res.status(200).send(result);
      })
      .catch(err => {
          console.log("err");
      });
}


exports.getItemNotReady=(req,res)=>{
  Item.find({ready:0})
  .then(item => {
    res.send(item)
  })
  .catch(err => {
    res.send(err)
  });
}