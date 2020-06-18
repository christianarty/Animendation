// Given an array, it returns a new, shuffled array. Random order
function shuffle(arr) {
  let randomArray = arr;
  for (let i = randomArray.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i) + 1;
    let temp;
    temp = randomArray[i];
    randomArray[i] = randomArray[j];
    randomArray[j] = temp;
  }
}

export default shuffle;
