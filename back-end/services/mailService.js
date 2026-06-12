import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendRecoveryCode(email, code) {

    try {

        console.log('Verificando SMTP...');

        await transporter.verify();

        console.log('SMTP OK');

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recuperação de Senha - FocusTask',
            html: `
                <h2>Recuperação de Senha</h2>
                <h1>${code}</h1>
            `
        });

        console.log('Email enviado:', info.messageId);

    } catch (error) {

        console.error('ERRO NODEMAILER:');
        console.error(error);

        throw error;
    }
}