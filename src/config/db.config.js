module.exports = {
    HOST: process.env.DB_HOST || 'your-railway-host',
    USER: process.env.DB_USER || 'your-username',
    PASSWORD: process.env.DB_PASSWORD || 'your-password',
    DATABASE: process.env.DB_NAME || 'your-database',
    PORT: process.env.DB_PORT || 3306
};