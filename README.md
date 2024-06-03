This project is a achieves the following features:

Create Notification: Create a new notification for subscribed users based on cryptocurrency metrics.

Send Notification: Send an email notification to the subscribed users.

List Notifications: List all notifications, categorized by status (sent, outstanding, failed).

Delete Notification: Delete a specific notification by its ID.

Installation
Clone the repository:


git clone https://github.com/arunks2/bitcoinmarket.git
cd bitcoinmarket
Install dependencies:

npm install

Configure email settings in mailservice.js:

Start the server:

npm start
The server will run on http://localhost:3000.

API Endpoints
Create a Notification
URL: /notification
Method: POST
Body:
{
  "type_of_coin": "BTC",
  "current_price": "$10",
  "market_trade_volume": "1000",
  "intra_day_high_price": "$12"
}
Response: 201 Created


Send a Notification
URL: /send-notification/:id
Method: POST
Response: 200 OK or 500 Internal Server Error

{
  "message": "Notification sent successfully"
}

List Notifications
URL: /notifications
Method: GET
Response: 200 OK


Delete a Notification
URL: /notification/:id
Method: DELETE
Response: 200 OK or 404 Not Found

{
  "message": "Notification deleted successfully"
}


Data Service
The DataService class in dataService.js abstracts all data operations, making it easy to replace with a database implementation later.

Data Service:
The functions helps in sending the mail. I took reference from (https://www.w3schools.com/nodejs/nodejs_email.asp)


TODOS: 
input validation
Testing (haven't tested)
Email sent
Error Handling

