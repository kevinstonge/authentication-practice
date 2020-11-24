const db = require('../../data/dbConfig.js');

const createUser = async (userObject) => {
    try { return await db('users').insert(userObject) }
    catch (error) { throw error; }
}

const getUserByUsername = async (username) => {
    try { return await db('users').where({ username }); }
    catch (error) { throw error; }
}

//just for testing purposes:
const getUsers = async () => {
    try { return await db('users') }
    catch (error) { throw error }
}

module.exports = { createUser, getUserByUsername, getUsers }