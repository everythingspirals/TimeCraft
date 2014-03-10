'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Timelog Schema
 */
var TimelogSchema = new Schema({
    startTime: {
        type: Date,
        default: Date.now
    },
    stopTime: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    issue: {
        type: Schema.ObjectId,
        ref: 'Issue'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
TimelogSchema.path('description').validate(function(description) {
    return description.length;
}, 'Description cannot be blank');

/**
 * Statics
 */
TimelogSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').populate('issue','name').exec(cb);
};

mongoose.model('Timelog', TimelogSchema);
