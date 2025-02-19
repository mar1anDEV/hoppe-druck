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
console.log(sanitizedInput);
// Output: '&lt;img src=&quot;nonexistent&quot; onerror=&quot;alert(&#x27;XSS&#x27;)&quot; /&gt;'

