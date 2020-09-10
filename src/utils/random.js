/**
 * Given an array, it returns a new, shuffled array. Random order
 * @param {Array} [arr = Array(50)] - an array solely for the length of number to shuffle. Defaults to length of 50
 * @returns {number[]} an array of numbers in random order
 */
export function shuffle(arr = Array.from({ length: 50 }, (v, i) => i)) {
  let randomArray = arr
  for (let i = randomArray.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i) + 1
    let temp
    temp = randomArray[i]
    randomArray[i] = randomArray[j]
    randomArray[j] = temp
  }
  return randomArray
}
/**
 * Returns a number a number between 0 and specified ending number
 * @param {number} endingNumber - the upper bound of the range for the function
  @returns {number} a single number between 0 and endingNumber
*/
export function randomize(endingNumber) {
  return Math.floor(Math.random() * endingNumber) + 1
}
