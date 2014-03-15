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
        type: String,
        default: '',
        trim: true
    },
    story: {
        type: String,
        default: '',
        trim: true
    },
    estimate: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
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
IssueSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
IssueSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .exec(cb);
};

mongoose.model('Issue', IssueSchema);
