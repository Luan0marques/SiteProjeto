import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { sendRecoveryCode } from './services/mailService.js';


const prisma = new PrismaClient()
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

//USUARIO SE CADASTRA PARA PODER ACESAR
app.post('/register', async (req, res) => {

    const criptoPass = await bcrypt.hash(
        req.body.password,
        10
    )

    await prisma.user.create({
        data : {
            email: req.body.email,
            name: req.body.name,
            password: criptoPass
        }
    })


    res.status(201).json(req.body)
})

//CHECAR DADOS DO USUARIO PARA EFETUAR LOGIN

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json({
            message: 'Usuário não encontrado'
        });
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return res.status(401).json({
            message: 'Senha inválida'
        });
    }

   

    const token = jwt.sign(
  {
    userId: user.id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '7d'
  }
)

res.json({
  token
})

    res.status(200).json({
        message: 'Login realizado com sucesso', 
        token
    });
});


app.get('/register', async (req, res) => {
    
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

/*-- Recupera senha --*/

app.post('/recover-password', async (req, res) => {

    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json({
            message: 'Usuário não encontrado'
        });
    }

    const code = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const expiration = new Date(
        Date.now() + 5 * 60 * 1000
    );

    await prisma.user.update({
        where: {
            email
        },
        data: {
            recoveryCode: code,
            recoveryExpires: expiration
        }
    });

    await sendRecoveryCode(email, code);

    res.status(200).json({
        message: 'Código enviado'
    });
});

/*-- FIM Recupera senha --*/

/*-- verificar codigo --*/
app.post('/verify-code', async (req, res) => {

    const { email, code } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json({
            message: 'Usuário não encontrado'
        });
    }

    if (!user.recoveryCode) {
        return res.status(400).json({
            message: 'Nenhum código solicitado'
        });
    }

    if (user.recoveryCode !== code) {
        return res.status(400).json({
            message: 'Código inválido'
        });
    }

    if (new Date() > user.recoveryExpires) {
        return res.status(400).json({
            message: 'Código expirado'
        });
    }

    res.status(200).json({
        message: 'Código validado'
    });

});

/*-- Fim verificar codigo --*/


/*-- Resetar senha --*/
app.post('/reset-password', async (req, res) => {

    const {
        email,
        newPassword
    } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(404).json({
            message: 'Usuário não encontrado'
        });
    }

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );

    await prisma.user.update({
        where: {
            email
        },
        data: {
            password: hashedPassword,

            recoveryCode: null,
            recoveryExpires: null
        }
    });

    res.status(200).json({
        message: 'Senha alterada'
    });
});

/*-- FIM Resetar senha --*/


app.listen(PORT, () => {
    console.log(`Server runing in http://localhost:${PORT}`)
})

/*
GET -> LISTAR DADOS
POST -> CRIAR
PUT -> EDITAR VARIOS
PATCH -> EDITAR UM
DELETE -> DELETAR

mongodb://localhost:27017/

xdQdAe7S0VktNJct

*/