const lightboxMedia = document.getElementsByClassName("lightbox-media")
let mediaIndex = 1

function openLightbox() {
  lightbox.style.display = "grid"
  main.className = "bg_blur"
  header.className = "bg_blur"
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.style.display = "none"
  main.className = "blur_none"
  header.className = "blur_none"
  document.body.style.overflow = "auto"
}

function mediaVue(n) {
  let i

  if (n > lightboxMedia.length) {
    mediaIndex = 1
  }
  if (n < 1) {
    mediaIndex = lightboxMedia.length
  }
  for (i = 0; i < lightboxMedia.length; i++) {
    lightboxMedia[i].style.display = "none"
  }
  lightboxMedia[mediaIndex - 1].style.display = "block"
}

function mediaNav(n) {
  mediaVue((mediaIndex += n))
}

function mediaLocal(n) {
  mediaVue((mediaIndex = n))
}

// Keyboard inputs on lightbox
function lightboxNavClavier(event) {
  if (event.keyCode === 37) {
    mediaNav(-1)
  } else if (event.keyCode === 39) {
    mediaNav(1)
  }
  if (lightbox.style.display === "grid" && event.code === "Escape") {
    closeLightbox()
  }
}

document.onkeydown = lightboxNavClavier
