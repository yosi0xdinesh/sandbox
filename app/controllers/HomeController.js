const User = require('../models/User');
 

exports.indexFun = (req, res, next) => {
	res.type('text'); // Sets the Content-Type header to text/plain
	res.send('Home');
}
exports.updateData = (req, res) => {

	try{
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
	} catch (err) {
		 res.type('text'); // Sets the Content-Type header to text/plain
		res.send('There is a error');
	}
	
  };
