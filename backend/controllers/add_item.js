const Item = require('../models/items')

exports.postAddItem = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;
  let prices = [];
  let price = +minPrice;
  for (let index = 0; index < 5; index++) {
    price = price + (price * 0.1);
    console.log(price);
    prices[index] = Math.round(price);
  }
  const today = new Date();
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const date = tomorrow.getDate() + "/" + tomorrow.getMonth() + " At " + tomorrow.getHours() + ":" + tomorrow.getMinutes() ;

  const item = new Item({
    title: title,
    description: description,
    imageUrl: imageUrl,
    minPrice: minPrice,
    maxPrice: 0,
    prices: prices,
    category: "path",
    startDate: today,
    endDate:tomorrow,
    date: date
  })
  item.save()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
    });
}