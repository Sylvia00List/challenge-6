var express = require('express');
var router = express.Router();
const {articles} = require ('../models')
const authMiddleware = require('../middleware/authMiddleware');
const { updateArticleById, insertArticle, deleteArticleById } = require('../controllers/articleController');

router.use(authMiddleware);

/* GET users listing. */
router.get('/articles/create', function(req, res, next) {
  res.render('articles/create');
});
router.post('/', (req, res)=> {
    console.log(req.bdy)
    const save = articles.create ({
        email,
        password,
    })

if (save) {
    return res.send ('data berhasil disimpan') ;
}
    return res.send ('gagal menyimpan data');
});

router.get('/', async (req, res) => {
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const offset = page > 1 ? (page - 1) * limit : 0;

	const results = await articles.findAll({
		offset,
		limit,
		order: [['updatedAt', 'DESC']],
	});
	res.render('articles/list', { results });
});

router.get('/create', function (req, res, next) {
	res.render('articles/create', { id: null });
});

router.get('/:id/update', function (req, res, next) {
	res.render('articles/create', {
		id: req.params.id,
	});
});

/**
 * @deprecated
 */
router.post('/:id', async function (req, res) {
	const { email, password } = req.body;
	const update = await articles.update(
		{
			email,
			password,
		},
		{
			where: { id: req.params.id },
		}
	);

	if (update) {
		return res.send('data berhasil diperbaharui');
	}
	return res.send('data gagal di perbaharui');
});


router.post('/', async (req, res) => {
	const {  email, password, id, method } = req.body;

	if (method === 'PUT') {
		return updateArticleById(id, { email, password }).then((result) => {
			res.json(result);
		});
	}

	if (method === 'DELETE') {
		return deleteArticleById(id).then((result) => {
			res.json(result);
		});
	}

	return insertArticle({ email, password }).then((result) => {
		res.json(result);
	});
});

module.exports = router;



