// const Mailgen = require("mailgen");

const path = require("path");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config({ path: path.join(__dirname, "../.env") });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (verifyToken, email) => {
  const msg = {
    to: email, // Change to your recipient
    from: "pusiko.puso@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "Welcome to System Contacts! We're very excited to have you on board.",
    html: `<strong>Welcome to System Contacts! We're very excited to have you on board.</strong><br><p>To get started with System Contacts, please click here:</p><br><a href='http://localhost:3000/api/users/verify/${verifyToken}'>Confirm your account</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendEmail,
};
