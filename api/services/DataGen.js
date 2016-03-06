'use strict';
import moment from 'moment';
import {times} from 'lodash';

var randomMarkerGenerator = function (radius) {
  var r = radius / 111300,
    y0 = 13.2417155,
    x0 = 77.7137305999999,
    u = Math.random(),
    v = Math.random(),
    w = r * Math.sqrt(u),
    t = 2 * Math.PI * v,
    x = w * Math.cos(t),
    y1 = w * Math.sin(t),
    x1 = x / Math.cos(y0);

  var newY = y0 + y1;
  var newX = x0 + x1;
  return [newY, newX, 1];
};

module.exports = {

  generatePorters : () => {
      const porters = times(20, (i) => {
        return {
          name : 'porter' + i,
        };
      });
      Porters.create(porters).then(console.log);
  },

  generate : ()=> {
    const jobs = times(20, (i) => {
      const daysBefore = Math.floor(Math.random() * 3 + 1) * i;
      const timeDelay = Math.floor(Math.random() * 20 - 15);
      const location = randomMarkerGenerator(10000);
      const thatTime = moment().subtract(daysBefore, 'days');
      const jobData = {
        jobId : i,
        porters : [
          {
            porterId : i,
            startTime : new Date(thatTime.add(timeDelay, 'minutes')),
            endTime : new Date(thatTime.add(timeDelay + 10, 'minutes'))
          },
          {
            porterId : i + 1,
            startTime : new Date(thatTime.add(timeDelay, 'minutes')),
            endTime : new Date(thatTime.add(timeDelay + 10, 'minutes'))
          }
        ],
        portersRequired : 2,
        time : new Date(thatTime),
        allAssigned : true,
        location : {
          lat : location[0],
          lng : location[1]
        }
      };
      return jobData;
    });

    Jobs.create(jobs).then(console.log);
  }
};
