const db = require ('../database/connection');

module.exports = {
    async listarUsuario(request, response) {
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de usuarios.',
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

    async cadastrarUsuarios(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Cadastro de usuarios.',
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

    async editarUsuarios(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Editar usuarios.',
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

    async apagarUsuarios(request, response) {
        try {
            return response.status(200).json ({
                sucesso: true, 
                mensagem: 'Apagar usuarios.',
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