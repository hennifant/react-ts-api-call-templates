const db = require("../models");
const Template = db.templates;

// Create and Save a new Template
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Template
  const template = new Template({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save Template in the database
  template
    .save(template)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Template.",
      });
    });
};

// Retrieve all Templates from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Template.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving templates.",
      });
    });
};

// Find a single Template with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Template.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Template with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Template with id=" + id });
    });
};

// Update a Template by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Template.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Template with id=${id}. Maybe Template was not found!`,
        });
      } else res.send({ message: "Template was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Template with id=" + id,
      });
    });
};

// Delete a Template with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Template.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Template with id=${id}. Maybe Template was not found!`,
        });
      } else {
        res.send({
          message: "Template was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Template with id=" + id,
      });
    });
};

// Delete all Templates from the database.
exports.deleteAll = (req, res) => {
  Template.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Templates were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all templates.",
      });
    });
};

// Find all published Templates
exports.findAllPublished = (req, res) => {
  Template.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving templates.",
      });
    });
};
