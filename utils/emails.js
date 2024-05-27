require('dotenv').config();
const password=process.env.USER_PASS;
const emailId=process.env.EMAL_ID
const nodemailer = require('nodemailer');

const sendEmail = async (email, subjectSend,username, userpass) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: emailId,
        pass: password,
      },
    });

    await transporter.sendMail({
      from: emailId,
      to: email,
      subject: subjectSend,
      text: `Hey! Congratulations on your new job. We're excited to have you on board! 

    In this email, you'll find your login credentials:

    - Employee Username: ${username}
    - Employee email: ${email}
    - Password: ${userpass}

    Welcome aboard!

    Best regards,
    The Lekater Team`,
    html: `Hey! <span style="color: #336699; font-weight: bold;">Congratulations on your new job</span>. We're excited to have you on board! 
    <p style="color: red; font-weight: bold;">Warning: Do not share these login credentials with others. This information is confidential.</p>

    <p>In this email, you'll find your login credentials:</p>

    <ul>
      <li><span style="color: #336699;">Employee username:</span> <strong>${username}</strong></li>
      <li><span style="color: #336699;">Employee email:</span> <strong>${email}</strong></li>
      <li><span style="color: #336699;">Password:</span> <strong> ${userpass} </strong></li>
    </ul>
    <p>Welcome aboard!</p>

    <p><span style="color: #336699; font-style: italic;">Best regards,</span></p>
    <p><span style="color: #336699; font-weight: bold;">The Image Team</span></p>`,
    });
  } catch (error) {
    throw error
  }
};

module.exports = sendEmail;