// Verificar se o usuário está autenticado
function verificarAutenticacao() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  if (isLoggedIn !== "true") {
    window.location.href = "index.html"
    return false
  }

  // Verificar se o login ainda é válido (24 horas)
  const loginTime = localStorage.getItem("loginTime")
  if (loginTime) {
    const horasDesdeLogin = (new Date() - new Date(loginTime)) / (1000 * 60 * 60)

    if (horasDesdeLogin >= 24) {
      // Limpar sessão expirada
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("username")
      localStorage.removeItem("loginTime")
      alert("Sua sessão expirou. Faça login novamente.")
      window.location.href = "index.html"
      return false
    }
  }

  return true
}

// Executar verificação ao carregar a página
verificarAutenticacao()

// Função de logout
document.getElementById("btnSair").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("username")
  localStorage.removeItem("loginTime")
  window.location.href = "index.html"
})

// Função para calcular materiais
function calcularMateriais() {
  const area = Number.parseFloat(document.getElementById("area").value)

  if (!area || area <= 0) {
    alert("Por favor, informe uma área válida.")
    return
  }

  // Fórmulas de cálculo (com margem de segurança de 10%)
  const consumoArgamassa = area / 3;
  const consumoArgamassaArredondado = Math.ceil(consumoArgamassa);
  const sacosArgamassa = Math.ceil(consumoArgamassaArredondado); // Sacos de 20kg

  const consumoRejunte = area / 5;
  const sacosRejunte1kg = Math.ceil(consumoRejunte);
  const sacosRejunte5kg = Math.ceil(consumoRejunte / 5);

  // Display results
  document.getElementById("argamassaValue").textContent = `${consumoArgamassa.toFixed(2)} kg`
  document.getElementById("rejunteValue").textContent = `${consumoRejunte.toFixed(2)} kg`
  document.getElementById("argamassaDetail").textContent = `≈ ${sacosArgamassa} sacos de 20kg`
  document.getElementById("rejunteDetail").textContent =
    `≈ ${sacosRejunte1kg} sacos de 1kg ou ${sacosRejunte5kg} sacos de 5kg`

  // Mostrar seção de resultados com animação
  const resultsSection = document.getElementById("resultsSection")
  resultsSection.style.display = "block"

  // Scroll suave até os resultados
  setTimeout(() => {
    resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, 100)
}

// Event listener para o botão calcular
document.getElementById("btnCalcular").addEventListener("click", calcularMateriais)

// Event listener para Enter no input
document.getElementById("area").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    calcularMateriais()
  }
})
