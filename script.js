document.getElementById("ano").textContent = new Date().getFullYear();

const banco = {
    alunos: [
        { nome: "Ana Oliveira", turma: "3º Ano A", email: "ana@ifbaiano.edu.br" },
        { nome: "Pedro Nascimento", turma: "2º Ano B", email: "pedro@ifbaiano.edu.br" },
        { nome: "Larissa Mendes", turma: "1º Ano C", email: "larissa@ifbaiano.edu.br" }
    ],
    servidores: [
        { nome: "Prof. Ana", turma: "Matemática", email: "ana@ifbaiano.edu.br" },
        { nome: "Prof. Pedro", turma: "História", email: "pedro@ifbaiano.edu.br" }
    ],
    turmas: [
        { nome: "3º Informática", turma: "Manhã", email: "30 alunos" },
        { nome: "2º Agro", turma: "Tarde", email: "25 alunos" }
    ]
};

atualizarContadores();

function atualizarContadores() {
    document.getElementById("qtdAlunos").textContent = banco.alunos.length;
    document.getElementById("qtdServidores").textContent = banco.servidores.length;
    document.getElementById("qtdTurmas").textContent = banco.turmas.length;
}

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
