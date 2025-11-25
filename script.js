// ==========================================
// CONFIGURAÇÃO DE USUÁRIOS (HARDCODED)
// EDITE AQUI PARA ADICIONAR/MODIFICAR USUÁRIOS
// ==========================================

const USUARIOS_AUTORIZADOS = [
  {
    username: "admin",
    password: "admin123",
  },
  {
    username: "usuario",
    password: "senha123",
  },
  // Adicione mais usuários aqui seguindo o mesmo padrão:
  // { username: 'seu_usuario', password: 'sua_senha' }
]

// ==========================================
// URL DA PÁGINA PARA ONDE REDIRECIONAR APÓS LOGIN
// ==========================================
const PAGINA_DASHBOARD = "calculadora.html" // Página da calculadora

// ==========================================
// LÓGICA DO SISTEMA DE LOGIN
// NÃO EDITE ABAIXO DESSA LINHA A MENOS QUE SAIBA O QUE ESTÁ FAZENDO
// ==========================================

const loginForm = document.getElementById("loginForm")
const errorMessage = document.getElementById("errorMessage")
const btnLogin = document.getElementById("btnLogin")
const togglePassword = document.getElementById("togglePassword")
const passwordInput = document.getElementById("password")

// Toggle mostrar/ocultar senha
togglePassword.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
  passwordInput.setAttribute("type", type)

  // Mudar ícone do olho
  this.innerHTML =
    type === "password"
      ? `<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>`
      : `<svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>`
})

// Função para mostrar erro
function mostrarErro(mensagem) {
  errorMessage.textContent = mensagem
  errorMessage.classList.add("show")

  setTimeout(() => {
    errorMessage.classList.remove("show")
  }, 4000)
}

// Função para validar login
function validarLogin(username, password) {
  return USUARIOS_AUTORIZADOS.some((usuario) => usuario.username === username && usuario.password === password)
}

// Evento de submit do formulário
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value

  // Validar campos vazios
  if (!username || !password) {
    mostrarErro("Por favor, preencha todos os campos.")
    return
  }

  // Adicionar estado de carregamento
  btnLogin.classList.add("loading")
  btnLogin.disabled = true

  // Simular delay de autenticação (remova em produção se quiser login instantâneo)
  setTimeout(() => {
    // Validar credenciais
    if (validarLogin(username, password)) {
      // Login bem-sucedido
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", username)
      localStorage.setItem("loginTime", new Date().toISOString())

      // Feedback visual de sucesso
      btnLogin.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Login realizado!</span>
      `
      btnLogin.style.background = "var(--color-success)"

      // Redirecionar após 1 segundo
      setTimeout(() => {
        window.location.href = PAGINA_DASHBOARD
      }, 1000)
    } else {
      // Login falhou
      mostrarErro("Usuário ou senha incorretos. Tente novamente.")
      btnLogin.classList.remove("loading")
      btnLogin.disabled = false
    }
  }, 800)
})

// Verificar se já está logado ao carregar a página
window.addEventListener("load", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  if (isLoggedIn === "true") {
    // Verificar se o login ainda é válido (opcional: adicionar expiração)
    const loginTime = localStorage.getItem("loginTime")
    const horasDesdeLogin = (new Date() - new Date(loginTime)) / (1000 * 60 * 60)

    // Se passou menos de 24 horas, redirecionar automaticamente
    if (horasDesdeLogin < 24) {
      window.location.href = PAGINA_DASHBOARD
    } else {
      // Limpar sessão expirada
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("username")
      localStorage.removeItem("loginTime")
    }
  }
})

// Prevenir espaços no início do username
document.getElementById("username").addEventListener("input", (e) => {
  if (e.target.value.startsWith(" ")) {
    e.target.value = e.target.value.trim()
  }
})
