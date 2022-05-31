const Category = require('../models/category')

exports.addCategory = (req, res) => {
    const title = req.params.title;
    const category = new Category({
        title: title,
    })
    category.save()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getAllCategory = (req, res) => {
    Category.find()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log("err");
        });
}

exports.deleteCategoryById = (req, res) => {
    const id = req.params.id
    Category.deleteOne({"_id": id})
    .then(() => {
      res.send(
      'success delete'
      )
    })
    .catch(err => {
      res.send(err)
    });
}
