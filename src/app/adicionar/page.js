"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function AdicionarAluno() {
  const [telaAtual, setTelaAtual] = useState("menu");

  // Estados para informações do aluno
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [profissaoPai, setProfissaoPai] = useState("");
  const [nacionalidadePai, setNacionalidadePai] = useState("");
  const [residencia, setResidencia] = useState("");
  const [matriculaPrimitiva, setMatriculaPrimitiva] = useState("");
  const [matriculaAnoLetivo, setMatriculaAnoLetivo] = useState("");
  const [anoCurso, setAnoCurso] = useState("");
  const [eliminacaoData, setEliminacaoData] = useState("");
  const [eliminacaoCausa, setEliminacaoCausa] = useState("");
  const [observacao, setObservacao] = useState("");

  // Estados para notas
  const [matematica, setMatematica] = useState("");
  const [portugues, setPortugues] = useState("");
  const [estudosSociais, setEstudosSociais] = useState("");
  const [ciencias, setCiencias] = useState("");

  const handleSalvarAluno = (e) => {
    e.preventDefault();
    setTelaAtual("notas");
  };

  const handleSalvarNotas = (e) => {
    e.preventDefault();
    console.log("Aluno cadastrado:", {
      nome,
      dataNascimento,
      cidadeNatal,
      nomePai,
      nomeMae,
      profissaoPai,
      nacionalidadePai,
      residencia,
      matriculaPrimitiva,
      matriculaAnoLetivo,
      anoCurso,
      eliminacaoData,
      eliminacaoCausa,
      matematica,
      portugues,
      estudosSociais,
      ciencias,
      observacao,
    });
    setTelaAtual("menu");
    resetForm();
  };

  const resetForm = () => {
    setNome("");
    setDataNascimento("");
    setCidadeNatal("");
    setNomePai("");
    setNomeMae("");
    setProfissaoPai("");
    setNacionalidadePai("");
    setResidencia("");
    setMatriculaPrimitiva("");
    setMatriculaAnoLetivo("");
    setAnoCurso("");
    setEliminacaoData("");
    setEliminacaoCausa("");
    setMatematica("");
    setPortugues("");
    setEstudosSociais("");
    setCiencias("");
    setObservacao("");
  };

  const isQuintoAnoDisponivel = () => {
    if (!matriculaAnoLetivo) return false;
    const anoMatricula = new Date(matriculaAnoLetivo).getFullYear();
    return anoMatricula >= 2006;
  };

  return (
    <div className={styles.adicionarPage}>
      {telaAtual === "menu" && (
        <div>
          <h1 className={styles.title}>Adicionar Aluno</h1>
          <button className={styles.button} onClick={() => setTelaAtual("aluno")}>
            Cadastrar Aluno
          </button>
        </div>
      )}

      {telaAtual === "aluno" && (
        <form onSubmit={handleSalvarAluno} className={styles.form}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required className={styles.input} />
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required className={styles.input} placeholder="" />
          <input type="text" placeholder="Cidade Natal" value={cidadeNatal} onChange={(e) => setCidadeNatal(e.target.value)} required className={styles.input} />
          <input type="text" placeholder="Nome do Pai" value={nomePai} onChange={(e) => setNomePai(e.target.value)} required className={styles.input} />
          <input type="text" placeholder="Nome da Mãe (Opcional)" value={nomeMae} onChange={(e) => setNomeMae(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Profissão do Pai" value={profissaoPai} onChange={(e) => setProfissaoPai(e.target.value)} required className={styles.input} />
          <input type="text" placeholder="Nacionalidade do Pai" value={nacionalidadePai} onChange={(e) => setNacionalidadePai(e.target.value)} required className={styles.input} />
          <input type="text" placeholder="Residência" value={residencia} onChange={(e) => setResidencia(e.target.value)} required className={styles.input} />
          <input type="date" value={matriculaPrimitiva} onChange={(e) => setMatriculaPrimitiva(e.target.value)} required className={styles.input} placeholder="" />
          <input type="date" value={matriculaAnoLetivo} onChange={(e) => setMatriculaAnoLetivo(e.target.value)} required className={styles.input} placeholder="" />
          <select value={anoCurso} onChange={(e) => setAnoCurso(e.target.value)} required className={styles.select}>
            <option value="">Selecione o Ano</option>
            <option value="1">1º Ano</option>
            <option value="2">2º Ano</option>
            <option value="3">3º Ano</option>
            <option value="4">4º Ano</option>
            {isQuintoAnoDisponivel() && <option value="5">5º Ano (Apenas para 2006+)</option>}
          </select>
          <button type="submit" className={styles.button}>Próximo</button>
          <button type="button" className={styles.buttonSecundario} onClick={() => setTelaAtual("menu")}>Cancelar</button>
        </form>
      )}
    </div>
  );
}