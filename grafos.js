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

function adjacencias(vertice) { // retorna os nao adjacentes ao *vertice*
  for (const list of listas) {
    let dados = list.getDados()
    if (dados[0] == vertice) {
      return console.log(dados.slice(1))
    }
  }
  return console.log("nao possui adjacencias")
}

function there_aresta(vertice1, vertice2, lista) {
  for (const list of lista) {
    let dados = list.getDados()
    if (dados[0] == vertice1) {
      for (let index = 1; index < dados.length; index++) {
        if (dados[index] == vertice2) {
          return console.log("Existe essa aresta")
        }
      }
    }
  }
  return console.log("Não existe essa aresta")
}

function is_euleriano(listas) {
  for (const list of listas) {
    if (((list.size - 1) % 2) !== 0) {
      return console.log("Não é um grafo euleriano")
    }
  }
  return console.log("É um grafo euleriano")
}

function there_is_eulerianPath(listas) {
  let controle = 0
  for (const list of listas) {
    if ((list.size - 1) % 2 !== 0) {
      controle++
    }
  }
  if (controle > 2) {
    return console.log("Não tem caminho euleriano")
  } else {
    return console.log("Tem caminho euleriano!")
  }
}

function getVertices(vertice, listas) {
  valores = 0
  for (const lista of listas) {
    valores = lista.getDados()
    if (valores[0] == vertice) {
      return valores.slice(1);
    }
  }
  return 404
}

function getAllVertices(listas) {
  allVertices = []
  for (const lista of listas) {
    valores = lista.getDados()
    allVertices.push(valores[0])
  }
  return allVertices
}

function getAdjacentes(vertice, listas) {
  adjacentes = []
  vertices = getVertices(vertice, listas)
  allVertices = getAllVertices(listas)
  for (const verticee of allVertices) {
    if (vertices.includes(verticee)) {

    } else {
      adjacentes.push(verticee)
    }
  }
  if (Array.isArray(adjacentes)) {
    //console.log(adjacentes)
    return adjacentes.slice(1)
  } else {
    console.log("vai dar undefined")
    return undefined
  }
}

function getGrau(vertice, listas) {
  grau = 0
  for (const lista of listas) {
    valores = lista.getDados()
    if (vertice == valores[0]) {
      grau = lista.size - 1
      return grau
    }
  }
}


function is_hamiltoniano(listas) {
  vertices = getAllVertices(listas)
  controle = 0
  for (const vertice of vertices) {
    grau1 = getGrau(vertice, listas)
    adjacentes = getAdjacentes(vertice, listas)
    console.log(`os vertices nao adjacentes ao ${vertice} é ${adjacentes}`)
    if (adjacentes != undefined) {
      for (const adjacente of adjacentes) {
        grau2 = getGrau(adjacente, listas)
        console.log("o vertice -> " + vertice)
        console.log("soma dos graus -> " + (grau1 + grau2))
        if ((grau1 + grau2) < nVertices) {
          return console.log("Não é hamiltoniano")
        }
      }
    }
  }
  return console.log("é hamiltoniano")
}

let visitado = []
function temCaminho(verticeI, verticeF, listas) {
  visitado.push(verticeI)
  //console.log(verticeI == verticeF)
  let adjacentes = getVertices(verticeI, listas);
  //console.log(adjacentes)
  for (const adjacente of adjacentes) {
    //console.log(`o vertice inical ${verticeI} não é igual ao ${adjacente} e nao é igual ao final ${verticeF}`)
    //console.log(verticeI == verticeF)
    if (verticeI == verticeF) {
      let string = `É possivel! \n ${visitado}`
      return console.log(string)
    } else {
      if (!visitado.includes(adjacente)) {
        //console.log(adjacente)
        temCaminho(adjacente, verticeF, listas)
      }
    }

  }
}

let controle = 0
while (controle == 0) {
  let pergunta = readline.question("qual metodo? [1] retornar adjacencias [2] existencia de aresta [3] Saber se é euleriano [4] Saber se tem caminho euleriano [5] saber se é hamiltoniano [6] Sair ")
  if (pergunta == "1") {
    adjacencias(readline.question("Qual o vertice? "), listas)
  } else if (pergunta == "2") {
    there_aresta(readline.question("Qual o primeiro vertice "), readline.question("qual o segundo vertice "), listas)
  } else if (pergunta == "3") {
    is_euleriano(listas)
  } else if (pergunta == "4") {
    there_is_eulerianPath(listas)
  } else if (pergunta == "5") {
    is_hamiltoniano(listas)
  } else if (pergunta == "6") {
    temCaminho(readline.question("Qual o vertice inicial?"), readline.question("Qual o vertice final"), listas, visitado)
  } else {
    controle = 1;
  }
}

