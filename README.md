# NoeJS API Project

- Install the module babel

```
{
  "name": "",
  "version": "0.0.1",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1"
  },
  "scripts": {
    "start": "babel-node app.js"
  }
}
```

- And Setup the .babelrc in the same directory with package.json

```
{
  "presets": ["es2015", "stage-0"]
}
```

- Then run

```
npm start
```



## Connect to MongoDB in Middleware (Current is local test)



```config.json
{
  "port": 3000,
  "bodyLimit": "100kb",
  "corsHeaders": ["Link"],
  "database": {
    "url": "mongodb://localhost:27017/",
    "DB": "UserAuth",
    "collection": "UserData"
  }
}
```



# 





