const authMiddleware = (req, res, next) => {
	{
		return res.redirect('/login');
	}
	next();
};

module.exports = authMiddleware;
