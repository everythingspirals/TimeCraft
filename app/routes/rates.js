'use strict';

// rates routes use rates controller
var rates = require('../controllers/rates');
var authorization = require('./middlewares/authorization');

// rate authorization helpers
var hasAuthorization = function(req, res, next) {
	// if (req.rate.user.id !== req.user.id) {
 //        return res.send(401, 'User is not authorized');
 //    }
    next();
};

module.exports = function(app) {

    app.get('/rates', rates.all);
    app.get('/rates/user', rates.byUser);
    app.get('/rates/current', rates.current);
    app.get('/rates/client', rates.client);
    app.post('/rates', authorization.requiresLogin, rates.create);
    app.get('/rates/:rateId', rates.show);
    app.put('/rates/:rateId', authorization.requiresLogin, hasAuthorization, rates.update);
    app.del('/rates/:rateId', authorization.requiresLogin, hasAuthorization, rates.destroy);

    // Finish with setting up the rateId param
    app.param('rateId', rates.rate);

};