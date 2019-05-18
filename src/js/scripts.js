//require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');
window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	let tabs = require('./parts/tabs.js'),
		timer = require('./parts/timer'),
		modals = require('./parts/modals.js'),
		form = require('./parts/form.js'),
		slider = require('./parts/slider.js'),
		calculator = require('./parts/calculator.js');

	tabs();
	timer();
	modals();
	form();
	slider();
	calculator();
}); // -> end scripts