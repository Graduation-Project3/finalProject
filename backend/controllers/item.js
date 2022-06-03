const Item = require('../models/items')

exports.getAllItem=(req,res)=>{
    console.log("yes");
    Item.find({ready:1})
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
  const today = new Date();
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const date = tomorrow.getDate() + "/" + (tomorrow.getMonth()+1) + " At " + tomorrow.getHours() + ":" + tomorrow.getMinutes() ;
  const id = req.params.id
  Item.updateOne({ _id: id },
    {
      $set: {
        ready: 1,
        date:date,
        startDate: today,
        endDate:tomorrow
      }
    })
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