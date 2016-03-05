'use strict';
/**
 * Counter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 //Best practives : https://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/

module.exports = {

  attributes: {

  },

  incrementCounter: (counterName) => {
    return new Promise((resolve, reject) => Counter.native((err, counter) => {
      if(err){
        reject(err);
      }
      let query  = {
        '$inc' : {}
      };
      query.$inc[counterName] = 1;
      resolve(counter.findAndModify({}, [], query));
    }));
  }
};
