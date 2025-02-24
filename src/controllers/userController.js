const pool = require('../models/db');
const crypto = require('crypto');

exports.createUser = async (req, res) => {
    const { name, email, password, roles } = req.body;
    const id = crypto.randomUUID();
    try {
        const [result] = await pool.execute(
            'INSERT INTO users (id, name, email, password, roles) VALUES (UNHEX(?), ?, ?, ?, ?)',
            [id.replace(/-/g, ''), name, email, password, roles]
        );
        res.status(201).json({ message: 'Usuario creado', userId: id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    try {
        const [result] = await pool.execute(
            'UPDATE users SET name = ?, email = ?, password = ?, roles = ?, updated_at = NOW() WHERE id = UNHEX(?)',
            [name, email, password, roles, id.replace(/-/g, '')]
        );
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM users WHERE id = UNHEX(?)', [id.replace(/-/g, '')]);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT HEX(id) AS id, name, email, roles, created_at, updated_at FROM users');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};