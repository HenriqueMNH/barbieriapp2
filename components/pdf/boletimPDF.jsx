// components/pdf/BoletimPDF.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: "#1976d2",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    color: "#1976d2",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#2c3e50",
    marginBottom: 15,
    fontWeight: "bold",
  },
  yearTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "bold",
    color: "#1976d2",
    backgroundColor: "#e3f2fd",
    padding: 8,
    borderRadius: 4,
  },
  infoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  infoItem: {
    width: "48%",
    marginBottom: 8,
  },
  infoLabel: {
    color: "#666666",
    fontSize: 10,
    marginBottom: 2,
  },
  infoValue: {
    color: "#2c3e50",
    fontSize: 12,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 4,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    backgroundColor: "#ffffff",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 2,
    borderBottomColor: "#dee2e6",
  },
  tableCellHeader: {
    margin: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#1976d2",
  },
  tableCell: {
    margin: 8,
    fontSize: 12,
    color: "#2c3e50",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#666666",
    fontSize: 10,
    borderTop: 1,
    borderTopColor: "#dee2e6",
    paddingTop: 10,
  }
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateString; // fallback
  }
};


export default function BoletimPDF({ aluno }) {
  console.log("Dados recebidos no BoletimPDF:", aluno);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Boletim Escolar</Text>
          <Text style={styles.subtitle}>Registro de Desempenho Acadêmico</Text>
        </View>

        {/* Informações do aluno */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Aluno</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nome do Aluno</Text>
              <Text style={styles.infoValue}>{aluno.aluno_nome}</Text>
            </View>
            
            {aluno.matricula && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Matrícula</Text>
                <Text style={styles.infoValue}>{formatDate(aluno.matricula)}</Text>
              </View>
            )}

            {aluno.ano && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Ano do Curso</Text>
                <Text style={styles.infoValue}>{aluno.ano}º Ano</Text>
              </View>
            )}

            {aluno.dataNascimento && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Data de Nascimento</Text>
                <Text style={styles.infoValue}>{formatDate(aluno.dataNascimento)}</Text>
              </View>
            )}

            {aluno.cidadeNatal && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Naturalidade</Text>
                <Text style={styles.infoValue}>{aluno.cidadeNatal}</Text>
              </View>
            )}

            {aluno.sexo && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Sexo</Text>
                <Text style={styles.infoValue}>{aluno.sexo}</Text>
              </View>
            )}

            {aluno.religiao && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Religião</Text>
                <Text style={styles.infoValue}>{aluno.religiao}</Text>
              </View>
            )}

            {aluno.profissaoPai && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Profissão do Pai</Text>
                <Text style={styles.infoValue}>{aluno.profissaoPai}</Text>
              </View>
            )}

            {aluno.nacionalidadePai && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nacionalidade do Pai</Text>
                <Text style={styles.infoValue}>{aluno.nacionalidadePai}</Text>
              </View>
            )}
          </View>

          {aluno.observacao && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.infoLabel}>Observações</Text>
              <Text style={styles.infoValue}>{aluno.observacao}</Text>
            </View>
          )}
        </View>
        {/* Notas por ano */}
        {aluno.notasPorAno && Object.keys(aluno.notasPorAno).length > 0 ? (
          Object.entries(aluno.notasPorAno).map(([ano, notas]) => (
            <View key={ano} style={styles.section}>
              <Text style={styles.yearTitle}>
                {isNaN(Number(ano)) ? ano : `${ano}º Ano`}
              </Text>

              <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <Text style={[styles.tableCellHeader, { width: "50%" }]}>
                    Disciplina
                  </Text>
                  <Text style={[styles.tableCellHeader, { width: "25%" }]}>
                    Nota
                  </Text>
                  <Text style={[styles.tableCellHeader, { width: "25%" }]}>
                    Status
                  </Text>
                </View>

                {notas.map((nota, idx) => (
                  <View 
                    key={idx} 
                    style={[
                      styles.tableRow,
                      idx % 2 === 0 ? { backgroundColor: "#ffffff" } : { backgroundColor: "#f8f9fa" }
                    ]}
                  >
                    <Text style={[styles.tableCell, { width: "50%" }]}>
                      {nota.disciplina_nome}
                    </Text>
                    <Text style={[styles.tableCell, { width: "25%" }]}>
                      {nota.nota}
                    </Text>
                    <Text style={[styles.tableCell, { width: "25%" }]}>
                      {nota.status || "-"}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={[styles.section, { alignItems: 'center' }]}>
            <Text style={{ color: '#666666', fontSize: 14 }}>Nenhuma nota encontrada para este aluno.</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Documento gerado em {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
}
