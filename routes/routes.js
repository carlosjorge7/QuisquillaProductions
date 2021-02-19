const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index.html', { title : 'QUISQUILLA PRODUCTIONS'});
});

router.get('/contact', (req, res) => {
    res.render('contact.html', { title : 'Contact'});
});

router.get('/about', (req, res) => {
    res.render('about.html', { title : 'About'});
});

router.post('/send-email', async (req, res) => {
    const { email, message } = req.body;
    
    contentHTML = `
        <h1>User information</h1>
        <ul>
            <li>Email: ${email}</li>
        </ul>
        <p>Menssage: ${message}</p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    });

    const info = await transporter.sendMail({
        from: " 'Tecnofun Digital S.L' <tcdmnroot@gmail.com> ",
        // to: 'carlosjorgech7@gmail.com',
        to: 'quisquillaproduction@gmail.com',
        subject: 'Probando NodeMailer',
        // text: ' Hello World'
        html: contentHTML

    });

    console.log("Message has been send", info.messageId);
    res.redirect('/success.html');
});

module.exports = router;
