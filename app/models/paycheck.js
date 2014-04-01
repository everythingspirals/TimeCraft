'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Schema = mongoose.Schema;


/** 
 * Paycheck Schema
 */

 var PaycheckSchema = new Schema({
 	checkNumber: {
 		type: Number
 	},
 	user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    checkDate: {
        type: Date,
        default: Date.now
    },
    hours: {
    	type: Number
    },
    rate: {
    	type: Schema.ObjectId,
    	ref: 'Rate'
    },
    taxesAndDeductions: {
        type: Number
    }
});

 /**
 * Statics
 */
 PaycheckSchema.statics.load = function(id, cb) {
 	this.findOne({
 		_id: id
 	})
 	.populate('user', 'name username')
 	.populate('rate', 'rate')
 	.exec(cb)
 };

 mongoose.model('Paycheck', PaycheckSchema);