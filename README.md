DataLabs
=======================

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Docker](#docker)

Features
--------

Sample web application for accessing MongoDB in OpenShift. The application is built on NodeJS + Express.

Prerequisites
-------------

- [MongoDB](https://www.mongodb.org/downloads)
- [Docker](https://www.docker.com/get-docker)
- [Node.js 6.0+](http://nodejs.org)

**Note:** If you are new to Node or Express, I recommend to watch
[Node.js and Express 101](https://www.youtube.com/watch?v=BN0JlMZCtNU)
screencast by Alex Ford that teaches Node and Express from scratch. Alternatively,
here is another great tutorial for complete beginners - [Getting Started With Node.js, Express, MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/AnkyrinRepeat/mongo-lab.git MongoLab

# Change directory
cd MongoLab

# Install NPM dependencies
npm install

# Then simply start your app
node app.js
```

**Note:** I highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.

Pro Tips
--------

- When installing an NPM package, add a *--save* flag, and it will be automatically
added to `package.json` as well. For example, `npm install --save moment`.
- Use [async.parallel()](https://github.com/caolan/async#parallel) when you need to run multiple
asynchronous tasks, and then render a page, but only when all tasks are completed. For example, you might
want to scrape 3 different websites for some data and render the results in a template
after all 3 websites have been scraped.
- Need to find a specific object inside an Array? Use [_.find](http://lodash.com/docs#find)
function from Lodash. For example, this is how you would retrieve a
Twitter token from database: `var token = _.find(req.user.tokens, { kind: 'twitter' });`,
where 1st parameter is an array, and a 2nd parameter is an object to search for.

Deployment
--------

-A sample OpenShift template is included as openshift_template.yaml. In order to use it you must point it towards your MongoLab image by replacing ankyrinrepeat/mongo-lab with your image repository. You will also need to replace all instances of `mongodb-lab-namespace` with your OpenShift namespace.

Docker
--------

```
# Build just the web application as a Docker Image
docker build . -t DockerHubUsername/mongo-lab
docker push DockerHubUsername/mongo-lab

# Build and launch the web app as well as Mongo-Express and Mongo
docker-compose up
```
