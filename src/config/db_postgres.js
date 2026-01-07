const pg = require('pg');

const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URI
})

const connect_retry = () => {
    pool.connect()
        .then(() => {
            console.log('✅ Connexion a postgres ok')
        })
        .catch((err) => {
            console.error('❌ Connexion a postgres failed', err)
            setTimeout(connect_retry, 5000)
        })
};

connect_retry();
module.exports = pool;