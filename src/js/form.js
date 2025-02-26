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
    const mainPanel = document.querySelector('.PanelContainerMain');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputArtikel = document.getElementById('inputArtikel').value;
        const scanCleanArtikel = inputArtikel.replace(/\s+/g, '');
        const prodktName = document.querySelector('.inputProduktNamen').value 
        const inputSNumber = document.getElementById('inputSN').value.toUpperCase() + '/';
        const inputCount = parseInt(document.getElementById('inputMenge').value, 10);
        let artikelSpace = document.querySelector('.inputNumber');
        let artikelSpaceValue = artikelSpace.value.replace(/\D/g, '').substring(0, 12);
        let artikelFormat = artikelSpaceValue.match(/.{1,4}/g)?.join(' ') || '';
        let displayArtikel = artikelFormat;
        

        const firstPanel = document.querySelector('.panel-content');
        if (firstPanel) {
            mainPanel.removeChild(firstPanel);
        }

        const secondPanel = document.createElement('div');
        secondPanel.classList.add('panel-switch');
        secondPanel.style.cssText = `
            height: 700px;
            width: 100%;
            position: absolute;
            top: 10%;
            z-index: 999999999;
            padding: 20px;
        `;
        secondPanel.innerHTML = `
            <div class="container-panel mx-auto" style="height: 100%; max-width: 900px; opacity: 1;">
    <div class="row h-100 relative"style="background-color: #E3010F;">
        <!-- Left Section -->
       
        <div class="col-md-4 py-3 overflow-auto" style="background-color:rgb(255, 255, 255);">
            <div id="list-example" class="list-group scrollable-list">
                <!-- List items will be appended here -->
            </div>
            
        </div>
        <div class="interact-buttons" style="z-index: 9999999999; position: absolute; top: 87%; margin-left: 10px; display: flex; flex-direction: row; justify-content: space-between; gap: 10px; width: auto;">
            <button type="button" id="back-btn" onclick="window.location.reload()">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" style="stroke-width: 2;">
                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
                </svg>
                <span>Zurrück</span>
            </button>

            <button type="button" id="pop-up-help-page" onclick="initializeHelpButton()">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-raised-hand" viewBox="0 0 16 16" style="stroke-width: 2;">
                <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207"/>
                <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                </svg>
                <span>Hilfe</span>
            </button>
        </div>
        

        <!-- Right Section -->
        <div class="col-md-8 overflow-auto h-100" style="background-color:rgb(102, 100, 102);">
            <div data-bs-spy="scroll" data-bs-target="#list-example" class="columnBarcode" data-bs-smooth-scroll="true" 
                 class="scrollspy-example h-100" tabindex="0">
                 
            </div>
        </div>
    </div>
</div>
        `;
        mainPanel.appendChild(secondPanel);

        const listIncrement = secondPanel.querySelector('.list-group');
        listIncrement.innerHTML = generateSNcode(inputSNumber, inputCount);
        const barcodeIncrement = secondPanel.querySelector('.columnBarcode');
        barcodeIncrement.innerHTML = generateBarcode(inputCount, scanCleanArtikel, inputSNumber,prodktName, displayArtikel);
        
        
    });
}

function generateSNcode(inputSNumber, inputCount) {
    let outputLeftArrow = '';  

    for (let i = 1; i <= inputCount; i++) {
        outputLeftArrow += `
            <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-danger text-white"  style="background-color: #E3010F;">
                <span>${inputSNumber}${i}</span>
                <button class="btn btn-link p-0" aria-label="Print">
                    <svg fill="currentColor" stroke="currentColor" stroke-width="1.5" height="30px" width="30px" viewBox="0 0 64 64">
                        <!-- SVG Path -->
                    </svg>
                </button>
            </a>
        `;
    }

    return outputLeftArrow;
}

function generateBarcode(inputCount, scanCleanArtikel, inputSNumber, prodktName,displayArtikel) {
    let outputRightArrow = '';
    
    for (let i = 1; i <= inputCount; i++) {
        outputRightArrow += `
<div id="list-item-${i}" class="full-height-item eachItem" style="height: 650px; display: flex; justify-content: center;">
                                        <!-- Content for List Item 1 -->
                                        <div class="print" data-panel-id="panel-${i}" style="width: 100%; height: 100%; display: flex; flex-direction: column; gap: 30px; align-items: center; justify-content: center;">
                                            <div class="panel-container-switch"  style="background-color: #fff; padding: 5px; width: 100%;">
                                                <div class="barcode-row" style="width: 100%;">
                                                    <div class="qrcode-image" style="height: 120px; margin: auto 0;">
                                                        <img src="media/470054098_2657370687791277_4904186533986617337_n.jpg" style="margin: auto 0;" height="100%" alt="qr-code">
                                                    </div>
                                                    <div class="second-row" style="display: flex; flex-direction: column; width: 100%;">
                                                        <svg id="barcode-${i}"></svg>
                                                        <div class="barcode-bottom-text" style="display: flex; justify-content: space-between; padding: 0px 10px">
                                                            <p class="sp-article" id="sp-Article">${prodktName}</p>
                                                            <div><img src="media/logo_300x42 - label.webp" loading="lazy" style="width: 120px;" alt="Brand"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button id="print-btn" class="eachBtn" onclick="printEvent(${i})" style="display: flex; align-items: center; gap: 10px; justify-content: center; border: none; outline: none; background-color: #E3010F; color: #fff; padding: 10px 20px;">
                                                <span>Druckdialog öffnen</span>
                                                <div class="svg-holder" style="width: 30px;">
                                                    <img src="media/printer.png" width="100%"  alt="print icon">
                                                </div>
                                            </button>
                                        </div>
                                    </div>             
        `;

       
        
        
        
    }

    setTimeout(() => {
        for (let i = 1; i <= inputCount; i++) {
            const element = document.getElementById(`barcode-${i}`);
            if (element) {
                JsBarcode(element, scanCleanArtikel, {
                    format: "CODE128",
                    lineColor: "#000000",
                    width: 4,
                    height: 50,
                    displayValue: true,
                    text: `${displayArtikel}-${inputSNumber}${i}`,
                    fontSize: 30,
                    textPosition: 'top',
                    fontOptions: 'bold',
                    font: 'monospace',
                    textMargin: 5,
                    background: '#ffffff',
                });
            }
        }
    }, 0);
    return outputRightArrow;
}

function printEvent() {
    const originalContent = document.body.innerHTML;
    let barcodeColumn = document.querySelector('.columnBarcode');
    
    if (barcodeColumn) {
        let barcodes = barcodeColumn.children;
        let eachItems = document.querySelectorAll('.eachItem');
        eachItems.forEach(eachItem => {
            eachItem.style.height = '100vh';
            eachItem.style.alignItems = 'center';
        });
        let eachBtnItems = document.querySelectorAll('.eachBtn');
        eachBtnItems.forEach(eachBtnItem => {
            eachBtnItem.style.display = 'none';
        });
        let eachPrintItems = document.querySelectorAll('.print');
        eachPrintItems.forEach(eachPrintItem => {
            eachPrintItem.style.height = 'auto';
        });
        let panelContainerItems = document.querySelectorAll('.panel-container-switch');
        panelContainerItems.forEach(panelContainerItem => {
            panelContainerItem.style.transform = 'scale(3.2)';
        });

        let listBarcode = document.createElement('div');
        listBarcode.classList.add('main-print-list');
        listBarcode.style.display = 'flex';
        listBarcode.style.gap = '50px';
        listBarcode.style.flexDirection = 'column';
        listBarcode.style.justifyContent = 'center';
        listBarcode.style.alignItems = 'center';
        listBarcode.style.height = 'auto';
        listBarcode.style.width = '100%';
        listBarcode.style.backgroundColor = 'red';

        
        if (barcodes.length > 0) {
            const firstBarcode = barcodes[0].cloneNode(true);
            listBarcode.appendChild(firstBarcode.cloneNode(true)); 
            listBarcode.appendChild(firstBarcode.cloneNode(true)); 
        }

        
        for (let i = 1; i < barcodes.length; i++) {
            listBarcode.appendChild(barcodes[i].cloneNode(true));
        }

        const mainSection = document.querySelector('.wrapper-section');
        if (mainSection && mainSection.parentNode) {
            mainSection.parentNode.removeChild(mainSection);
        }

        document.body.appendChild(listBarcode);

        window.print();
        document.body.innerHTML = originalContent;

        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', function () {
            window.location.reload();
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {
    addSpace();
    initializeForm();
});



