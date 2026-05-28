const getUser = async (conexao, id=undefined) => {
    try {
        let resultado;
    
        if (!id){
            resultado = await conexao.db('Usuarios').collection('Usuario').find({}).toArray();
        } else {
            resultado = await conexao.db('Usuarios').collection('Usuario').findOne({_id: new ObjectId(id)});
        }
    
        return resultado;
    
    } catch (e) {
        console.error(e);
    }
};

const createUser = async (conexao, user) => {
    try {
        await conexao.db('Usuarios').collection('Usuario').insertOne(user);
        return `Usuário ${user.nome} adicionado ao MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const attUser = async (conexao, user, id) => {
    try {
        await conexao.db('Usuarios').collection('Usuario').replaceOne({_id: new ObjectId(id)}, user);
        return `Usuário ${user.nome} atualizado no MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const deleteUser = async (conexao, id) => {
    try {
        await conexao.db('Usuarios').collection('Usuario').deleteOne({_id: new ObjectId(id)});
        return `Usuário ${id} deletado do MongoDB!`;

    } catch (e) {
        console.error(e);
    }
}

const db = {getUser, createUser, attUser, deleteUser};
export default db;