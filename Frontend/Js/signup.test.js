import * as fs from "./signup"; // importing the functions from signup.js

let newForm = document.createElement("form"); // mocking the form "userdetails"
newForm.setAttribute("id", "userDetails");
document.body.appendChild(newForm);

let result = document.createElement("div"); // mocking the div "result"
result.setAttribute("id", "result");
document.body.appendChild(result);

// mock response of api
const MOCK_RESPONSE = {
  status: 200,
  json: () => {
    return { detail: "test" };
  },
};

// mocking the fetch api
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);
