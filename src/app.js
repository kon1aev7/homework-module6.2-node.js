// import formData from 'form-data';
// import Mailgun from 'mailgun.js';
// import 'dotenv/config';

// const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

// const mailgun = new Mailgun(formData);

// const mg = mailgun.client({
//   username: 'api',
//   key: MAILGUN_API_KEY,
// });

// const data = {
//   from: 'Dmytro Koniaiev <konyaevd1995@gmail.com>',
//   to: ['sicab32555@cyluna.com'],
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomness!',
//   html: '<h1>Testing some Mailgun awesomness!</h1>',
// };

// export const sendEmail = (data) => {
//   const ={...data}
// };

// mg.messages
//   .create(MAILGUN_DOMAIN, email)
//   .then((msg) => console.log(msg)) // logs response data
//   .catch((err) => console.error(err)); // logs any error

import nodemailer from 'nodemailer';
import 'dotenv/config';

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: UKR_NET_EMAIL,
  to: 'sicab32555@cyluna.com',
  subject: 'Hello',
  html: '<h1>Hello!</h1>',
};

export const sendEmail = (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};
