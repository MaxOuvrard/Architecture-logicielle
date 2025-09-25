const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Sequelize sync
const { sequelize } = require('./models');
sequelize.sync().then(() => {
  console.log('📦 Base de données synchronisée');
});

// Middleware JSON
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Hello Express 🚀");
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`✅ Serveur en cours sur http://localhost:${PORT}`);
});
