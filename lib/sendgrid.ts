import sgMail from '@sendgrid/mail'
import * as dotenv from 'dotenv'
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_APIKEY)

// Sending the code for auth/login
export async function sendCodeByEmail(email: string, code: number) {
    const msg = {
        to: email,
        from: 'birthdayreminder.web@gmail.com',
        subject: 'Código de validación',
        html: `<div style={display: "flex", align-items: "center", justify-items: "center", padding: 20px}>
            <img width="200px" height="200px" src="https://res.cloudinary.com/deooec1tp/image/upload/v1685025629/Birthday%20Reminder/birthdayreminder_slub4j.png" alt="logo"/>
            <h1>${code}</h1>
            <p>Con este código podés loguearte. Recordá que el mismo es válido durante 10 minutos</p>
        </div>
        `,
    }
    await sgMail.send(msg)
    return true
}
