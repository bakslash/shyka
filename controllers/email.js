const nodemailer = require("nodemailer");
exports.sendEmailToken =async (email,token)=> {

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'marcusmuasa@gmail.com',
    pass: 'Gmail@2017'
  }
});

let info = await transporter.sendMail({
    from: '"marcus 👻" <marcusmuasa@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>this is email click on link to ${token}confirm ?</b>`, // html body
  }); 

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an gmail account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


