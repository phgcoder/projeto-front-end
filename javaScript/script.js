/* ==========================================================
   CENTRAL LIVRO
   Funcionalidade: Pesquisa de livros pelo título ou autor.
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Seleciona os elementos da pesquisa.
    const formularioBusca = document.querySelector("#formulario-busca");
    const campoBusca = document.querySelector("#campo-busca");
    const resultadoBusca = document.querySelector("#resultado-busca");

    // Verifica se os elementos existem na página.
    if (!formularioBusca || !campoBusca || !resultadoBusca) {
        return;
    }

    /*
       Normaliza o texto pesquisado.

       1. Converte letras para minúsculas.
       2. Remove espaços desnecessários.
       3. Remove acentos.
    */
    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }

    // Executa a pesquisa no catálogo.
    function pesquisarLivros() {

        const pesquisa = normalizarTexto(campoBusca.value);

        // Seleciona todas as categorias.
        const categorias = document.querySelectorAll(".categoria");

        let livrosEncontrados = 0;

        // Percorre cada categoria.
        categorias.forEach(function (categoria) {

            const livros = categoria.querySelectorAll(".livro-card");

            let livrosNaCategoria = 0;

            // Percorre os livros da categoria atual.
            livros.forEach(function (livro) {

                const tituloElemento = livro.querySelector("h4");
                const autorElemento = livro.querySelector(".livro-info p");

                const titulo = tituloElemento
                    ? normalizarTexto(tituloElemento.textContent)
                    : "";

                const autor = autorElemento
                    ? normalizarTexto(autorElemento.textContent)
                    : "";

                // Verifica se o título ou autor corresponde à pesquisa.
                const corresponde =
                    pesquisa === "" ||
                    titulo.includes(pesquisa) ||
                    autor.includes(pesquisa);

                // Mostra ou esconde o livro.
                livro.hidden = !corresponde;

                if (corresponde) {
                    livrosEncontrados++;
                    livrosNaCategoria++;
                }

            });

            // Esconde categorias sem livros correspondentes.
            categoria.hidden = livrosNaCategoria === 0;

        });

        // Atualiza a mensagem de resultado.
        if (pesquisa === "") {

            resultadoBusca.textContent = "";

        } else if (livrosEncontrados === 0) {

            resultadoBusca.textContent =
                "Nenhum livro encontrado. Tente outro título ou autor.";

        } else {

            resultadoBusca.textContent =
                `${livrosEncontrados} livro(s) encontrado(s).`;

        }

    }

    // Pesquisa ao enviar o formulário.
    formularioBusca.addEventListener("submit", function (evento) {

        evento.preventDefault();

        pesquisarLivros();

    });

    // Pesquisa automaticamente enquanto o usuário digita.
    campoBusca.addEventListener("input", pesquisarLivros);

});