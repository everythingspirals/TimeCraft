'use strict';

// clients routes use clients controller
var clients = require('../controllers/clients');
var authorization = require('./middlewares/authorization');

// client authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.client.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/clients', clients.all);
    app.post('/clients', authorization.requiresLogin, clients.create);
    app.get('/clients/:projectId', clients.show);
    app.put('/clients/:projectId', authorization.requiresLogin, hasAuthorization, clients.update);
    app.del('/clients/:projectId', authorization.requiresLogin, hasAuthorization, clients.destroy);

    // Finish with setting up the projectId param
    app.param('clientId', clients.client);

};