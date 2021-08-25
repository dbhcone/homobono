//import Mailer
import nodemailer from 'nodemailer';
import config from 'config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: config.get('MAILER_EMAIL'),
    pass: config.get('MAILER_PWD'),
  },
});

//Account Activation Notification
const accountActivationEmail = async (
  username: string,
  temp_token: string,
  email: string,
  pin: string
) => {
  const mailOptions = {
    from: `HB Events<${config.get('MAILER_EMAIL')}>`,
    to: `${email}`,
    subject: 'Account Activation',
    html: `<body> 
               <header> <h1>HB EVENTS</h1> </header> 
               <br> 
               <section> 
                    <p>Welcome <b>"${username}"</b>. Thank you for choosing <b>"HB EVENTS & USHERING SERVICES"</b>. Please click the link below to activate your account</p> 
                    <br> 
                    <a href="/activate-account/token=${temp_token}" target="_blank">ACTIVATE ACCOUNT</a>
                    <br> 
                    <p>You will be required to enter your PIN: <strong>${pin}</strong>
               </section> 
            </body>`,
  };

  try {
    const resp = await transporter.sendMail(mailOptions);
    return {
      message: 'Email sent: ' + resp.response,
      status: 'ok',
      code: '200',
    };
  } catch (error: any) {
    return { message: error.message, status: 'error', code: error.name };
  }
  // const response = await transporter.sendMail(
  //   mailOptions
  // (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
  //   if (error) {
  //     console.log(error);
  //     return {message: error.message, status: "error", code: error.name}
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //     return {message: 'Email sent: ' + info.response, status: "ok", code: '200'}
  //   }
  // }
  // );
};

//Password Reset Request Notification
const passwordResetRequestEmail = async (
  username: string,
  temp_token: string,
  email: string,
  temp_pin: number
) => {
  const mailOptions = {
    from: `HB Events<${config.get('MAILER_EMAIL')}>`,
    to: `${email}`,
    subject: 'Password Reset',
    html: `<body> 
                 <header> <h1>HB EVENTS</h1> </header> 
                 <br> 
                 <section> 
                      <p>Hello <b>"${username}"</b>. We received a password reset request from you. Kindly click on the button below to reset your password</p> 
                      <p>Ignore this message if you did not make any request.</p>
                      <br> 
                      <h2><p>PIN: <b style="color:Green;">${temp_pin}</b></p></h2> 
                      <br> 
                      <a href="/resetpassword/token=${temp_token}" target="_blank"> RESET PASSWORD
                      </a>
                      <br> 
                 </section> 
              </body>`,
  };

  transporter.sendMail(
    mailOptions,
    (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );
};

//Generate random digit Code
const generatPin = (digit: number) => {
  return Math.random().toFixed(digit).split('.')[1];
};

const generateToken = (objects: any, timeframe: any) =>
  jwt.sign(objects, 'secret', { expiresIn: timeframe });

//Function to verify token
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];

    // req.token = bearerToken.split('"')[0];
    next();
  } else {
    res.sendStatus(403);
  }
}
export { accountActivationEmail, passwordResetRequestEmail, generatPin };
