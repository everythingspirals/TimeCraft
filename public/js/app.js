'use strict';

angular.module('mean', [
	'ngCookies', 
	'ngResource', 
	'ui.router', 
	'mean.system', 
	'mean.timelogs',
	'mean.issues',
	'mgcrea.ngStrap'
]);

angular.module('mean.system', []);
angular.module('mean.timelogs', []);
angular.module('mean.issues', []);