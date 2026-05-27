import express from 'express';
import db from './db.js'

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
	try {
		let resposta = await db.getUser();

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
		let resposta = await db.getUser(id);

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
		const resultado = await db.createUser(user)
		res.send(resultado);
	} catch (e) {
		res.status(500).send(`Não foi possível adicionar usuário: ${e}`)
	}
})

app.put('/users/:id', async (req, res) => {
	try {
		const user = req.body.user;
		const idUser = req.params.id;
		
		const resultado = await db.attUser(user, idUser);
		res.send(resultado);
	} catch (e) {
		res.status(500).send(`Não foi possível atualizar usuário: ${e}`)
	}
})

app.delete('/users/:id', async (req, res) => {
	try {
		const idUser = req.params.id;
		const resultado = await db.deleteUser(idUser);
	
		res.send(resultado);
	} catch (e) {
		res.status(500).send(`Não foi possível deletar usuário: ${e}`)
	}
})

const server = app.listen(3000, () => {
	console.log(`Servidor rodando em http://localhost:3000`);
});