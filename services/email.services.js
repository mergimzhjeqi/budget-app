const nodemailer = require('nodemailer')

const EMAIL_HOST = 'smtp.mailtrap.io'
const EMAIL_PORT = '2525'
const EMAIL = 'ed9c25515e317c'
const PASSWORD = 'e31e9a8f11f1ab'

const transporter = nodemailer.createTransport({
    host:EMAIL_HOST,
    port:EMAIL_PORT,
    auth: {
        user:EMAIL,
        pass:PASSWORD
    },
})

const forgotPasswordTemplate = (token) => {
    const url =`http://localhost:3000/reset-password?token=${token}`

    return{
        subject:'Budget App',
        text:'To change your password click on the link bleow. If you didn\'t do this request please ignore this email!',
        html:`
            <h1>Budget-App Change Password Request</h1>
            <p>To change your password click on the link below, If you didn\'t do this request please ignore this email!</p>
            <a href='${url}'>Change Password</a>
        `
    }

}

module.exports = {
    sendForgotPAsswordEmail: async(email, token) => {
        const body = forgotPasswordTemplate(token)
        transporter.sendMail({
            from:'Budget App <support@budget-app.com',
            to: email,
            subject: body.subject,
            text: body.text,
            html: body.html
        })
    }
}
