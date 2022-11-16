module.exports = (app) => {
  const templates = require("../controllers/template.controller.js");

  var router = require("express").Router();

  // Create a new Template
  router.post("/", templates.create);

  // Retrieve all Templates
  router.get("/", templates.findAll);

  // Retrieve all published Templates
  router.get("/published", templates.findAllPublished);

  // Retrieve a single Template with id
  router.get("/:id", templates.findOne);

  // Update a Template with id
  router.put("/:id", templates.update);

  // Delete a Template with id
  router.delete("/:id", templates.delete);

  // Create a new Template
  router.delete("/", templates.deleteAll);

  app.use("/api/templates", router);
};
