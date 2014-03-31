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
 	rate: {
 		type: Number
 	},
 	startDate: {
 		type: Date
 	},
 	user: {
 		type: Schema.ObjectId,
 		ref: 'User'
 	},
 	project: {
        type: Schema.ObjectId,
        ref: 'Project'
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
 	.populate('project', 'name')
 	.exec(cb)
 };

 mongoose.model('Rate', RateSchema);