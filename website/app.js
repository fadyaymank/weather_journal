/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
let apiKey = "&appid=9e2e4448f4267fa2151d80c06a08e6bf";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//Create an event listener for the element with the id: generate
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  e.preventDefault();

  const enteredZipCode = document.getElementById("zip").value;
  const enteredFeelings = document.getElementById("feelings").value;

  getWeatherInfo(baseURL, enteredZipCode, apiKey).then(function (data) {
    // Add data
    postData("/add", {
      date: newDate,
      temp: data.list[0].main.temp,
      content: enteredFeelings,
    });
    updateUI();
  });
}
const getWeatherInfo = async (baseURL, zipCode, key) => {
  const res = await fetch(baseURL + zipCode + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
};
// post Data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
// update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();

    document.getElementById("date").innerHTML = `Date : ${allData[0].date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature : ${allData[0].temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `User input : ${allData[0].content}`;
  } catch (error) {
    console.log("error", error);
  }
};
