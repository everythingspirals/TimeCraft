'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 Schema = mongoose.Schema;


/** 
 * Sprint Schema
 */
 var SprintSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    stopDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: Schema.ObjectId,
        ref: 'Status'
    },
    project: {
        type: Schema.ObjectId,
        ref: 'Project'
    }
});

/**
 * Validations
 */

/**
 * Statics
 */
 SprintSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .populate('project', 'name')
    .exec(cb);
};

mongoose.model('Sprint', SprintSchema);
