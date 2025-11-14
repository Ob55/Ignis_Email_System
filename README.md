# Ignis Automated Email System

The Ignis Email System is a Node.js automated email scheduler that sends weekly reminder emails to the Ignis team every Friday at 2:00 PM.  
It uses Nodemailer, node-cron, and MongoDB to automate reminders and store logs of all sent emails.

## Features

- Automatic weekly email reminders (Friday 2 PM)
- Nodemailer for sending emails
- MongoDB logging for all sent emails
- Email list stored in JSON config
- Environment variables support (.env)
- Easy deployment on Render or Railway

## Project Structure

ignis-email-system/
│── app.js
│── package.json
│── config/
│ └── emails.json
│── models/
│ └── EmailLog.js
│── .env
│── README.md

markdown
Copy code

## Installation

1. Clone the repository:

git clone https://github.com/your-repo/ignis-email-system.git
cd ignis-email-system

markdown
Copy code

2. Install dependencies:

npm install

markdown
Copy code

3. Create a `.env` file:

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your-app-password
MONGO_URI=your-mongodb-url

bash
Copy code

## Email Configuration

Edit `config/emails.json`:

{
"sender_email": "brian55mwangi@gmail.com",
"team_emails": [
"dnderitu@ignis-innovation.com",
"eooro@ignis-innovation.com",
"lronoh@ignis-innovation.com",
"posogo@ignis-innovation.com",
"skamaara@ignis-innovation.com",
"wmungai@bayesconsultants.com",
"bmwangi@ignis-innovation.com",
"dagisha@ignis-innovation.com"
],
"message": "Hey team! Hope you’re having a great week. Just a friendly reminder to send in your weekly report before 5pm today. Have a lovely weekend! Thanks!"
}

shell
Copy code

## Running the System

npm start

arduino
Copy code

Console output:

Ignis MERN Emailing System is running...
Cron job scheduled for Fridays at 2:00 PM

csharp
Copy code

## MongoDB Logging

Each sent email is saved in MongoDB:

{
"email": "user@ignis-innovation.com",
"status": "Sent",
"date": "Timestamp"
}

markdown
Copy code

## Deployment (Render)

1. Push project to GitHub
2. Go to Render → Web Service
3. Build command: npm install
4. Start command: node app.js
5. Add .env variables
6. Deploy

## Author

Brian Mwangi Maina  
Software Engineer – Ignis Innovation# Ignis_Email_System
