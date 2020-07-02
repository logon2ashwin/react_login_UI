## Login App Services ##

### Prerequisite ###
Node Version - v13 or above

### Setup Project ###

Run `npm install` or `yarn install` both in server folder and root folder

After that, choose the environment you want to run 

```
"export ENVIRONMENT=dev" for mac, linux

"SET ENVIRONMENT=dev" for windows
```

Configure Mongo db port if you have different configuration other than default in your machine.

File path `./server/config/dev.js`

Default config will be
```
'host': '127.0.0.1',
'port': 27017
```


Use `npm run startnode` script from app root directory to start node server.

Use `npm run startApp` script from app root directory to start React application in webpack dev server.


