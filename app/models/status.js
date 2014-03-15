'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Status Schema
 */
var StatusSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
StatusSchema.path('name').validate(function(description) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
StatusSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Status', StatusSchema);
