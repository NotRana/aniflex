const boardmark = document.querySelector(".boardmark");
const url = new URL(window.location.href);
  const pathname_parts = url.pathname.split("/");
  const anime_id = pathname_parts[pathname_parts.length - 1];
boardmark.addEventListener("click", () => {
  

  
  
let anime_id_list = JSON.parse(window.localStorage.getItem("boardmark_anime")) || [];

if (!anime_id_list.includes(anime_id)) {
    anime_id_list.push(anime_id);
    const svg = document.querySelector('.svg')
    const svg_parrent = svg.parentElement
    svg.style.color = 'black'
    svg_parrent.style.backgroundColor = "white"
} else {
    // Remove the anime ID from the array
    const index = anime_id_list.indexOf(anime_id);
    if (index > -1) {
        anime_id_list.splice(index, 1);
    }
    const svg = document.querySelector('.svg')
    const svg_parrent = svg.parentElement
    svg.style.color = ''
    svg_parrent.style.backgroundColor = ""
    
}


window.localStorage.setItem("boardmark_anime", JSON.stringify(anime_id_list));
});

document.addEventListener('DOMContentLoaded', () => {
    const boardmark = document.querySelector('.boardmark');

    
    let anime_id_list = JSON.parse(window.localStorage.getItem("boardmark_anime")) || [];

    
    if (anime_id_list.includes(anime_id)) {
        const svg = document.querySelector('.svg')
    const svg_parrent = svg.parentElement
    svg.style.color = 'black'
    svg_parrent.style.backgroundColor = "white"
    }
});