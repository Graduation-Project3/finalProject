const Item = require('../models/items')

exports.postAddItem = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const minPrice = req.body.minPrice;
  const maxPrice = req.body.maxPrice;


  const item = new Item({
    title: title,
    description: description,
    imageUrl: imageUrl,
    minPrice: minPrice,
    maxPrice: maxPrice
  })
  item.save()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log("err");
    });
}