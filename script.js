import express from 'express';
import db from './db.js'

const app = express();
app.use(express.json());

let usuarios = [
  	{ id: 0, nome: "Marlon"}
];

// app.get('/hello/:nome', (req, res) => {
//     const nome = req.params.nome
//     if (nome == 'xablau'){
//       res.status(401).json({
//         error: 'Não Autorizado!'
//       })
//     } else {
//       res.send(`Hello ${nome}!`);
//     }
// });

app.get('/users', async (req, res) => {
  let resposta = await db.getUser();

  if (!resposta[0]){
		res.send('Nenhum usuário encontrado!');
	} else {
		res.send(resposta);
	}
})

app.get('/users/:id', async(req, res) => {
	const idUser = req.params.id;
  const usuario = await db.getUser(idUser);

	if (!usuario) {
		res.send('Usuário não encontrado!');
	} else {
		res.send(usuario);
	}
})

app.post('/users', (req, res) => {
	const nome = req.body.nome;
	const idUser = usuarios.length;

	usuarios.push({id: idUser, nome});
	res.send("Usuário criado com sucesso!");
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