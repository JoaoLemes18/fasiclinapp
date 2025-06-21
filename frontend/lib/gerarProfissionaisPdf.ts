import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

type Profissional = {
  NOMEPESSOA: string;
  TIPOPROFI: string;
  STATUSPROFI: string;
  ABREVCONS?: string;
  IDESPEC?: number;
  DESCESPEC?: string;
};

type Options = {
  profissionais: Profissional[];
  getCodeSpecByIdEspec: (id?: number) => string;
  tipoProfissionalLabel: (codigo: string) => string;
  statusProfissionalLabel: (codigo: string) => string;
};

export async function gerarProfissionaisPdf({
  profissionais,
  getCodeSpecByIdEspec,
  tipoProfissionalLabel,
  statusProfissionalLabel,
}: Options) {
  const html = `
    <!DOCTYPE html>
    <html><body>
      <h1 style="text-align:center">Lista de Profissionais</h1>
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <th style="border:1px solid #ddd;padding:6px;">Nome</th>
          <th style="border:1px solid #ddd;padding:6px;">Tipo</th>
          <th style="border:1px solid #ddd;padding:6px;">Status</th>
          <th style="border:1px solid #ddd;padding:6px;">Conselho</th>
          <th style="border:1px solid #ddd;padding:6px;">Especialidade</th>
        </tr>
        ${profissionais
          .map(
            (p) => `
          <tr>
            <td style="border:1px solid #ddd;padding:6px;">${p.NOMEPESSOA}</td>
            <td style="border:1px solid #ddd;padding:6px;">${tipoProfissionalLabel(
              p.TIPOPROFI
            )}</td>
            <td style="border:1px solid #ddd;padding:6px;">${statusProfissionalLabel(
              p.STATUSPROFI
            )}</td>
            <td style="border:1px solid #ddd;padding:6px;">${
              p.ABREVCONS || "N/A"
            }</td>
            <td style="border:1px solid #ddd;padding:6px;">${getCodeSpecByIdEspec(
              p.IDESPEC
            )} - ${p.DESCESPEC || "N/A"}</td>
          </tr>`
          )
          .join("")}
      </table>
    </body></html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html });
    const pdfPath = FileSystem.documentDirectory + "profissionais.pdf";
    await FileSystem.copyAsync({ from: uri, to: pdfPath });
    await Sharing.shareAsync(pdfPath);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
  }
}
