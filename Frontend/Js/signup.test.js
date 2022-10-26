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

// testcase for signuplistner this passes only when it can getlementbyid "userdetails"
test("signup validation if there is signUpdata", () => {
  fs.signUpListner();
});

//testcase for onsubmit
test("onsubmit validation", () => {
  const event = { preventDefault: () => {} }; // onsubmit has two parameters with event and sigupdata
  fs.onSubmit(event, document.getElementById("userDetails"));
});

//testcase if the response is 409
test("check if the status is 409", async () => {
  MOCK_RESPONSE.status = 409;
  const res = MOCK_RESPONSE;
  fs.checkStatus(res);
});

test("check if the status is 200", async () => {
  MOCK_RESPONSE.status = 200;
  const res = MOCK_RESPONSE;
  fs.checkStatus(res);
});

test("check if the status is 422", async () => {
  MOCK_RESPONSE.status = 422;
  const res = MOCK_RESPONSE;
  fs.checkStatus(res);
});
