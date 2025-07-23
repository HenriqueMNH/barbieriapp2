const db = require('../database/connection');

module.exports = {
    async listarNotas(request, response) {
        try {
            const { aluno_id } = request.params; // Acessando o ID do aluno na URL

            // Consulta para pegar as notas do aluno
            const sql = `SELECT n.*, a.aluno_nome FROM notas n
            JOIN alunos a ON n.aluno_id = a.id
            WHERE n.aluno_id = ?
            `;
            const [notas] = await db.query(sql, [aluno_id]);

            // Verifica se existem notas para o aluno
            if (notas.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Notas não encontradas para este aluno.',
                    dados: null
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Notas dos alunos.',
                dados: notas
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async cadastrarNotas(request, response) {
        try {
            const { aluno_id, matematica, portugues, estudos_sociais, ciencias } = request.body;

            const sql = `INSERT INTO notas (aluno_id, matematica, portugues, estudos_sociais, ciencias)
                         VALUES (?, ?, ?, ?, ?);`;

            const values = [aluno_id, matematica, portugues, estudos_sociais, ciencias];

            await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Notas cadastradas com sucesso.',
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar notas.',
                dados: error.message,
            });
        }
    },

async editarNotas(request, response) {
  try {
    const { aluno_id } = request.params;
    const { matematica, portugues, estudos_sociais, ciencias } = request.body;

    const sqlUpdate = `
      UPDATE notas 
      SET matematica = ?, portugues = ?, estudos_sociais = ?, ciencias = ? 
      WHERE aluno_id = ?;
    `;
    const values = [matematica, portugues, estudos_sociais, ciencias, aluno_id];

    const [resultado] = await db.query(sqlUpdate, values);

    if (resultado.affectedRows === 0) {
      // Não encontrou notas para atualizar, então insere uma nova linha
      const sqlInsert = `
        INSERT INTO notas (aluno_id, matematica, portugues, estudos_sociais, ciencias)
        VALUES (?, ?, ?, ?, ?);
      `;
      const insertValues = [aluno_id, matematica, portugues, estudos_sociais, ciencias];
      await db.query(sqlInsert, insertValues);
      
      return response.status(201).json({
        sucesso: true,
        mensagem: 'Notas criadas com sucesso.',
      });
    }

    return response.status(200).json({
      sucesso: true,
      mensagem: 'Notas atualizadas com sucesso.',
    });
  } catch (error) {
    return response.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao editar notas.',
      dados: error.message,
    });
  }
},
    

    async apagarNotas(request, response) {
        try {
            const { aluno_id } = request.params; // Pegando o ID do aluno da URL
    
            // Verifica se existem notas para o aluno antes de deletar
            const verificaSql = `SELECT * FROM notas WHERE aluno_id = ?`;
            const [notas] = await db.query(verificaSql, [aluno_id]);
    
            if (notas.length === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Nenhuma nota encontrada para este aluno.',
                });
            }
    
            // Query para deletar as notas do aluno
            const sql = `DELETE FROM notas WHERE aluno_id = ?`;
            await db.query(sql, [aluno_id]);
    
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Notas apagadas com sucesso.',
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar notas.',
                dados: error.message,
            });
        }
    },
};
