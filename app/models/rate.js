'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Schema = mongoose.Schema;


/** 
 * Rate Schema
 */
 var RateSchema = new Schema({
 	amount: {
 		type: Number
 	},
 	startDate: {
 		type: Date,
 		default: Date.now
 	},
 	user: {
 		type: Schema.ObjectId,
 		ref: 'User'
 	},
 	client: {
        type: Schema.ObjectId,
        ref: 'Client'
    }
 });

/**
 * Statics
 */
 RateSchema.statics.load = function(id, cb) {
 	this.findOne({
 		_id: id
 	})
 	.populate('user', 'name username')
 	.populate('client', 'name')
 	.exec(cb)
 };

 mongoose.model('Rate', RateSchema);