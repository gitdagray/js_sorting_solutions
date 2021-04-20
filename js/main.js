/*== Understanding the sort() method ==*/

/*=== alpha sort order ===*/
const alphaArray = ["zebra", "arial", "medium"];
const alphaArray2 = ["zebra", "arial", "medium", 3, 1, 1000];

const alphaSort = (array) => {
    if (!array.length) return;
    return array.sort();
}

// console.log(alphaSort(alphaArray));
// console.log(alphaSort(alphaArray2));


/*=== Solution 1: Sort numbers accurately ===*/

const arrayOfNumbers = [1, 100000, 21, 30, 4];

const numberSortAsc = (array) => {
    if (!array.length) return;
    return array.sort((a, b) => a - b);
}

//console.log(numberSortAsc(arrayOfNumbers));

/*=== Solution 2: Sort numbers in descending order ===*/

const numberSortDesc = (array) => {
    if (!array.length) return;
    return array.sort((a, b) => a - b).reverse();
}

//console.log(numberSortDesc(arrayOfNumbers));

/*== Solution 3: Sort an array of numbers AND strings ==*/

const arrayNumAndString = [1, 100000, 21, 30, 4, "zebra", "abc", "medium"];

const sortNumbersAndStrings = (array) => {
    if (!array.length) return;
    const numArray = [];
    const strArray = [];
    array.forEach(el => {
        isNaN(el) ? strArray.push(el) : numArray.push(el);
    });
    strArray.sort();
    numArray.sort((a, b) => a - b);
    return [...numArray, ...strArray];
}

//console.log(sortNumbersAndStrings(arrayNumAndString));


/* === Challenge: Define a function that takes an array of strings, and returns the most commonly occurring string ===*/

const arrayOfStrings = ["one", "two", "3", "one", "one", "two", "one", "one", "two"];

// Solution 1: 
const findMostCommonString = (array) => {
    if (!array.length) return;

    return array.sort((a, b) =>
        array.filter(str => str === a).length
        - array.filter(str => str === b).length
    ).pop();
}

//console.log(findMostCommonString(arrayOfStrings));

// Example of array.filter():
//console.log(arrayOfStrings.filter(str => str === "one"));

// downside to this solution: it modifies original array
// downside to this solution: it does not allow for ties 

//Solution 2:
const findMostCommonStringNoMod = (array) => {
    if (!array.length) return;
    const newArray = [...array];
    return newArray.sort((a, b) =>
        newArray.filter(str => str === a).length
        - newArray.filter(str => str === b).length
    ).pop();
}

//console.log(findMostCommonStringNoMod(arrayOfStrings));
//console.log(arrayOfStrings);

// downside to this solution: it does not allow for ties 

// Solution 3: 
const mostCommonWithTies = (array) => {
    if (!array.length) return;
    const countObj = {};

    array.forEach(el => {
        countObj[el] ? countObj[el] += 1 : countObj[el] = 1;
    });

    const sortArray = [];
    Object.keys(countObj).forEach(key => {
        sortArray.push([key, countObj[key]]);
    });

    sortArray.sort((a, b) => a[1] - b[1]);

    const highestCount = sortArray[sortArray.length - 1][1];

    //Solution 3a: return original element and count
    //const resultArray = sortArray.filter(arr => arr[1] === highestCount);

    //Solution 3b: only returns the original element 
    const resultArray = [];
    sortArray.forEach(arr => {
        if (arr[1] === highestCount) resultArray.push(arr[0]);
    });

    return resultArray;
}

//console.log(mostCommonWithTies(arrayOfStrings));

// downside to this solution: object keys are converted to strings. This solution converts all array data to string type


/*=== Challenge: Count all occurrences of every word in a string ===*/
const wordString = "Every good boy; does fine. Every good boy does fine. Every good boy does? fine. Every! good, boy does fine. Every good boy does.";

//Solution:
const countAllWords = (string) => {
    if (!string.length) return;

    const wordArray = string.toLowerCase().replace(/([.!?,;])/g, '').replace(/[\s]{2,}/g, ' ').split(' ');

    const countObj = {};

    wordArray.forEach(word => {
        countObj[word] ? countObj[word] += 1 : countObj[word] = 1;
    });

    return countObj;
}

//console.log(countAllWords(wordString));

/*=== Challenge: Return the most common word in a string ===*/

// Solution:
const mostCommonWord = (string) => {
    if (!string.length) return;

    const wordArray = string.toLowerCase().replace(/([.!?,;])/g, '').replace(/[\s]{2,}/g, ' ').split(' ');

    return mostCommonWithTies(wordArray);
}

//console.log(mostCommonWord(wordString));