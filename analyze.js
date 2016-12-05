#!/usr/bin/env node

var
	_       = require('lodash'),
	chalk   = require('chalk'),
	fs      = require('fs'),
	util    = require('util'),
	yargs   = require('yargs')
		.option('cutoff',
		{
			alias: 'c',
			description: 'tags with usage counts lower than this will not be considered'
		})
		.option('filter',
		{
			alias: 'f',
			description: 'string or pattern to filter for'
		})
		.option('transform',
		{
			alias: 't',
			type: 'boolean',
			description: 'transform tags to canonical form'
		})
		.option('sort',
		{
			alias: 's',
			description: 'sorting criterion: lexical or count',
			default: 'lexical'
		})
		.option('json',
		{
			alias: 'j',
			type: 'boolean',
			description: 'output results in json format',
		})
		.help('help')
		.usage('get a list of tags matching specific criteria')
		.example('$0 -c 200 -f hurt', 'filter for tags with "hurt" used at least 200 times')
		.example('$0 -c 5000 -s count', 'show tags used more than 3000 times sorted by usage count')
		.example('$0 -c 3000 file.json', 'read some other json file for data (defaults to tags.json)')
	args = yargs.argv
;

var source = args._.length ? args._[0] : 'tags.json';
var tags = JSON.parse(fs.readFileSync(source, 'utf8'));
var keys = Object.keys(tags);

if (args.f)
{
	var pattern = new RegExp(args.f, 'i');

	keys = keys.filter(function(item)
	{
		return (pattern.test(item));
	});
}

if (args.c)
{
	keys = keys.filter(function(item)
	{
		return (tags[item] > args.c);
	});
}

if (args.t)
{
	var newtags = {};
	keys = _.map(keys, function(k)
	{
		var out = k.toLowerCase();

		var matches = out.match(/(.*)\s+(kink|sex)$/);
		if (matches)
		{
			out = matches[2] + ':' + matches[1];
		}

		out = out.replace(/:\s+/g, ':')
			.replace(' - ', ':')
			.replace('- ', ':')
			.replace('--', ':')
			.replace('alternate universe', 'au')
			.replace(/\s+/g, '-')
			.replace('&amp;', '&');

		newtags[out] = tags[k];
		return out;
	});
	tags = newtags;
}

if (args.sort === 'count')
{
	keys = keys.sort(function(l, r)
	{
		return tags[r] - tags[l];
	});
}
else
	keys = keys.sort();

var outtags = {};
_.each(keys, function(k)
{
	outtags[k] = tags[k];
});

console.log(keys.length + ' tags matching criteria\n');
if (args.json)
	console.log(util.inspect(outtags, {colors: true}));
else
{
	var results = [];
	_.each(keys, function(k)
	{
		console.log(chalk.blue(k) + ': ' + outtags[k]);
	})
}
