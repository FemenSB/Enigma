function letterToInt(letter) { // Return the index of letter in the alphabet
  return letter.charCodeAt(0) - 'A'.charCodeAt(0);
}

class Rotor {
  constructor(wiring, notch, position) {
    this.wiring = [];
    this.reverseWiring = [];
    for(let i = 0; i < 26; i++) {
      this.reverseWiring.push(0);
    }
    for(let i = 0; i < wiring.length; i++) {
      this.wiring.push(letterToInt(wiring[i]));
      this.reverseWiring[letterToInt(wiring[i])] = i;
    } // wiring[i] is the letter to which 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i] is mapped
    this.notch = letterToInt(notch); // this.position in which the rotor immediately to the left is rotated
    this.position = letterToInt(position); // Current character displayed
  }
};

class Reflector {
  constructor(wiring) {
    this.wiring = [];
    for(let i = 0; i < wiring.length; i++) {
      this.wiring.push(letterToInt(wiring[i]));
    } // same as in Rotor, wiring[i] is the letter to which 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i] is mapped
  }
};

// Definition of standard Enigma M3 rotors:
rotors = [new Rotor('EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'Q', 'A'),
          new Rotor('AJDKSIRUXBLHWTMCQGZNPYFVOE', 'E', 'A'),
          new Rotor('BDFHJLCPRTXVZNYEIWGAKMUSQO', 'V', 'A'),
          new Rotor('ESOVPZJAYQUIRHXLNFTGKDCMWB', 'J', 'A'),
          new Rotor('VZBRGITYUPSDNHLXAWMJQOFECK', 'Z', 'A')];

// Definition of standard Enigma M3 reflectors:
var ukwB = new Reflector('YRUHQSLDPXNGOKMIEBFZCWVJAT');
var ukwC = new Reflector('FVPJIAOYEDRZXWGCTKUQSBNMHL');

var enigma = {
  rotors: [rotors[0], rotors[1], rotors[2]],

  reflector: ukwB,

  type: function(letter) { // Receive the character typed and return the encrypted character
    var input = letterToInt(letter);

    // Advance the rotators keeping their position value in the range [0, 25]:
    if(this.rotors[1].position == this.rotors[1].notch) { // When the slow rotor is rotated, the middle rotor is also rotated (double stepping)
      this.rotors[2].position = (this.rotors[2].position + 1) % 26;
      this.rotors[1].position = (this.rotors[1].position + 1) % 26;
    } else { // If the slow rotor is not rotated, we test whether the middle rotor is going to be rotated
      if(this.rotors[0].position == this.rotors[0].notch) {this.rotors[1].position = (this.rotors[1].position + 1) % 26;}
    }
    this.rotors[0].position = (this.rotors[0].position + 1) % 26; // The fast rotor is rotated at every key press

    // Run through the wiring:
    let i = 0;
    for(; i < this.rotors.length; i++) { // Pass through every rotor
      input = (this.rotors[i].wiring[(input + this.rotors[i].position) % 26] - this.rotors[i].position + 26) % 26;
    }
    input = this.reflector.wiring[input]; // Pass through the reflector
    i--;
    for(; i >= 0; i--) { // Get back through the rotors
      input = (this.rotors[i].reverseWiring[(input + this.rotors[i].position) % 26] - this.rotors[i].position + 26) % 26;
    }

    return String.fromCharCode(input + 'A'.charCodeAt(0));
  }
};
