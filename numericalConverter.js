 
/**
 * Number System Converter
 *
 * This application provides functions to convert numbers between different numerical systems:
 * - Decimal (base-10)
 * - Binary (base-2)
 * - Octal (base-8)
 * - Hexadecimal (base-16)
 * - This Code is Generated By Gemini AI, user: @develectro 
 */

class NumberSystemConverter {
    /**
     * Converts a decimal number to binary.
     * @param {number} decimal - The decimal number to convert.
     * @returns {string} The binary representation of the decimal number.
     * @throws {Error} If the input is not a non-negative integer.
     */
    static decimalToBinary(decimal) {
      if (!Number.isInteger(decimal) || decimal < 0) {
        throw new Error("Input must be a non-negative integer.");
      }
      return decimal.toString(2);
    }
  
    /**
     * Converts a binary number to decimal.
     * @param {string} binary - The binary number to convert (string).
     * @returns {number} The decimal representation of the binary number.
     * @throws {Error} If the input is not a valid binary string.
     */
    static binaryToDecimal(binary) {
      if (!/^[01]+$/.test(binary)) {
        throw new Error("Input must be a valid binary string (containing only 0s and 1s).");
      }
      return parseInt(binary, 2);
    }
  
    /**
     * Converts a decimal number to octal.
     * @param {number} decimal - The decimal number to convert.
     * @returns {string} The octal representation of the decimal number.
     * @throws {Error} If the input is not a non-negative integer.
     */
    static decimalToOctal(decimal) {
      if (!Number.isInteger(decimal) || decimal < 0) {
        throw new Error("Input must be a non-negative integer.");
      }
      return decimal.toString(8);
    }
  
    /**
     * Converts an octal number to decimal.
     * @param {string} octal - The octal number to convert (string).
     * @returns {number} The decimal representation of the octal number.
     * @throws {Error} If the input is not a valid octal string.
     */
    static octalToDecimal(octal) {
      if (!/^[0-7]+$/.test(octal)) {
        throw new Error("Input must be a valid octal string (containing only digits from 0 to 7).");
      }
      return parseInt(octal, 8);
    }
  
    /**
     * Converts a decimal number to hexadecimal.
     * @param {number} decimal - The decimal number to convert.
     * @returns {string} The hexadecimal representation of the decimal number.
     * @throws {Error} If the input is not a non-negative integer.
     */
    static decimalToHexadecimal(decimal) {
      if (!Number.isInteger(decimal) || decimal < 0) {
        throw new Error("Input must be a non-negative integer.");
      }
      return decimal.toString(16).toUpperCase();
    }
  
    /**
     * Converts a hexadecimal number to decimal.
     * @param {string} hexadecimal - The hexadecimal number to convert (string).
     * @returns {number} The decimal representation of the hexadecimal number.
     * @throws {Error} If the input is not a valid hexadecimal string.
     */
    static hexadecimalToDecimal(hexadecimal) {
      if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {
        throw new Error("Input must be a valid hexadecimal string (containing only digits 0-9 and letters A-F/a-f).");
      }
      return parseInt(hexadecimal, 16);
    }
  
    /**
     * Converts binary to hexadecimal
     * @param {string} binary - the binary to convert
     * @returns {string} - the hexadecimal convert
     */
    static binaryToHexadecimal(binary) {
       if (!/^[01]+$/.test(binary)) {
        throw new Error("Input must be a valid binary string (containing only 0s and 1s).");
      }
      const decimal = parseInt(binary, 2);
      return decimal.toString(16).toUpperCase();
    }
  /**
     * Converts hexadecimal to binary
     * @param {string} hexadecimal - the hexadecimal to convert
     * @returns {string} - the binary convert
     */
    static hexadecimalToBinary(hexadecimal) {
      if (!/^[0-9A-Fa-f]+$/.test(hexadecimal)) {
        throw new Error("Input must be a valid hexadecimal string (containing only digits 0-9 and letters A-F/a-f).");
      }
      const decimal = parseInt(hexadecimal, 16);
      return decimal.toString(2);
    }
  }
  
  // Example Usage:
  try {
    console.log("Decimal to Binary:", NumberSystemConverter.decimalToBinary(10)); // Output: 1010
    console.log("Binary to Decimal:", NumberSystemConverter.binaryToDecimal("1010")); // Output: 10
    console.log("Decimal to Octal:", NumberSystemConverter.decimalToOctal(25)); // Output: 31
    console.log("Octal to Decimal:", NumberSystemConverter.octalToDecimal("31")); // Output: 25
    console.log("Decimal to Hexadecimal:", NumberSystemConverter.decimalToHexadecimal(255)); // Output: FF
    console.log("Hexadecimal to Decimal:", NumberSystemConverter.hexadecimalToDecimal("FF")); // Output: 255
    console.log("Binary to Hexadecimal:", NumberSystemConverter.binaryToHexadecimal("1111"));//output: F
    console.log("Hexadecimal to Binary:", NumberSystemConverter.hexadecimalToBinary("F"));//output: 1111
  
  
    // Example of error handling:
    // console.log(NumberSystemConverter.decimalToBinary(-5)); // Throws an error
    // console.log(NumberSystemConverter.binaryToDecimal("102")); // Throws an error
    // console.log(NumberSystemConverter.octalToDecimal("89")); //throws an error
    //console.log(NumberSystemConverter.hexadecimalToDecimal("FG"));//throws an error
  } catch (error) {
    console.error("Error:", error.message);
  }
  
