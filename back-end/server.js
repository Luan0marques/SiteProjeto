import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'


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


app.get('/me', async (req, res) => {

    const token = localStorage.getItem('token')
    const response = await api.get

    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    })

    res.json(user)
})

app.get('/register', async (req, res) => {
    
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})


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