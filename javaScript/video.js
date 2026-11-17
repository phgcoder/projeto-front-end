document.addEventListener("DOMContentLoaded", function () {

    // Seleciona todos os vídeos da página
    const videos = document.querySelectorAll(".secao-video video");

    // Configura o observador
    const observador = new IntersectionObserver(function (entradas) {

        entradas.forEach(function (entrada) {

            const video = entrada.target;

            // Verifica se o vídeo está visível na tela
            if (entrada.isIntersecting) {

                // Inicia a reprodução
                video.play().catch(function (erro) {
                    console.log("Não foi possível reproduzir o vídeo:", erro);
                });

            } else {

                // Pausa quando o vídeo sai da tela
                video.pause();

            }

        });

    }, {
        threshold: 0
    });

    // Configura cada vídeo individualmente
    videos.forEach(function (video) {

        // Garante que o vídeo esteja sem áudio
        video.muted = true;

        // Começa a observar o vídeo
        observador.observe(video);

    });

});