const { response } = require("express");
const { Product } = require("../models/entities");

// Get entire list of products
const getCatalogue = (request, response) => {
  const catalogServices = require("../services/productServices");
  catalogServices.searchService(function (err, rows) {
    response.render("catalogue", { products: rows });
  });
};

// Get product by unique ID
const getProductByID = (request, response) => {
  const catalogServices = require("../services/productServices");
  let id = request.params.id;
  catalogServices.searchIDService(id, function (err, rows) {
    response.render("article", { product: rows });
  });
};

// Get product by category
const getProductsByCategory = (request, response) => {
  const catalogServices = require("../services/productServices");
  let category = request.params.category;
  catalogServices.searchCategoryService(category, function (err, rows) {
    response.json(rows);
    response.end();
  });
};

module.exports = {
  getCatalogue,
  getProductByID,
  getProductsByCategory,
};
