import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
  },
});

const BoletimPDF = ({ aluno }) => {
  console.log("Aluno recebido no BoletimPDF:", aluno);
  console.log("Notas recebidas no BoletimPDF:", aluno.notas);

  // Formatar matrícula (se for data ISO, extrai o ano)
  let matriculaFormatada = aluno.matricula || "";
  if (matriculaFormatada) {
    const data = new Date(matriculaFormatada);
    if (!isNaN(data)) {
      matriculaFormatada = data.getFullYear().toString();
    }
  }

  // Formatar datas para exibir no PDF
  const formatDate = (data) => {
    if (!data) return "";

    if (typeof data === "string" && data.includes("T")) {
      const [ano, mes, dia] = data.split("T")[0].split("-");
      return `${dia}/${mes}/${ano}`;
    }

    const dt = new Date(data);
    if (isNaN(dt)) return data;
    return dt.toLocaleDateString("pt-BR");
  };

  // Normalizar notas para garantir que é array
  const notasArray = Array.isArray(aluno.notas) ? aluno.notas : [];

  // Agrupa notas por ano
  const notasPorAno = notasArray.reduce((acc, nota) => {
    const ano = nota.ano || "Sem Ano";
    if (!acc[ano]) acc[ano] = [];
    acc[ano].push(nota);
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Boletim Escolar</Text>

        <View style={styles.section}>
          <Text>Nome: {aluno.nome}</Text>
          <Text>Matrícula: {matriculaFormatada}</Text>
          <Text>Ano do Curso: {aluno.ano_curso || aluno.ano}</Text>
          <Text>
            Data de Nascimento:{" "}
            {formatDate(aluno.data_nascimento || aluno.dataNascimento)}
          </Text>
          <Text>Cidade Natal: {aluno.cidade_natal || aluno.cidadeNatal}</Text>
          <Text>Sexo: {aluno.sexo}</Text>
          <Text>Religião: {aluno.religiao}</Text>
          <Text>Profissão do Pai: {aluno.profissao_pai || aluno.profissaoPai}</Text>
          <Text>
            Nacionalidade do Pai:{" "}
            {aluno.nacionalidade_pai || aluno.nacionalidadePai}
          </Text>
          <Text>Residência: {aluno.residencia}</Text>
          <Text>Telefone: {aluno.telefone}</Text>
          <Text>Email: {aluno.email}</Text>
          <Text>Observações: {aluno.observacao}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Notas por Ano:</Text>
          {Object.keys(notasPorAno).length > 0 ? (
            Object.entries(notasPorAno).map(([ano, notas]) => (
              <View key={ano} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold" }}>
                  {ano === "Sem Ano" ? "Ano não especificado" : `Ano ${ano}`}:
                </Text>
                {notas.map((nota, idx) => (
                  <Text key={idx}>
                    {nota.materia || nota.materia_nome}: {nota.valor || nota.nota}
                  </Text>
                ))}
              </View>
            ))
          ) : (
            <Text>Sem notas disponíveis.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default BoletimPDF;
