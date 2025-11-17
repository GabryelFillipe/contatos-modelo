'use strict'

import { lerContatos } from "./contatos.js"
import { criarContato } from "./contatos.js"
import { atualizarContato } from "./contatos.js"
import { deletarContato } from "./contatos.js"

function criarCardContato(contato) {

    const cardContato = document.createElement('div')
    cardContato.classList.add('card-contato')
    cardContato.id = contato.nome
    cardContato.dataset.id = contato.id


    const imagemReserva = '../img/erro.webp'
    let img = contato.foto
    if (img == null || img == undefined || img.includes('semFoto')) {
        img = '../img/avatar1.avif'
    }

    const fotoPerfil = document.createElement('img')
    fotoPerfil.onerror = function () {
        this.src = imagemReserva
    }
    fotoPerfil.src = img

    const idContato = document.createElement('h2')
    idContato.textContent = contato.nome
    if (contato.nome == null || contato.nome == '')
        idContato.textContent = "usuario sem nome"

    const numeroContato = document.createElement('p')
    numeroContato.textContent = contato.celular
    if (contato.celular == null || contato.celular == '')
        numeroContato.textContent = "usuario sem telefone"

    cardContato.appendChild(fotoPerfil)
    cardContato.appendChild(idContato)
    cardContato.appendChild(numeroContato)

    return cardContato
}

async function popularContatos() {

    const containerContatos = document.getElementById('container')
    containerContatos.replaceChildren()

    const contatos = await lerContatos()

    contatos.forEach(contato => {
        const cardContato = criarCardContato(contato)
        containerContatos.appendChild(cardContato)
    })
}

function preencherFormulario(contato) {

    document.getElementById('formulario').dataset.id = contato.id

    const fotoPreview = document.getElementById('preview-image')
    if (contato.foto) {
        fotoPreview.src = contato.foto
    } else {
        fotoPreview.src = './img/preview-icon.png'
    }

    const idContato = document.getElementById('nome')
    idContato.value = contato.nome || ''
    idContato.readOnly = true

    const emailContato = document.getElementById('email')
    emailContato.value = contato.email || ''
    emailContato.readOnly = true

    const celularContato = document.getElementById('celular')
    celularContato.value = contato.celular || ''
    celularContato.readOnly = true

    const enderecoContato = document.getElementById('endereco')
    enderecoContato.value = contato.endereco || ''
    enderecoContato.readOnly = true

    const cidadeContato = document.getElementById('cidade')
    cidadeContato.value = contato.cidade || ''
    cidadeContato.readOnly = true

    const main = document.querySelector('main')
    main.classList.replace('card-show', 'form-show')
}

async function carregarDadosContato(cardEscolhido) {

    const idContato = cardEscolhido.dataset.id
    const listaContatos = await lerContatos()
    console.log(listaContatos)
    const infoContato = listaContatos.find(contato => {
        return contato.id === Number(idContato)
    })
    console.log(infoContato)

    

    if (infoContato) {
        let contato = {
            id: infoContato.id,
            nome: infoContato.nome,
            email: infoContato.email,
            celular: infoContato.celular,
            endereco: infoContato.endereco,
            cidade: infoContato.cidade
        }
        preencherFormulario(contato)
    } else{
        alert('ERRO: CONTATO NÃO ENCONTRADO NA LISTA')
    } 
}

function prepararFormularioParaNovoContato() {

    const formulario = document.getElementById('formulario')


    formulario.dataset.id = ''


    formulario.reset()


    document.getElementById('preview-image').src = './img/preview-icon.png'
    document.getElementById('foto').value = null


    document.getElementById('nome').readOnly = false
    document.getElementById('email').readOnly = false
    document.getElementById('celular').readOnly = false
    document.getElementById('endereco').readOnly = false
    document.getElementById('cidade').readOnly = false


    const main = document.querySelector('main')
    main.classList.replace('card-show', 'form-show')
}

function lerDadosDoFormulario() {

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value


    if (nome == '' || email == '') {
        alert('Campos obrigatórios (Nome e E-mail) não preenchidos')
        return null
    }


    const celular = document.getElementById('celular').value
    const endereco = document.getElementById('endereco').value
    const cidade = document.getElementById('cidade').value


    const contato = {
        nome: nome,
        email: email,
        celular: celular,
        endereco: endereco,
        cidade: cidade,
        foto: '../img/avatar1.avif'
    }

    return contato
}

function limparEFecharFormulario() {
    const formulario = document.getElementById('formulario')


    formulario.reset()


    formulario.dataset.id = ''


    document.getElementById('preview-image').src = './img/preview-icon.png'
    document.getElementById('foto').value = null


    const main = document.querySelector('main')
    main.classList.replace('form-show', 'card-show')
}


const cadastrarContato = document.getElementById('novo-contato')
cadastrarContato.addEventListener('click', prepararFormularioParaNovoContato)


const container = document.getElementById('container')
container.addEventListener('click', () => {
    let cardEscolhido = event.target.closest('.card-contato')
    carregarDadosContato(cardEscolhido)
})


const salvar = document.getElementById('salvar')
salvar.addEventListener('click', async () => {

    const formulario = document.getElementById('formulario')
    const idEdicao = formulario.dataset.id


    const contato = lerDadosDoFormulario()


    if (contato === null) return


    if (idEdicao) {
        await atualizarContato(idEdicao, contato)
    } else {
        await criarContato(contato)
    }


    limparEFecharFormulario()


    await popularContatos()
})


const cancelar = document.getElementById('cancelar')
cancelar.addEventListener('click', limparEFecharFormulario)


const editar = document.getElementById('editar')
editar.addEventListener('click', () => {

    document.getElementById('nome').readOnly = false
    document.getElementById('email').readOnly = false
    document.getElementById('celular').readOnly = false
    document.getElementById('endereco').readOnly = false
    document.getElementById('cidade').readOnly = false
})

const deletar = document.getElementById('deletar')
deletar.addEventListener('click', async () => {
   
    const formulario = document.getElementById('formulario')
    const idEdicao = formulario.dataset.id

    if (idEdicao) {
        await deletarContato(idEdicao)
    } else {
        alert('Nenhum contato selecionado para deletar.')
    }

    limparEFecharFormulario()

    await popularContatos()

})

popularContatos()