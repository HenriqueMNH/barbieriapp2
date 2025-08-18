// components/pdf/BoletimPDF.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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

export default function BoletimPDF({ aluno }) {
  console.log("Dados recebidos no BoletimPDF:", aluno);

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Boletim Escolar</Text>

        {/* Informações do aluno */}
        <View style={styles.section}>
          <Text>Nome: {aluno.aluno_nome}</Text>
          <Text>Matrícula: {aluno.id}</Text>
        </View>

        {/* Notas por ano */}
        {aluno.notasPorAno && Object.keys(aluno.notasPorAno).length > 0 ? (
          Object.entries(aluno.notasPorAno).map(([ano, notas]) => (
            <View key={ano} style={styles.section}>
              <Text style={styles.yearTitle}>{ano}º Ano</Text>

              <View style={styles.table}>
                {/* Cabeçalho */}
                <View style={styles.tableRow}>
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

                {/* Linhas de notas */}
                {notas.map((nota, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <Text style={[styles.tableCell, { width: "50%" }]}>
                      {nota.disciplina_nome}
                    </Text>
                    <Text style={[styles.tableCell, { width: "25%" }]}>
                      {nota.nota}
                    </Text>
                    <Text style={[styles.tableCell, { width: "25%" }]}>
                      {nota.status || ""}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text>Nenhuma nota encontrada.</Text>
        )}
      </Page>
    </Document>
  );
}
