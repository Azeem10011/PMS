const nodemailer = require("nodemailer");

exports.sendOtp = async function ({ templateData, to, subject }) {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: process.env.FROM_EMAIL,
      to: to,
      subject: subject,
      html: `<p>${templateData}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
