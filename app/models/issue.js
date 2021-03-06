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
    },
    sprint: {
        type: Schema.ObjectId,
        ref: 'Sprint'
    },
    project: {
        type: Schema.ObjectId,
        ref: 'Project'
    },
    status: {
        type: Schema.ObjectId,
        ref: 'Status'
    }
});

/**
 * Validations
 */
// IssueSchema.path('name').validate(function(name) {
//     return name.length;
// }, 'Name cannot be blank');

/**
 * Statics
 */
IssueSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .populate('assignedTo', 'name username')
    .populate('project','name')
    .populate('sprint','name')
    .exec(cb);
};
 

mongoose.model('Issue', IssueSchema);
