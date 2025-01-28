/**
 * Converts a given hexadecimal number to its decimal representation
 * @param {string|number} hex The hexadecimal number to convert
 * @returns {number} The decimal representation of the given hexadecimal number
 */
function hexToDecimal(hex) {
  return parseInt(Number(hex), 10);
}

/**
 * Converts a given decimal number to its hexadecimal representation
 * @param {number} dec The decimal number to convert
 * @returns {string} The hexadecimal representation of the given number
 */
function decimalToHex(dec) {
  return dec.toString(16);
}

/**
 * Checks if the given string is a valid hexadecimal number
 * @param {string} str the string to check
 * @returns {boolean} true if the string is a valid hexadecimal number, false otherwise
 */
function isHexadecimal(str) {
  // Regular expression to match a valid hexadecimal number
  const hexRegex = /^[0-9A-Fa-f]+$/;
  // Check if the string matches the hexadecimal regex
  return hexRegex.test(str);
}
// Test the function
// console.log('0x51', isHexadecimal(0x51));
// console.log(isHexadecimal("G12"));

/**
 * Calculates the checksum for a given payload, according to the MIDI standard
 * @param {number[]} payload The array of bytes to calculate the checksum for
 * @returns {number} The calculated checksum
 */
const calculateChecksum = (payload) => {
  let sum = payload.reduce((acc, curr) => {
    // console.log(curr, 'is hex number', isHexadecimal(curr));
    return acc + curr;
  }, 0);
  let remainder = sum % 128;
  let checksum = 128 - remainder;
  // return checksum.toString(16);
  return checksum;

  // let hexNumber = "1A"; // Hexadecimal number as a string
  // let decimalNumber = parseInt(hexNumber, 16);
  // console.log(decimalNumber); // Output: 26
  // let checksum = 0x80 - (sum % 0x80);
  // if (checksum == 0x80) checksum = 0;
  // return checksum;
};

export { hexToDecimal, decimalToHex, isHexadecimal, calculateChecksum };
