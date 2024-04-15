const express = require('express');
const app = express();
const router = require('./router/router.js');
const PORT = process.env.PORT ?? 4040;
const staticFile = require('./middlewares/middleware.js');

app.disable('x-powered-by');
app.use(express.json());
app.use(router);
staticFile(app);

app.use((req, res) => {
    res.status(404).json({message: "404 Not Found"})
});

app.listen(PORT, ()=>console.log(`Servidor iniciador en puerto http://localhost:${PORT}`));