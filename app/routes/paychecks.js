'use strict';

// paychecks routes use paychecks controller
var paychecks = require('../controllers/paychecks');
var authorization = require('./middlewares/authorization');

// paycheck authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.rate.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/paychecks', paychecks.all);
    app.get('/paychecks/current', authorization.requiresLogin, hasAuthorization, paychecks.findByRange);
    app.post('/paychecks', authorization.requiresLogin, paychecks.create);
    app.get('/paychecks/:rateId', paychecks.show);
    app.put('/paychecks/:rateId', authorization.requiresLogin, hasAuthorization, paychecks.update);
    app.del('/paychecks/:rateId', authorization.requiresLogin, hasAuthorization, paychecks.destroy);

    // Finish with setting up the rateId param
    app.param('rateId', paychecks.paycheck);

};