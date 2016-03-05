'use strict';
/**
 * PortersController
 *
 * @description :: Server-side logic for managing porters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import {findIndex} from 'lodash';

const modifyPorterTime = type => (req, res) => {
  let { porterId, jobId } = req.body;

  porterId = Number(porterId);
  jobId = Number(jobId);

  Jobs.findOne({
    jobId
  }).then(job => {
    if(!job){
      return res.status(500).send({
        error : 'Job not found'
      });
    }

    const porterIndex = findIndex(job.porters, porter => porter.porterId === porterId);

    if(porterIndex < 0){
      return res.status(500).send({
        error : 'Porter not found'
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

module.exports = {

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

        job.save(err => {
          if (err) {
            console.trace(err);
          }
          res.json(job);
        });

      });
  },


  startJob : modifyPorterTime('startTime'),
  endJob : modifyPorterTime('endTime'),
};
