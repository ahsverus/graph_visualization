const readline = require('readline-sync');

let vertices = parseInt(readline.question('Quantos vértices tem o grafo?\n')) + 1;

function preencher_matriz(matriz) {
  for (let index = 1; index < vertices; index++) {
    let v = readline.question(`Qual o ${index}º vértice\n`);
    matriz[index][0] = v;
    matriz[0][index] = v;
  }
  matriz[0][0] = " ";
  inserir_adjacencias(matriz);
}

function inicializar_matriz(vertices) {
  var linhas = [];
  for (let i = 0; i < vertices; i++) {
    var colunas = [];
    for (let j = 0; j < vertices; j++) {
      colunas[j] = 0;
    }
    linhas[i] = colunas;
  }
  preencher_matriz(linhas);
}

function inserir_adjacencias(matriz) {
  let arestas
  let cont = 1;
  for (let i = 1; i < vertices; i++) {
    arestas = parseInt(readline.question(`Quantas arestas o vértice ${matriz[i][0]} possui?\n`))
    for (let index = 0; index < arestas; index++) {
      let ar = readline.question(`Qual a ${index + 1}ª aresta?\n`);
      let pos = getColuna(ar, matriz);
      matriz[cont][pos]++;
    }
    cont++;
  }
  retornar_matriz(matriz);
}

function getColuna(dado, matriz) {
  for (let coluna = 1; coluna < vertices; coluna++) {
    if (matriz[0][coluna] == dado) {
      return coluna;
    }
  }
  console.log("nao achou")
  return undefined;

}

function retornar_matriz(matriz) {
  let string = "";
  for (let i = 0; i < vertices; i++) {
    for (let j = 0; j < vertices; j++) {
      string += `${matriz[i][j]} `
    }
    string += '\n'
  }
  console.log(`\n${string}`);
}

matriz = inicializar_matriz(vertices);



