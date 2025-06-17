import { pool } from "../database/db";

export class ConselhoModel {
  static async listarTodos() {
    const [rows]: any = await pool.query(
      "SELECT IDCONSEPROFI, DESCRICAO, ABREVCONS FROM CONSEPROFI"
    );
    return rows;
  }
}
