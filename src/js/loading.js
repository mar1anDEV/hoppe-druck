document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".page-wrapper-loader");
    const sectionChild = document.querySelector(".section-child");
    const parentPage = document.querySelector(".wrapper-section");
        loader.style.opacity = 1;
        sectionChild.style.opacity = 0;
    setTimeout(() => {
        parentPage.removeChild(loader);
        sectionChild.style.opacity = 1;
      }, "3000");
    
    
});
