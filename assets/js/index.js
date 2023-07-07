function principal() {
  const input = document.querySelector(".input-area");
  const btn = document.querySelector("#adicionar-tarefas");
  const lista = document.querySelector(".lista-tarefas");

  function criaLi() {
    const li = document.createElement("li");
    return li;
  }

  function apagarInput() {
    input.value = '';
    input.focus();
  }

  function criarTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    lista.appendChild(li);
    apagarInput();
    criarBtnApagar(li);
    salvarTarefas();
  }
  
  // fazer aceitar envio com enter
  input.addEventListener("keypress", function (e) {
    //  console.log(e) pega codigo da tecla pressionada
    if (e.keyCode === 13) {
      if (!input.value) return;
      criarTarefa(input.value);
    }
  });

  function criarBtnApagar(li) {
    // espaçamento
    li.innerText += " ";
    const btnApagar = document.createElement("button");
    btnApagar.innerHTML = "apagar";
    btnApagar.setAttribute("class", "apagar");
    btnApagar.setAttribute("title", "Apagar esta tarefa");
    li.appendChild(btnApagar);
  }

  btn.addEventListener("click", function () {
    if (!input.value) return;
    criarTarefa(input.value);
  });

  document.addEventListener("click", function (e) {
    const el = e.target;
    // se clicar onde tem a classe apagar
    if (el.classList.contains("apagar")) {
      // remova o pai e o filho
      el.parentElement.remove();
      salvarTarefas();
    }
  });

  function salvarTarefas() {
    const li = lista.querySelectorAll("li");
    const listaDeTarefas = [];

    for (let tarefa of li) {
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace("apagar", "").trim();
      listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", tarefasJSON);
  }
  function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem("tarefas");
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
      criarTarefa(tarefa);
    }
  }
  adicionaTarefasSalvas();
}

principal();
