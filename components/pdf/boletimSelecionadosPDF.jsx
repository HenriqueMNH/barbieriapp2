// components/pdf/BoletimSelecionadosPDF.jsx
// components/pdf/BoletimSelecionadosPDF.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Copiar styles do BoletimPDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  yearTitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 12,
  },
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
            <Text style={styles.title}>Boletim Escolar</Text>
  
            {aluno.notasPorAno && Object.keys(aluno.notasPorAno).length > 0 ? (
              Object.entries(aluno.notasPorAno).map(([ano, notas]) => (
                <View key={ano} style={styles.section}>
                  <Text style={styles.yearTitle}>
                    {isNaN(Number(ano)) ? ano : `${ano}º Ano`}
                  </Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCellHeader, { width: "50%" }]}>Disciplina</Text>
                      <Text style={[styles.tableCellHeader, { width: "25%" }]}>Nota</Text>
                      <Text style={[styles.tableCellHeader, { width: "25%" }]}>Status</Text>
                    </View>
                    {notas.map((nota, idx2) => (
                      <View key={idx2} style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: "50%" }]}>{nota.disciplina_nome}</Text>
                        <Text style={[styles.tableCell, { width: "25%" }]}>{nota.nota}</Text>
                        <Text style={[styles.tableCell, { width: "25%" }]}>{nota.status || ""}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            ) : (
              <Text>Nenhuma nota encontrada.</Text>
            )}
          </Page>
        ))}
      </Document>
    );
  }
  