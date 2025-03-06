const db = require ('../database/connection');

module.exports = {
    async listarEscolas(request, response) {
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de escolas.',
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

    async cadastrarEscolas(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Cadastro de escolas.',
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

    async editarEscolas(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Editar escolas.',
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

    async apagarEscolas(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Apagar escolas.',
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