const usuarios = require("../databases/usuarios.json")
const bcrypt = require("bcrypt");
const fs = require("fs");

function listar() {
    console.table(usuarios, ['id', 'nome', 'email']);
}

function salvar() {
    const usuarios = [
        {
            "id": 156,
            "nome": "Raul",
            "email": "raul@globo.com",
            "senha": "$2b$10$aLgye6UWdHYWVpbzXL1DhePNPr7YYIKsanzQoKwMrRj3mmt7kDO16",
            "enderecos": [
                "Av das Espatódeas, 55",
                "Novo endereço de Raul",
                "tttttttt"
            ],
            "formasDePagamento": [
                "2222 2222 2222 2222"
            ]
        },
    ];
    fs.writeFileSync('./databases/usuarios.json', JSON.stringify(usuarios, null, 4))
}

function cadastrar(objeto) {
    let novoId = usuarios[usuarios.length - 1].id + 1
    let senhaCriptografada = bcrypt.hashSync(objeto.senha, 10);
    let usuario = {
        id: novoId,
        nome: objeto.nome,
        email: objeto.email,
        senha: senhaCriptografada,
        enderecos: objeto.enderecos,
        formasDePagamento: [],

    }
    usuarios.push(usuario);
    fs.writeFileSync("./databases/usuarios.json", JSON.stringify(usuarios, null, 4))
}

function detalhar(idUsuario) {
    var usuario = usarios.find(usuario => idUsuario === usuario.id);
    console.table(usuario.enderecos);
    console.table(usuario.formasDePagamento);
}

function remover(idDoUsuarioParaRemover) {
    var indexUsuario = usuarios.findIndex((item) => item.id === idDoUsuarioParaRemover);
    usuarios.splice(indexUsuario, 1);
}

function alterar(novosDados, idUsuario) {
    if (novosDados) {
        let senhaCriptografada = bcrypt.hashSync(novosDados.senha, 10);
        let usuarioAlterado = usuarios.find(usuario => idUsuario === usuario.id);
        let novosDadosAlterados = {
            ...usuarioAlterado,
            ...novosDados,
            senha: senhaCriptografada
        }
    }
}

function addEndereco(novoEndereco, idUsuario) {
    var indexUsuario = usuarios.findIndex((item) => item.id === idUsuario);
    usuarios[indexUsuario].enderecos.push(novoEndereco)
    fs.writeFileSync("./databases/usuarios.json", JSON.stringify(usuarios, null, 4))
}

function removerEndereco(posicaoDoEndereco, idUsuario) {
    var usuario = usuarios.find(usuario => idUsuario === usuario.id);
    usuario.enderecos.splice(posicaoDoEndereco, 1)
}

function alterarEndereco(posicaoDoEndereco, novoEndereco, idUsuario) {
    var usuario = usuarios.find(usuario => idUsuario === usuario.id);
    usuario.enderecos[posicaoDoEndereco] = novoEndereco
}

function addFormaDePagamento(novaFormaDePagamento, idUsuario) {
    var usuario = usuarios.find(usuario => idUsuario === usuario.id);
    usuario.formasDePagamento.push(novaFormaDePagamento);
    fs.writeFileSync("./databases/usuarios.json", JSON.stringify(usuarios, null, 4))
}

function removerFormaDePagamento(posicaoDaFormaDePagamento, idUsuario) {
    var usuario = usuarios.find(usuario => idUsuario === usuario.id);
    usuario.formasDePagamento.splice(posicaoDaFormaDePagamento, 1)
}

function alterarFormaDePagamento(novaFormaDePagamento, posicaoDaFormaDePagamento, idUsuario) {
    var usuario = usuarios.find(usuario => idUsuario === usuario.id);
    usuario.formasDePagamento[posicaoDaFormaDePagamento] = novaFormaDePagamento
}

const UsuariosServices = {
    salvar,
    cadastrar,
    listar,
    detalhar,
    remover,
    alterar,
    addEndereco,
    removerEndereco,
    alteraEndereco: alterarEndereco,
    addFormaDePagamento,
    removerFormaDePagamento,
    alterarFormaDePagamento
}

module.exports = UsuariosServices;