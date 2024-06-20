import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        // port: 465,
        port: 587,
        secure: config.NODE_ENV === 'production',
        auth: {
            user: 'saikotroy6@gmail.com',
            pass: 'pvbz dlmn bjkw grhn'
        }
    })

    await transporter.sendMail({
        from: 'saikotroydev@gmail.com',
        to,
        subject: 'Change Password',
        text: '',
        html
    })

}