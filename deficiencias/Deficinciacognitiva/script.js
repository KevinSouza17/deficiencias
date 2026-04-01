// ===== MENU DE ACESSIBILIDADE (FECHADO/ABRIR AO CLICAR) =====
let fontSizeLevel = parseInt(localStorage.getItem('fontSizeLevel')) || 0;
const body = document.body;

// Inicializar estado salvo
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('altoContraste') === 'true') {
        body.classList.add('alto-contraste');
    }
    if (fontSizeLevel > 0) {
        atualizarFonte(false); // false para não fechar o menu na inicialização
    }
    
    console.log('Site Amigo Ajuda carregado com sucesso!');
    mostrarMensagem('✨ Bem-vindo! Clique no botão "Acessibilidade" no canto inferior direito para ajustar o site.');
});

// Controle do menu
const toggleBtn = document.getElementById('toggleAcessibilidade');
const acessMenu = document.getElementById('acessibilidadeMenu');

toggleBtn?.addEventListener('click', () => {
    acessMenu.classList.toggle('aberto');
    if (acessMenu.classList.contains('aberto')) {
        toggleBtn.innerHTML = '<i class="fas fa-times"></i> Fechar';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-universal-access"></i> Acessibilidade';
    }
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!toggleBtn?.contains(e.target) && !acessMenu?.contains(e.target)) {
        acessMenu?.classList.remove('aberto');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-universal-access"></i> Acessibilidade';
    }
});

// Aumentar fonte
document.getElementById('aumentarFonte')?.addEventListener('click', () => {
    if (fontSizeLevel < 3) {
        fontSizeLevel++;
        localStorage.setItem('fontSizeLevel', fontSizeLevel);
        atualizarFonte();
        mostrarMensagem('🔍 Fonte aumentada!');
    } else {
        mostrarMensagem('🔍 Fonte já está no tamanho máximo!');
    }
});

// Diminuir fonte
document.getElementById('diminuirFonte')?.addEventListener('click', () => {
    if (fontSizeLevel > 0) {
        fontSizeLevel--;
        localStorage.setItem('fontSizeLevel', fontSizeLevel);
        atualizarFonte();
        mostrarMensagem('🔍 Fonte diminuída!');
    } else {
        mostrarMensagem('🔍 Fonte já está no tamanho padrão!');
    }
});

function atualizarFonte(fecharMenu = true) {
    const root = document.documentElement;
    if (fontSizeLevel === 0) {
        root.style.fontSize = ''; 
        body.classList.remove('fonte-grande');
    } else {
        body.classList.add('fonte-grande');
        if (fontSizeLevel === 1) root.style.fontSize = '18px';
        if (fontSizeLevel === 2) root.style.fontSize = '20px';
        if (fontSizeLevel === 3) root.style.fontSize = '22px';
    }
    
    if (fecharMenu) {
        acessMenu?.classList.remove('aberto');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-universal-access"></i> Acessibilidade';
    }
}

// Alto contraste
document.getElementById('altoContraste')?.addEventListener('click', () => {
    body.classList.toggle('alto-contraste');
    const isAtivado = body.classList.contains('alto-contraste');
    localStorage.setItem('altoContraste', isAtivado);
    
    if (isAtivado) {
        mostrarMensagem('🎨 Alto contraste ativado!');
    } else {
        mostrarMensagem('🎨 Alto contraste desativado!');
    }
    acessMenu?.classList.remove('aberto');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-universal-access"></i> Acessibilidade';
});

// Função para mostrar mensagem no painel
function mostrarMensagem(msg) {
    const painel = document.getElementById('painelMsg');
    if (painel) {
        painel.innerHTML = `<i class="fas fa-bell"></i> ${msg}`;
        setTimeout(() => {
            if (painel) {
                painel.innerHTML = '<i class="fas fa-smile"></i> Clique em qualquer botão que eu te ajudo!';
            }
        }, 3000);
    }
}

// ===== NAVEGAÇÃO SUAVE COM ANIMAÇÃO =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                mostrarMensagem(`📍 Navegando para: ${target.id || 'seção'}`);
            }
        }
    });
});

// ===== PAINEL DE MENSAGEM PARA BOTÕES =====
window.mostrarMensagem = mostrarMensagem;

// ===== FUNÇÃO PARA SIMULAR MODAL (caso ainda exista) =====
window.mostrarModal = function(tipo) {
    let mensagem = '';
    if (tipo === 'guia') mensagem = '📘 GUIA RÁPIDO: Use os botões coloridos. Cada cor tem um significado.';
    else if (tipo === 'ligar') mensagem = '📞 LIGANDO PARA UM AMIGO... Em um site real, abriria o telefone.';
    else mensagem = '✨ Botão funcionando!';
    
    mostrarMensagem(mensagem);
};