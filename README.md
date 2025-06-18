# FLIGHT SYSTEM
Flight System backend for flight search and booking.
Technologies used are node js and mySQL
Installation
Edit the .env file with the mySQL details
Install dependencies using 'npm install'
Run 'npm run seed' to create the desired tables and insert data(Flight_Data.json provided in the task) in the database
Start the project with 'npm run start'

Description
Searches for available flights based on origin, destination, and departure date using api/flights/search API.
User can login and register using api/auth/login and api/auth/register API's accordingly
Only the logged in user can book flight and review personal bookings using api/bookings and api/bookings/my API's.

The Frontend for this application is not designed so please follow along this Postman collection where i have setup variables to handle the authTokens and API baseUrl.s
