import Hashids from 'hashids';

const MIN_LENGTH = 10;

const hashids = new Hashids('', MIN_LENGTH);

/**
 * Gives an the decoded number of a given encoded expression.
 *
 * @param {String} encodedExp The expression to decode.
 * @returns A decoded number.
 */
export function decodeID(encodedExp) {
	return hashids.decodeHex(encodedExp);
}

/**
 * Gives an encoded number of a given ID.
 *
 * @param {String} ID The number to encode.
 * @returns An encoded expression.
 */
export function encodeID(ID) {
	return hashids.encodeHex(ID);
}


const encodedHex = encodeID("gdhCEPE7");
const decodedHex = decodeID(encodedHex);

console.log("Encoded: " + encodedHex);
console.log("Decoded: " + decodedHex);
