const Item = require('../models/items')
const Testo =require('../models/testomonials');

exports.getHome = (req,res,next) => {
    Item.find()
    .then(products => {
      res.send(
        {
          prods: products,
        }
      )
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getProduct = (req,res,next) => {
  const id = req.query.id;
  
  
  const percent = 0.1;

 Item.findById(id)
    .then(product => {
      let price = product.minPrice;
      console.log(price);
      let prices = [];
      for (let index = 0; index < 5; index++) {
        price = price + (price * percent);
        console.log(price);
        prices[index] = price;
      }
      console.log(product);
      console.log(prices);
      res.send(
        {
          prod: product,
          prices:prices
        }
      )
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getItemByCategory =(req,res)=>{
  const category = req.params.category;
  Item
    .find({ category : category })
    .then(items => {
      res.status(200).send(items)
    })
    .catch(err => {
      res.status(400).send(err)
    });

}
exports.getItemByTitle =(req,res)=>{
  const title = req.params.title;
  Item
    .find({ title : title })
    .then(items => {
      res.status(200).send(items)
    })
    .catch(err => {
      res.status(400).send(err)
    });

};

