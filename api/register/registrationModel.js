const db = require('../../data/dbConfig.js');

const createUser = async (userObject) => {
    try { return await db('users').insert(userObject) }
    catch (error) { throw error }
}

const getUsers = async () => {
    try { return await db('users') }
    catch (error) { throw error }
}

module.exports = { createUser, getUsers }