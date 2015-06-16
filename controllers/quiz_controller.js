var fs = require('fs');
//GET /quizes/question
exports.question = function(req, res){
	res.render("quizes/question", {pregunta: "Capital de Italia"});
}

//GET /quizes/answer
exports.answer = function(req, res){
	if(req.query.respuesta === "Roma"){
		res.render("quizes/answer", {respuesta: "Correcto"});
	}else {
		res.render("quizes/answer", {respuesta: "Incorrecto"});
	}
}
exports.author = function(req, res){
	res.render("quizes/author");	
}

exports.profileimage = function(req, res){
	console.log("profile image");
	var img = fs.readFileSync('./public/profile_image.png');
     res.writeHead(200, {'Content-Type': 'image/png' });
     res.end(img, 'binary');
}