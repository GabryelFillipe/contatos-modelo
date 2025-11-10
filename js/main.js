'use strict'

import { lerContatos } from "./contatos.js"
import { criarContato } from "./contatos.js"
import { deletarContato } from "./contatos.js"

function criarCardContato(contato) {

    const cardContato = document.createElement('div')
    cardContato.classList.add('card-contato')
    cardContato.id = 'card-contato'

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

    const nomeContato = document.createElement('h2')
    nomeContato.textContent = contato.nome
    if (contato.nome == null || contato.nome == '')
        nomeContato.textContent = "usuario sem nome"

    const numeroContato = document.createElement('p')
    numeroContato.textContent = contato.celular
    if (contato.celular == null || contato.celular == '')
        numeroContato.textContent = "usuario sem telefone"

    cardContato.appendChild(fotoPerfil)
    cardContato.appendChild(nomeContato)
    cardContato.appendChild(numeroContato)

    return cardContato

}

async function popularContatos() {

    const containerContatos = document.getElementById('container')

    const contatos = await lerContatos()

    contatos.forEach(contato => {

        const cardContato = criarCardContato(contato)

        containerContatos.appendChild(cardContato)
    })
}

async function criarNovoContato(contato) {


    const novoContato = criarContato(contato)


    const main = document.querySelector('main')
    main.classList.replace('form-show', 'card-show')
    await popularContatos()
    return novoContato

}

async function atualizarCard() {

    const cardContato = document.getElementById('card-contato')
    console.log(cardContato)

}

const cadastrarContato = document.getElementById('novo-contato')

cadastrarContato.addEventListener('click', () => {

    const main = document.querySelector('main')
    main.classList.replace('card-show', 'form-show')

})

const salvar = document.getElementById('salvar')

salvar.addEventListener('click', async () => {

    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const celular = document.getElementById('celular')
    const endereco = document.getElementById('endereco')
    const cidade = document.getElementById('cidade')
    const foto = document.getElementById('foto')

    if (nome.value == '' || email.value == '')
        alert('campos obrigatorios não preenchidos')

    const novoContato = {
        nome: nome.value,
        email: email.value,
        celular: celular.value,
        endereco: endereco.value,
        cidade: cidade.value,
        foto: '../img/avatar1.avif'
    }
    await criarNovoContato(novoContato)


})

const cancelar = document.getElementById('cancelar')


cancelar.addEventListener('click', () => {
    const main = document.querySelector('main')
    main.classList.replace('form-show', 'card-show')
})

popularContatos()
atualizarCard()



