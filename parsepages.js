#!/usr/bin/env node

var
	_ = require('lodash'),
	fs = require('fs')
	;


var tagpat = /class="tag">(.+)<\/a>.*\((.+)\)/;

var pat = /search\?page=(\d+)/;
var all = fs.readdirSync('./input');
var files = _.filter(all, function(item)
{
	return pat.test(item);
});

var tags = {};

function processFile(fname, callback)
{
	var pmatches = fname.match(pat);
	var pageno = pmatches[1];

	fs.readFile('./input/' + fname, 'utf8', function(err, data)
	{
		if (err)
		{
			console.error(err.message);
			return callback();
		}

		var matches = data.match(tagpat);
		while (matches)
		{
			tags[matches[1]] = +matches[2];
			data = data.replace(matches[0], '');
			matches = data.match(tagpat);
		}

		callback();
	});
}

function continuer()
{

	if (!files.length)
	{
		var keys = Object.keys(tags).sort();
		console.log('found ' + keys.length + ' tags');

		result = {};
		for (var i = 0; i < keys.length; i++)
			result[keys[i]] = tags[keys[i]];

		fs.writeFileSync('tags.json', JSON.stringify(result, true, 4));
		process.exit(0);
	}

	processFile(files.shift(), continuer);
}

processFile(files.shift(), continuer);
