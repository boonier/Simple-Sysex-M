
function hexToDecimal(hex) {
  return parseInt(Number(hex), 10);
}

function decimalToHex(dec) {
  return dec.toString(16);
}  

function isHexadecimal(str) {
  // Regular expression to match a valid hexadecimal number
  const hexRegex = /^[0-9A-Fa-f]+$/;
  // Check if the string matches the hexadecimal regex
  return hexRegex.test(str);
}
// Test the function
console.log('0x51', isHexadecimal(0x51));
console.log(isHexadecimal("G12"));

export {
  hexToDecimal,
  decimalToHex,
  isHexadecimal,
}