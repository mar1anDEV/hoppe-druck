function initializeHelpButton() {
        const parentSection = document.querySelector(".section-child");
        const containePanel = document.querySelector(".container-panel")
        containePanel.style.opacity = 0;
        const tutorialSection = document.createElement('section');
        tutorialSection.classList.add('tutorial-wrapper-section');
        tutorialSection.style.position = "absolute";
        tutorialSection.style.top = "6vw";
        tutorialSection.style.left = "20vw";
        tutorialSection.style.zIndex = "99999999999";
        tutorialSection.style.height = "675px";
        tutorialSection.style.width = "65vw";
        tutorialSection.style.backgroundColor = "rgb(56, 28, 30)";

        initializeHelpButton ? parentSection.appendChild(tutorialSection):null
        const tutorialSectionChild =  tutorialSection ? document.createElement('div'): null;
        tutorialSection ? tutorialSection.appendChild(tutorialSectionChild):null
        const tutorialVideo =  tutorialSection ? document.createElement('div'): null;
        tutorialSection ? tutorialSection.appendChild(tutorialVideo):null
        if (tutorialSectionChild) {
            tutorialSectionChild.innerHTML = `<button id="closeTutorial" style="width: 50px; height: 100%; outline: none; border: none; background-color: white; font-size: 24px; font-weight: bolder; color:rgb(0, 0, 0);" onclick="closeFunction()">&#10005;</button> `
            tutorialSectionChild.style.height = '40px';
            tutorialSectionChild.style.display = 'flex'
            tutorialSectionChild.style.justifyContent = 'end';
            tutorialSectionChild.style.width = '100%';
            tutorialSectionChild.style.backgroundColor = 'red';
            
        }
        if(tutorialVideo){
            tutorialVideo.style.height = "100%"
            tutorialVideo.style.width = "100%"
            tutorialVideo.innerHTML = `<video src="media/Drucken - Persönlich – Microsoft​ Edge 2025-01-23 21-22-34.mp4" controls muted style="height: 100%; width: 100%;"></video>`
            const clsBtn =  document.getElementById('closeTutorial')
            clsBtn.addEventListener('click', function(){
                parentSection.removeChild(tutorialSection);
                containePanel.style.opacity = 1;
            })
        }
        
    
}


