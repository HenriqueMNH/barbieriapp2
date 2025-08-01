"use client";

import { useState, useEffect, React, Fragment } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

export default function ListaAlunos() {
  const router = useRouter();

  const [alunos, setAlunos] = useState([]);
  const [filtros, setFiltros] = useState({ // Aqui é onde está os dados do filtro
    nome: "",
    ano: "",
    anoEstudo: "",
    serie: "",
    periodo: "",
    sexo: "",
  });
  const [notas, setNotas] = useState([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [anoCurso, setAnoCurso] = useState('');  // Armazenando o ano selecionado
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVerNotasAberto, setModalVerNotasAberto] = useState(false);
  const [notasEditando, setNotasEditando] = useState({ // Aqui é onde está os dados das notas
    matematica: "",
    portugues: "",
    estudos_sociais: "",
    ciencias: ""
  });
  const [modalEditarAlunoAberto, setModalEditarAlunoAberto] = useState(false);
  const [alunoEditando, setAlunoEditando] = useState({ // Aqui os dados do aluno
    aluno_nome: "",
    data_nascimento: "",
    cidade_natal: "",
    sexo: "",
    nome_pai: "",
    nome_mae: "",
    profissao_pai: "",
    nacionalidade_pai: "",
    residencia: "",
    matricula_primitiva: "",
    matricula_ano_letivo: "",
    ano_curso: "",
    periodo: "",
    observacao: "",
    religiao: "",
  });

  const [alunoExpandidoId, setAlunoExpandidoId] = useState(null);

  const toggleExpandir = (id) => {
    setAlunoExpandidoId(prev => (prev === id ? null : id));
  };

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

  const toggleSelecionarAluno = (id) => {
  setAlunosSelecionados((prevSelecionados) =>
    prevSelecionados.includes(id)
      ? prevSelecionados.filter((alunoId) => alunoId !== id)
      : [...prevSelecionados, id]
  );
};

const toggleSelecionarTodos = () => {
  if (todosSelecionados) {
    setAlunosSelecionados([]);
  } else {
    setAlunosSelecionados(alunosFiltrados.map((a) => a.id));
  }
};


  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const resetarFiltros = () => {
    setFiltros({
      nome: "",
      ano: "",
      anoEstudo: "",
      serie: "",
      periodo: "",
      sexo: "",
    });
  };

  const gerarPdfAluno = async (aluno) => {
    if (!aluno || !aluno.id) {
      alert("Aluno não selecionado corretamente.");
      return;
    }

    try {
      // Envia uma solicitação para o backend para gerar o PDF
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alunos/${aluno.id}/pdf`, {
        responseType: "blob", // Para receber o arquivo PDF como um blob
      });

      // Cria um link temporário para baixar o arquivo PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Informacoes_${aluno.aluno_nome}.pdf`;
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o PDF. Tente novamente.");
    }
  };



  const filtrosAtivos = Object.values(filtros).some((valor) => valor !== "");

const alunosFiltrados = alunos.filter((aluno) => {
  const filtroNome = filtros.nome ? aluno.aluno_nome.toLowerCase().includes(filtros.nome.toLowerCase()) : true;
  const filtroAno = filtros.ano ? aluno.matricula_ano_letivo.includes(filtros.ano) : true;
  const filtroAnoEstudo = filtros.anoEstudo ? aluno.ano_curso?.toString() === filtros.anoEstudo : true;
  const filtroSerie = filtros.serie ? aluno.ano_curso?.toString()[1] === filtros.serie : true;
  const filtroPeriodo = filtros.periodo ? aluno.periodo === filtros.periodo : true;
  const filtroSexo = filtros.sexo ? aluno.sexo === filtros.sexo : true;
  return filtroNome && filtroAno && filtroAnoEstudo && filtroSerie && filtroPeriodo && filtroSexo;
});

const todosSelecionados = alunosFiltrados.length > 0 && alunosFiltrados.every(aluno => alunosSelecionados.includes(aluno.id));


  const deletarAluno = async (aluno) => { //Aqui ele realiza a exclusão de alunos 
    if (!aluno || !aluno.id) {
      alert("ID do aluno inválido.");
      return;
    }

    if (!confirm("Tem certeza que deseja excluir este aluno?")) {
      return;
    }

    try {
      console.log("ID enviado para deletar:", aluno.id);

      // Deletando o aluno baseado no id
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/alunos/${aluno.id}`);

      alert("Aluno excluído com sucesso!");

      // Buscar novamente a lista do backend para garantir a atualização correta
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alunos`);
      setAlunos(response.data.dados);
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      alert("Erro ao excluir aluno. Verifique a conexão ou tente novamente.");
    }
  };


const verNotas = async (aluno) => {
  setAlunoSelecionado(aluno);
  setAlunoSelecionado(""); // ou o ano padrão se quiser
  setNotas([]); // limpa as notas anteriores

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notas/${aluno.id}`);

    if (response.data.sucesso) {
      const notasRecebidas = response.data.dados || [];
      setNotas(notasRecebidas); // Mesmo que vazio, funciona
    }
  } catch (erro) {
    // Se der erro 404, assume que não tem notas ainda
    if (erro.response && erro.response.status === 404) {
      console.log("Aluno ainda sem notas cadastradas.");
      setNotas([]); // Mantém o array vazio
    } else {
      console.error("Erro ao buscar notas:", erro);
    }
  }

  setModalVerNotasAberto(true); // Abre o modal independentemente
};

  const formatarData = (data) => { //Isso serve para deixar a data mas bonita e se livrar das outras informações, deixando apenas o dia/mês/ano para ver
    const novaData = new Date(data);
    return novaData.toISOString().slice(0, 19).replace("T", " "); // 'YYYY-MM-DD HH:MM:SS'
  };


  const buscarNotas = async (aluno) => { //Aqui a gente pega as notas para realizar uma edição caso queira 
    try {
      if (!aluno || !aluno.id) {
        alert("Aluno não selecionado corretamente.");
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notas/${aluno.id}`);

      if (response.data.sucesso && response.data.dados.length > 0) {
        const nota = response.data.dados[0];
        setNotasEditando({
          matematica: nota.matematica,
          portugues: nota.portugues,
          estudos_sociais: nota.estudos_sociais,
          ciencias: nota.ciencias,
        });
      } else {
        // Inicializa com campos vazios para permitir criação de novas notas
        setNotasEditando({
          matematica: "",
          portugues: "",
          estudos_sociais: "",
          ciencias: "",
        });
      }

      setAlunoSelecionado(aluno);
      setModalAberto(true);
      setModalVerNotasAberto(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Nenhuma nota encontrada, mas não é um erro — apenas inicializa os campos
        console.warn("Nenhuma nota existente para este aluno. Inicializando campos vazios.");
        setNotasEditando({
          matematica: "",
          portugues: "",
          estudos_sociais: "",
          ciencias: "",
        });
      } else {
        console.error("Erro ao buscar notas:", error);
        alert("Erro ao carregar notas. Tente novamente.");
        // Mesmo em caso de erro, inicializa campos vazios para não travar a interface
        setNotasEditando({
          matematica: "",
          portugues: "",
          estudos_sociais: "",
          ciencias: "",
        });
      }

      // Garante que o modal ainda será aberto mesmo se algo falhar
      setAlunoSelecionado(aluno);
      setModalAberto(true);
      setModalVerNotasAberto(false);
    }

  };

  const salvarNotas = async () => { //E aqui as notas seram editadas com sucesso 
    if (!alunoSelecionado || !alunoSelecionado.id) {
      alert("Aluno não selecionado corretamente.");
      return;
    }

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/notas/${alunoSelecionado.id}`, notasEditando);
      alert("Notas editadas com sucesso!");

      setModalAberto(false);
      buscarNotas(alunoSelecionado);
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
      alert("Erro ao salvar as notas.");
    }
  };

  const editarAluno = (aluno) => { //Ainda edição, mas dessa vez para as informações dos alunos 
    setAlunoSelecionado(aluno);
    setAlunoEditando({
      aluno_nome: aluno.aluno_nome || "",
      data_nascimento: aluno.data_nascimento || "",
      cidade_natal: aluno.cidade_natal || "",
      sexo: aluno.sexo || "",
      nome_pai: aluno.nome_pai || "",
      nome_mae: aluno.nome_mae || "",
      profissao_pai: aluno.profissao_pai || "",
      nacionalidade_pai: aluno.nacionalidade_pai || "",
      residencia: aluno.residencia || "",
      matricula_primitiva: aluno.matricula_primitiva || "",
      matricula_ano_letivo: aluno.matricula_ano_letivo || "",
      ano_curso: aluno.ano_curso || "",
      periodo: aluno.periodo || "",
      observacao: aluno.observacao || "",
      religiao: aluno.religiao || "",  // Garantir que o valor seja uma string vazia, se não houver.
    });
    setModalEditarAlunoAberto(true);
  };

  const salvarAlunoEditado = async () => {
    try {
      // Verificando se o campo 'cidade_natal' está preenchido
      if (!alunoEditando.cidade_natal) {
        alert("O campo 'Cidade Natal' é obrigatório!");
        return;
      }

      // Formatar a data de nascimento (se necessário)
      const dataNascimentoFormatada = alunoEditando.data_nascimento.split("T")[0];

      // Atualizando o objeto do aluno com a cidade natal
      const alunoAtualizado = { //Lembra do formatarData para deixar a data melhor de se ver, então. Aqui ele está usando ela com todos os itens que usam data
        ...alunoEditando,
        cidade_natal: alunoEditando.cidade_natal,
        data_nascimento: formatarData(alunoEditando.data_nascimento),
        matricula_primitiva: formatarData(alunoEditando.matricula_primitiva),
        matricula_ano_letivo: formatarData(alunoEditando.matricula_ano_letivo),
      };

      // Enviando os dados atualizados para o backend
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/alunos/${alunoSelecionado.id}`, alunoAtualizado);

      alert("Informações do aluno editadas com sucesso!");
      setModalEditarAlunoAberto(false);

      // Recarregar a lista de alunos
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alunos`);
      setAlunos(response.data.dados);
    } catch (error) {
      if (error.response) {
        console.error("Erro ao salvar aluno:", error.response.data);
        alert(`Erro ao salvar aluno: ${error.response.data.message || error.response.statusText}`);
      } else {
        console.error("Erro ao salvar aluno:", error);
        alert("Erro ao salvar as informações do aluno. Tente novamente.");
      }
    }
  };

  return (

    <div className={styles.listaPage}>
      <button onClick={() => router.back()} className={styles.voltarButton}>⬅ Voltar</button>
      <h1>Lista de Alunos</h1>

      {modalAberto && ( //Modal para editar as notas do aluno cujo botão editar notas for clicado 
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

      {modalVerNotasAberto && ( // Já esse modal aqui só vê as notas mesmo 
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Notas de {alunoSelecionado?.aluno_nome || "Aluno"}</h2>
            {notas.length > 0 ? (
              <ul>
                {notas.map((nota, index) => (
                  <li key={index}>
                    <strong>Matemática:</strong> {nota.matematica} <br />
                    <strong>Português:</strong> {nota.portugues} <br />
                    <strong>Estudos Sociais:</strong> {nota.estudos_sociais} <br />
                    <strong>Ciências:</strong> {nota.ciencias} <br />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma nota cadastrada para este aluno.</p>
            )}
            <button onClick={() => setModalVerNotasAberto(false)}>Fechar</button>
          </div>
        </div>
      )}

      {modalEditarAlunoAberto && ( //Modal para editar os alunos 
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Editar Informações do Aluno</h2>
            <div>
              <label>Nome</label>
              <input
                type="text"
                value={alunoEditando.aluno_nome}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, aluno_nome: e.target.value })}
              />
            </div>
            <div>
              <label>Religião</label>
              <input
                type="text"
                value={alunoEditando.religiao}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, religiao: e.target.value })}
              />
            </div>
            <div>
              <label>Data de Nascimento</label>
              <input
                type="date"
                value={alunoEditando.data_nascimento}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, data_nascimento: e.target.value })}
              />
            </div>
            <div>
              <label>Cidade Natal</label>
              <input
                type="text"
                value={alunoEditando.cidade_natal}  // Sempre um valor controlado
                onChange={(e) => setAlunoEditando({ ...alunoEditando, cidade_natal: e.target.value })}
              />
            </div>
            <div>
              <label>Sexo</label>
              <input
                type="text"
                value={alunoEditando.sexo}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, sexo: e.target.value })}
              />
            </div>
            <div>
              <label>Nome do Pai</label>
              <input
                type="text"
                value={alunoEditando.nome_pai}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, nome_pai: e.target.value })}
              />
            </div>
            <div>
              <label>Nome da Mãe</label>
              <input
                type="text"
                value={alunoEditando.nome_mae}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, nome_mae: e.target.value })}
              />
            </div>
            <div>
              <label>Profissão do Pai</label>
              <input
                type="text"
                value={alunoEditando.profissao_pai}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, profissao_pai: e.target.value })}
              />
            </div>
            <div>
              <label>Nacionalidade Pai</label>
              <input
                type="text"
                value={alunoEditando.nacionalidade_pai}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, nacionalidade_pai: e.target.value })}
              />
            </div>
            <div>
              <label>Residência</label>
              <input
                type="text"
                value={alunoEditando.residencia}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, residencia: e.target.value })}
              />
            </div>
            <div>
              <label>Matrícula Primitiva</label>
              <input
                type="date"
                value={alunoEditando.matricula_primitiva}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, matricula_primitiva: e.target.value })}
              />
            </div>
            <div>
              <label>Matrícula Ano Letivo</label>
              <input
                type="date"
                value={alunoEditando.matricula_ano_letivo}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, matricula_ano_letivo: e.target.value })}
              />
            </div>
            <div>
              <label>Ano Curso</label>
              <input
                type="text"
                value={alunoEditando.ano_curso}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, ano_curso: e.target.value })}
              />
            </div>
            <div>
              <label>Período</label>
              <input
                type="text"
                value={alunoEditando.periodo}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, periodo: e.target.value })}
              />
            </div>
            <div>
              <label>Observações</label>
              <input
                type="text"
                value={alunoEditando.observacao}
                onChange={(e) => setAlunoEditando({ ...alunoEditando, observacao: e.target.value })}
              />
            </div>
            <button onClick={salvarAlunoEditado}>Salvar</button>
            <button onClick={() => setModalEditarAlunoAberto(false)}>Fechar</button>
          </div>
        </div>
      )}

      <div className={styles.filtros}>
        <input type="text" name="nome" placeholder="Nome" value={filtros.nome} onChange={handleFiltroChange} />
        <input type="text" name="ano" placeholder="Ano" value={filtros.ano} onChange={handleFiltroChange} />
        <input type="text" name="anoEstudo" placeholder="Ano de Estudo" value={filtros.anoEstudo} onChange={handleFiltroChange} />
        <input type="text" name="serie" placeholder="Série" value={filtros.serie} onChange={handleFiltroChange} />
        <input type="text" name="periodo" placeholder="Período" value={filtros.periodo} onChange={handleFiltroChange} />
        <input type="text" name="sexo" placeholder="Sexo" value={filtros.sexo} onChange={handleFiltroChange} />
  <button onClick={resetarFiltros}>Resetar Filtros</button>
  {alunosSelecionados.length > 0 && (
    <button
      style={{ backgroundColor: "#c00", color: "#fff", marginLeft: "10px" }}
      onClick={async () => {
        if (!confirm("Tem certeza que deseja excluir os alunos selecionados?")) return;
        try {
          await Promise.all(
            alunosSelecionados.map(id =>
              axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/alunos/${id}`)
            )
          );
          alert("Alunos excluídos com sucesso!");
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/alunos`);
          setAlunos(response.data.dados);
          setAlunosSelecionados([]);
        } catch (error) {
          console.error("Erro ao excluir alunos:", error);
          alert("Erro ao excluir alunos.");
        }
      }}
    >
      Excluir Selecionados
    </button>
  )}
</div>


      {filtrosAtivos ? (  // Aqui é os dados que estão nos retangulos azuis 
        alunosFiltrados.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
              <th>
  <input
    type="checkbox"
    checked={todosSelecionados}
    onChange={toggleSelecionarTodos}
  />
</th>

                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Naturalidade</th>
                <th>Sexo</th>
                <th>Filiação</th>
                <th>Residência</th>
                <th>Matrícula Primitiva</th>
                <th>Matrícula Ano Letivo</th>
                <th>Ano Curso</th>
                <th>Período</th>
                <th>Observações</th>
                <th>Ver Notas</th>
                <th>Edição</th>
              </tr>
            </thead>
<tbody>
  {alunosFiltrados.map((aluno) => (
    <Fragment key={aluno.id}>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={alunosSelecionados.includes(aluno.id)}
            onChange={() => toggleSelecionarAluno(aluno.id)}
          />
        </td>
                    <td>
                      {aluno.aluno_nome}
                      <button className={styles.pdfButton} onClick={() => gerarPdfAluno(aluno)}>Gerar PDF</button>
                      <button onClick={() => toggleExpandir(aluno.id)}>
                        {alunoExpandidoId === aluno.id ? '▲' : '▼'}
                      </button>
                    </td>
                    <td>{new Date(aluno.data_nascimento).toLocaleDateString()}</td>
                    <td>{aluno.cidade_natal}</td>
                    <td>{aluno.sexo}</td>
                    <td>
                      {/* Concatenando o nome do pai e da mãe com duas quebras de linha */}
                      {aluno.nome_pai && aluno.nome_mae ? (
                        <>
                          {aluno.nome_pai}<br />
                          <br /> {/* Adicionando uma linha em branco entre os nomes */}
                          {aluno.nome_mae}
                        </>
                      ) : (
                        `${aluno.nome_pai ? aluno.nome_pai : ''} ${aluno.nome_mae ? aluno.nome_mae : ''}`
                      )}
                    </td>
                    <td>{aluno.residencia}</td>
                    <td>{new Date(aluno.matricula_primitiva).toLocaleDateString()}</td>
                    <td>{new Date(aluno.matricula_ano_letivo).toLocaleDateString()}</td>
                    <td>{aluno.ano_curso}</td>
                    <td>{aluno.periodo}</td>
                    <td>{aluno.observacao}</td>
                    <td>
                      <button onClick={() => verNotas(aluno)}>Ver Notas</button>
                    </td>
                    <td>
                      <button onClick={() => buscarNotas(aluno)}>Editar Notas</button>
                      <button onClick={() => editarAluno(aluno)}>Editar Aluno</button>
                      <button onClick={() => deletarAluno(aluno)}>Excluir Aluno</button>
                    </td>
                  </tr>

                  {alunoExpandidoId === aluno.id && (
                    <tr>
                      <td colSpan={18}>
                        <div style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
                          <strong>Informações Adicionais:</strong><br />
                          Religião: {aluno.religiao}<br />
                          Profissão do Pai: {aluno.profissao_pai}<br />
                          Nacionalidade do Pai: {aluno.nacionalidade_pai}<br />
                          Telefone: {aluno.telefone}<br />
                          Email: {aluno.email}<br />
                          {/* Aqui você pode inserir outras seções como notas detalhadas por ano */}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum aluno encontrado com os filtros aplicados.</p>
        )
      ) : (
        <p>Insira filtros para buscar alunos.</p>
      )}
    </div>
  );
}
