var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var inflection = require('inflection');

var defaultFile = 'moko.up';

var resourcesDir = "resources";

["resources", "conf"].forEach(function(item) {
	if (!fs.existsSync(item) || !fs.statSync(item).isDirectory()) {
      fs.mkdirSync(item);
	}
});

function touchResource(path) {
	console.log(path);
}

function render(items) {
	var res = [];
	for(var item in items) {
		res.push(_render(items[item]));
	}

	var results = "[" + res.join(',') + "]";
	writeResource(path.resolve(process.cwd(), 'conf/moco.conf.json'), results);
}

function _render(item) {
	var str = fs.readFileSync(path.resolve(__dirname, 'template/resource.ejs'), 'utf8');
	return ejs.render(str, {"item": inflection.pluralize(item)});
}

function generateResources() {
	fs.readFile(defaultFile, 'utf8', function(err, data) {
		if(err) {
			console.log(err);
			return;
		}
		data = JSON.parse(data);
		var items = [];
		for(var item in data) {
			items.push(item);
			var file = path.join(resourcesDir, inflection.pluralize(item)+'.json');
			var result = replaceDefault(JSON.stringify(data[item]));
			writeResource(file, result);
		}
		render(items);
	});
}

function replaceDefault(item) {
	var result = item;
	var defaults = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'defaults.json'), 'utf8'));
	for(var def in defaults) {
		var regex = new RegExp(def, 'g');
		result = result.replace(regex, defaults[def]);
	}
	return result;
}

function writeResource(file, result) {
	fs.writeFile(file, result, function(err) {
    if(err) {
		console.log(err);
	}
	});
}

exports.generateResources = generateResources;