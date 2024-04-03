const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorFormat } = require('./middlewares/errorHandler');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// const whitelist = ["http://localhost:8080", "http://myapp.co", "https://www.thunderclient.com"]; //lista de url permitidas para reaizar peticiones a la api
// const options = {
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin)){
//       callback(null, true)
//     }else{
//       callback(new Error("No permitido"))
//     }
//   }
// }
// app.use(cors(options));// para recibir todos los dominios si el paraetro queda vacio
app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(errorFormat);

app.listen(port, () => console.log(`run on port ${port}`));
