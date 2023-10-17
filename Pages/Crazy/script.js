const main = document.querySelector("main")
let isMousePressed = false;
for (let i = 0; i<64;i++){
  let square = document.createElement("div")
  square.classList.add("squares")
  main.appendChild(square)
}
main.addEventListener("mousedown",(e)=> {
  if (e.target.classList.contains("squares")){isMousePressed = true}
});
main.addEventListener("mouseup",(e)=>{
  if (e.target.classList.contains("squares")){isMousePressed = false}
});

main.addEventListener("mouseover",(e)=>{
  if(isMousePressed){
    if (e.target.classList.contains("squares")){ e.target.style.backgroundColor === "red"? (e.target.style.backgroundColor = "black", e.target.nextElementSibling.style.backgroundColor = "green"):(e.target.style.backgroundColor = "red", e.target.previousElementSibling.style.backgroundColor = "blue")}
    setTimeout(()=>{
      e.target.style.backgroundColor = "yellow"
    },1000)
  }
})