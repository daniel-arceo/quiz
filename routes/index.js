var express = require('express');
var quizController = require('../controllers/quiz_controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.param('quizId', quizController.load); //autoload: quizId

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/*router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);*/
router.get('/quizes/author', quizController.author);
router.get('/quizes/profileimage', quizController.profileimage);
module.exports = router;
