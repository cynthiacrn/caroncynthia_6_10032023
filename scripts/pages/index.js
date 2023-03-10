// Fetch the photographer's data and display the photographers cards components
async function init() {
  // Fetch the list of photographers
  const response = await fetch("/data/photographers.json")
  const { photographers } = await response.json()

  const photographerListElement = document.querySelector(".photographer_section")
  photographers.forEach((photographer) => photographerListElement.appendChild(photographerCardFactory(photographer)))
}

init().catch(console.error)
