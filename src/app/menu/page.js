"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Menu() {
  const router = useRouter();

  return (
    <div className={styles.menuPage}>
      <nav className={styles.navbar}>
        <button onClick={() => router.push("/lista")}>Lista de Alunos</button>
        <button onClick={() => router.push("/adicionar")}>Adicionar Alunos</button>
      </nav>
      <main className={styles.content}>
        <h1>Bem-vindo ao Sistema Escolar</h1>
        <p>Escolha uma opção acima.</p>
      </main>
    </div>
  );
}
