document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.pacote-card');

    cards.forEach(card => {
        // Função para atualizar a posição do brilho
        function updateGlow(e) {
            // Obtém a posição do mouse em relação ao card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Coordenada X dentro do card
            const y = e.clientY - rect.top;  // Coordenada Y dentro do card
            
            // Move o pseudo-elemento ::before (o brilho) para a posição do mouse
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        }

        // Adiciona um listener para atualizar o brilho quando o mouse se move
        card.addEventListener('mousemove', updateGlow);
    });
});