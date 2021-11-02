const textInput = document.getElementById('input');
const runButton = document.getElementById('encrypt');
const filteredInput = document.createTextNode('');
const output = document.createTextNode('');
document.body.appendChild(filteredInput);
document.body.appendChild(document.createElement('p'));
document.body.appendChild(output);

function encryptString(text) {
  var encryptedText = '';
  for(let i = 0; i < text.length; i++) {
    encryptedText = encryptedText + enigma.type(text[i]);
  }
  return encryptedText;
}

runButton.addEventListener('click', (e) => {
  var input = textInput.value.toUpperCase().split('');
  input = input.filter((char) => {
    return (char.charCodeAt(0) >= 'A'.charCodeAt(0) && char.charCodeAt(0) <= 'Z'.charCodeAt(0))
  });
  input = input.join('');
  filteredInput.nodeValue = input;
  output.nodeValue = encryptString(input);
});
