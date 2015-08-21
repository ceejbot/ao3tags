#!/usr/bin/env node

var
	_        = require('lodash'),
	fs       = require('fs'),
	util     = require('util'),
	yargs = require('yargs')
		.alias('c', 'cutoff')
		.default('c', undefined)
		.describe('c', 'the tag usage cutoff')
		.alias('f', 'filter')
		.default('f', false)
		.describe('f', 'string or pattern to filter for')
		.alias('t', 'transform')
		.boolean('t')
		.describe('t', 'transform tags to canonical form')
		.help('help')
		.usage('get a list of tags matching specific criteria\nUSAGE: $0 -c 200 -f hurt'),
	args = yargs.argv
;

var tags = JSON.parse(fs.readFileSync('tags.json', 'utf8'));
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
			.replace(/\s+/g, '-');

		return out;
	});
}

keys = keys.sort();

console.log(util.inspect(keys, {colors: true}));
console.log(keys.length + ' tags matching criteria');
