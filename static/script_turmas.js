/* PESQUISA DE TURMAS*/

document.addEventListener("DOMContentLoaded", function () {
    // Aguarda o carregamento completo da página

    const campo_pesquisa = document.getElementById("buscar"); 
    // Seleciona o campo de pesquisa pelo ID

    const tabela_turmas = document.getElementById("listaTurmas"); 
    // Seleciona o corpo da tabela onde estão as turmas

    const linhas_tabela = tabela_turmas.getElementsByTagName("tr"); 
    // Pega todas as linhas da tabela

    const total_turmas = document.getElementById("totalAlunos"); 
    // Seleciona o elemento onde aparece o total

    function atualizar_total() {
        // Função que conta quantas linhas estão visíveis

        let quantidade_visiveis = 0; 
        // Variável para armazenar o total visível

        for (let i = 0; i < linhas_tabela.length; i++) {
            // Percorre todas as linhas da tabela

            if (linhas_tabela[i].style.display !== "none") {
                // Verifica se a linha NÃO está escondida

                quantidade_visiveis++; 
                // Soma 1 se a linha estiver visível
            }
        }

        total_turmas.textContent = quantidade_visiveis; 
        // Atualiza o número exibido na tela
    }

    atualizar_total(); 
    // Executa a função ao carregar a página

    campo_pesquisa.addEventListener("keyup", function () {
        // Executa quando o usuário digita algo

        const texto_digitado = campo_pesquisa.value.toLowerCase(); 
        // Pega o texto digitado e transforma em minúsculo

        for (let i = 0; i < linhas_tabela.length; i++) {
            // Percorre todas as linhas

            const conteudo_linha = linhas_tabela[i].textContent.toLowerCase(); 
            // Pega todo o texto da linha

            if (conteudo_linha.includes(texto_digitado)) {
                // Se a linha contém o texto digitado

                linhas_tabela[i].style.display = ""; 
                // Mostra a linha
            } else {
                linhas_tabela[i].style.display = "none"; 
                // Esconde a linha
            }
        }

        atualizar_total(); 
        // Atualiza o total após filtrar
    });
});


/* ALERTA AUTOMÁTICO DE SUCESSO */

setTimeout(() => {
    // Executa após 3 segundos

    const alerta_sucesso = document.querySelector(".alerta.sucesso"); 
    // Seleciona o elemento com classe alerta

    if (alerta_sucesso) {
        // Verifica se existe alerta na página

        alerta_sucesso.style.transition = "0.5s"; 
        // Aplica transição suave

        alerta_sucesso.style.opacity = "0"; 
        // Deixa o alerta invisível

        setTimeout(() => {
            alerta_sucesso.remove(); 
            // Remove o alerta do HTML
        }, 500);
    }

}, 3000);

/* MODAL DE CONFIRMAÇÃO PARA EXCLUSÃO */

document.addEventListener("DOMContentLoaded", function () {
    // Aguarda carregamento completo

    const modal_confirmacao = document.getElementById("modalConfirmacao"); 
    // Seleciona o modal

    const mensagem_modal = document.getElementById("modalMensagem"); 
    // Seleciona o texto dentro do modal

    const botao_cancelar = document.getElementById("btnCancelar"); 
    // Seleciona botão cancelar

    const botao_confirmar = document.getElementById("btnConfirmar"); 
    // Seleciona botão confirmar

    let link_exclusao = null; 
    // Variável que guardará o link da exclusão

    document.querySelectorAll(".btn-deletar").forEach(botao => {
        // Seleciona todos os botões de deletar

        botao.addEventListener("click", function (evento) {
            // Executa ao clicar no botão excluir

            evento.preventDefault(); 
            // Impede o redirecionamento automático

            link_exclusao = this.href; 
            // Guarda o link da exclusão

            mensagem_modal.textContent =
                "Tem certeza que deseja excluir esta turma? Essa ação não poderá ser desfeita.";
            // Define mensagem do modal

            modal_confirmacao.style.display = "flex"; 
            // Mostra o modal na tela
        });
    });

    botao_cancelar.addEventListener("click", function () {
        // Quando clicar em cancelar

        modal_confirmacao.style.display = "none"; 
        // Fecha o modal
    });

    botao_confirmar.addEventListener("click", function () {
        // Quando clicar em confirmar

        if (link_exclusao) {
            window.location.href = link_exclusao; 
            // Redireciona para o link de exclusão
        }
    });
});
