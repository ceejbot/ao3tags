Quick and dirty node.js script to fetch all the canonical freeform tags used by the [AO3](http://archiveofourown.org/). Run `./fetchtags.js` then run `parsepages.js` to process the result into json. The output file is `tags.json`. Keys are tags in lexical order; values are the counts reported by AO3.

Pages are fetched serially so we don't bomb the robust AO3 servers.

Working data set as of Feb 21 2015 is checked in here as `tags.json` and as a [dat](http://dat-data.com) dataset inside the `dat/` directory.
