import { pool } from '../database/db';

export class PessoaModel {
  static async buscarPorCPF(cpf: string) {
    const [rows]: any = await pool.query(
      'SELECT * FROM VW_PESSOAFIS WHERE CPF = ?', [cpf]
    );
    return rows[0];
  }
}
