* start server command: 

	bin/devserver

* start redis command: 

	redis-server

* start mongodb command:

	mongod

* start mongod console:

	mongo

* create a mongo collection:

	db.createCollection('collection name')

* show all mongodb collections:

	db.getCollectionNames()

* to start in production mode:

	NODE_ENV=production node app.js





NOTES TO SELF ----

* when pushing to production, you will have to specify the following:

	a mongodb url on prod
	a redis db url on prod
	twitter oauth key/secret for prod