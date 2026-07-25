// ===== Fade-in Animation =====

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll("section").forEach(section=>{
    section.classList.add("hidden");
    observer.observe(section);
});


// ===== Back To Top Button =====

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topButton";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){
        topButton.classList.add("visible");
    }else{
        topButton.classList.remove("visible");
    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});


// ===== Footer Year =====

const footer = document.querySelector("footer p");

if(footer){
    footer.innerHTML =
    `© ${new Date().getFullYear()} Lakanwalx. 
