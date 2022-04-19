const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btn-save')


let itens 

let id

//verificar no local storage se esta vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

//enviar item pro localStorage
const setItensBD = () =>  localStorage.setItem('dbfunc', JSON.stringify(itens))

// puxando os itens do localstorage e armazenando em uma função
function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loadItens()


function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td> 
        <td>${item.funcao}</td> 
        <td>${item.salario}</td> 
        <td class="acao">
            <button onclick='editItem(${index})'><i class='bx bx-edit' ></i></button>
        </td> 
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td> 
    `
    tbody.appendChild(tr)
}


// edição das tabelas do item
function editItem(index) {

    openModal(true, index)
}

//exclusão dos itens da tabela e carregamento de dados em tela
function deleteItem (index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}


//criando o modal que vai dar inicio ao evento de click pra edição e exclusão de itens do array do projeto
function openModal ( edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }
    //criando função de edição utilizando um if else dentro do modal que é o formulario do array do projeto
    if (edit) {
        sNome.value = itens[index].nome
        sFuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        id = index
    } else {
        sNome.value = ''
        sFuncao.value = ''
        sSalario.value = ''
    }
}


//botão de salvar o formulario com funções dar load nos itens armazenados
btnSalvar.onclick = e => {
    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].funcao = sFuncao.value
        itens[id].salario = sSalario.value
    } else {
        itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
    }

    setItensBD()
    modal.classList.remove('active')
    loadItens()
    id = undefined
}