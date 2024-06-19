const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500;

let numbersWindow = [];

const fetchNumber = async (type) => {
  const apiUrl = `http://20.244.56.144/test/${type}`;
  try {
    const response = await axios.get(apiUrl, { timeout: TIMEOUT });
    return response.data.numbers;
  } catch (error) {
    console.log(`Error in fetching numbers: ${error}`);
  }
};

// Checking the type is one of the allowed values
const isValidType = (type) => ["primes", "fibo", "even", "rand"].includes(type);

const averageCalc = (numbers) => {
  if (numbers.length === 0) return 0.0;

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  const average = sum / numbers.length;

  // Return average rounded to 2 decimal points
  return Math.round(average * 100) / 100;
};

app.get("/numbers/:type", async (req, res) => {
  const type = req.params.type;

  if (!isValidType(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }

  const newNumbers = await fetchNumber(type);

  const windowPrevState = [...numbersWindow];

  for (let i = 0; i < newNumbers.length; i++) {
    const number = newNumbers[i];
    if (!numbersWindow.includes(number)) {
      if (numbersWindow.length >= WINDOW_SIZE) {
        numbersWindow.shift();
      }
      numbersWindow.push(number);
    }
  }

  const windowCurrState = [...numbersWindow];
  const avg = averageCalc(numbersWindow);

  res.json({
    windowPrevState,
    windowCurrState,
    avg,
    numbers: newNumbers,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});