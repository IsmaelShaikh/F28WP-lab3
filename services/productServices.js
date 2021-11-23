const productDAO = require("../db/productDAO");

// Get list of products from database
const searchService = function (callback) {
  productDAO.findAll(function (err, rows) {
    if (err) {
      throw err;
    }
    if (rows.length == 0) {
      console.log("No products!");
    } else {
      callback(null, rows);
    }
  });
};

// Get product through unique ID
const searchIDService = function (reference, callback) {
  productDAO.findByID(reference, function (err, rows) {
    if (err) {
      throw err;
    }
    if (rows.length == 0) {
      console.log("Unknown product!");
      let product = null;
      callback(null, product);
    } else {
      //return the retrieved product
      callback(null, rows[0]);
    }
  });
};

// Get product from specific category
const searchCategoryService = function (category, callback) {
  productDAO.findByCategory(category, function (err, rows) {
    if (err) {
      throw err;
    }
    if (rows.length == 0) {
      //no products
      console.log(`No product in category ${category}!`);
      callback(null, rows);
    } else {
      //return the rows
      callback(null, rows);
    }
  });
};

module.exports = {
  searchIDService,
  searchService,
  searchCategoryService,
};
