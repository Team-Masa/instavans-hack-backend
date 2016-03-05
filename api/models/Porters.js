'use strict';
/**
 * Porters.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    porterId : {
      type : 'number'
    },
    name : {
      type : 'text'
    }
  },

  beforeCreate : (values, cb) => {
    Counter.incrementCounter('porters')
    .then(counters => {
      values.porterId = counters.value.porters || 0;
      cb();
    }, console.trace);
  }
};
