'use strict';

angular.module('mean', [
	'ngCookies', 
	'ngResource', 
	'ui.router', 
	'mean.system', 
	'mean.timelogs',
	'mean.issues',
	'mean.projects',
	'mean.clients',
	'mgcrea.ngStrap'
]);

angular.module('mean.system', []);
angular.module('mean.timelogs', []);
angular.module('mean.issues', []);
angular.module('mean.projects', []);
angular.module('mean.clients', []);