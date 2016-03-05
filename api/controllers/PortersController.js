'use strict';
/**
 * PortersController
 *
 * @description :: Server-side logic for managing porters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
  }
};
