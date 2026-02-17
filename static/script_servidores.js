document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form_servidor");
    const corpoTabela = document.getElementById("corpo_tabela");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const servidor = {
                nome: document.getElementById("nome_servidor").value,
                cpf: document.getElementById("cpf_servidor").value,
                email: document.getElementById("email_servidor").value,
                telefone: document.getElementById("telefone_servidor").value,
                cargo: document.getElementById("cargo_servidor").value,
                data_ingresso: document.getElementById("data_ingresso").value
            };

            let servidores = JSON.parse(localStorage.getItem("servidores")) || [];
            servidores.push(servidor);
            localStorage.setItem("servidores", JSON.stringify(servidores));

            window.location.href = "servidores.html";
        });
    }

    if (corpoTabela) {
        let servidores = JSON.parse(localStorage.getItem("servidores")) || [];

        servidores.forEach((servidor, index) => {
            corpoTabela.innerHTML += `
                <tr>
                    <td>${servidor.nome}</td>
                    <td>${servidor.cargo}</td>
                    <td>${servidor.email}</td>
                    <td>${servidor.telefone}</td>
                    <td>
                        <button onclick="excluirServidor(${index})">Excluir</button>
                    </td>
                </tr>
            `;
        });
    }

});

function excluirServidor(index) {
    let servidores = JSON.parse(localStorage.getItem("servidores"));
    servidores.splice(index, 1);
    localStorage.setItem("servidores", JSON.stringify(servidores));
    location.reload();
}
