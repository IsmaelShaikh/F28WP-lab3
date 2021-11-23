const express = require("express");
const productController = require("../controllers/productController");
const clientController = require("../controllers/clientController");

// Defining a router and creating routes
const router = express.Router();

// Routes for dynamic processing of products
//-----------------------------------------------
// Route for listing all products
router.get("/api/catalogue", productController.getCatalogue);
// Route for listing product by ID/Reference
router.get("/api/article/:id", productController.getProductByID);

// Routes for dynamic processing of clients
//-----------------------------------------------
// Route for registration
router.post("/api/register", clientController.registerControl);
// Route for login
router.post("/api/login", clientController.loginControl);
// Route for listing clients when current user is admin
router.get("/api/client", clientController.getClients);

//export router
module.exports = router;
