document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o container onde os cards serão inseridos
    const gridContainer = document.querySelector('.projects-grid');
    
    // Verifica se o container existe na página
    if (!gridContainer) {
        console.warn("Container '.projects-grid' não encontrado. O Portfólio Dinâmico não será carregado.");
        return;
    }

    // Função principal para buscar e carregar os dados do portfólio
    async function loadPortfolio() {
        try {
            // Busca o arquivo JSON com os dados dos eventos
            // Certifique-se de que o caminho ('portfolio-data.json') está correto.
            const response = await fetch('portfolio-data.json'); 
            
            // Verifica se a requisição HTTP foi bem-sucedida (status 200)
            if (!response.ok) {
                // Lança um erro se o arquivo não for encontrado ou houver problema no servidor
                throw new Error(`Erro ao carregar o arquivo JSON! Status: ${response.status}`);
            }
            
            const projects = await response.json();
            renderProjects(projects);

        } catch (error) {
            console.error("ERRO CRÍTICO: Não foi possível carregar o portfólio.", error);
            // Mensagem de erro visível para o desenvolvedor
            gridContainer.innerHTML = '<p style="color:red; font-family: sans-serif; text-align: center; padding: 40px;">⚠️ Erro ao carregar os dados do portfólio. Verifique o console e o caminho do arquivo `portfolio-data.json`.</p>';
        }
    }

    // Função para renderizar (criar) os cards HTML e inseri-los no DOM
    function renderProjects(projects) {
        // Limpa a grade antes de preencher, caso haja conteúdo estático
        gridContainer.innerHTML = ''; 

        projects.forEach(project => {
            // Cria a string HTML para cada cartão de projeto
            // Atenção: Esta estrutura deve coincidir com o CSS (classes: project-card, project-image, project-info, project-cta)
            const cardHTML = `
                <a href="${project.link}" class="project-card" target="_blank">
                    <div class="project-image-container">
                        <img src="${project.imagem}" alt="Imagem do evento: ${project.titulo}" class="project-image">
                    </div>
                    <div class="project-info">
                        <h3>${project.titulo}</h3>
                        <p>${project.descricao}</p>
                        <span class="project-cta">
                            Ver Case <i class="fas fa-arrow-right"></i>
                        </span>
                    </div>
                </a>
            `;
            // Insere o novo card no final do container da grade
            gridContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // 3. Inicia o processo de carregamento quando a página está pronta
    loadPortfolio();
});