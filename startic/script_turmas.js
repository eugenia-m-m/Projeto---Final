// CADASTRAR
const form = document.getElementById("formTurma");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const turma = {
            ano: document.getElementById("ano").value,
            serie: document.getElementById("serie").value,
            turno: document.getElementById("turno").value,
            modalidade: document.getElementById("modalidade").value,
            numero: document.getElementById("numero").value,
            professor: document.getElementById("professor").value,
            sala: document.getElementById("sala").value
        };

        let turmas = JSON.parse(localStorage.getItem("turmas")) || [];
        turmas.push(turma);
        localStorage.setItem("turmas", JSON.stringify(turmas));

        window.location.href = "turmas_html.html";
    });
}

// LISTAR
const tabela = document.getElementById("listaTurmas");

if (tabela) {
    let turmas = JSON.parse(localStorage.getItem("turmas")) || [];

    function carregarTurmas() {
        tabela.innerHTML = "";

        turmas.forEach((turma, index) => {
            tabela.innerHTML += `
                <tr>
                    <td>${turma.ano}</td>
                    <td>${turma.serie}</td>
                    <td>${turma.turno}</td>
                    <td>${turma.numero}</td>
                    <td>
                        <button class="btn-excluir" onclick="excluir(${index})">Excluir</button>
                    </td>
                </tr>
            `;
        });
    }

    window.excluir = function(index) {
        turmas.splice(index, 1);
        localStorage.setItem("turmas", JSON.stringify(turmas));
        carregarTurmas();
    };

    carregarTurmas();
}
