# BlazeChat (https://blaze.chat)

#### Prerequisites:

* Node.js
* VSCode
* Git client

#### Client build instructions:

* Clone the repo and open the project folder in VSCode.
* Open a command window in VSCode by pressing CTRL + \`
* Run `npm install` to download and install the code dependencies
* Type type `npm run build` to (re)compile the client (React)

#### Server build instructions:

*The server does not require compilation - the below steps simply start an Express development server.*

* Open an additional command window by clicking the + to the top-right corner of the command window
* Type `cd server` to switch to the server sub-directory
* Type `npm install` to download and install the dependencies for the server environment
* Type `npm run serve` to start the dev server at http://localhost:3000. The server will watch for changes to server code and redraw the DOM automatically.

**You will need to return to the other command window and re-run the `npm run build` command to see changes to the client code.** There's no need to restart the server for that.

#### Production build instructions:

* Use `npm run build-prod` to build for production
* Perform a pull request to the `prod` branch

Eventually the server will pull from the prod branch automatically, for now copy the /server/ folder up to blazebox via SFTP
