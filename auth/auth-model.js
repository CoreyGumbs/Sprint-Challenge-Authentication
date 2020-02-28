const db = require('../database/dbConfig');


function register(user){
    return db('users')
    .insert(user, 'id')
};

function findBy(filter){
    return db('users')
    .select('id', 'username', 'password')
    .where(filter);
}

function find(){
    return db('users')
    .select('id', 'username', 'password');
}

module.exports = {
    register,
    findBy,
    find
}