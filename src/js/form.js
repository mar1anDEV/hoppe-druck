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
                <div class="row h-100"style="background-color: #E3010F;">
                    <!-- Left Section -->
                    <div class="col-md-4 py-3 overflow-auto" style="background-color:rgb(255, 255, 255);">
                        <div id="list-example" class="list-group scrollable-list">
                            <!-- List items will be appended here -->
                        </div>
                        <button type="button" id="back-btn" class="btn btn-secondary d-flex align-items-center gap-2" 
                                        style="height: 45px; width: 260px; position: absolute; top: 87%; z-index: 9999999999; background-color: #E3010F; color: white;" onclick="window.location.reload()">
                                    <i class="bi bi-arrow-left"></i> <span style="font-size: 20px; letter-spacing: 1px; font-family: sans-serif;">Zurrück</span>
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
            <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-danger text-white" href="#list-item-${i}" style="background-color: #E3010F;">
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
                                                            <span class="sp-article" style="font-weight: bold; font-size: 12px;">${prodktName}</span>
                                                            <div><img src="media/logo_300x42 - label.webp" loading="lazy" style="width: 120px;" alt="Brand"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button id="print-btn" class="eachBtn" onclick="printEvent(${i})" style="display: flex; align-items: center; gap: 10px; justify-content: center; border: none; outline: none; background-color: #E3010F; color: #fff; padding: 10px 20px;">
                                                <span>Alle Drucken</span>
                                                <div class="svg-holder" style="width: 30px;">
                                                    <img src="media/printer-svgrepo-com.png" width="100%" style="filter: invert(1) brightness(2);" alt="" srcset="">
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
                    textAlign: 'center',
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

        
        for (let barCode of barcodes) {
            listBarcode.appendChild(barCode.cloneNode(true)); 
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


