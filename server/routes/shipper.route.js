require('dotenv').config();

const express = require('express'),
  router = express.Router();
  jwt = require('jsonwebtoken');
  bcrypt = require('bcrypt');
  saltRounds = 9;
  withAuth = require('../middleware');
  loadValidation = require('../validation/load.validation');

// load Model
let loadSchema = require('../models/Load');

// READ all loads
router.get('/', (req, res) => {
  loadSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// UPDATE shipper load with status "NEW"
router.put('/mutation/:id', (req, res, next) => {

  loadSchema.findById(req.params.id, (err, loadSchema) => {
    console.log(loadSchema);
    if (!loadSchema) {
      res.status(404).send("load is not found");
    }

    if (loadSchema.status = "NEW") {
      loadSchema.dimensions = req.body.dimensions;
      loadSchema.payload = req.body.payload;
    } else {
      res.status(500).send("Only loads with status \"NEW\" can be modified.")
    }

    try {
      const updatedLoad = loadSchema.save();
      res.status(200).json('load updated successfully!');

    } catch(err) {
      res.status(500).send(err);
    }
  })
})

// DELETE not assigned to driver loads
router.delete('/bin/:id', (req, res, next) => {   
  loadSchema.findOneAndDelete({ _id: req.params.id, status: "NEW"}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

// View shipping info
router.get('/info/:id', (req, res, next) => {
  loadSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data.status)
    }
  })
});


module.exports = router;