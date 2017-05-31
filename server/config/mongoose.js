let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/BeltDB');

let models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file)
{
	if(file.indexOf('.js') >= 0)
	{
		require(path.join(models_path, file));
	}
});
