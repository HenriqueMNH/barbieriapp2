"use client";

import { useState } from "react";
import axios from "axios";  // Importa o axios para as requisições API
import styles from "./page.module.css";

export default function AdicionarAluno() {
  const [telaAtual, setTelaAtual] = useState("menu");
  const [formularioNotas, setFormularioNotas] = useState(false);  // Novo estado para controlar o formulário de notas

  // Estados para informações do aluno
  const [alunoId, setAlunoId] = useState(null);
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
  const [observacao, setObservacao] = useState(""); // Estado para observação;
  const [religiao, setReligiao] = useState("")

  // Estados para notas
  const [matematica, setMatematica] = useState("");
  const [portugues, setPortugues] = useState("");
  const [estudosSociais, setEstudosSociais] = useState("");
  const [ciencias, setCiencias] = useState("");

  // Estado para o sexo
  const [sexo, setSexo] = useState("");

  const handleSalvarAluno = async (e) => {
    e.preventDefault();
  
    // Dados do aluno
    const alunoData = {
      aluno_nome: nome,
      data_nascimento: dataNascimento,
      cidade_natal: cidadeNatal,
      nome_pai: nomePai,
      nome_mae: nomeMae,
      profissao_pai: profissaoPai,
      nacionalidade_pai: nacionalidadePai,
      residencia: residencia,
      matricula_primitiva: matriculaPrimitiva,
      matricula_ano_letivo: matriculaAnoLetivo,
      ano_curso: anoCurso,
      sexo: sexo,
      observacao: observacao,
      // Verifique se a data de eliminação é válida antes de enviar
      eliminacao_data: eliminacaoData ? eliminacaoData : null,  // Se estiver vazio, envia null
      eliminacao_causa: eliminacaoCausa,
      religiao: religiao,
    };
    
    console.log("Dados do aluno enviados:", alunoData);
    
    try {
      const alunoResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/alunos`, alunoData);
      console.log("Resposta do servidor:", alunoResponse);
      setAlunoId(alunoResponse.data.dados);  // Armazene o alunoId
            // Após salvar o aluno, mostramos o formulário de notas
      setFormularioNotas(true);
      
      alert("Aluno cadastrado com sucesso! Agora, insira as notas.");

    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error.response || error);
      alert("Ocorreu um erro ao salvar as informações.");
    }
  };

  const handleSalvarNotas = async (e) => {
    e.preventDefault();

    const notasData = {
      aluno_id: alunoId,  // Agora você pode usar o alunoId aqui
      matematica,
      portugues,
      estudos_sociais: estudosSociais,
      ciencias,
    };
        
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notas`, notasData);
      alert("Notas cadastradas com sucesso!");
      setTelaAtual("menu");
      resetForm();
    } catch (error) {
      console.error("Erro ao cadastrar notas:", error);
      alert("Ocorreu um erro ao salvar as notas.");
    }
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
    setObservacao(""); // Resetando a observação
    setSexo("");  // Limpar o campo sexo ao resetar o formulário
    setReligiao("");
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
          <input type="text" placeholder="Religiao" value={religiao} onChange={(e) => setReligiao(e.target.value)} required className={styles.input} />
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
          </select>
          
          <select value={sexo} onChange={(e) => setSexo(e.target.value)} required className={styles.select}>
            <option value="">Selecione o Sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>

          <textarea 
            placeholder="Observação (Opcional)" 
            value={observacao} 
            onChange={(e) => setObservacao(e.target.value)} 
            className={styles.textarea}
          ></textarea>

          <button type="submit" className={styles.button}>Próximo</button>
          <button type="button" className={styles.buttonSecundario} onClick={() => setTelaAtual("menu")}>Cancelar</button>
        </form>
      )}

      {/* Formulário para notas */}
{/* Formulário para notas */}
{formularioNotas && (
  <form onSubmit={handleSalvarNotas} className={styles.form}>
    <input 
      type="text" 
      placeholder="Matemática" 
      value={matematica} 
      onChange={(e) => setMatematica(e.target.value)} 
      className={styles.input} 
    />
    <input 
      type="text" 
      placeholder="Português" 
      value={portugues} 
      onChange={(e) => setPortugues(e.target.value)} 
      className={styles.input} 
    />
    <input 
      type="text" 
      placeholder="Estudos Sociais" 
      value={estudosSociais} 
      onChange={(e) => setEstudosSociais(e.target.value)} 
      className={styles.input} 
    />
    <input 
      type="text" 
      placeholder="Ciências" 
      value={ciencias} 
      onChange={(e) => setCiencias(e.target.value)} 
      className={styles.input} 
    />

    <button type="submit" className={styles.button}>Salvar Notas</button>
    <button type="button" className={styles.buttonSecundario} onClick={() => setFormularioNotas(false)}>Pular</button>
  </form>
)}

      <button className={styles.button} onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
}
