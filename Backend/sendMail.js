
const nodemailer = require('nodemailer');
module.exports = function(targetMail, content, cb) {

    const transporter = nodemailer.createTransport({
        host: 'mail.gmx.net',
        port: 587, // oder 465 für SSL
        tls: {
          ciphers:'SSLv3',
          rejectUnauthorized: false
        },
        debug:true,
          auth: {
          user: 'ecotrack@gmx.at',
          pass: 'Ebenberger12!'
        }
      });
      
      const mailOptions = {
        from: 'ecotrack@gmx.at',
        to: targetMail,
        subject: 'Einladung zu EcoTrack',
        html: content
      };
  
      // E-Mail senden
  
      transporter.sendMail(mailOptions, cb
      );
    }