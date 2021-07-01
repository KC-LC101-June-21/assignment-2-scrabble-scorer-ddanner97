// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
let userWord = ""

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer (word) {
	word = word.toUpperCase()
	let letterPoints = ""
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!")
   userWord = input.question("Enter a Word: ")
};

let simpleScore = function (word) {
   word = word.toUpperCase()
   let scoreSum = 0

   for (let i = 0; i < word.length; i++) {
      scoreSum += 1
    }

    return scoreSum
}

let vowelBonusScore = function (word) {
   const vowels = ['A', 'E', 'I', 'O', 'U']
   word = word.toUpperCase()
   let scoreSum = 0

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         scoreSum += 3
         continue
      }

      scoreSum += 1

   }

   return scoreSum
};

let scrabbleScore = function (word) {
   let sumScore = 0

   for (let i = 0; i < word.length; i++) {
      sumScore += newPointStructure[word[i]]
   }

   return sumScore
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point",
      scoringFunction: simpleScore
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScore
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scoringFunction: scrabbleScore
   }
]

function scorerPrompt() {
   console.log(`Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system`)

   let choice = input.question("Enter 0, 1, or 2: ")

   while (choice > 2 || choice < 0) {
      choice = input.question("Please select a scoring algorithm (0, 1, 2): ")
   }

   console.log("\nalgorithm name: ", scoringAlgorithms[choice].name)
   console.log(`Score for '${userWord}': `, scoringAlgorithms[choice].scoringFunction(userWord))
}

function transform(oldObject) {

   let newObject = {}

   for (keys in oldObject) {

    for (let i = 0; i < oldObject[keys].length; i++) {
         newObject[oldObject[keys][i].toLowerCase()] = Number(keys)
    }
  }

  //newObject[' '] = 10

  return newObject
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt()
   scorerPrompt()
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};