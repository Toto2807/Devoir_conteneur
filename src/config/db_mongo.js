const mongoose = require('mongoose');

const connect_retry = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('✅ Connexion a MongoDB ok')
        })
        .catch((err) => {
            console.error('❌ Connexion a MongoDB failed', err)
            setTimeout(connect_retry, 5000)
        })
};

connect_retry();
module.exports = mongoose