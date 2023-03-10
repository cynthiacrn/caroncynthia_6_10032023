const selectMenu = document.querySelector(".sort-select")

// Open the lightbox component
function openMediaViewer(mediaIndex) {
  openLightbox()
  createIconLightboxDom()
  mediaLocal(mediaIndex)
}

// Toggle like state for a selected media component and change the total like number in the Insert component
function toggleLike(mediaLikeElement) {
  let totalLikesInsert = document.getElementById("total_likes")
  mediaLikeElement.textContent++
  totalLikesInsert.innerHTML++
}

// Sort medias from select menu value
function sortMedias(medias, sortValue) {
  return medias.sort((a, b) => {
    if (sortValue === "pop") {
      return b.likes - a.likes
    }
    else if (sortValue === "date") {
      return new Date(b.date) - new Date(a.date)
    }
    else if (sortValue === "titre") {
      return a.title.localeCompare(b.title)
    }
  })
}

// Hydrate and show the Insert component with the photographer's associated data
function displayInsert(totalLikes, averageDailyRate) {
  document.getElementById("total_likes").innerHTML = totalLikes
  document.getElementById("price").textContent = `${averageDailyRate} € / jour`
}

// Hydrate and show the Profile component with the photographer's associated data
function displayProfile(photographer) {
  if (!photographer) {
    return
  }

  const headerElement = document.querySelector(".photograph_header")
  headerElement.appendChild(photographerProfileFactory(photographer))
}

// Create and append the photographer's medias as MediaCards components
function displayMediaList(selectedPhotographer, medias) {
  const mediaListElement = document.querySelector(".medias_card")
  // Clear the medias to prevent duplicate when selectMenu change
  mediaListElement.innerHTML = ""

  sortMedias(medias, selectMenu.value).forEach((media) => {
    if (media.photographerId === selectedPhotographer.id) {
      mediaListElement.appendChild(mediaCardFactory(media))
      createMediaLightboxDom(media)
    }
  })

  Array.from(mediaListElement.getElementsByTagName("img")).forEach((mediaCardElement, index) => {
    mediaCardElement.addEventListener("click", () => openMediaViewer(index + 2))
    mediaCardElement.addEventListener("keypress", () => openMediaViewer(index + 2))
  })

  document.querySelectorAll(".heart").forEach((likeElement) => {
    likeElement.addEventListener("click", () => toggleLike(likeElement.parentElement.children[1]))
    likeElement.addEventListener("keypress", () => toggleLike(likeElement.parentElement.children[1]))
  })
}

// Fetch the photographer's data and display the page components
async function init() {
  // Retrieve the selected photographer id from the URL parameters
  const url = new URL(window.location.href)
  const selectedPhotographerId = +url.searchParams.get("id")
  // Fetch the list of photographers
  const res = await fetch("/data/photographers.json")
  const { photographers, media: medias } = await res.json()
  // Find the associated photographer
  const selectedPhotographer = photographers.find(({ id }) => id === selectedPhotographerId)
  // Compute the total likes of the photographer's medias
  const totalLikes = medias.reduce(
    (likes, media) => media.photographerId === selectedPhotographerId
      ? likes + media.likes
      : likes
    , 0
  )

  displayInsert(totalLikes, selectedPhotographer?.price || 0)
  displayProfile(selectedPhotographer)
  displayMediaList(selectedPhotographer, medias)
  selectMenu.onchange = () => displayMediaList(selectedPhotographer, medias)
}

init().catch(console.error)
