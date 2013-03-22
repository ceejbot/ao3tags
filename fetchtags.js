#!/usr/bin/env node

var
	exec = require('child_process').exec,
	fs = require('fs'),
	util = require('util')
	;

var base = 'https://archiveofourown.org/tags/search?page=%d&query[canonical]=true&query[name]=&query[type]=Freeform&utf8=%E2%9C%93';
var total = 289;

fs.mkdir('./input', function(err)
{
	// we don't care about EEXIST errors
	process.chdir('./input');

	function fetchPage(page, callback)
	{
		var uri = util.format(base, page);
		// var cmd = util.format('curl "%s" > page%d.html', page);

		exec('wget "' + uri + '"', function(err, stdout, stderr)
		{
			if (err)
			{
				console.error(err.message);
				return callback();
			}

			console.log('page ' + page + ' done');
			callback();
		});
	}

	var idx = 1;
	function continuer()
	{
		idx++;
		if (idx > total)
		{
			console.log('done!');
			process.exit(0);
		}
		fetchPage(idx, continuer);
	}

	fetchPage(idx, continuer);
});
