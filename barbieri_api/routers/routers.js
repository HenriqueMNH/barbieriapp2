const express = require('express'); 
const router = express.Router(); 
const {body} = require('express-validator');

//referência a controllers que serão utilizados nas rotas
const UsuariosController = require('../controllers/usuarios');
const NotasController = require('../controllers/notas');
const EscolasController = require('../controllers/escolas');
const AlunosController = require('../controllers/alunos');

//router usuarios
router.get('/usuarios', UsuariosController.listarUsuario);
router.post('/usuarios', UsuariosController.cadastrarUsuarios);
router.patch('/usuarios', UsuariosController.editarUsuarios);
router.delete('/usuarios', UsuariosController.apagarUsuarios);

//router notas
router.get('/notas', NotasController.listarNotas);
router.post('/notas', NotasController.cadastrarNotas);
router.patch('/notas', NotasController.editarNotas);
router.delete('/notas', NotasController.apagarNotas);

//router escolas
router.get('/escolas', EscolasController.listarEscolas);
router.post('/escolas', EscolasController.cadastrarEscolas);
router.patch('/escolas', EscolasController.editarEscolas);
router.delete('/escolas', EscolasController.apagarEscolas);

//router alunos
router.get('/alunos', AlunosController.listarAlunos);
router.post('/alunos', AlunosController.cadastrarAlunos);
router.patch('/alunos', AlunosController.editarAlunos);
router.delete('/alunos', AlunosController.apagarAlunos);



module.exports = router;