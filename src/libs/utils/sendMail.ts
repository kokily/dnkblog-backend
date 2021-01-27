import nodemailer from 'nodemailer';
import { devServer, isProd, prodServer } from '../constants';

interface MailProps {
  email: string;
  username: string;
}

async function sendMail({ email, username }: MailProps): Promise<string | null> {
  const key = Math.random().toString(36).substr(2, 11);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const server = isProd ? prodServer : devServer;
  const options = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'D&K Dreams Blog - Email 등록 안내',
    html: `
      <h2>
        <a href="${server}/verify-email?email=${email}&key=${key}">이 링크</a>
        를 클릭하시면 Email 등록이 완료되었습니다.
      </h2>
      <p>
        아이디: ${username} 님<br />
        이메일: ${email}
      </p>
    `,
  };

  try {
    await transporter.sendMail(options);
    console.log('Email Sent!');

    return key;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export default sendMail;
