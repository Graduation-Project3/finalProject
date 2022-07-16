const Item = require('../models/items')

exports.postAddItem = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const minPrice = req.body.minPrice;
  const category = req.body.category;
  let percent;
  let prices = [];
  let price = +minPrice;
  if(price < 50 ){
    percent = 0.3;
  }
  if( price < 100 && price >50){
    percent = 0.25;
  }
  if( price > 100 && price < 1000){
    percent = 0.10;
  }
  if( price > 1000 && price < 10000){
    percent = 0.05;
  }
  if( price > 10000 ){
    percent = 0.01;
  }
  for (let index = 0; index < 5; index++) {
    price = price + (price * percent);
    console.log(price);
    prices[index] = Math.round(price);
  }
  
  const item = new Item({
    title: title,
    description: description,
    imageUrl: imageUrl,
    minPrice: minPrice,
    maxPrice: 0,
    prices: prices,
    category: category ,
    
  })
  item.save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      console.log(err);
    });
}