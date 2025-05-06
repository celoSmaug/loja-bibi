// Função para atualizar o relógio
function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${horas}:${minutos}:${segundos}`;
}

// Função para atualizar o prédio
function atualizarPredio() {
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const horarioAtual = horas * 60 + minutos;
    const horarioLimite = 18 * 60; // 18:00 em minutos

    const janelas = document.querySelectorAll('.window');
    const mensagem = document.getElementById('message');

    if (horarioAtual < horarioLimite) {
        janelas.forEach(janela => {
            janela.setAttribute('data-light', 'off');
        });
        mensagem.textContent = 'Bom dia';
    } else {
        janelas.forEach(janela => {
            janela.setAttribute('data-light', 'on');
        });
        mensagem.textContent = 'Boa noite';
    }
}

// Função para alternar luzes aleatoriamente
function alternarLuzesAleatorias() {
    const janelas = document.querySelectorAll('.window');
    janelas.forEach(janela => {
        if (Math.random() > 0.5) {
            janela.setAttribute('data-light', 'on');
        } else {
            janela.setAttribute('data-light', 'off');
        }
    });
}

// Função para alternar todas as luzes
function alternarTodasLuzes() {
    const janelas = document.querySelectorAll('.window');
    const todasAcesas = Array.from(janelas).every(j => j.getAttribute('data-light') === 'on');
    
    janelas.forEach(janela => {
        janela.setAttribute('data-light', todasAcesas ? 'off' : 'on');
    });
}

// Adicionar eventos de clique nas janelas
document.querySelectorAll('.window').forEach(janela => {
    janela.addEventListener('click', () => {
        const estadoAtual = janela.getAttribute('data-light');
        janela.setAttribute('data-light', estadoAtual === 'on' ? 'off' : 'on');
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza o relógio a cada segundo
    setInterval(atualizarRelogio, 1000);
    atualizarRelogio();

    // Atualiza o prédio a cada minuto
    setInterval(atualizarPredio, 60000);
    atualizarPredio();

    // Adiciona eventos aos botões
    document.getElementById('randomLights').addEventListener('click', alternarLuzesAleatorias);
    document.getElementById('toggleAll').addEventListener('click', alternarTodasLuzes);
}); 