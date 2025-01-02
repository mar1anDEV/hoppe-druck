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
        etiketContainer.innerHTML = generateBarCode(cleanArtikel, displayArtikel, inputSNumber, inputCount);

        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', function () {
            window.location.reload();
        });

    });
}

function generateBarCode(cleanArtikel, displayArtikel, inputSNumber, inputCount) {
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
    <svg fill="#000000" height="30px" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <g id="Printer">
            <path d="M57.7881012,14.03125H52.5v-8.0625c0-2.2091999-1.7909012-4-4-4h-33c-2.2091999,0-4,1.7908001-4,4v8.0625H6.2119002C2.7871001,14.03125,0,16.8183498,0,20.2431507V46.513649c0,3.4248009,2.7871001,6.2119026,6.2119002,6.2119026h2.3798995c0.5527,0,1-0.4472008,1-1c0-0.5527-0.4473-1-1-1H6.2119002C3.8896,50.7255516,2,48.8359489,2,46.513649V20.2431507c0-2.3223,1.8896-4.2119007,4.2119002-4.2119007h51.5762024C60.1102982,16.03125,62,17.9208508,62,20.2431507V46.513649c0,2.3223-1.8897018,4.2119026-4.2118988,4.2119026H56c-0.5527992,0-1,0.4473-1,1c0,0.5527992,0.4472008,1,1,1h1.7881012C61.2128983,52.7255516,64,49.9384499,64,46.513649V20.2431507C64,16.8183498,61.2128983,14.03125,57.7881012,14.03125z M13.5,5.96875c0-1.1027999,0.8971996-2,2-2h33c1.1027985,0,2,0.8972001,2,2v8h-37V5.96875z"/>
            <path d="M44,45.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,47.0302505,20,47.0302505h24c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,45.0322495,44,45.0322495z"/>
            <path d="M44,52.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,54.0302505,20,54.0302505h24c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,52.0322495,44,52.0322495z"/>
            <circle cx="7.9590998" cy="21.8405495" r="2"/>
            <circle cx="14.2856998" cy="21.8405495" r="2"/>
            <circle cx="20.6121998" cy="21.8405495" r="2"/>
            <path d="M11,62.03125h42v-26H11V62.03125z M13.4036999,38.4349518h37.1925964v21.1925964H13.4036999V38.4349518z"/>
        </g>
    </svg>
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
                text: `${inputSNumber}${i}`,
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


    
}

document.addEventListener('DOMContentLoaded', () => {
    addSpace();
    initializeForm();
});