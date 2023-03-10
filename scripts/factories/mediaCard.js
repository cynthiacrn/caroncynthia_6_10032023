function mediaCardFactory({ image, video, title, likes }) {
  const cardMedia = document.createElement("article")
  cardMedia.classList.add("card_media_container")
  cardMedia.setAttribute("title", "Permet d'ouvrir une lightbox")

  if (video) {
    const videoPicture = document.createElement("video")
    const mp4 = `assets/photographers/${video}`
    const source = document.createElement("source")

    videoPicture.setAttribute("controls", " ")
    source.className = "mediaImg"
    source.setAttribute("src", mp4)
    source.setAttribute("alt", title)
    source.setAttribute("type", "video/mp4")

    cardMedia.appendChild(videoPicture)
    videoPicture.appendChild(source)
  } else {
    const img = document.createElement("img")
    const photo = `assets/photographers/${image}`

    img.setAttribute("src", photo)
    img.setAttribute("alt", "photo" + " " + title)
    img.className = "mediaImg"

    cardMedia.appendChild(img)
  }
  const infoPhoto = document.createElement("div")
  infoPhoto.classList.add("info_photo")

  const h2 = document.createElement("h4")
  h2.textContent = title

  infoPhoto.appendChild(h2)
  cardMedia.appendChild(infoPhoto)

  const nbreLike = document.createElement("span")
  nbreLike.textContent = likes
  nbreLike.setAttribute("title", "nombre de like de la photo")

  const spanHeart = document.createElement("span")
  spanHeart.className = "heart"

  const heart = document.createElement("i")
  heart.className = "fas fa-heart"
  heart.setAttribute("aria-label", "icone coeur cliquable")

  infoPhoto.appendChild(nbreLike)
  infoPhoto.appendChild(spanHeart)
  spanHeart.appendChild(heart)

  return cardMedia
}