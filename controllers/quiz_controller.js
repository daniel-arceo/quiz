var fs = require('fs');
var models = require("../models/models.js");

//Autoload
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				new Error("No existe quizId=" + quizId);
			}
		}).catch(function(error){
		next(error);
	})
}

//GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes:quizes});
	});
}

//GET /quizes/:id
exports.show = function(req, res){
	res.render("quizes/show", {quiz: req.quiz});
	/*models.Quiz.findAll().success(function(quiz){
		res.render("quizes/show", {quiz: quiz});
	});*/	
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = "Incorrecto";
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = "Correcto";
	}
	res.render("quizes/answer", {quiz: req.quiz, respuesta: resultado});

	/*models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render("quizes/answer", 
				{quiz:quiz, respuesta: "Correcto"});
		}else {
			res.render("quizes/answer", 
				{quiz:quiz,respuesta: "Incorrecto"});
		}
	});*/
};

exports.author = function(req, res){
	res.render("quizes/author");	
};

exports.profileimage = function(req, res){
	console.log("profile image");
	var img = fs.readFileSync('./public/profile_image.png');
     res.writeHead(200, {'Content-Type': 'image/png' });
     res.end(img, 'binary');
};