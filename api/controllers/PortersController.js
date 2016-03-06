'use strict';
/**
 * PortersController
 *
 * @description :: Server-side logic for managing porters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import {
  findIndex
} from 'lodash';
import moment from 'moment';
import latlngToKm from './extra/latlng-to-km';

const modifyPorterTime = type => (req, res) => {
  let {
    porterId,
    jobId
  } = req.body;

  porterId = Number(porterId);
  jobId = Number(jobId);

  Jobs.findOne({
    jobId
  }).then(job => {
    if (!job) {
      return res.status(500).send({
        error: 'Job not found'
      });
    }

    const porterIndex = findIndex(job.porters, porter => porter.porterId === porterId);

    if (porterIndex < 0) {
      return res.status(500).send({
        error: 'Porter not found'
      });
    }

    job.porters[porterIndex][type] = new Date();

    job.save(err => {
      if (err) {
        console.trace(err);
      }
      res.json(job);
    });

  }, console.trace);
};

const transformData = (lat, lng) => job => {
  job.prettyDate = moment(job.time).format('MMMM DD YYYY hh:mm a');
  job.distance = Math.round(latlngToKm(lat, lng, job.location.lat, job.location.lng) * 100) / 100;
  return job;
};

module.exports = {

  getUnassignedJobs : (req, res) => {
    const {lat, lng} = req.query;
    Jobs.find({
      allAssigned : {
        '!' : true
      }
    })
    .then(data => res.json(data.map(transformData(lat, lng))), console.trace);
  },

  assignToJob: (req, res) => {
    let {
      porterId,
      jobId
    } = req.body;

    porterId = Number(porterId);
    jobId = Number(jobId);

    Jobs.findOne({
        jobId
      })
      .then(job => {

        if (job.porters.filter(porter => porter.porterId === porterId).length > 0) {
          return res.json(job);
        }

        job.porters.push({
          porterId
        });

        job.allAssigned = (job.porters.length >= job.portersRequired);
        job.save(err => {
          if (err) {
            console.trace(err);
          }
          res.json(job);
        });

      });
  },


  startJob: modifyPorterTime('startTime'),
  endJob: modifyPorterTime('endTime'),
};
