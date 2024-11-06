const User = require('../models/User');
 

exports.indexFun = (req, res, next) => {
	console.log('Working..');
	next();
}
exports.updateData = (req, res) => {
	const entryId = req.body.id;
	var data = {
		// id: id,
		[req.body.columnName]: editedValue,  // Use computed property name syntax
	};
	User.update(data, {
	  where: { id: entryId }
	})
	  .then(result => {
		//   res.send({
		// 	amount: req.params.amount,
		// 	level: req.params.level,
		// 	battleCount: req.params.battleCount,
		// }) 
		res.status(200).send({
			message: "Added " + entryId
		  });
		
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error " + entryId
		});
	  });
  };
