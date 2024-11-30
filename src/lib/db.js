import mysql from 'mysql2/promise';

const dbConfig = {
    host: '10.96.210.203',
    port: 3306,
    user: 'fall2024c56g8',
    password: 'unemployment',
    database: 'fall2024c56g8'
};

export async function executeQuery(query, values = []) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [results] = await connection.execute(query, values);
        await connection.end();
        return results;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}