function mostrarLista(tipo) {

    document.getElementById("imagemEscola").style.display = "none";

    const container = document.getElementById("listaContainer");
    container.innerHTML = "";

    const dados = banco[tipo];

    const lista = document.createElement("div");
    lista.classList.add("lista");

    lista.innerHTML = `
        <div class="topo-lista">
            <h2>Lista de ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
            <input type="text" class="barra-pesquisa" placeholder="Pesquisar..." onkeyup="filtrar(this.value, '${tipo}')">
        </div>

        <div class="linha-tabela cabecalho-tabela">
            <div>Nome</div>
            <div>Turma</div>
            <div>Email</div>
            <div>Ações</div>
        </div>
    `;

    dados.forEach(item => {
        lista.innerHTML += `
            <div class="linha-tabela">
                <div>${item.nome}</div>
                <div>${item.turma}</div>
                <div>${item.email}</div>
                <div><i class="fa-solid fa-eye olho" onclick="this.classList.toggle('ativo')"></i></div>
            </div>
        `;
    });

    container.appendChild(lista);
}

function filtrar(texto, tipo) {
    mostrarLista(tipo);
}

