const express = require("express");
const router = express.Router();
const controller = require("../controllers/file.controller");
const { authenticate } = require('../config/jwt.config');

let routes = (app) => { 
  router.get("/api/files/:name", authenticate, controller.download); 
  app.use(router);
};

module.exports = routes;