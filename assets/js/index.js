function principal() {
  const input = document.querySelector(".input-area");
  const btn = document.querySelector("#adicionar-tarefas");
  const lista = document.querySelector(".lista-tarefas");

  function criaLi() {
    const li = document.createElement("li");
    return li;
  }

  function apagarInput() {
    input.value = "";
    input.focus();
  }

  function criarTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    lista.appendChild(li);
    criarBtnApagar(li); // Criar botão de "apagar" para o item atual
    apagarInput();
    salvarTarefas();
  }

  input.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      if (!input.value) return;
      criarTarefa(input.value);
    }
  });

  function criarBtnApagar(li) {
    const btnApagar = document.createElement("button");
    btnApagar.innerHTML = `<i class="bi bi-x-circle"></i>`;
    btnApagar.setAttribute("class", "apagar");
    btnApagar.setAttribute("title", "Apagar esta tarefa");
    li.appendChild(btnApagar);

    btnApagar.addEventListener("click", function () {
      li.remove(); // Remover o item correspondente ao botão de "apagar" clicado
      salvarTarefas();
    });
  }

  btn.addEventListener("click", function () {
    if (!input.value) return;
    criarTarefa(input.value);
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
