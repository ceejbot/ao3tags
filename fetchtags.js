#!/usr/bin/env node

var
	exec     = require('child_process').exec,
	fs       = require('fs'),
	progress = require('progress-bar'),
	Request  = require('request'),
	util     = require('util')
;

var base = 'https://archiveofourown.org/tags/search?page=%d&query%5Bcanonical%5D=true&query%5Bname%5D=&query%5Btype%5D=Freeform&utf8=%E2%9C%93';
// var base = 'https://archiveofourown.org/tags/search?page=%d&query[canonical]=true&query[name]=&query[type]=Freeform&utf8=✓';
var total = 727;
var bar = progress.create(process.stdout, 50);

function pad(n)
{
	if (n >= 100) return n;
	if (n >= 10) return '0' + n;
	return '00' + n;
}

function fetchPage(page, callback)
{
	var uri = util.format(base, page);
	// var cmd = util.format('curl "%s" > page%d.html', page);
	Request.get(uri, function(err, response, body)
	{
		bar.update(page / total);
		if (err)
		{
			console.log(err.message);
			return callback();
		}
		fs.writeFile(util.format('page%s.html', pad(page)), body, callback);
	});
}

fs.mkdir('./input', function(err)
{
	// we don't care about EEXIST errors
	process.chdir('./input');

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
