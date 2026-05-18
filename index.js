import express from 'express';
import db from './db.js'

const app = express();
app.use(express.json());

let usuarios = [
	{ id: 0, nome: "Leticia" }
];

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
		await db.createUser(user)
		res.send("Usuário criado com sucesso!");
	} catch (e) {
		res.status(500).send(`Não foi possível adicionar usuário: ${e}`)
	}
})

app.put('/users/:id', (req, res) => {
	const nome = req.body.nome;
	const idUser = req.params.id;
	usuarios.forEach((usr) => {
		if (usr.id == idUser) {
			usr.nome = nome;
		}
	})

	res.send("Usuário atualizado com sucesso!");
})

app.delete('/users/:id', (req, res) => {
	const idUser = req.params.id;
	const usuariosAtt = usuarios.filter((usr) => usr.id != idUser);
	usuarios = usuariosAtt;

	res.send("Usuário deletado com sucesso!")
})

app.listen(3000, () => {
	console.log(`Servidor rodando em http://localhost:3000`);
});