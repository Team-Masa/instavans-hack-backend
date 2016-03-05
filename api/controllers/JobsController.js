/**
 * JobsController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addListener : (req, res) => {
    if(!req.isSocket){
      return res.status(500).send({
        error : 'Not a socket'
      });
    }
			// subscribe client to model changes
			Jobs.watch(req.socket);
			console.log( 'Jobs subscribed to ' + req.socket.id );

  }

};
