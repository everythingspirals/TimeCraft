'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/** 
 * Project Schema
 */
var ProjectSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: new Date,
        trim: true
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: Schema.ObjectId,
        ref: 'Status'
    },
    client: {
        type: Schema.ObjectId,
        ref: 'Client'
    }
});

/**
 * Validations
 */

/**
 * Statics
 */
ProjectSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username')
    .populate('status','name')
    .populate('createdBy','name')
    .populate('client', 'name')
    .exec(cb);
};

mongoose.model('Project', ProjectSchema);
