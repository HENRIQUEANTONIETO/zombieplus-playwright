import { Pool, PoolConfig } from 'pg'

const DbConfig: PoolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
}

export async function executeSQL(sqlScript: string) {
    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL: ' + error)
    }
}