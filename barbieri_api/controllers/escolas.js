const db = require('../database/connection');

module.exports = {
    async listarEscolas(request, response) {
        try {
            const sql = 'SELECT * FROM escolas'; // Consulta para listar todas as escolas
            const escolas = await db.query(sql);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de escolas.',
                dados: escolas[0] // Retorna os dados das escolas
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensagem
            });
        }
    },

    async cadastrarEscolas(request, response) {
        try {
            const { escola_nome, escola_endereco, escola_telefone } = request.body;

            if (!escola_nome || !escola_endereco || !escola_telefone) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Nome, endereço e telefone da escola são obrigatórios.'
                });
            }

            const sql = 'INSERT INTO escolas (escola_nome, escola_endereco, escola_telefone) VALUES (?, ?, ?)';
            const values = [escola_nome, escola_endereco, escola_telefone];

            const execSql = await db.query(sql, values);

            const escola_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Cadastro de escola realizado com sucesso.',
                dados: escola_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensagem
            });
        }
    },

    async editarEscolas(request, response) {
        try {
            const { escola_nome, escola_endereco, escola_telefone } = request.body;
            const { escola_id } = request.params;

            // Verifica se o ID da escola foi enviado corretamente
            if (!escola_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'O ID da escola é obrigatório na URL.'
                });
            }

            // Verifica se os dados foram enviados corretamente
            if (!escola_nome && !escola_endereco && !escola_telefone) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Pelo menos um dado da escola precisa ser informado para atualização.'
                });
            }

            const sql = `
                UPDATE escolas
                SET
                    escola_nome = IFNULL(?, escola_nome),
                    escola_endereco = IFNULL(?, escola_endereco),
                    escola_telefone = IFNULL(?, escola_telefone)
                WHERE id = ?`;
            const values = [escola_nome, escola_endereco, escola_telefone, escola_id];

            const [atualizaDados] = await db.query(sql, values);

            // Verifica se alguma linha foi afetada
            if (atualizaDados.affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Nenhuma escola encontrada com ID ${escola_id}.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Escola ${escola_id} atualizada com sucesso.`,
                dados: atualizaDados.affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensagem
            });
        }
    },

    async apagarEscolas(request, response) {
        try {
            const { escola_id } = request.params;

            // Verifica se o ID foi enviado corretamente
            if (!escola_id) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'O ID da escola é obrigatório.'
                });
            }

            const sql = 'DELETE FROM escolas WHERE id = ?';
            const values = [escola_id];

            const excluir = await db.query(sql, values);

            // Verifica se a escola foi excluída
            if (excluir[0].affectedRows === 0) {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: `Nenhuma escola encontrada com ID ${escola_id}.`
                });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: `Escola ${escola_id} excluída com sucesso.`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensagem
            });
        }
    }
};
