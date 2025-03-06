const db = require ('../database/connection');

module.exports = {
    async listarNotas(request, response) {
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Notas dos alunos.',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.mensagem
            });
        }
    },

    async cadastrarNotas(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Cadastro de notas.',
                dados: null
            });
        } catch(error) {
            return response.status(500).json ({
                sucesso: false,
                mensagem: 'Erro na requisição. ',
                dados: error.mensagem
            });
        }
    },

    async editarNotas(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Editar notas.',
                dados: null
            });
        } catch(error) {
            return response.status(500).json ({
                sucesso: false,
                mensagem: 'Erro na requisição. ',
                dados: error.mensagem
            });
        }
    },

    async apagarNotas(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Apagar notas.',
                dados: null
            });
        } catch(error) {
            return response.status(500).json ({
                sucesso: false,
                mensagem: 'Erro na requisição. ',
                dados: error.mensagem
            });
        }
    },


}