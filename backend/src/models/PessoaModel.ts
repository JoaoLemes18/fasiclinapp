import { pool } from "../database/db";

export class PessoaModel {
  static async buscarPorCPF(cpf: string) {
    const [rows]: any = await pool.query(
      `
      SELECT
        IDPESSOAFIS AS idPessoa,
        CPFPESSOA AS cpf,
        NOMEPESSOA AS nome,
        DATANASCPES AS dataNascimento,
        SEXOPESSOA AS sexo
      FROM PESSOAFIS
      WHERE CPFPESSOA = ?
      `,
      [cpf]
    );
    return rows[0] || null;
  }
}
