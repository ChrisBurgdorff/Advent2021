$(document).ready(function() {
  $("#SubmitButton").click(function() {
    //alert("Clicked");
    var inputRaw = $("#Input").val();
    //alert(inputRaw);
    $("#Output").val(Day2Part2(inputRaw));
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

function Day3Part1 (input) {
  
}