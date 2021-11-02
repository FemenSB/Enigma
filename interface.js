const textInput = document.getElementById('input');
const runButton = document.getElementById('encrypt');
const filteredInput = document.createTextNode('');

const selectRotor = [document.getElementById('fastRotor'),
                     document.getElementById('middleRotor'),
                     document.getElementById('slowRotor')];

const selectStarting = [document.getElementById('fastStarting'),
                        document.getElementById('middleStarting'),
                        document.getElementById('slowStarting')];

const selectReflector = document.getElementById('reflector');

selectRotor[0].value = '1';
selectRotor[1].value = '2';
selectRotor[2].value = '3';

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
  // Set Enigma configuration as in the web interface:
  for(let i = 0; i < 3; i++) {
    enigma.rotors[i] = rotors[parseInt(selectRotor[i].value) - 1]; // Set rotor
    enigma.rotors[i].position = letterToInt(selectStarting[i].value); // Set rotor starting position
  }
  if(selectReflector.value == 1) // Set reflector
    enigma.reflector = ukwB;
  else
    enigma.reflector = ukwC;

  // Set all characters to upper case and remove every character not in the range A-Z:
  var input = textInput.value.toUpperCase().split('');
  input = input.filter((char) => {
    return (char.charCodeAt(0) >= 'A'.charCodeAt(0) && char.charCodeAt(0) <= 'Z'.charCodeAt(0))
  });
  input = input.join('');
  filteredInput.nodeValue = input; // Display the input string
  output.nodeValue = encryptString(input); // Display the encrypted string
});
