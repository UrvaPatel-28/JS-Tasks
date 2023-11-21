let arr = [2, 7, 11, 5];
let target = 16;
let count = 0;

let answer = arr.filter((a) => {
    if (count + a == target) {
        console.log(a);
        console.log('hii');
        return 6;
    }
    count = a;
    return 7
    // return count == 2
})
console.log(answer);

// for (i = 0; i < arr.length; i++) {
//     if (count + arr[i] == target) {
//         console.log('hii');
//         console.log(arr[i - 1], arr[i]);
//     }
//     count = arr[i];
// }