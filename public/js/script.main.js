const menuIcon = document.getElementById("menu-icon");

menuIcon.addEventListener("click", () => {
  console.log("clicked");

  const memu = document.getElementsByClassName("menu")[0];
  memu.classList.toggle("active");
});

const search = document.getElementsByClassName("ri-search-line")[0]
const searchbox = document.getElementsByClassName("searchbox")[0]
search.addEventListener("click",()=>{
  searchbox.classList.toggle("search-active")
  searchbox.classList.toggle("hidden")
})
