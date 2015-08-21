Quick and dirty node.js script to fetch all the canonical freeform tags used by the [AO3](http://archiveofourown.org/). Run `./fetchtags.js` then run `parsepages.js` to process the result into json. The output file is `tags.json`. Keys are tags in lexical order; values are the counts reported by AO3.

Working data set as of Feb 21 2015 is checked in here as `tags.json`.

## fetchtags.js

Fetch the tag listing pages from AO3 for later munging. Fetches one at a time so as to not distress anybody's most robust servers. Because I am lazy, this depends on a pagecount constant to figure out if it's done. Will create a local directory named `./input/` and store files in it.

## parsepages.js

Parses the output of `fetchtags.js` and turns it into a json blob in `tags.json`.

## analyze.js

```
get a list of tags matching specific criteria
USAGE: analyze.js -c 20 -f hurt

Options:
  -c, --cutoff     the tag usage cutoff
  -f, --filter     string or pattern to filter for              [default: false]
  -t, --transform  transform tags to canonical form                    [boolean]
  --help           Show help                                           [boolean]
```
