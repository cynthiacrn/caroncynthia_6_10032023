function openModal() {
  const modal = document.getElementById("contact_modal")
  const main = document.getElementById("main")
  const header = document.getElementById("header")
  modal.style.display = "block"
  main.className = "bg_blur"
  header.className = "bg_blur"
}

function closeModal() {
  const modal = document.getElementById("contact_modal")
  modal.style.display = "none"
  main.className = "blur_none"
  header.className = "blur_none"
}

function removeError(elementId) {
  document.getElementById(elementId).setAttribute("data-error-visible", false)
  document.getElementById(elementId).setAttribute("data-error", "")
}

function showError(elementId, errorMessage) {
  document.getElementById(elementId).setAttribute("data-error-visible", true)
  document.getElementById(elementId).setAttribute("data-error", errorMessage)
}

function validateForm(e) {
  e.preventDefault()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const firstName = document.getElementById("firstname").value
  const lastName = document.getElementById("lastname").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value
  let hasError = false

  removeError("error-first")
  removeError("error-last")
  removeError("error-email")
  removeError("error-message")

  // Validate firstName
  if (firstName.length < 2) {
    hasError = true
    showError("error-first", "Le prénom ne doit pas être vide et doit contenir au moins 2 caractères")
  }
  // Validate lastName
  if (lastName.length < 2) {
    hasError = true
    showError("error-last", "Le nom de famille ne doit pas être vide et doit contenir au moins 2 caractères")
  }
  // Validate email
  if (!emailRegex.test(email)) {
    hasError = true
    showError("error-email", "L'adresse email est invalide")
  }
  // Validate message
  if (message.length < 2) {
    hasError = true
    showError("error-message", "Le message ne doit pas être vide et doit contenir au moins 2 caractères")
  }

  if (!hasError) {
    closeModal()
    console.log({ firstName, lastName, email, message })
  }
}

document.getElementById("form").addEventListener("submit", validateForm)
