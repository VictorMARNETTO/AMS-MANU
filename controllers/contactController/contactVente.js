nodemailer = require('nodemailer');
const mailSender = 'marnetto.cloud@gmail.com';
const mailReceiver = 'vic.marnetto@gmail.com';
const mailPassword = require('../../config/passMail').MAILPASSWORD;


module.exports = (req, res) => { 

    const output = `
    <h1>Contact:${req.body.name} ${req.body.surname}</h1>
    <h3>Détails:</h3>
    <ul>
        <li>Nom: ${req.body.name}</li>
        <li>Prénom: ${req.body.surname}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Véhicule:</h3>
    <ul>
        <li>Marque: ${req.body.mark}</li>
        <li>Modèle: ${req.body.model}</li>
        <li>Année: ${req.body.year}</li>
        <li>Energie: ${req.body.energy}</li>
        <li>Kilomètre: ${req.body.kilometers} Km</li>
        <li>Boite de vitesse: ${req.body.gearbox}</li>
        <li>Couleur: ${req.body.color}</li>
    </ul>
    <h3>Message: </h3>
    <p>${req.body.message}</p>
    <h3>RDV Souhaité:</h3>
    <p> ${req.body.date} à ${req.body.time}  
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: `${mailSender}`, // generated ethereal user
            pass: mailPassword, // generated ethereal password

        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        // marnetto.cloud@gmail.com
        from: `"AMS Contact" <${mailSender}>`, // sender address
        // vic.marnetto@gmail.com
        to: `${mailReceiver}`, // list of receivers
        subject: `Demande de devis OCCASION - AMS-MANU`, // Subject line
        text: `Contact AMS`, // plain text body
        html: output, // html body
        // attachments: [{
        //     fileName: "image.jpg",
        //     streamSource: req.files.image
        // }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);

        }
        console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.redirect('/message-sent');
    })
}
