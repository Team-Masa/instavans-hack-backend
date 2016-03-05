'use strict';
/**
 * Jobs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    jobId: {
      type: 'integer',
      autoIncrement: true
    },

    porters: {
      type: 'json',
      defaultsTo : []
    },

    location: {
      type: 'json'
    },

    paymentPerPorter: {
      type: 'integer'
    },

    time: {
      type: 'datetime'
    },

    portersRequired: {
      type: 'integer'
    }
  },

  beforeCreate : (values, cb) => {
    Counter.incrementCounter('jobs')
    .then(counters => {
      values.jobId = counters.value.jobs || 0;
      cb();
    }, console.trace);
  }
};
