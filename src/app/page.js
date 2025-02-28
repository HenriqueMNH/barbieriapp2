"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [senha, setSenha] = useState("");
  const [escola, setEscola] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (!escola || !senha) {
      setErro("Por favor, selecione uma escola e preencha a senha.");
      return;
    }

    // Caso a escola e senha sejam preenchidas, redireciona para /menu
    router.push("/menu");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Image
          className={styles.logo}
          src="/logo.png"
          alt="School Logo"
          width={300}
          height={100}
          priority
        />

        <label className={styles.label}>Lista de escolas</label>
        <select
          className={styles.select}
          value={escola}
          onChange={(e) => setEscola(e.target.value)}
        >
          <option value="">Selecione uma escola</option>
          <option value="school1">Escola 1</option>
          <option value="school2">Escola 2</option>
          <option value="school3">Escola 3</option>
        </select>

        <input
          type="password"
          className={styles.input}
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p className={styles.error}>{erro}</p>}

        <button className={styles.button} onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
