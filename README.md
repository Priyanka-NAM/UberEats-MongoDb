# UberEatsMongoDb

## Prototype of UberEats application

* This Prototype of UberEats application is build using ReactJS,Redux for the frontend,NodeJS,Kafka for backend and MongoDb as the database.The application is tested using Mocha and Chai for backend API's,JMeter for load testing and Enzyme for frontend.

### Prerequisites
*  Install Node Js,Kafka,ZooKeeper

### Steps to deploy the UberEats application


 
 Clone the UberEats repository's into your machine.

#### BackEnd and Kafka-Backend

1. Open the terminal in the folder "kafka-backend" and another terminal in the "backend" folder.
2. Execute "npm install" to install all the dependencies.
3. Create a MongoDb cluster in MongoDb cloud Atlas.
4. Update the .env file in backend folder with database name and connection details.
5. Update the app.js file in backend folder with frontend server's IP address and port.
6. Execute "node server.js" to start the UberEats backend server as well as the Kafka-backend.

#### FrontEnd

1. Open the terminal in the folder "frontend".
2. Execute "npm install" to install all the dependencies.
3. Update the backEndConfig.js file in frontend-src folder with the backend server's IP address and port.
4. Execute "npm start" to start the UberEats frontend server.

#### Launch the application

1. Open the browser and navigate to Front end server's IP address with Port number. UberEats landing page should be displayed.
