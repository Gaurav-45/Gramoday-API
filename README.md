GRAMODAY-API

To run the projects on a local server make sure you have MongoDB, nodeJS, Postman(App) and Robo 3T(Optional App) installed on your machine.

Steps:

1. Download and unzip the project into the local directory.
2. CD to the project directory, open the terminal, and run command 'npm i' it will install all the dependencies for the project.
3. Once all the dependencies are installed, run the command 'mongod' to start MongoDB server.
4. Open new tab/window of cmd/hyper terminal and run 'mongo' to use database.
5. After starting the MongoDB server, start the nodeJS server by using 'nodemon app.js' command.
6. Now open the Postman app and do the following:
   (i) Create a new tab and type 'localhost:3000' in the URL section.
   (ii) After that select the 'Body" tab and set the type as 'raw'.
   (iii) Make sure the data format is in 'JSON'.
7. Now to make a post request to the server, select the request type as 'POST' and change the URL to 'localhost:3000/reports' and enter the data in object format without declaring any variable and then click on Send.
   For eg.
   {
   "userID": "User-1",
   "marketID": "market-1",
   "marketName": "Vashi Navi Mumbai",
   "cmdtyID": "cmdty-1",
   "cmdtyName": "Onion",
   "priceUnit": "Pack",
   "convFctr": 50,
   "price": 700
   }
8. If the POST request is successful you will receive the object where staus is "successful" and the reportID of the aggregated report, otherwise the error due to which request failed.

9. To make a GET request, select type as 'GET' and change URL to
   'localhost:3000/reports?reportID=YOUR_REPORT_ID', if the request is successful you will get an aggregated report for the particular marketID-cmdtyID with all the data.

10. To check the document you can use Robo 3T app or use terminal
    To check all users reports using terminal follow steps(in 'mongo' tab):
    (i) Run 'use gramod-api'
    (ii)'db.userreports.find()' to check all the user reports submitted by users
    (iii)'db.aggreport.find()' to check all the aggregated reports present in the database.
