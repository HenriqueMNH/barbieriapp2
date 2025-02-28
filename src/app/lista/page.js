"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filtros, setFiltros] = useState({
    ano: "",
    anoEstudo: "",
    serie: "",
    periodo: ""
  });

  useEffect(() => {
    setAlunos([
      {
        id: 1,
        nome: "João Silva",
        nascimento: "01/02/2008",
        naturalidade: "São Paulo",
        pai: "Carlos Silva",
        mae: "Ana Silva",
        profissaoPai: "Engenheiro",
        nacionalidadePai: "Brasileiro",
        residencia: "Rua A, 123",
        matriculaPrimitiva: "15/02/2014",
        matriculaAtual: "15/02/2014",
        anoCurso: "1A",
        periodo: "Manhã",
        observacoes: "Aprovado"
      },
      {
        id: 2,
        nome: "Maria Oliveira",
        nascimento: "10/05/2007",
        naturalidade: "Rio de Janeiro",
        pai: "José Oliveira",
        mae: "Clara Oliveira",
        profissaoPai: "Professor",
        nacionalidadePai: "Brasileiro",
        residencia: "Av. Central, 45",
        matriculaPrimitiva: "20/02/2013",
        matriculaAtual: "20/02/2022",
        anoCurso: "2B",
        periodo: "Tarde",
        observacoes: "Reprovado"
      }
    ]);
  }, []);

  const validarMatricula = (aluno) => {
    const anoPrimitivo = parseInt(aluno.matriculaPrimitiva.split("/")[2]); // Pega o ano da Matrícula Primitiva
    const anoLetivo = parseInt(aluno.matriculaAtual.split("/")[2]); // Pega o ano da Matrícula do Ano Letivo
    const anosEsperados = parseInt(aluno.anoCurso[0]) - 1; // O 1º ano deve ser logo após a matrícula primitiva
  
    if (anoLetivo - anoPrimitivo !== anosEsperados) {
      return "Erro na matrícula: a diferença de anos não corresponde ao ano de estudo.";
    }
    return "";
  };
  

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const resetarFiltros = () => {
    setFiltros({
      ano: "",
      anoEstudo: "",
      serie: "",
      periodo: ""
    });
  };

  const alunosFiltrados = alunos.filter((aluno) => {
    return (
      (!filtros.ano || aluno.matriculaAtual.includes(filtros.ano)) &&
      (!filtros.anoEstudo || aluno.anoCurso[0] === filtros.anoEstudo) &&
      (!filtros.serie || aluno.anoCurso[1] === filtros.serie) &&
      (!filtros.periodo || aluno.periodo === filtros.periodo)
    );
  });

  return (
    <div className={styles.listaPage}>
      <h1>Lista de Alunos</h1>
      
      <div className={styles.filtros}>
        <select name="ano" value={filtros.ano} onChange={handleFiltroChange}>
          <option value="">Ano</option>
          {[...Array(2025 - 1940)].map((_, i) => (
            <option key={i} value={1940 + i}>{1940 + i}</option>
          ))}
        </select>
        
        <select name="anoEstudo" value={filtros.anoEstudo} onChange={handleFiltroChange}>
          <option value="">Ano de Estudo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        
        <select name="serie" value={filtros.serie} onChange={handleFiltroChange}>
          <option value="">Série</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        
        <select name="periodo" value={filtros.periodo} onChange={handleFiltroChange}>
          <option value="">Período</option>
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
        </select>

        <button onClick={resetarFiltros} className={styles.resetButton}>
          Resetar Filtros
        </button>
      </div>

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
        <td>{aluno.nome}</td>
        <td>{aluno.nascimento}</td>
        <td>{aluno.naturalidade}</td>
        <td>{aluno.pai}</td>
        <td>{aluno.mae}</td>
        <td>{aluno.profissaoPai}</td>
        <td>{aluno.nacionalidadePai}</td>
        <td>{aluno.residencia}</td>
        <td>{aluno.matriculaPrimitiva}</td>
        <td>{aluno.matriculaAtual}</td>
        <td>{aluno.anoCurso}</td>
        <td>{aluno.periodo}</td>
        <td className={erroMatricula ? "erroMatricula" : ""}>
          {erroMatricula || aluno.observacoes}
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
}
