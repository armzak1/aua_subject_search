# AUA Course Searching System With Custom Filters

## Data Acquisition

We tried to approach AUA administration to request the data in any digital format, but apparently, we had to wait for quite some time until the person who manages it could give it to us. So we decided to use scrap the data on our own. The data was scrapped from [this PDF](http://registrar.aua.am/files/2013/11/Ugrad-Draft-Schedule-Spring-2018.-2017-12-11.pdf), using an OCR tool and a lot of picture cropping.

## ElasticSearch Backend

Info about this can be found in [the repo of server side code](https://github.com/hrach977/aua-dbproject).

## Further Steps

The UI is not very user friendly, so we'll try to refine it some more. Also refine it performance-wise and add more filters. And most importantly, approach AUA administration to discuss the deploying this tool and merging it with the current AUA Course Search System.

