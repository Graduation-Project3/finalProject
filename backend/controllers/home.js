const Item = require('../models/items')
const Testo =require('../models/testomonials');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { response } = require('express');
let smtpTransport = nodemailer.createTransport({
  
  service: "gmail",
  auth:{ 
    user:"mazaddjo@gmail.com",
    pass:"ehabashrafqadi2000"
  },
  tls:{
    rejectUnauthorized:false
  }

});


exports.getHome = (req,res,next) => {
    Item.find({ready:1})
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
  Item.findById(id)
    .then(product => {
      res.send(
        {
          prod: product
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
    .find({ category : category ,ready:1})
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
    .find({ title : title ,ready:1})
    .then(items => {
      res.status(200).send(items)
    })
    .catch(err => {
      res.status(400).send(err)
    });

};

///////////////////////////// postAuction ////////////////////////////////////////////
exports.postAuction =(req,res)=>{
  const id = req.body.product._id;
  const currentPrice = req.body.price;
  let price = currentPrice;
  const token = req.body.token;
  let percent;
  let pay =false;
  const verified = jwt.verify(token,'supersecret_dont_share', );
  let prices = [];
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
  const movement = {
    userId:verified.userId,
    email:verified.email,
    price:currentPrice
  };
  Item.findById(id)
  .then(product => {
    const h = product.history;
    for (let index  = 0; index < h.length; index++) {
     if (h[index].userId === verified.userId) {
       pay =true;
     }  
      
    }
    if (pay) {
      h.push(movement);
      product.history = h;
      newPrices = prices;
      product.prices = newPrices;
      product.maxPrice = currentPrice;
      
    }
    return product.save();
  }).then(prod =>
    res.send(
      {
        prod: prod,
        price:currentPrice,
        pay:pay
      }
    )
  )
  .catch(err => {
    console.log(err);
  });
};


exports.postPayment =(req,res)=>{
  const id = req.body.product;
  const currentPrice = req.body.price;
  let price = currentPrice;
  let min ;
  const token = req.body.token;
  
  const verified = jwt.verify(token,'supersecret_dont_share', );
  let prices = [];
      for (let index = 0; index < 5; index++) {
        price = price + (price * 0.1);
        console.log(price);
        prices[index] = Math.round(price);
      }
  const movement = {
    userId:verified.userId,
    email:verified.email,
    price:currentPrice
  };
  Item.findById(id)
  .then(product => {
    let h = product.history;
      console.log('hi');
      h = movement;
      product.history = h;
      newPrices = prices;
      min = product.minPrice;
      product.prices = newPrices;
    return product.save();
  }).then(prod =>
    res.send(
      {
        prod: prod,
        price:currentPrice,
      }))
  .catch(err => {
    console.log(err);

    res.status(400).send(err);
  });
};


// exports.postPayment =(req,res)=>{
//   const id = req.body.product;
//   const currentPrice = req.body.price;
//   let price = currentPrice;
//   let min ;
//   const token = req.body.token;
  
//   const verified = jwt.verify(token,'supersecret_dont_share', );
//   let prices = [];
//       for (let index = 0; index < 5; index++) {
//         price = price + (price * 0.1);
//         console.log(price);
//         prices[index] = Math.round(price);
//       }
//   const movement = {
//     userId:verified.userId,
//     email:verified.email,
//     price:currentPrice
//   };
//   Item.findById(id)
//   .then(product => {
//     let h = product.history;

//       h = movement;
//       product.history = h;
//       newPrices = prices;
//       min = product.minPrice;
//       product.prices = newPrices;
//       product.maxPrice = currentPrice;
      
    
  
//     return product.save();
//   }).then(prod =>
//     smtpTransport.sendMail({
//       to: verified.email,
//       from: 'mazaddjo@gmail.com',
//       subject: 'asscurance amount',
//       html: `
//       <p>an ammount of ${min * 0.1} was cutted from your credit card </p>
//       `
//     }).then(res => console.log(res))
//     .then(response =>{
//       res.send(
//         {
//           prod: prod,
//           price:currentPrice,
//         }
//       )
//     })
    
//   )
//   .catch(err => {
//     console.log(err);

//     res.status(400).send(err);
//   });
// };