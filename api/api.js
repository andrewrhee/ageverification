var router = require('express').Router();
var async = require('async');
var faker = require('faker');
var Category = require('../models/category');
var Product = require('../models/product');
var User = require('../models/user');


router.post('/verify', function(req, res, next) {
  console.log('last_name >>>> ', req.body.last_name);
  User.findOne({ 'last_name': req.body.last_name }, function(err, user) {
      if (err) return next(err);
      console.log(user,'found user');
      if (user) {
        if (user.dob_year < 1996) {
          return res.json({ status: 'found', age: 'over' });
        } else {
          return res.json({ status: 'found', age: 'under' });
        }

      } else {
        var user1 = new User();
        user1.email = req.body.email;
        user1.first_name = req.body.first_name;
        user1.last_name = req.body.last_name;
        user1.address = req.body.address;
        user1.city = req.body.city;
        user1.state = req.body.state;
        user1.postal_code = req.body.postal_code;
        user1.dob_month = req.body.dob_month;
        user1.dob_day = req.body.dob_day;
        user1.dob_year = req.body.dob_year;
        user1.save(function(err) {
          if (err) next(err);
          res.json({ status: 'not_found' });
        });

      }

    });
});

router.post('/verify2', function(req, res, next) {
  console.log(req.body, 'info from driver licence');
  User.findOne({ 'last_name': req.body.NameLast}, function(err, user) {
    if (err) return next(err);
    if (!user)
      return res.json({status: 'not_found', message: 'Info on driver license does not match any user in our record.'})
    var yearOfBirth = req.body.DateOfBirth4.split('-')[2]
    if (yearOfBirth < 1996) {
      return res.json({ status: 'found', age: 'over' });
    } else {
      return res.json({ status: 'found', age: 'under' });
    }
  })
})

// router.get('/:name', function(req, res, next) {
//
//   async.waterfall([
//     function(callback) {
//       Category.findOne({ name: req.params.name }, function(err, category) {
//         if (err) return next(err);
//         callback(null, category);
//       });
//     },
//     function(category, callback) {
//       for (var i = 0; i< 30; i++) {
//         var product = new Product();
//         product.category = category._id;
//         product.name = faker.commerce.productName();
//         product.price = faker.commerce.price();
//         product.image = faker.image.image();
//
//         product.save();
//       }
//     }
//   ]);
//
//   res.json({ message: 'Success' });
// });

module.exports = router;
