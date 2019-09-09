const readline = require('readline-sync');

class Nodo {
  constructor(dado, proximo = null) {
    this.dado = dado;
    this.proximo = proximo;
  }
}

class ListaEncadeada {
  constructor() {
    this.head = null
    this.size = 0
  }

  getDados() {
    let valores = []
    let c = this.head;
    while (c) {
      valores.push(c.dado)
      c = c.proximo
    }
    return valores
  }

  inserir(dado) {
    let nodo = new Nodo(dado);
    let c;
    if (!this.head) {
      this.head = nodo;
    } else {
      c = this.head;
      while (c.proximo) {
        c = c.proximo;
      }
      c.proximo = nodo;
    }
    this.size++;
  }
}

const nVertices = readline.question("Quantos vértices tem o grafo?\n");
let listas = [];
for (let index = 0; index < nVertices; index++) {
  let vertice = readline.question(`Qual o ${index + 1}º vértice\n`);
  let lista = new ListaEncadeada();
  lista.inserir(vertice);
  let arestas = readline.question(`Quantas arestas esse vértice tem?\n`);
  for (let index = 0; index < arestas; index++) {
    lista.inserir(readline.question(`Qual o vertice ligado à ${index + 1} aresta\n`))
  }
  listas.push(lista);
}


for (const list of listas) {
  let dados = list.getDados()
  let string = `Adjacência[${dados[0]}] = `
  for (const valor of dados.slice(1)) {
    string += `${valor} --> `
  }
  string += "Fim"
  console.log(string)
  console.log("--------------------------------")
}

