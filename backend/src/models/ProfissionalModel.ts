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
    return result.insertId;
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

  static async atualizarProfissional(
    id_profissio: number,
    data: { tipo_profi: string; status_profi: string; id_conseprofi: number }
  ) {
    await pool.query(
      `UPDATE PROFISSIONAL SET TIPOPROFI = ?, STATUSPROFI = ?, ID_CONSEPROFI = ? WHERE IDPROFISSIO = ?`,
      [data.tipo_profi, data.status_profi, data.id_conseprofi, id_profissio]
    );
  }

  static async atualizarProfiEspec(id_profissio: number, id_espec: number) {
    const [exist]: any = await pool.query(
      `SELECT * FROM PROFI_ESPEC WHERE ID_PROFISSIO = ?`,
      [id_profissio]
    );

    if (exist.length) {
      await pool.query(
        `UPDATE PROFI_ESPEC SET ID_ESPEC = ? WHERE ID_PROFISSIO = ?`,
        [id_espec, id_profissio]
      );
    } else {
      await pool.query(
        `INSERT INTO PROFI_ESPEC (ID_PROFISSIO, ID_ESPEC) VALUES (?, ?)`,
        [id_profissio, id_espec]
      );
    }
  }

  static async atualizarUsuario(
    id_profissio: number,
    data: { email: string; senha?: string }
  ) {
    const query =
      data.senha != null
        ? `UPDATE USUARIO SET LOGUSUARIO = ?, SENHAUSUA = ? WHERE ID_PROFISSIO = ?`
        : `UPDATE USUARIO SET LOGUSUARIO = ? WHERE ID_PROFISSIO = ?`;

    const values =
      data.senha != null
        ? [data.email, data.senha, id_profissio]
        : [data.email, id_profissio];

    await pool.query(query, values);
  }

  static async inativarProfissional(id_profissio: number) {
    await pool.query(
      `UPDATE PROFISSIONAL SET STATUSPROFI = '2' WHERE IDPROFISSIO = ?`,
      [id_profissio]
    );
  }

  static async buscarConselho(id: number) {
    const [rows]: any = await pool.query(
      "SELECT IDCONSEPROFI FROM CONSEPROFI WHERE IDCONSEPROFI = ?",
      [id]
    );
    return rows[0];
  }

  static async inserirProfiEspec(data: {
    id_profissio: number;
    id_espec: number;
  }) {
    await pool.query(
      `INSERT INTO PROFI_ESPEC (ID_PROFISSIO, ID_ESPEC) VALUES (?, ?)`,
      [data.id_profissio, data.id_espec]
    );
  }

  static async buscarProfissionais() {
    const [rows]: any = await pool.query(`
    SELECT 
      p.IDPROFISSIO,
      p.ID_PESSOAFIS,
      pf.CPFPESSOA,
      pf.NOMEPESSOA,
      p.TIPOPROFI,
      p.STATUSPROFI,
      c.DESCRICAO,
      c.ABREVCONS,
      p.ID_SUPPROFI,
      u.LOGUSUARIO,
      u.SENHAUSUA,
      e.IDESPEC,
      e.DESCESPEC
    FROM PROFISSIONAL p
    JOIN PESSOAFIS pf ON p.ID_PESSOAFIS = pf.IDPESSOAFIS
    LEFT JOIN USUARIO u ON u.ID_PROFISSIO = p.IDPROFISSIO
    LEFT JOIN PROFI_ESPEC pe ON pe.ID_PROFISSIO = p.IDPROFISSIO
    LEFT JOIN ESPECIALIDADE e ON e.IDESPEC = pe.ID_ESPEC
    LEFT JOIN CONSEPROFI c ON c.IDCONSEPROFI = p.ID_CONSEPROFI
  `);

    return rows;
  }
}
