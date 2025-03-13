"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

export default function ListaAlunos() {
  const router = useRouter();

  const [alunos, setAlunos] = useState([]);
  const [filtros, setFiltros] = useState({
    ano: "",
    anoEstudo: "",
    serie: "",
    periodo: "",
    sexo: "",
  });
  const [notas, setNotas] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [notasEditando, setNotasEditando] = useState({
    matematica: "",
    portugues: "",
    estudos_sociais: "",
    ciencias: ""
  });

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alunos`);
        setAlunos(response.data.dados);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const resetarFiltros = () => {
    setFiltros({
      ano: "",
      anoEstudo: "",
      serie: "",
      periodo: "",
      sexo: "",
    });
  };

  const filtrosAtivos = Object.values(filtros).some((valor) => valor !== "");

  const alunosFiltrados = alunos.filter((aluno) => {
    const filtroAno = filtros.ano ? aluno.matricula_ano_letivo.includes(filtros.ano) : true;
    const filtroAnoEstudo = filtros.anoEstudo ? aluno.ano_curso?.toString() === filtros.anoEstudo : true;
    const filtroSerie = filtros.serie ? aluno.ano_curso?.toString()[1] === filtros.serie : true;
    const filtroPeriodo = filtros.periodo ? aluno.periodo === filtros.periodo : true;
    const filtroSexo = filtros.sexo ? aluno.sexo === filtros.sexo : true;
    return filtroAno && filtroAnoEstudo && filtroSerie && filtroPeriodo && filtroSexo;
  });

  const buscarNotas = async (aluno) => {
    try {
      if (!aluno || !aluno.id) {
        alert("Aluno não selecionado corretamente.");
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notas/${aluno.id}`);
      
      if (response.data.sucesso && response.data.dados.length > 0) {
        setNotas(response.data.dados);
      } else {
        setNotas([]);
        alert("Nenhuma nota encontrada para este aluno.");
      }
      
      setAlunoSelecionado(aluno);
      setModalAberto(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Nenhuma nota encontrada para este aluno.");
      } else {
        console.error("Erro ao buscar notas:", error);
        alert("Erro ao carregar notas. Tente novamente.");
      }
      setNotas([]);
    }
  };

  const salvarNotas = async () => {
    if (!alunoSelecionado || !alunoSelecionado.id) {
      alert("Aluno não selecionado corretamente.");
      return;
    }

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/notas/${alunoSelecionado.id}`, notasEditando);
      alert("Notas editadas com sucesso!");
      setModalAberto(false);
      buscarNotas(alunoSelecionado); // Atualiza as notas após salvar
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
      alert("Erro ao salvar as notas.");
    }
  };

  return (
    <div className={styles.listaPage}>
      <button onClick={() => router.back()} className={styles.voltarButton}>⬅ Voltar</button>
      <h1>Lista de Alunos</h1>

      {modalAberto && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Editar Notas de {alunoSelecionado?.aluno_nome || "Aluno"}</h2>
            <div>
              <label>Matemática</label>
              <input 
                type="text" 
                value={notasEditando.matematica || ""} 
                onChange={(e) => setNotasEditando({ ...notasEditando, matematica: e.target.value })}
              />
            </div>
            <div>
              <label>Português</label>
              <input 
                type="text" 
                value={notasEditando.portugues || ""} 
                onChange={(e) => setNotasEditando({ ...notasEditando, portugues: e.target.value })}
              />
            </div>
            <div>
              <label>Estudos Sociais</label>
              <input 
                type="text" 
                value={notasEditando.estudos_sociais || ""} 
                onChange={(e) => setNotasEditando({ ...notasEditando, estudos_sociais: e.target.value })}
              />
            </div>
            <div>
              <label>Ciências</label>
              <input 
                type="text" 
                value={notasEditando.ciencias || ""} 
                onChange={(e) => setNotasEditando({ ...notasEditando, ciencias: e.target.value })}
              />
            </div>
            <button onClick={salvarNotas}>Salvar</button>
            <button onClick={() => setModalAberto(false)}>Fechar</button>
          </div>
        </div>
      )}

      <div className={styles.filtros}>
        <input type="text" name="ano" placeholder="Ano" value={filtros.ano} onChange={handleFiltroChange} />
        <input type="text" name="anoEstudo" placeholder="Ano de Estudo" value={filtros.anoEstudo} onChange={handleFiltroChange} />
        <input type="text" name="serie" placeholder="Série" value={filtros.serie} onChange={handleFiltroChange} />
        <input type="text" name="periodo" placeholder="Período" value={filtros.periodo} onChange={handleFiltroChange} />
        <input type="text" name="sexo" placeholder="Sexo" value={filtros.sexo} onChange={handleFiltroChange} />
        <button onClick={resetarFiltros}>Resetar Filtros</button>
      </div>

      {filtrosAtivos ? (
        alunosFiltrados.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Naturalidade</th>
                <th>Sexo</th>
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
                <th>Notas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.id}</td>
                  <td>{aluno.aluno_nome}</td>
                  <td>{aluno.data_nascimento}</td>
                  <td>{aluno.naturalidade}</td>
                  <td>{aluno.sexo}</td>
                  <td>{aluno.nome_pai}</td>
                  <td>{aluno.nome_mae}</td>
                  <td>{aluno.profissao_pai}</td>
                  <td>{aluno.nacionalidade_pai}</td>
                  <td>{aluno.residencia}</td>
                  <td>{aluno.matricula_primitiva}</td>
                  <td>{aluno.matricula_ano_letivo}</td>
                  <td>{aluno.ano_curso}</td>
                  <td>{aluno.periodo}</td>
                  <td>{aluno.observacoes}</td>
                  <td>
                    <button onClick={() => buscarNotas(aluno)}>Ver Notas</button>
                    <button onClick={() => handleEditarNota(aluno)}>Editar Notas</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noResults}>Nenhum aluno encontrado com os filtros aplicados.</p>
        )
      ) : (
        <p className={styles.noResults}>Use pelo menos um filtro para visualizar os alunos.</p>
      )}
    </div>
  );
}
