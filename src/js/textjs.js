const copyBtn = document.getElementById('copy-article');
const inputCopyArticle = document.getElementById('inputArtikel');
const iconContainer = document.querySelector('.icon-container');
iconContainer.style.setProperty('--tooltip-text', '"Kopieren"');
copyBtn.addEventListener('click', () => {
    const inputCopyArticleValue = inputCopyArticle.value;
    const copyText = inputCopyArticleValue.replace(/\s/g, '');  

    inputCopyArticle.select();

       navigator.clipboard.writeText(copyText)
        .then(() => {
            iconContainer.style.setProperty('--tooltip-text', '"Kopiert"');
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
});

inputCopyArticle.addEventListener('input', () => {
    if (inputCopyArticle.value === "") {
        iconContainer.style.setProperty('--tooltip-text', '"Kopieren"');
    }
});


