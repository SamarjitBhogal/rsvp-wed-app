import Hashids from 'hashids';

const MIN_LENGTH = 10;

const hashids = new Hashids('', MIN_LENGTH);

/**
 * Gives an the decoded number of a given encoded expression.
 *
 * @param {Number} encodedExp The expression to decode.
 * @returns A decoded number.
 */
export function decodeNum(encodedExp) {
	return hashids.decode(encodedExp);
}

/**
 * Gives an encoded number of a given number.
 *
 * @param {Number} num The number to encode.
 * @returns An encoded number.
 */
export function encodeNum(num) {
	return hashids.encode(num);
}
