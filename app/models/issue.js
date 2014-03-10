'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Issue Schema
 */
var IssueSchema = new Schema({
    name: {
        type: Date,
        default: Date.now
    },
    story: {
        type: Date,
        default: Date.now
    },
    estimate: {
        type: String,
        default: '',
        trim: true
    },
    actual: {
        type: String,
        default: '',
        trim: true
    },    Estimate: {
    createdBy: String,
        type: Schema.ObjectId,
        ref: 'User'
    },
    assignedTo: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
IssueSchema.path('name').validate(function(description) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
IssueSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Issue', IssueSchema);
