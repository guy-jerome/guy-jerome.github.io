var createCounter = function(n) {
    let countTimes = 0;
    return function() {
        countTimes++
        return n + (countTimes -1)
    };
};


const counter = createCounter(10)

console.log(counter())
console.log(counter())
console.log(counter())
console.log(counter())
