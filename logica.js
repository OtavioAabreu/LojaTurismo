function view() {
    let val1 = document.getElementById("cadastroForm");
    let val2 = document.getElementById("loginForm");
    let text1 = document.getElementById("log");
    let text2 = document.getElementById("cad");
    let vem = document.getElementById("vindo");
    let vai = document.getElementById("ola");

    val1.style.display = "block";
    val2.style.display = "none";
    text2.style.display = "block";
    text1.style.display = "none";
    vai.style.display = "block"
    vem.style.display = "none"
}
function Review() {
    let val1 = document.getElementById("cadastroForm");
    let val2 = document.getElementById("loginForm");
    let text1 = document.getElementById("log");
    let text2 = document.getElementById("cad");
    let vem = document.getElementById("vindo");
    let vai = document.getElementById("ola");

    val1.style.display = "none";
    val2.style.display = "block";
    text2.style.display = "none";
    text1.style.display = "block";
    vai.style.display = "none"
    vem.style.display = "block"
}



// Função para fazer logout
function sair() {
   // Limpa os dados de login armazenados
   localStorage.removeItem('usuarioLogado');

   // Limpa o conteúdo da div 'nomeUsuarioDiv'
   const nomeUsuarioDiv = document.getElementById('nomeUsuarioDiv');
   const int = document.getElementById('biri');
   nomeUsuarioDiv.innerHTML = '';
   nomeUsuarioDiv.style.display = 'none';
   int.style.display = 'block';

   document.getElementById('cadastroEmail').value = '';
   document.getElementById('cadastroSenha').value = '';
   document.getElementById('cadastroNome').value = '';
   document.getElementById('cadastroCPF').value = '';
   document.getElementById('cadastroTelefone').value = '';
}

////////////////////////////////////////////////////////////

function vaiSul(){
    window.location.href = "sul.html";
}
function vaiNorte(){
    window.location.href = "norte.html";
}
function vaiCentro(){
    window.location.href = "centro.html";
}

function btnVoltar() {
    history.back();
}

function limpa() {
    const div = document.getElementById('reservasContainer');
    if (div) {
        div.innerHTML = '';
    }

    localStorage.removeItem('reservas');
    resetCartBadge(); // Chamando a função para resetar o cartBadge
}

function resetCartBadge() {
    localStorage.setItem('cartCount', '0'); // Definindo o cartCount como zero
    document.getElementById('cartBadge').innerText = '0'; // Atualizando o cartBadge no documento
}

