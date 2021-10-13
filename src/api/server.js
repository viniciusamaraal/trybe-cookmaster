const { connect } = require('mongoose');
const { MONGO_DB_URL } = require('./config/constants/settings');
const app = require('./app');

const PORT = 3000;

(async () => {
    await connect(MONGO_DB_URL);

    app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
})();
