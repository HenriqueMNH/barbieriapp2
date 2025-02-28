"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function AdicionarAluno() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [ano, setAno] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Aluno adicionado:", { nome, idade, ano });

    setNome("");
    setIdade("");
    setAno("");
  };

  return (
    <div className={styles.adicionarPage}>
      <h1 className={styles.title}>Adicionar Aluno</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input} // Referenciar a classe local
          required
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          className={styles.input} // Referenciar a classe local
          required
        />
        <select 
          value={ano} 
          onChange={(e) => setAno(e.target.value)} 
          className={styles.select} // Referenciar a classe local
          required
        >
          <option value="">Selecione o Ano</option>
          <option value="1">1º Ano</option>
          <option value="2">2º Ano</option>
          <option value="3">3º Ano</option>
        </select>
        <button type="submit" className={styles.button}>Adicionar</button>
      </form>
    </div>
  );
}
