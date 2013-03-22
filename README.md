Quick and dirty node.js script to fetch all the canonical freeform tags used by the [AO3](http://archiveofourown.org/). Run `./fetchtags.js` then run `parsepages.js` to process the result into json. The output file is `tags.json`. Keys are tags in lexical order; values are the counts reported by AO3.

Pages are fetched serially so we don't bomb the robust AO3 servers.
