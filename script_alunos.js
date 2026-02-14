function salvarAlunos(alunos) {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

function carregarAlunos() {
    return JSON.parse(localStorage.getItem("alunos")) || [];
}

/* CADASTRO */
document.getElementById("formAluno").addEventListener("submit", function(e) {
    e.preventDefault();

    const aluno = {
        nome: document.getElementById("nome").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        estado: document.getElementById("estado").value,
        cidade: document.getElementById("cidade").value,
        genero: document.querySelector('input[name="genero"]:checked')?.value || "",
        matricula: document.getElementById("matricula").value
    };

    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    alert("Aluno cadastrado com sucesso!");

    window.location.href = "lista.html";
});


/* LISTA */
const tabela = document.getElementById("corpoTabela");
const total = document.getElementById("totalAlunos");

if (tabela) {

    const alunos = carregarAlunos();
    total.textContent = alunos.length;

    alunos.forEach((aluno, index) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.email}</td>
            <td>${aluno.turma}</td>
            <td class="acoes">
                <button class="excluir" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });

    tabela.addEventListener("click", function(e){
        if(e.target.closest(".excluir")){
            const index = e.target.closest("button").dataset.index;
            const alunos = carregarAlunos();
            alunos.splice(index,1);
            salvarAlunos(alunos);
            location.reload();
        }
    });
}

