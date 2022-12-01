import * as loginfns from "./login";

let newForm = document.createElement("form"); // mocking the "form"
newForm.setAttribute("id", "login");
document.body.appendChild(newForm);

let result = document.createElement("div"); // mocking the "div"
result.setAttribute("id", "loginresult");
document.body.appendChild(result);

//mock the response of the api
const MOCK_RESPONSE = {
  status: 200,
  json: () => {
    return { detail: "test" };
  },
};

// mocking fetch api
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);

// testcase for loginlistner this passes only when ther is register form data
test("login validation if there is loginData", () => {
  loginfns.loginListner();
});

// testcase for onsubmit
test("onsubmit validation", () => {
  const event = { preventDefault: () => {} };
  loginfns.onSubmitLogin(event, document.getElementById("login"));
});

// test case if the response is 200
test("check if the status is 200", async () => {
  MOCK_RESPONSE.status = 200;
  const res = MOCK_RESPONSE;
  loginfns.checkStatus(res);
  // mocking the replace of window location to another page after successful login
  Object.defineProperty(window, "location", {
    writable: true,
    value: { replace: jest.fn() },
  });
  window.location.replace();
  expect(window.location.replace).toHaveBeenCalled();
});

// testcase if response is 422
test("else case for respone", async () => {
  MOCK_RESPONSE.status = 422;
  const res = MOCK_RESPONSE;
  loginfns.checkStatus(res);
});
