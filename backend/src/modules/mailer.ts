import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.host,
    port: parseInt(process.env.port as string),
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
});

export default transport;