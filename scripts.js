$(document).ready(function() {
  $("#SubmitButton").click(function() {
    //alert("Clicked");
    var inputRaw = $("#Input").val();
    var input2Raw = $("#Input2").val();
    //alert(inputRaw);
    $("#Output").val(Day4Part2(inputRaw, input2Raw));
  });  
});

function Day1Part1(input) {
  //Count the number of times a depth measurement increases
  var inputArray = input.split("\n");
  var numIncreases = 0;
  for (let i = 1; i < inputArray.length; i++) {
    if (inputArray[i] > inputArray[i-1]) {
      numIncreases++;
    }
  }
  return numIncreases;
}

function Day1Part2(input) {
  var inputArray = input.split("\n");
  var numberArray = inputArray.map(Number);
  //Count number of increases in 3 measurement sliding window
  //Assume at least 4 values
  var numIncreases = 0;
  for (let i = 3; i < numberArray.length; i++) {
    let lastSum = numberArray[i-3] + numberArray[i-2] + numberArray[i-1];
    let newSum = numberArray[i-2] + numberArray[i-1] + numberArray[i];
    console.log(lastSum);
    console.log(newSum);
    if (newSum > lastSum) {
      numIncreases++;
      console.log("INCREASE");
    }
  }
  return numIncreases;
}

function Day2Part1 (input) {
  var inputArray = input.split("\n");
  var currentPos = {
    horizontal: 0,
    depth: 0
  };

  for (let i = 0; i < inputArray.length; i++) {
    console.log(currentPos.depth);
    console.log(currentPos.horizontal);
    var valToIncrement = Number(inputArray[i].split(" ")[1]);
    if (inputArray[i].includes("forward")) {
      currentPos.horizontal += valToIncrement;
    }
    if (inputArray[i].includes("down")) {
      currentPos.depth += valToIncrement;
    }
    if (inputArray[i].includes("up")) {
      currentPos.depth -= valToIncrement;
    }
  }
  var product = currentPos.depth * currentPos.horizontal;
  return product;
}

function Day2Part2 (input) {
  var inputArray = input.split("\n");
  var currentPos = {
    horizontal: 0,
    depth: 0,
    aim: 0
  };
  for (let i = 0; i < inputArray.length; i++) {
    var value = Number(inputArray[i].split(" ")[1]);
    if (inputArray[i].includes("forward")) {
      currentPos.horizontal += value;
      currentPos.depth += (currentPos.aim * value);
    }
    if (inputArray[i].includes("down")) {
      currentPos.aim += value;
    }
    if (inputArray[i].includes("up")) {
      currentPos.aim -= value;
    }
  }
  var product = currentPos.depth * currentPos.horizontal;
  return product;
}

function BinaryToDecimal (binaryString) {
  var decimalNumber = 0;
  for (let i = binaryString.length - 1; i >=0; i--) {
    decimalNumber += Number(binaryString[i]) * Math.pow(2,binaryString.length-i-1);
  }
  return decimalNumber;
}

function Day3Part1 (input) {
  //Power consumption is Gamm Rate times Epsilon Rate
  //Each bit in Gamma rate can be determined by finding the most
  //common bit in corresponding position

  //Epsilon Rate is made up of lease common bits

  var gammaString = "";
  var epsilonString = "";

  var inputArray = input.split("\n");
  var counter = [0,0,0,0,0,0,0,0,0,0,0,0]
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      if (inputArray[i][j] == "1") {
        counter[j]++;
      } else {
        counter[j]--;
      }
    }
  }
  //Loop through counters to get the results
  for (let k = 0; k < counter.length; k++) {
    if (counter[k] > 0) { //ONE is most commoon
      gammaString = gammaString + "1";
      epsilonString = epsilonString + "0";
    } else if (counter[k] < 0) { //ZERO is most common
      gammaString = gammaString + "0";
      epsilonString = epsilonString + "1";
    } else { //TIE
      console.log("WHAT THE FUCK!!!");
    }
  }
  var gammaDecimal = BinaryToDecimal(gammaString);
  var epsilonDecimal = BinaryToDecimal(epsilonString);

  var product = gammaDecimal * epsilonDecimal;
  return product;
}

function MostCommonBit(binaryStringArray, position) {
  //return 1 or 0 if most common
  //RETURN 2 IF A TIE
  var numOnes = 0;
  var numZeroes = 0;
  for (let i = 0; i < binaryStringArray.length; i++) {
    if (binaryStringArray[i][position] == "1") {
      numOnes++;
    } else if (binaryStringArray[i][position] == "0") {
      numZeroes++;
    } else {
      return -1;
    }
  }
  if (numOnes > numZeroes) {
    return 1;
  } else if (numOnes < numZeroes) {
    return 0;
  } else {
    return 2;
  }
}

function Day3Part2 (input) {
  //Life Support Rating = Oxygen Generator Rating * CO2 Scrubber Rating
  //Start with first bit. Keep only numbers selected by bit critera
  //Stop when one value remains
  //
  //Bit Critera Oxygen: determine most common, keep only numbers with that
  //or if tie, keep 1
  //Bit critera CO2: determine lease common, keep only numbers with that,
  //or if tie, keep 0
  var inputArray = input.split("\n");
  //Find O2:  
  var o2Array = inputArray;
  var position = 0;
  while (o2Array.length != 1) {
    if (MostCommonBit(o2Array, position) == 0) {
      o2Array = o2Array.filter(binaryNumber => binaryNumber[position] == "0");
    } else {

      o2Array = o2Array.filter(binaryNumber => binaryNumber[position] == "1");
    }
    position++;
  }
  var oxygenGeneratorRating = BinaryToDecimal(o2Array[0]);

  //Find CO2:
  var co2Array = inputArray;
  var position = 0;
  while (co2Array.length != 1) {
    if (MostCommonBit(co2Array, position) == 0) {
      co2Array = co2Array.filter(binaryNumber => binaryNumber[position] == "1");
    } else {
      co2Array = co2Array.filter(binaryNumber => binaryNumber[position] == "0");
    }
    position++;
  }
  var co2ScrubberRating = BinaryToDecimal(co2Array[0]);

  var lifeSupportRating = co2ScrubberRating * oxygenGeneratorRating;
  return lifeSupportRating;
}

class BingoPoint {
  constructor(num) {
    this.number = num;
    this.marked = false;
  }
}

class BingoBoard {
  constructor(points) {
    this.points = points;
  }
  get winner() {
    return this.won();
  }
  update(numberCalled) {
    for (let i = 0; i < this.points.length; i++) {
      if (numberCalled == this.points[i].number) {
        this.points[i].marked = true;
      }
    }
  }
  score(lastNumberCalled) {
    var sumUnmarked = 0;
    for (let i =0; i < this.points.length; i++) {
      if ( ! this.points[i].marked) {
        sumUnmarked += this.points[i].number;
      }
    }
    return (sumUnmarked * lastNumberCalled);
  }
  won() {
    if (this.points[0].marked && this.points[1].marked && this.points[2].marked && this.points[3].marked && this.points[4].marked) {
      return true;
    }
    if (this.points[5].marked && this.points[6].marked && this.points[7].marked && this.points[8].marked && this.points[9].marked) {
      return true;
    }
    if (this.points[10].marked && this.points[11].marked && this.points[12].marked && this.points[13].marked && this.points[14].marked) {
      return true;
    }   
    if (this.points[15].marked && this.points[16].marked && this.points[17].marked && this.points[18].marked && this.points[19].marked) {
      return true;
    }   
    if (this.points[20].marked && this.points[21].marked && this.points[22].marked && this.points[23].marked && this.points[24].marked) {
      return true;
    }
    if (this.points[0].marked && this.points[5].marked && this.points[10].marked && this.points[15].marked && this.points[20].marked) {
      return true;
    }
    if (this.points[1].marked && this.points[6].marked && this.points[11].marked && this.points[16].marked && this.points[21].marked) {
      return true;
    }
    if (this.points[2].marked && this.points[7].marked && this.points[12].marked && this.points[17].marked && this.points[22].marked) {
      return true;
    }
    if (this.points[3].marked && this.points[8].marked && this.points[13].marked && this.points[18].marked && this.points[23].marked) {
      return true;
    }
    if (this.points[4].marked && this.points[9].marked && this.points[14].marked && this.points[19].marked && this.points[24].marked) {
      return true;
    }
    if (this.points[0].marked && this.points[6].marked && this.points[12].marked && this.points[18].marked && this.points[24].marked) {
      return true;
    }
    if (this.points[4].marked && this.points[8].marked && this.points[12].marked && this.points[16].marked && this.points[20].marked) {
      return true;
    }
    return false;
  }
}

function Day4Part1 (input, input2) {
  //BINGO BOARDS
  var inputArray2 = input2.split("\n");
  var numRows = 0;
  //var currentBoard;
  var boardArray = [];
  var pointArray = [];
  
  
  for (let i = 0; i < inputArray2.length; i++) {
    if (numRows < 5) {
      //Add row to current board
      if (inputArray2[i].trim != "") {
        var numArray = inputArray2[i].trim().split(/\s+/).map(num => Number(num));
        for (let j = 0; j < numArray.length; j++) {
          var newPoint = new BingoPoint(numArray[j]);
          pointArray.push(newPoint);
        }
        numRows++;
      } 
    } else {
      var newBoard = new BingoBoard(pointArray);
      pointArray = [];
      numRows = 0;
      boardArray.push(newBoard);      
    }
  }

  console.log(boardArray);

  var inputArray = input.split(",").map(num => Number(num));
  
  var numWinners = 0;
  var currentIndexCalled = 0;
  var currentNumberCalled;
  var winningScore;

  while (numWinners < 1) {
    currentNumberCalled = inputArray[currentIndexCalled];
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i].update(currentNumberCalled);
      if (boardArray[i].won()) {
        winningScore = boardArray[i].score(currentNumberCalled);
        numWinners++;
      }
    }
    currentIndexCalled++;
  }
  console.log(numWinners);
  console.log(currentNumberCalled);
  return winningScore;
}

function Day4Part2(input, input2) {
  //BINGO BOARDS
  //GET Last Board to win!
  var inputArray2 = input2.split("\n");
  var numRows = 0;
  //var currentBoard;
  var boardArray = [];
  var pointArray = [];
  
  
  for (let i = 0; i < inputArray2.length; i++) {
    if (numRows < 5) {
      //Add row to current board
      if (inputArray2[i].trim != "") {
        var numArray = inputArray2[i].trim().split(/\s+/).map(num => Number(num));
        for (let j = 0; j < numArray.length; j++) {
          var newPoint = new BingoPoint(numArray[j]);
          pointArray.push(newPoint);
        }
        numRows++;
      } 
    } else {
      var newBoard = new BingoBoard(pointArray);
      pointArray = [];
      numRows = 0;
      boardArray.push(newBoard);      
    }
  }

  console.log(boardArray);

  var inputArray = input.split(",").map(num => Number(num));
  
  var numWinners = 0;
  var currentIndexCalled = 0;
  var currentNumberCalled;
  var winningScore;
  var totalBoards = boardArray.length;

  while (numWinners < totalBoards) {
    currentNumberCalled = inputArray[currentIndexCalled];
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i].update(currentNumberCalled);
      if (boardArray[i].won()) {
        if (boardArray.length == 1) {
          winningScore = boardArray[i].score(currentNumberCalled);
        }
        //winningScore = boardArray[i].score(currentNumberCalled);
        numWinners++;
      }
    }
    boardArray = boardArray.filter(brd => (brd.won() == false));
    console.log(boardArray.length);
    currentIndexCalled++;
  }
  console.log(numWinners);
  console.log(currentNumberCalled);
  return winningScore;
}