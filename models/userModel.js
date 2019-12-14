const db = require('../database/dbConfig.js')


const find = () => {
    return db('users').select('*');
}

const findUser = (user) => {
    return db('users')
        .select('*')
        .where('username', user);
}

const addUser = (user) => {
    return db('users').insert(user);
}



module.exports = {
    find,
    findUser,
    addUser
}