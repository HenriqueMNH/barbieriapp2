const db = require ('../database/connection');

module.exports = {
    async listarAlunos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de alunos.',
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

    async cadastrarAlunos(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Cadastro de alunos.',
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

    async editarAlunos(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Editar alunos.',
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

    async apagarAlunos(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Apagar alunos.',
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