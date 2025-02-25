function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => map[match]);
}

const userInput = '<img src="nonexistent" onerror="alert(\'XSS\')" />';
const sanitizedInput = sanitize(userInput);


