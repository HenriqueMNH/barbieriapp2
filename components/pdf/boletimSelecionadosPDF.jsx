// components/pdf/BoletimSelecionadosPDF.jsx
// components/pdf/BoletimSelecionadosPDF.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Copiar styles do BoletimPDF
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
  yearTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "bold",
    color: "#1976d2",
    backgroundColor: "#e3f2fd",
    padding: 8,
    borderRadius: 4,
  },
  alunoTitle: {
    fontSize: 18,
    color: "#2c3e50",
    marginBottom: 15,
    fontWeight: "bold",
    borderBottom: 1,
    borderBottomColor: "#dee2e6",
    paddingBottom: 5,
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
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 2,
    borderBottomColor: "#dee2e6",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    backgroundColor: "#ffffff",
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
  },
  noNotasText: {
    color: "#666666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  }
});

// Copiar formatDate do BoletimPDF
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
};

export default function BoletimSelecionadosPDF({ alunos }) {
    return (
      <Document>
        {alunos.map((aluno, idx) => (
          <Page key={idx} style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.title}>Boletim Escolar</Text>
              <Text style={styles.subtitle}>Relatório de Notas do Aluno</Text>
            </View>

            <Text style={styles.alunoTitle}>{aluno.aluno_nome}</Text>
  
            {aluno.notasPorAno && Object.keys(aluno.notasPorAno).length > 0 ? (
              Object.entries(aluno.notasPorAno).map(([ano, notas]) => (
                <View key={ano} style={styles.section}>
                  <Text style={styles.yearTitle}>
                    {isNaN(Number(ano)) ? ano : `${ano}º Ano`}
                  </Text>
                  <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                      <Text style={[styles.tableCellHeader, { width: "50%" }]}>Disciplina</Text>
                      <Text style={[styles.tableCellHeader, { width: "25%" }]}>Nota</Text>
                      <Text style={[styles.tableCellHeader, { width: "25%" }]}>Status</Text>
                    </View>
                    {notas.map((nota, idx2) => (
                      <View 
                        key={idx2} 
                        style={[
                          styles.tableRow,
                          idx2 % 2 === 0 ? { backgroundColor: "#ffffff" } : { backgroundColor: "#f8f9fa" }
                        ]}
                      >
                        <Text style={[styles.tableCell, { width: "50%" }]}>{nota.disciplina_nome}</Text>
                        <Text style={[styles.tableCell, { width: "25%" }]}>{nota.nota}</Text>
                        <Text style={[styles.tableCell, { width: "25%" }]}>{nota.status || "-"}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.section}>
                <Text style={styles.noNotasText}>Nenhuma nota encontrada para este aluno.</Text>
              </View>
            )}

            <View style={styles.footer}>
              <Text>Documento gerado em {new Date().toLocaleDateString()}</Text>
            </View>
          </Page>
        ))}
      </Document>
    );
  }
  