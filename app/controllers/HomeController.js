const User = require('../models/User');


exports.indexFun = (req, res, next) => {
	res.type('html'); // Sets the Content-Type header to text/plain
	res.send('Home');
}
exports.updateData = (req, res) => {

	// console.log(req.body);

	try{
		const entryId = req.body.id;
		const editedValue = req.body.editedValue;
		var data = {
			id: entryId,
			[req.body.columnName]: editedValue,  // Use computed property name syntax
		};
		User.update(data, {
			where: { id: entryId }
		})
			.then(result => {
				 
				res.status(200).send({
					message: "Added " + result
				});

			})
			.catch(err => {
				res.status(500).send({
					message: "Error " + result
				});
			});
	} catch(err){
		res.status(500).send({
            message: "Error in updateData: " + err.message
        });
	}
		
	 

};
