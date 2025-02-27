import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "lamphong498@gmail.com",
        pass: "naghjzewmbwvanss",
    },
});

async function sendMail(email) {
    const info = await transporter.sendMail({
        from: '"Anh Phong Pro 👻" <lamphong498@gmail.com>',
        to: email, 
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: "<b>Hello world?</b>", 
    });

    console.log("Message sent: %s", info.messageId);
}

export default sendMail;

