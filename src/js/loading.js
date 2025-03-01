document.addEventListener("DOMContentLoaded", () => {
    function loadContent(){
        const sectionChild = document.querySelector(".section-child");
        sectionChild.style.display = "none";
        sectionChild.style.transition = "visibility 0.5s";
        setTimeout(() => {
            const files = [
                'media/85126822_193643055372251_207363735470211072_n.jpg',
                'media/470054098_2657370687791277_4904186533986617337_n.jpg',
                'media/fricke_logo.BxfcmfTT.webp',
                'media/hofmei-large.svg',
                'media/logo_300x42 - label.webp',
                'media/logo_300x42.webp',
                'media/printer.png',
                'src/css/drücken-section.css',
                'src/css/style.css',
                'src/css/loader.css',
                'assets/css/bootstrap.min.css',
                'src/js/textjs.js',
                'assets/jsBarcode/JsBarcode.all.min.js',
                'assets/js/bootstrap.bundle.min.js',
                'src/js/reset.js',
                'src/js/addSpace.js',
                'src/js/addUppercase.js',
                'src/js/form.js',
                'src/js/help.js',
            ];

            const fetchPromises = files.map(file => {
                return fetch(file)
                    .then(response => {
                        if (response.ok) {
                            getContent();
                        } else {
                            console.log(`Failed to fetch ${file}: ${response.status}`);
                        }
                    })
                    .catch(error => {
                        console.log(`Error fetching ${file}: ${error}`);
                    });
            });

            function getContent(){
                const loader = document.querySelector('.page-wrapper-loader'); 
                const sectionChild = document.querySelector(".section-child");
                const parentPage = document.querySelector(".wrapper-section");

                if (loader) {
                    loader.remove();
                }

                if (sectionChild) {
                    sectionChild.style.display = "block";
                }

                if (parentPage) {
                    parentPage.style.visibility = 'visible';
                }
            }

            Promise.all(fetchPromises)
                .then(() => {
                    getContent();
                });
        }, 3000);
    }

    loadContent();
});
