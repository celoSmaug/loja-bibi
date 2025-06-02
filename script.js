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

    restaurarEstadoLuzes();
    atualizarContadorLuzes();

    // Botão acender tudo
    const btnAcender = document.createElement('button');
    btnAcender.textContent = 'Acender Tudo';
    btnAcender.onclick = acenderTodasLuzes;
    document.querySelector('.controls').appendChild(btnAcender);

    // Botão apagar tudo
    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar Tudo';
    btnApagar.onclick = apagarTodasLuzes;
    document.querySelector('.controls').appendChild(btnApagar);

    // Botão modo festa
    const btnFesta = document.createElement('button');
    btnFesta.textContent = 'Modo Festa';
    btnFesta.onclick = alternarModoFesta;
    document.querySelector('.controls').appendChild(btnFesta);

    // Mensagem de boas-vindas
    setTimeout(() => {
        alert('Bem-vindo ao prédio interativo!');
    }, 500);
});

// Atualizar contador ao clicar nas janelas
setTimeout(() => {
    document.querySelectorAll('.window').forEach(janela => {
        janela.addEventListener('click', () => {
            atualizarContadorLuzes();
        });
    });
}, 1000);

// Efeito de iluminação noturna
function atualizarFundoNoite() {
    const agora = new Date();
    const horas = agora.getHours();
    if (horas >= 18 || horas < 6) {
        document.body.classList.add('night');
    } else {
        document.body.classList.remove('night');
    }
}
setInterval(atualizarFundoNoite, 60000);
atualizarFundoNoite();

// Animação fade nas luzes (CSS já faz via transition)
// Acessibilidade: aria-labels
setTimeout(() => {
    document.querySelectorAll('.window').forEach((janela, i) => {
        janela.setAttribute('aria-label', `Janela ${i+1}`);
        janela.setAttribute('tabindex', 0);
    });
    document.querySelectorAll('button').forEach(btn => {
        btn.setAttribute('aria-label', btn.textContent);
    });
}, 1000);

// Sons ao acender/apagar luzes
function tocarSom(tipo) {
    const audio = new Audio(tipo === 'on' ? 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b2e.mp3' : 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b2e.mp3');
    audio.volume = 0.2;
    audio.play();
}
document.querySelectorAll('.window').forEach(janela => {
    janela.addEventListener('click', () => {
        const estadoAtual = janela.getAttribute('data-light');
        tocarSom(estadoAtual === 'on' ? 'off' : 'on');
    });
});

// Gráfico simples de uso das luzes (exibe alert com contagem)
let historicoLuzes = [];
setInterval(() => {
    const acesas = Array.from(document.querySelectorAll('.window')).filter(j => j.getAttribute('data-light') === 'on').length;
    historicoLuzes.push(acesas);
    if (historicoLuzes.length > 60) historicoLuzes.shift();
}, 60000);
const btnGrafico = document.createElement('button');
btnGrafico.textContent = 'Ver Gráfico de Uso';
btnGrafico.onclick = () => {
    alert('Histórico de luzes acesas nos últimos minutos:\n' + historicoLuzes.join(', '));
};
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.controls').appendChild(btnGrafico);
});

// Função para atualizar o contador de luzes acesas
function atualizarContadorLuzes() {
    const janelas = document.querySelectorAll('.window');
    const acesas = Array.from(janelas).filter(j => j.getAttribute('data-light') === 'on').length;
    document.getElementById('lightsCounter').textContent = `${acesas} luzes acesas`;
    // Salvar no localStorage
    localStorage.setItem('lightsState', JSON.stringify(Array.from(janelas).map(j => j.getAttribute('data-light'))));
}

// Função para restaurar estado das luzes do localStorage
function restaurarEstadoLuzes() {
    const state = localStorage.getItem('lightsState');
    if (state) {
        const janelas = document.querySelectorAll('.window');
        JSON.parse(state).forEach((val, i) => {
            if (janelas[i]) janelas[i].setAttribute('data-light', val);
        });
    }
}

// Função para alternar modo festa
let festaAtiva = false;
let festaInterval = null;
function alternarModoFesta() {
    festaAtiva = !festaAtiva;
    if (festaAtiva) {
        festaInterval = setInterval(() => {
            alternarLuzesAleatorias();
            atualizarContadorLuzes();
        }, 300);
    } else {
        clearInterval(festaInterval);
    }
}

// Função para acender todas as luzes
function acenderTodasLuzes() {
    document.querySelectorAll('.window').forEach(j => j.setAttribute('data-light', 'on'));
    atualizarContadorLuzes();
}

// Função para apagar todas as luzes
function apagarTodasLuzes() {
    document.querySelectorAll('.window').forEach(j => j.setAttribute('data-light', 'off'));
    atualizarContadorLuzes();
} 