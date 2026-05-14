import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const URI = process.env.MONGO_DB;
const client = new MongoClient(URI);

const conectar = async () => {
    if (global.conexaoMongo && global.conexaoMongo.state !== "disconnected") {
        return global.conexaoMongo;
    } else {
        try {
            const db = await client.connect();
            global.conexaoMongo = db;
            return db;
        
        } catch (error){
            console.error(error);
        }
    }
}

const getGame = async (id=undefined) => {
    try {
        const conexao = await conectar();
        let resultado = [];
    
        if (!id){
            resultado = await conexao.db('Biblioteca').collection('Jogos').find({}).toArray();
        } else {
            resultado = await conexao.db('Biblioteca').collection('Jogos').findOne({_id: new ObjectId(id)});
        }
    
        await conexao.close();
        return resultado;
    
    } catch (e) {
        console.error(e);
    }
};

const createGame = async (game) => {
    try {
        const conexao = await conectar();
        await conexao.db('Biblioteca').collection('Jogos').insertOne(game);
        await conexao.close();
        return `Jogo ${game.nome} adicionado ao MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const attGame = async (game, id) => {
    try {
        const conexao = await conectar();
        await conexao.db('Biblioteca').collection('Jogos').replaceOne({_id: new ObjectId(id)}, game);
        await conexao.close();
        return `Jogo ${game.nome} atualizado no MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const deleteGame = async (id) => {
    try {
        const conexao = await conectar();
        await conexao.db('Biblioteca').collection('Jogos').deleteOne({_id: new ObjectId(id)});
        await conexao.close();
        return `Jogo ${id} deletado do MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}
console.log(await getGame());
const db = {getGame, createGame, attGame, deleteGame};
export default db;

