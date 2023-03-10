function insert() {
  const insertContainer = document.querySelector(".insert")

  const likesContainer = document.createElement("div")
  likesContainer.className = "likes_container"

  const insertLike = document.createElement("h4")
  insertLike.id = "total_likes"
  insertLike.className = "total_likes"

  const insertHeart = document.createElement("i")
  insertHeart.className = "fas fa-heart"

  const insertPrice = document.createElement("h4")
  insertPrice.id = "price"
  insertPrice.className = "price"

  likesContainer.appendChild(insertHeart)
  likesContainer.appendChild(insertLike)
  insertContainer.appendChild(likesContainer)
  insertContainer.appendChild(insertPrice)
}

insert()
