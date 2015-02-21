#!/usr/bin/env node

var
	fs = require('fs'),
	optimist = require('optimist')
		.alias('c', 'cutoff')
		.default('c', undefined)
		.describe('c', 'the tag usage cutoff')
		.alias('f', 'filter')
		.default('f', undefined)
		.describe('f', 'string or pattern to filter for'),
	util = require('util'),
	args = optimist.argv
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

console.log(util.inspect(keys, {colors: true}));
console.log(keys.length);
