function addUppercase() {
    const inputSN = document.querySelector('.sn-value');
    inputSN.addEventListener('input', function () {
        inputSN.value = inputSN.value.toUpperCase();
    });
}
addUppercase();