let arr = [2, 7, 11, 5];
let target = 16;
let count = 0;



for (i = 0; i < arr.length; i++) {
    if (count + arr[i] == target) {
        console.log(arr[i - 1], arr[i]);
    }
    count = arr[i];
}