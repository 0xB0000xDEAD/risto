# Restaurant review

## Table of Contents
* [What is this?](What\ is\ this?)
* [How to use it](How\ to\ use\ it)
* [Note](Note)


## What is this?

A restaurants review page that load the content from a local json [file](/app/data/restaurants.json).

## How to use it

Clone the repository with:

```
$ git clone ***
```


Run in the terminal 
```
 $ gulp serve
```

a local server showing [index.html](/app/index.html) will be loaded in your browser.

__!__  If you get some error while loading the review data, please change the port in the following code portion in [dbhelper.js](/app/scripts/dbhelper.js)

```
static get DATABASE_URL() {
    const port = 9001 // Change this to your server port
    return `http://localhost:${port}/data/restaurants.json`;
  }

```

__!__  If you get some error while loading the review data, please change the port in the following code portion in [dbhelper.js](/app/scripts/dbhelper.js)

```
static get DATABASE_URL() {
    const port = 9001 // Change this to your server port
    return `http://localhost:${port}/data/restaurants.json`;
  }

```



## Note

Please look at the _task_ in [gulpfile.js](gulpfile.js) to run other action.
