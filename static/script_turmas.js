// Espera o HTML da página carregar completamente antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

    // PESQUISA DE TURMAS

    // Pega o campo de pesquisa pelo ID "buscar"
    const campo_pesquisa = document.getElementById("buscar");

    // Pega o corpo da tabela onde estão listadas as turmas
    const tabela_turmas = document.getElementById("listaTurmas");

    // Pega todas as linhas <tr> dentro da tabela de turmas
    const linhas_tabela = tabela_turmas.getElementsByTagName("tr");

    // Pega o elemento onde aparece o total de turmas visíveis
    const total_turmas = document.getElementById("totalTurmas");

    // Função responsável por atualizar o número total de turmas visíveis
    function atualizar_total() {

        // Variável que vai contar quantas linhas estão visíveis
        let quantidade = 0;

        // Percorre todas as linhas da tabela
        for (let i = 0; i < linhas_tabela.length; i++) {

            // Verifica se a linha NÃO está escondida
            if (linhas_tabela[i].style.display !== "none") {

                // Se estiver visível, soma 1
                quantidade++;
            }
        }

        // Atualiza o número exibido na tela
        total_turmas.textContent = quantidade;
    }

    // Executa a função assim que a página carregar
    atualizar_total();

    // Adiciona evento ao campo de pesquisa
    // "keyup" significa: toda vez que o usuário soltar uma tecla
    campo_pesquisa.addEventListener("keyup", function () {

        // Pega o texto digitado e transforma em minúsculo
        const texto = campo_pesquisa.value.toLowerCase();

        // Percorre todas as linhas da tabela
        for (let i = 0; i < linhas_tabela.length; i++) {

            // Pega todo o texto da linha e transforma em minúsculo
            const conteudo = linhas_tabela[i].textContent.toLowerCase();

            // Verifica se o texto digitado está dentro da linha
            if (conteudo.includes(texto)) {

                // Se encontrar, mostra a linha
                linhas_tabela[i].style.display = "";

            } else {

                // Se não encontrar, esconde a linha
                linhas_tabela[i].style.display = "none";
            }
        }

        // Atualiza o total depois de filtrar
        atualizar_total();
    });



    

    // ALERTA AUTOMÁTICO

    const alerta = document.querySelector(".alerta_sucesso");

    if (alerta) {

        // Espera 3 segundos
        setTimeout(() => {

            // Adiciona classe de esconder (ativa animação)
            alerta.classList.add("esconder");

            // Remove do HTML depois da animação
            setTimeout(() => {
                alerta.remove();
            }, 400);

        }, 3000);
    }

    // MODAL DE CONFIRMAÇÃO

    // Pega o modal de confirmação pelo ID
    const modal = document.getElementById("modalConfirmacao");

    // Pega o elemento onde a mensagem será exibida
    const mensagem = document.getElementById("modalMensagem");

    // Pega o botão cancelar
    const cancelar = document.getElementById("btnCancelar");

    // Pega o botão confirmar
    const confirmar = document.getElementById("btnConfirmar");

    // Variável que vai armazenar o link de exclusão
    let link_exclusao = null;

    // Seleciona todos os botões com classe "btn-deletar"
    document.querySelectorAll(".btn-deletar").forEach(botao => {

        // Adiciona evento de clique para cada botão
        botao.addEventListener("click", function (e) {

            // Impede o redirecionamento automático do link
            e.preventDefault();

            // Guarda o link de exclusão
            link_exclusao = this.href;

            // Define a mensagem que aparece no modal
            mensagem.textContent =
                "Tem certeza que deseja excluir esta turma? Essa ação não poderá ser desfeita.";

            // Mostra o modal na tela
            modal.style.display = "flex";
        });
    });

    // Quando clicar no botão cancelar
    cancelar.addEventListener("click", function () {

        // Fecha o modal
        modal.style.display = "none";
    });

    // Quando clicar no botão confirmar
    confirmar.addEventListener("click", function () {

        // Se existir um link guardado
        if (link_exclusao) {

            // Redireciona para o link de exclusão
            window.location.href = link_exclusao;
        }
    });

});
