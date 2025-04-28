import nodemailer from 'nodemailer';
import 'dotenv/config';
import { getEnvVar } from '../utils/getEnvVar.js';

const user = getEnvVar('UKR_NET_EMAIL');
const password = getEnvVar('UKR_NET_PASSWORD');

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user,
    password,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (data) => {
  const email = { ...data, from: user };
  return transport.sendMail(email);
};
