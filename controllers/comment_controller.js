var models = require('../models/models.js');

exports.load = function(req, res, next, commentId){
	models.Comment.find({
		where:{
			id: Number(commentId)
		}
	}).then(function(comment){
		if(comment){
			req.comment = comment;
			next();
		}else{
			next(new Error("No existe commentId="+ commentId))
		}
	}).catch(function(error){next(error)});
};

//GET /quizes/:quizId/comments/new
exports.new = function(req, res){
	console.log("El id es " + req.params.quizId);
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

//POST /quizes/:quizId/comments
exports.create = function(req, res){
	var comment = models.Comment.build(
		{ 	texto: req.body.comment.texto,
			QuizId: req.params.quizId
		});
	comment.save().then(function(){
					res.redirect("/quizes/" + req.params.quizId);
				}, function(err){
					res.render("comments/new.ejs", {comment:comment, quizid: req.params.quizId, errors: err.errors});
				});
};

exports.publish = function(req, res){
	req.comment.publicado = true;
	req.comment.save({fields: ["publicado"]}).then(
		function(){res.redirect('/quizes/'+req.params.quizId);}
		,function(error){next(error)});
};
