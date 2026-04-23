document.querySelectorAll("a").forEach(link => {
    if(!link.getAttribute("href")){
        link.setAttribute("href", "###");
    }   
})