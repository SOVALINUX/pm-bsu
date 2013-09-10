exports.index = function (req, res) {
  GLOBAL.dao.findAll('Product', function (err, items) {
    if (err) {
      res.render("error", {err: JSON.stringify(err)});
      return;
    }
    if (!items || !items.length) {
      res.render("error", {message: "Visit /create to create some products"});
      return;
    }
    res.render("catalog", {items: items});
  });
}

exports.create = function (req, res) {
  GLOBAL.dao.save({name: "Product1", description: "Desc1", price: 100}, 'Product', function (err, items) {
    if (err) {
      res.render("error", {err: JSON.stringify(err)});
    } else {
      res.render("created", {items: items});
    }
  });
}
