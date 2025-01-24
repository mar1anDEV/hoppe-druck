function resetValues() {
    const resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', function () {
        document.querySelector('.inputText').value = '';
        document.querySelector('.inputNamen').value = '';
        document.getElementById('inputMenge').value = 1;
        console.clear();
    });
}
resetValues();