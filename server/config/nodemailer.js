import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   host: 'smtp-relay.brevo.com',
   port: 587,
   auth: {
       user: '890604002@smtp-brevo.com',
       pass: 'c0BrsDFz1YWnmVOT'
   }
});
export default transporter;