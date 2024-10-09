const errorHandler = (err, req, res, next) => {
	if (err) {
		if (err.message) {
			res.status(400).json({
				status: "failed",
				error: err.message,
			});
		} else {
			res.status(400).json({
				status: "failed",
				error: err,
			});
		}
	}

	next();
};

module.exports = errorHandler;
