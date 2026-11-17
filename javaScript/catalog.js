// ==================================================
// SELEÇÃO E CARREGAMENTO DOS LIVROS
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // 1. SELEÇÃO DO LIVRO NO CATÁLOGO
    // ==================================================

    const cardsLivros = document.querySelectorAll(".livro-card");

    cardsLivros.forEach(function (card) {

        card.addEventListener("click", function () {

            // Recupera as informações do livro
            const titulo = card.querySelector("h4")?.textContent.trim();

            const autor = card.querySelector(".livro-info p")?.textContent.trim();

            const imagem = card.querySelector("img")?.getAttribute("src");

            // Recupera a categoria do livro
            const categoria = card
                .closest(".categoria")
                ?.querySelector("h3")?.textContent.trim();

            // Recupera o endereço do card
            const endereco = card.getAttribute("href");

            // Extrai o identificador do livro da URL
            let identificador = "";

            if (endereco) {
                const url = new URL(endereco, window.location.href);
                identificador = url.searchParams.get("livro") || "";
            }

            // Verifica se as informações foram encontradas
            if (!titulo || !autor || !imagem || !categoria) {
                console.error("Não foi possível recuperar os dados do livro.");
                return;
            }

            // Organiza as informações em um objeto
            const livroSelecionado = {
                identificador: identificador,
                titulo: titulo,
                autor: autor,
                imagem: imagem,
                categoria: categoria
            };

            // Armazena os dados temporariamente
            sessionStorage.setItem(
                "livroSelecionado",
                JSON.stringify(livroSelecionado)
            );

        });

    });


    // ==================================================
    // 2. CARREGAMENTO DAS INFORMAÇÕES NA PÁGINA DO LIVRO
    // ==================================================

    const imagemProduto = document.querySelector("#imagem-produto");

    // Verifica se estamos na página de detalhes
    if (!imagemProduto) {
        return;
    }

    // Recupera o identificador presente na URL
    const parametros = new URLSearchParams(window.location.search);

    const identificadorURL = parametros.get("livro");

    // Recupera os dados armazenados
    const dadosLivro = sessionStorage.getItem("livroSelecionado");

    // Recupera os elementos da página
    const tituloProduto = document.querySelector("#titulo-produto");
    const autorProduto = document.querySelector("#autor-produto");
    const categoriaProduto = document.querySelector("#categoria-produto");
    const descricaoProduto = document.querySelector("#descricao-produto");
    const precoProduto = document.querySelector("#preco-produto");
    const botaoComprar = document.querySelector("#botao-comprar");
    const mensagemCompra = document.querySelector("#mensagem-compra");

    // Verifica se os dados estão disponíveis
    if (!dadosLivro) {

        tituloProduto.textContent = "Nenhum livro selecionado.";

        botaoComprar.disabled = true;

        mensagemCompra.textContent =
            "Volte ao catálogo e selecione um livro para continuar.";

        return;
    }

    let livro;

    // Converte os dados armazenados em objeto
    try {
        livro = JSON.parse(dadosLivro);

    } catch (erro) {

        console.error("Erro ao recuperar os dados do livro:", erro);

        tituloProduto.textContent = "Não foi possível carregar o livro.";

        botaoComprar.disabled = true;

        mensagemCompra.textContent =
            "Volte ao catálogo e selecione novamente um livro.";

        return;
    }

    // Verifica se o livro armazenado corresponde ao endereço acessado
    if (
        identificadorURL &&
        livro.identificador !== identificadorURL
    ) {

        tituloProduto.textContent = "Livro não encontrado.";

        botaoComprar.disabled = true;

        mensagemCompra.textContent =
            "Volte ao catálogo e selecione o livro desejado.";

        return;
    }

    // ==================================================
    // 3. PREENCHIMENTO DAS INFORMAÇÕES
    // ==================================================

    tituloProduto.textContent = livro.titulo;

    autorProduto.textContent = livro.autor;

    categoriaProduto.textContent = livro.categoria;

    imagemProduto.src = livro.imagem;

    imagemProduto.alt = "Capa do livro " + livro.titulo;

    // Descrição demonstrativa
    descricaoProduto.textContent =
        "Descubra essa obra e aproveite a oportunidade de conhecer uma nova história na Central Livro.";

    // Preço demonstrativo
    const preco = 49.90;

    precoProduto.textContent = preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });


    // ==================================================
    // 4. SIMULAÇÃO DA COMPRA
    // ==================================================

    botaoComprar.addEventListener("click", function () {

        const campoQuantidade = document.querySelector("#quantidade-produto");

        const quantidade = Number(campoQuantidade.value);

        // Valida a quantidade informada
        if (
            !Number.isInteger(quantidade) ||
            quantidade < 1
        ) {

            mensagemCompra.textContent =
                "Informe uma quantidade válida.";

            campoQuantidade.focus();

            return;
        }

        // Calcula o valor total
        const total = preco * quantidade;

        // Exibe a confirmação da compra simulada
        mensagemCompra.textContent =
            "Compra simulada! " +
            quantidade +
            " unidade(s) de " +
            livro.titulo +
            ". Total: " +
            total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

    });

});