#!/usr/bin/env node

var
	fs = require('fs'),
	optimist = require('optimist')
		.alias('c', 'cutoff')
		.default('c', 100)
		.describe('c', 'the tag usage cutoff')
	;

var tags = JSON.parse(fs.readFileSync('tags.json', 'utf8'));

var keys = Object.keys(tags);
var popular = keys.filter(function(item)
{
	return (tags[item] > optimist.argv.c);
});

console.log(popular);
console.log(popular.length);
