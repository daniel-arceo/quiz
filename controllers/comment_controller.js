var models = require('../models/models.js');

//GET /quizes/:quizId/comments/new
exports.new = function(req, res){
	res.render('comments/new.ejs', {quizid: req.params.quizId, error: []});
};

//POST /quizes/:quizId/comments
exports.create = function(req, res){
	var comment = models.Comment.build(
		{ 	texto: req.body.comment.texto,
			QuizId: req.params.quizId
		});
	comment.save({fields:["pregunta", "respuesta","tema"]}).then(function(){
					res.redirect("/quizes/" + req.params.quizId);
				}, function(err){
					res.render("comments/new.ejs", {comment:comment, quizid: req.params.quizId, errors: err.errors});
				});
};

