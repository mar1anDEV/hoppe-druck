function addSpace() {
    const inputNumber = document.querySelector('.inputNumber');
    inputNumber.addEventListener('input', function () {
        let value = inputNumber.value.replace(/\D/g, '').substring(0, 12);
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        inputNumber.value = formattedValue;
    });
}

function initializeForm() {
    const form = document.getElementById('submitForm');
    const mainPanel = document.querySelector('.panel-content');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let inputArtikel = document.getElementById('inputArtikel').value;
        let inputNamen = document.querySelector('.inputNamen').value;
        inputNamen += ', ';
        let inputProduktNamen = inputNamen;
        let displayArtikel = inputArtikel;
        let cleanArtikel = inputArtikel.replace(/\s+/g, ''); 
        const inputSNumber = document.getElementById('inputSN').value.toUpperCase() + '/';
        const inputCount = parseInt(document.getElementById('inputMenge').value, 10);

        const firstPanel = document.querySelector('.panel');
        mainPanel.removeChild(firstPanel);

        const secondPanel = document.createElement('div');
        secondPanel.classList.add('panel-switch');
        secondPanel.innerHTML = `
            <div class="etiket-container"></div>
            <button class="back-btn" id="back-btn">Back</button>
        `;
        mainPanel.appendChild(secondPanel);

        const etiketContainer = secondPanel.querySelector('.etiket-container');
        etiketContainer.innerHTML = generateBarCode(cleanArtikel, displayArtikel,inputProduktNamen, inputSNumber, inputCount);

        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', function () {
            window.location.reload();
        });

    });
}

function generateBarCode(cleanArtikel, displayArtikel,inputProduktNamen, inputSNumber, inputCount) {
    let output = '';
    for (let i = 1; i <= inputCount; i++) {
        output += `
            <div class="print print-${i}">
                <div class="panel-container-switch" data-panel-id="panel-${i}">
                    <div class="barcode-row">
                        <div class="qrcode-image">
                            <img src="media/470054098_2657370687791277_4904186533986617337_n.jpg" height="100%" alt="qr-code">
                        </div>
                        <div class="barcode-container" id="barcode-container-${i}">
                            <svg id="barcode-${i}"></svg>
                            <div class="barcode-bottom-text">
                                <span class="sp-article">${displayArtikel}</span>
                                <div><strong class="strg-hoppe"> HTH HOPPE</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="printEvent print-event-${i}" onclick="printEvent(${i})">
        
        <img src="media/printer-svgrepo-com.png" loading="eager" height="30" width="30px" alt="print button">

</button>
            </div>
        `;
    }

    setTimeout(() => {
        for (let i = 1; i <= inputCount; i++) {
            const element = document.getElementById(`barcode-${i}`);
            JsBarcode(element, cleanArtikel, {
                format: 'CODE128',
                width: 3,
                height: 40,
                displayValue: true,
                text: `${inputProduktNamen}, ${inputSNumber}${i}`,
                fontOptions: 'bold',
                font: 'monospace',
                textAlign: 'center',
                textPosition: 'top',
                textMargin: 5,
                fontSize: 16,
                background: '#ffffff',
                lineColor: '#000000',
                margin: 10,
            });
        }
    }, 0);

    return output;
}

function printEvent(i) {
 
    const originalContent = document.body.innerHTML;


    document.querySelector('.main-section').style.display = 'none';


    const printSection = document.querySelector(`[data-panel-id="panel-${i}"]`).cloneNode(true);

  
    printSection.style.display = "flex";
    printSection.style.justifyContent = "center";
    printSection.style.alignItems = "center";
    printSection.style.position = "relative";
    printSection.style.top = "50%";
    printSection.style.transform = 'scale(4.5)';
    printSection.style.padding = '0';


    document.body.innerHTML = '';
    document.body.appendChild(printSection);


    window.print();

    document.body.innerHTML = originalContent;

    
}

document.addEventListener('DOMContentLoaded', () => {
    addSpace();
    initializeForm();
});
