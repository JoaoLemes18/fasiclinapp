import { pool } from "../database/db";

export class EspecialidadeModel {
  static async listarTodos() {
    const [rows]: any = await pool.query(
      "SELECT IDESPEC, CODESPEC, DESCESPEC FROM ESPECIALIDADE"
    );
    return rows;
  }
}
