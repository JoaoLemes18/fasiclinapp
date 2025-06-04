import { pool } from "../database/db";

export class ProfissionalModel {
  static async inserirProfissional(data: {
    id_pessoafis: number;
    tipo_profi: string;
    status_profi: string;
    id_conseprofi: number;
  }): Promise<number> {
    const [result]: any = await pool.query(
      `INSERT INTO PROFISSIONAL 
      (ID_PESSOAFIS, TIPOPROFI, STATUSPROFI, ID_CONSEPROFI) 
      VALUES (?, ?, ?, ?)`,
      [
        data.id_pessoafis,
        data.tipo_profi,
        data.status_profi,
        data.id_conseprofi,
      ]
    );
    return result.insertId; // Retorna o ID gerado do profissional
  }

  static async inserirUsuario(data: {
    id_profissio: number;
    email: string;
    senha: string;
  }) {
    await pool.query(
      `INSERT INTO USUARIO 
      (ID_PROFISSIO, LOGUSUARIO, SENHAUSUA) 
      VALUES (?, ?, ?)`,
      [data.id_profissio, data.email, data.senha]
    );
  }

  static async buscarConselho(id: number) {
    const [rows]: any = await pool.query(
      "SELECT IDCONSEPROFI FROM CONSEPROFI WHERE IDCONSEPROFI = ?",
      [id]
    );
    return rows[0];
  }
}
