let images = document.getElementsByTagName("img")

for (let i = 0; i < images.length; i++) {
  images[i].src = "images/" + images[i].getAttribute("image") + ".png" 
}