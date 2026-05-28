import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import 'dotenv/config';
import db from './db.js';

const URI = process.env.MONGO_DB;
const client = new MongoClient(URI);
let conexao;

try {
	conexao = await client.connect();
} catch (e) {
	console.error(error);
	console.log('Impossível conectar ao MongoDB. Fechando o servidor...');
    process.exit(0);
}

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
	try {
		let resposta = await db.getUser(conexao);

		if (!resposta[0]) {
			res.send('Nenhum usuário encontrado!');
		} else {
			res.send(resposta);
		}
	} catch (e) {
		res.status(500).send(`Não foi possível buscar os usuários: ${e}`)
	}
})

app.get('/users/:id', async (req, res) => {
	try {
		let id = req.params.id;
		let resposta = await db.getUser(conexao, id);

		if (!resposta){
			res.send("Usuário não encontrado");
		} else {
			res.send(resposta);
		}
		
	} catch (e) {
		res.status(500).send(`Não foi possível buscar os usuários: ${e}`)
	}
})

app.post('/users', async (req, res) => {
	try {
		const user = req.body.user;
		const resultado = await db.createUser(conexao, user)
		res.send(resultado);
	} catch (e) {
		res.status(500).send(`Não foi possível adicionar usuário: ${e}`)
	}
})

app.put('/users/:id', async (req, res) => {
	try {
		const user = req.body.user;
		const idUser = req.params.id;
		
		const resultado = await db.attUser(conexao, user, idUser);
		res.send(resultado);
	} catch (e) {
		res.status(500).send(`Não foi possível atualizar usuário: ${e}`)
	}
})

app.delete('/users/:id', async (req, res) => {
	try {
		const idUser = req.params.id;
		const resultado = await db.deleteUser(conexao, idUser);
	
		res.send(resultado);
	} catch (e) {
		res.status(500).send(`Não foi possível deletar usuário: ${e}`)
	}
})

const server = app.listen(3000, async () => {
	console.log(`Servidor rodando em http://localhost:3000`);
});

process.on('SIGINT', () => {
  server.close(async (err) => {
    if (err) {
      console.error('Erro ao fechar o servidor:', err);
      process.exit(1);
    }
    
    await conexao.close();
    console.log('Servidor fechado com sucesso.');
    
    process.exit(0);
  });
});