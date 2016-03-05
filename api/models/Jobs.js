/**
 * Jobs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    jobId : {
      type : 'integer',
      autoIncrement : true
    },

    porters : {
      type :'json'
    },

    location : {
      type : 'json'
    },

    paymentPerPorter : {
      type : 'integer'
    },

    time : {
      type : 'datetime'
    },

    portersRequired : {
      type :'integer'
    }
  }
};
