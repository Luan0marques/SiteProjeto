import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


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

    res.status(200).json({
        message: 'Login realizado com sucesso'
    });
});

app.get('/register', async (req, res) => {
    
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.put('/register/:id', async (req, res) => {
    
    await prisma.user.update({
        where:{
            id: req.params.id
        },  
        data : {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        }
    })


    res.status(201).json(req.body)
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