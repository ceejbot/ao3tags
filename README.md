Quick and dirty node.js script to fetch all the canonical freeform tags used by the [AO3](http://archiveofourown.org/). Requires a recent [node.js](https://nodejs.org).

To use, clone the repo then run `npm install`.

To collect new data: Run `./fetchtags.js` then run `parsepages.js` to process the result into json. The output file is `tags.json`. Keys are tags in lexical order; values are the counts reported by AO3.

To have fun with the data I've already collected: `./analyze.js --help`.

Working data set as of January 19 2016 is checked in here as `tags.json`.

## fetchtags.js

Fetch the tag listing pages from AO3 for later munging. Fetches one at a time so as to not distress anybody's most robust servers. Because I am lazy, this depends on a pagecount constant to figure out if it's done. Will create a local directory named `./input/` and store files in it.

## parsepages.js

Parses the output of `fetchtags.js` and turns it into a json blob in `tags.json`. It also makes `dat-ready.json` if you want to fiddle with the results with [dat](http://dat-data.com).

## analyze.js

```
get a list of tags matching specific criteria

Options:
  --cutoff, -c     tags with usage counts lower than this will not be considered
  --filter, -f     string or pattern to filter for
  --transform, -t  transform tags to canonical form                    [boolean]
  --sort, -s       sorting criterion: lexical or count      [default: "lexical"]
  --json, -j       output results in json format                       [boolean]
  --help           Show help                                           [boolean]

Examples:
  analyze.js -c 200 -f hurt    filter for tags with "hurt" used at least 200 times
  analyze.js -c 5000 -s count  show tags used more than 5000 times sorted by usage count
```

The transform option changes the tags to a no-spaces all-lower-case version with some inconsistencies cleaned up. Needs more work.

`./analyze.js -c 3000 --sort count -t` gets you a list of tags that is mostly devoid of fandom-specific & content-free crud, ready to use.

## LICENSE

ISC.
