# BlazeChat (https://blaze.chat)

#### Installation Prerequisites:

* Node.js
* VSCode
* Git client

#### Build instructions:

* Clone the repo and open the root folder in VSCode.
* Open a command window in VSCode by pressing CTRL + \`
* Run `npm install` to download and install the code dependencies
* Run `node_modules/.bin/webpack-dev-server` to start the development server on port 8080
* Run `node_modules/.bin/webpack -p` to compile for production, making sure to first remove lines 23 - 26 (devtool and devserver configs) from *webpack.config.js*
