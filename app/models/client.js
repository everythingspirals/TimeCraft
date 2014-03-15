'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/** 
 * Client Schema
 */
var ClientSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */

/**
 * Statics
 */
ClientSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    })
    .exec(cb);
};

mongoose.model('Client', ClientSchema);
