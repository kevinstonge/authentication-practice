const db = require('../../data/dbConfig.js');

const findByUserName = async (username) => {
    try {
        return await db('users').where({ username })
    } catch (error) {
        throw error;
    }
}

module.exports = { findByUserName }