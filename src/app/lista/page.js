"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filtros, setFiltros] = useState({
    ano: "",
    anoEstudo: "",
    serie: "",
    periodo: "",
  });

  // Requisição para pegar a lista de alunos
  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3333/alunos");
        setAlunos(response.data.dados); // Atualiza a lista de alunos
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  // Função para validar as matrículas
  const validarMatricula = (aluno) => {
    if (!aluno.matriculaPrimitiva || !aluno.matriculaAtual) {
      return "Erro na matrícula: dados de matrícula ausentes.";
    }

    const anoPrimitivo = parseInt(aluno.matriculaPrimitiva.split("/")[2]);
    const anoLetivo = parseInt(aluno.matriculaAtual.split("/")[2]);
    const anosEsperados = parseInt(aluno.anoCurso[0]) - 1;

    if (anoLetivo - anoPrimitivo !== anosEsperados) {
      return "Erro na matrícula: a diferença de anos não corresponde ao ano de estudo.";
    }
    return "";
  };

  // Função para lidar com alterações nos filtros
  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  // Função para resetar os filtros
  const resetarFiltros = () => {
    setFiltros({
      ano: "",
      anoEstudo: "",
      serie: "",
      periodo: "",
    });
  };

// Função para filtrar os alunos com base nos filtros
const alunosFiltrados = alunos.filter((aluno) => {
  console.log("Filtros aplicados:", filtros);
  console.log("Aluno sendo filtrado:", aluno);

  // Filtro de Ano de Matrícula (ano_letivo)
  const filtroAno = filtros.ano ? aluno.matricula_ano_letivo.includes(filtros.ano) : true;

  // Filtro de Ano de Estudo (corrigido para evitar erro de tipo)
  const filtroAnoEstudo = filtros.anoEstudo
    ? aluno.ano_curso?.toString() === filtros.anoEstudo
    : true;

  // Filtro de Série
  const filtroSerie = filtros.serie ? aluno.ano_curso?.toString()[1] === filtros.serie : true;

  // Filtro de Período
  const filtroPeriodo = filtros.periodo ? aluno.periodo === filtros.periodo : true;

  const resultado = filtroAno && filtroAnoEstudo && filtroSerie && filtroPeriodo;
  
  console.log(`Aluno ${aluno.aluno_nome}: ${resultado ? "Passou no filtro" : "Não passou no filtro"}`);

  return resultado;
});

  return (
    <div className={styles.listaPage}>
      <h1>Lista de Alunos</h1>

      <div className={styles.filters}>
        <select
          name="ano"
          value={filtros.ano}
          onChange={handleFiltroChange}
          className={styles.select}
        >
          <option value="">Ano</option>
          {[...Array(2025 - 1940)].map((_, i) => (
            <option key={i} value={1940 + i}>
              {1940 + i}
            </option>
          ))}
        </select>

        <select
          name="anoEstudo"
          value={filtros.anoEstudo}
          onChange={handleFiltroChange}
          className={styles.select}
        >
          <option value="">Ano de Estudo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <select
          name="serie"
          value={filtros.serie}
          onChange={handleFiltroChange}
          className={styles.select}
        >
          <option value="">Série</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <select
          name="periodo"
          value={filtros.periodo}
          onChange={handleFiltroChange}
          className={styles.select}
        >
          <option value="">Período</option>
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
        </select>

        <button onClick={resetarFiltros} className={styles.resetButton}>
          Resetar Filtros
        </button>
      </div>

      {/* Exibe a tabela de alunos filtrados */}
      {alunosFiltrados.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Naturalidade</th>
              <th>Nome do Pai</th>
              <th>Nome da Mãe</th>
              <th>Profissão do Pai</th>
              <th>Nacionalidade do Pai</th>
              <th>Residência</th>
              <th>Matrícula Primitiva</th>
              <th>Matrícula do Ano Letivo</th>
              <th>Ano do Curso</th>
              <th>Período</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno) => {
              const erroMatricula = validarMatricula(aluno);
              return (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.aluno_nome}</td>
                  <td>{aluno.data_nascimento}</td>
                  <td>{aluno.cidade_natal}</td>
                  <td>{aluno.nome_pai}</td>
                  <td>{aluno.nome_mae}</td>
                  <td>{aluno.profissao_pai}</td>
                  <td>{aluno.nacionalidade_pai}</td>
                  <td>{aluno.residencia}</td>
                  <td>{aluno.matricula_primitiva}</td>
                  <td>{aluno.matricula_ano_letivo}</td>
                  <td>{aluno.ano_curso}</td>
                  <td>{aluno.periodo}</td>
                  <td className={erroMatricula ? "erroMatricula" : ""}>
                    {erroMatricula || aluno.observacao}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={styles.noResults}>Nenhum aluno encontrado com os filtros aplicados.</p>
      )}
    </div>
  );
}
