knockout.sync.js
================

[knockout.sync.js](https://github.com/imrefazekas/knockout.sync.js) is a [knockoutjs](http://knockoutjs.com) extension allowing you to __manage centrally__ and __synchronize viewmodels__ and all its business logic between client(s) and backend(s).

![Demo](/demo.gif)

# Introduction

You want to roll out new version of viewmodel-related functions / computings / validation rules without forcing users to restart?
Clients might be using multiple devices at the same time?

[knockout.sync.js](https://github.com/imrefazekas/knockout.sync.js) is a tiny ko-extension giving real-time synchronizing feature to your project.

You modify your form/values on one device and you see the changes on the client devices on the fly transparently.

Server might release new version of computed values or functions and clients can refresh the ko bindings in the background without any programming effort. 


The [knockout.sync.js](https://github.com/imrefazekas/knockout.sync.js) supports to synchronize:
- values of the view model in JSON format
- the view model itself including 
	- static attributes
	- models
	- computed values
	- functions

Currently it uses [socket.io](http://socket.io) library to buid-up websockets as connectivity. If you need different ways, please let me know...


## Centrally managed models

The server can (but not necessarily) define and maintain centrally the complete viewmodel and surroundings (static, computed values, functions, validation rules). This gives you the possibility to 
- centrally manage the model so the data transferred between client - server - DB.
- make validation and computation on the server-side as well - maybe before droping to a DB.
Same codebase, same rules, same behavior.


# I want to try out...

To taste it, just run the _server.js_ found in library _test_ from the module's library. 

	node test/server.js

It will start the server on port _8080_. 

Open 2 browser tabs with the link: [http://localhost:8080/index.html](http://localhost:8080/index.html).

Change any field in one tab, press _'Sync!'_ button and experience the magic!

(Note: you might need to execute _'npm install'_ to have all required libraries)


# Usage

Install the module:

	npm install knockout.sync.js

Have a proper server for data sync services. See the test example server.js for a simple sample...

Load required scripts in the _<head>_ (can be Grunt-ed easily from the dist folder of the module):
	
	<script src="js/socket.io.min.js"></script>
	<script src="js/funcsync.min.js"></script>
	<script src="js/knockout-latest.js"></script>
	<script src="js/knockout.mapper.min.js"></script>
	<script src="js/knockout.sync.min.js"></script>


Add a _<script>_ at the end of the _<body>_ tag to prepare client for viewmodel receiving:

	<script>
		ko.keepInSync({
			versioned: true, URI:'http://localhost:8080/ko', modelMessage:'updateModel', dataMessage:'updateData', shareMessage:'share'
		});
	</script>


Define a control for updates sending (if needed):

	<button onclick="ko.doSync()">Sync!</button>


And that's it! :)


# Timestamping

Timestamped sync is an option you might find important: keeping sync in control by adding timestamp to changes by the backend preventing clients to react to outdated data.

Only the changes with newer version will be taken into account.
