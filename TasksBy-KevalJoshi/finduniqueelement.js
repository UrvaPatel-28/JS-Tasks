let arr = [1, 2, 1, 5, 5, 9, 9];
let res = 0

for (var i = 0; i < arr.length; i++) {
    res = res ^ arr[i];
    // console.log(res);
}
console.log('final output :', res);
