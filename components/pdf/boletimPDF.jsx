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
  // Formatar matrícula (se for data ISO, extrai o ano)
  let matriculaFormatada = aluno.matricula || "";
  if (matriculaFormatada) {
    const data = new Date(matriculaFormatada);
    if (!isNaN(data)) {
      matriculaFormatada = data.getFullYear().toString();
    }
  }

  // Formatar as datas que aparecem no PDF
  const formatDate = (data) => {
    if (!data) return "";
    const dt = new Date(data);
    if (isNaN(dt)) return data;
    return dt.toLocaleDateString("pt-BR");
  };

  // Preparar as notas para exibir
const notasPorAno = aluno.notas || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Boletim Escolar</Text>

<View style={styles.section}>
  <Text>Nome: {aluno.nome}</Text>
  <Text>Matrícula: {matriculaFormatada}</Text>
  <Text>Ano do Curso: {aluno.ano_curso || aluno.ano}</Text>
  <Text>Data de Nascimento: {formatDate(aluno.data_nascimento)}</Text>
  <Text>Cidade Natal: {aluno.cidade_natal || aluno.cidadeNatal}</Text>
  <Text>Sexo: {aluno.sexo}</Text>
  <Text>Religião: {aluno.religiao}</Text>
  <Text>Profissão do Pai: {aluno.profissao_pai || aluno.profissaoPai}</Text>
  <Text>Nacionalidade do Pai: {aluno.nacionalidade_pai || aluno.nacionalidadePai}</Text>
  <Text>Residência: {aluno.residencia}</Text>
  <Text>Telefone: {aluno.telefone}</Text>
  <Text>Email: {aluno.email}</Text>
  <Text>Observações: {aluno.observacao}</Text>
</View>

<View style={styles.section}>
  <Text style={styles.label}>Notas por Ano:</Text>
  {notasPorAno && Object.keys(notasPorAno).length > 0 ? (
    Object.entries(notasPorAno).map(([ano, notas]) => (
      <View key={ano} style={{ marginBottom: 8 }}>
        <Text style={{ fontWeight: "bold" }}>Ano {ano}:</Text>
        {notas.map((nota, idx) => (
          <Text key={idx}>
            {nota.materia}: {nota.valor}
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
