import express from "express";
import cors from "cors"; // ✅ importe o cors

import router from "./routes";

const app = express();

app.use(cors()); // ✅ habilita CORS para todas as rotas
app.use(express.json());
app.use(router);

export default app;
