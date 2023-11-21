let str = "helloeeEeeiI world";

let vowels = 'aAeEiIoOuU'
let count = 0;
let result = {}

for (i = 0; i < str.length; i++) {
    let char = str[i];

    [...vowels].map((a) => {
        if (a == char) {
            if (result[char]) {
                result[char]++;
            } else {
                result[char] = 1;
            }
            count++
        }
    })


}
console.log(count);
console.log(result);




// [...vowels].map((a) => {
//     if (a == char) {
//         count++;
//         console.log(a);

//         obj[char] = count;

//     }
// })