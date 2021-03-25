const Users = require( '../models/users');


/**
 *  User Apis
 * 
 */

// Create a new user
exports.createOne = async (req, res, next) => {
	console.log("createOne: [POST] /users/");
	try {
		const USER_MODEL = {
			username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      avatarPath: req.body.avatarPath,
      isDeleted: false
		}
	
		try {
			const user = await Users.create(USER_MODEL);
			console.log("OK createOne USER: ", user);
			return res.status(201).json(user);
		} catch (error) {
			console.log('ERROR in createOne ' + "USER:", error);
			return res.status(500).json(error);
		}
	} catch (error) {
		return res.status(400).json("Bad Request");
	}
};

// get all users
exports.getAll = async (req, res, next) => {
	console.log("getAll: [GET] /users/");
	try {
		const ALL = await Users.findAll();
		console.log("OK getAll USER: ", ALL.map(el => el.dataValues));
		return res.status(200).json(ALL);
	} catch (error) {
		console.log('ERROR in getAll ' + "USER:", error);
		return res.status(500).json(error);
	}
};

// get one user by id
exports.getOne = async (req, res, next) => {
	console.log("getOne: [GET] /users/:id");
	try {
		const u = await Users.findByPk(req.params.id);
		console.log("OK getOne USER: ", u.dataValues);
		return res.status(200).json(u);
	} catch (error) {
		console.log('ERROR in getOne ' + "USER:", error);
		return res.status(500).json(error);
	}
};

// update one user by id
exports.updateOne = async (req, res, next) => {
	console.log("updateOne: [PUT] /users/:id");
	try {
		const USER_MODEL = {
			username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      avatarPath: req.body.avatarPath,
      isDeleted: req.body.isDeleted
		}
	
		try {
			const u = await Users.update(USER_MODEL, { where: { id: req.params.id } });
			console.log("OK updateOne USER: ", u);
			return res.status(200).json(u);
		} catch (error) {
			console.log('ERROR in updateOne ' + "USER:", error);
			return res.status(500).json(error);
		}
	} catch (error) {
		return res.status(400).json("Bad Request");
	}
};

// delete one user by id
exports.deleteOne = async (req, res, next) => {
	console.log("[DELETE] /users/:id");
	try {
		const u = await Users.destroy({ where: { id: req.params.id } });
		console.log("OK deleteOne USER: ", );
		return res.status(200).json(u);
	} catch (error) {
		console.log('ERROR in deleteOne ' + "USER:", error);
		return res.status(500).json(error);
	}
};