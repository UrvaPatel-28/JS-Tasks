let arr = [1, 2, 1, 5, 5, 9, 9];
// let res = 0

for (var i = 0; i < arr.length; i++) {
    res = res ^ arr[i];
    console.log(res);
}
console.log('final output :', res);

// let count = new Set(arr).size;
// console.log(count);

// arr.filter((a) => {
//     if (arr.includes(a)) {
//         console.log(a);
//     }
// })