import sgMail from '@sendgrid/mail';
import dotenv from './dotenv.js'

//SenGrid key
sgMail.setApiKey(process.env.API_KEY);

//Object that contains all data of the email message
const msg = {
    to: '',
    from: process.env.FROM,
    subject: process.env.SUBJECT,
    text: process.env.TEXT,
}

//Function used to send an email to a new user
export async function sendEmail(email) {
    const message = msg;
    message.to = email;
    await sgMail.send(message);

}

