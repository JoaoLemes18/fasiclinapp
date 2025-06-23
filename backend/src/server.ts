import app from "./app";
import dotenv from "dotenv";
import http from "http";
import os from "os";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = "0.0.0.0";

const server = http.createServer(app);

// Função auxiliar para obter o IP local
function getLocalIp(): string | null {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (!iface) continue;

    for (const net of iface) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

server.listen(PORT, HOST, () => {
  const localIp = getLocalIp();
  console.log(`✅ Servidor rodando em:`);

  console.log(`➡️  http://localhost:${PORT}`);
  if (localIp) {
    console.log(`➡️  http://${localIp}:${PORT} (na rede local)`);
  } else {
    console.log(`⚠️  IP local não encontrado`);
  }
});
