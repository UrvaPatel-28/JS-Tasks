let randomNumber = Math.floor(Math.random() * 9);
console.log(randomNumber);


for (i = 0; i <= 5; i++) {
    let guessedNumber = prompt('guess the number between 0 to 9')
    if (guessedNumber == randomNumber) {
        console.log('Right answer');
        break;
    }
    else {
        console.log('Wrong answer');
    }
}