"use client";

import { useState, useEffect } from "react";
import axios from "axios";  // Importa o axios para as requisições API
import styles from "./page.module.css";
import debounce from "lodash/debounce";

export default function AdicionarAluno() {
  const [telaAtual, setTelaAtual] = useState("menu"); 
  const [formularioNotas, setFormularioNotas] = useState(false);  // Novo estado para controlar o formulário de notas

  // Estados para informações do aluno
  const [alunoId, setAlunoId] = useState(null);
  const [nome, setNome] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [dataNascimento, setDataNascimento] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [profissaoPai, setProfissaoPai] = useState("");
  const [nacionalidadePai, setNacionalidadePai] = useState("");
  const [residencia, setResidencia] = useState("");
  const [matriculaPrimitiva, setMatriculaPrimitiva] = useState("");
  const [matriculaAnoLetivo, setMatriculaAnoLetivo] = useState("");
const [anoSelecionado, setAnoSelecionado] = useState("");
const [anosPreenchidos, setAnosPreenchidos] = useState([]);
  const [eliminacaoData, setEliminacaoData] = useState("");
  const [eliminacaoCausa, setEliminacaoCausa] = useState("");
  const [observacao, setObservacao] = useState(""); // Estado para observação;
  const [religiao, setReligiao] = useState("");

  // Estados para notas
  const [matematica, setMatematica] = useState("");
  const [portugues, setPortugues] = useState("");
  const [estudosSociais, setEstudosSociais] = useState("");
  const [ciencias, setCiencias] = useState("");

  // Estado para o sexo
  const [sexo, setSexo] = useState("");

  const handleSalvarAno = (e) => {
  e.preventDefault();

  const dadosDoAno = {
    ano_curso: anoSelecionado,
    aluno_id: alunoId,
    matematica,
    portugues,
    estudos_sociais: estudosSociais,
    ciencias,
    // demais dados do aluno, se desejar separá-los por ano
  };

  setAnosPreenchidos((prev) => [...prev, dadosDoAno]);

  // Limpar campos
  setMatematica("");
  setPortugues("");
  setEstudosSociais("");
  setCiencias("");
  setAnoSelecionado("");

  // Perguntar se quer continuar
  const continuar = window.confirm("Deseja adicionar dados para outro ano?");
  if (!continuar) {
    enviarTodosOsDados(); // Função que envia todos os dados salvos
  }
};

const enviarTodosOsDados = async () => {
  try {
    for (const ano of anosPreenchidos) {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notas`, ano);
    }
    alert("Dados enviados com sucesso!");
    resetForm();
    setTelaAtual("menu");
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
    alert("Erro ao salvar os dados.");
  }
};



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
      ano_curso: anoSelecionado,
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

  const [selecionouSugestao, setSelecionouSugestao] = useState(false);

useEffect(() => {
  if (!selecionouSugestao) {
    buscarSugestoes(nome);
  } else {
    setSelecionouSugestao(false); // Resetar flag para próximas digitações
  }
}, [nome]);


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

  const buscarSugestoes = debounce(async (texto) => {
    if (!texto || texto.length < 2) {
      setSugestoes([]);
      return;
    }

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alunos?busca=${texto}`);
      const nomesFiltrados = res.data.dados.filter(aluno =>
        aluno.aluno_nome.toLowerCase().includes(texto.toLowerCase())
      );
      setSugestoes(nomesFiltrados);
    } catch (err) {
      console.error("Erro ao buscar sugestões:", err);
    }
  }, 300);

  // Sempre que o nome mudar, busca sugestões
  useEffect(() => {
    buscarSugestoes(nome);
  }, [nome]);



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
          {/* Campo nome */}
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.input}
          />

          {/* Lista suspensa de sugestões */}
          {sugestoes.length > 0 && (
            <ul className={styles.sugestoesLista}>
              {sugestoes.map((aluno) => (
                <li
  key={aluno.id}
onClick={async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/buscar?busca=${encodeURIComponent(aluno.aluno_nome)}`);
    const dados = res.data.dados[0]; // Pega o primeiro resultado

    if (!dados) {
      alert("Aluno não encontrado.");
      return;
    }


      setNome(dados.aluno_nome);
      setDataNascimento(dados.data_nascimento || "");
      setCidadeNatal(dados.cidade_natal || "");
      setNomePai(dados.nome_pai || "");
      setNomeMae(dados.nome_mae || "");
      setProfissaoPai(dados.profissao_pai || "");
      setNacionalidadePai(dados.nacionalidade_pai || "");
      setResidencia(dados.residencia || "");
      setMatriculaPrimitiva(dados.matricula_primitiva || "");
      setMatriculaAnoLetivo(dados.matricula_ano_letivo || "");
setAnoSelecionado(dados.ano_curso || "");
      setSexo(dados.sexo || "");
      setObservacao(dados.observacao || "");
      setEliminacaoData(dados.eliminacao_data || "");
      setEliminacaoCausa(dados.eliminacao_causa || "");
      setReligiao(dados.religiao || "");
    setAlunoId(dados.id);
    setSugestoes([]);
    setSelecionouSugestao(true);  // Marca que selecionou a sugestão
  } catch (err) {
    console.error("Erro ao buscar aluno:", err);
    alert("Erro ao buscar dados do aluno.");
  }
}}

  className={styles.sugestaoItem}
>
  {aluno.aluno_nome}
</li>

              ))}
              <li>
                <button onClick={() => setSugestoes([])}>Cancelar</button>
              </li>
            </ul>
          )}
          <input type="text" placeholder="Religiao" value={religiao} onChange={(e) => setReligiao(e.target.value)} className={styles.input} />
          <input
            type={dataNascimento ? "date" : "text"}
            value={dataNascimento || ""}
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => {
              if (!dataNascimento) e.target.type = "text";
            }}
            onChange={(e) => setDataNascimento(e.target.value)}
            className={styles.input}
            placeholder="Data de Nascimento"
          />
          <input type="text" placeholder="Naturalidade" value={cidadeNatal} onChange={(e) => setCidadeNatal(e.target.value)} required className={styles.input} />
          <input type="text" placeholder="Nome do Pai" value={nomePai} onChange={(e) => setNomePai(e.target.value)} required className={styles.input} />
          <input type="text" placeholder="Nome da Mãe" value={nomeMae} onChange={(e) => setNomeMae(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Profissão do Pai" value={profissaoPai} onChange={(e) => setProfissaoPai(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Nacionalidade do Pai" value={nacionalidadePai} onChange={(e) => setNacionalidadePai(e.target.value)} required className={styles.input} />
          <input type="text" placeholder="Residência" value={residencia} onChange={(e) => setResidencia(e.target.value)} required className={styles.input} />
          <input
            type={matriculaPrimitiva ? "date" : "text"}
            value={matriculaPrimitiva || ""}
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => {
              if (!matriculaPrimitiva) e.target.type = "text";
            }}
            onChange={(e) => setMatriculaPrimitiva(e.target.value)}
            className={styles.input}
            placeholder="Matrícula Primitiva"
          />
          <input
            type={matriculaAnoLetivo ? "date" : "text"}
            value={matriculaAnoLetivo || ""}
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => {
              if (!matriculaAnoLetivo) e.target.type = "text";
            }}
            onChange={(e) => setMatriculaAnoLetivo(e.target.value)}
            className={styles.input}
            placeholder="Matrícula Ano Letivo"
          />

<select value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)} required className={styles.select}>
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
  <form onSubmit={handleSalvarAno} className={styles.form}>
    <h3>Preencher notas por ano</h3>

    <select
      value={anoSelecionado}
      onChange={(e) => setAnoSelecionado(e.target.value)}
      required
      className={styles.select}
    >
      <option value="">Selecione o Ano</option>
      {[1, 2, 3, 4].map((ano) => (
        <option
          key={ano}
          value={ano}
          disabled={anosPreenchidos.some((a) => a.ano_curso === String(ano))}
        >
          {ano}º Ano
        </option>
      ))}
    </select>

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

    <button type="submit" className={styles.button}>Salvar Ano</button>
    <button type="button" className={styles.buttonSecundario} onClick={() => setFormularioNotas(false)}>Pular</button>
  </form>
)}

      <button className={styles.button} onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
}
