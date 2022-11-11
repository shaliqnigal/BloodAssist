import * as loginfns from "./login";

let newForm = document.createElement("form");
newForm.setAttribute("id", "login");
document.body.appendChild(newForm);

let result = document.createElement("div");
result.setAttribute("id", "loginresult");
document.body.appendChild(result);

const MOCK_RESPONSE = {
  status: 200,
  json: () => {
    return { detail: "test" };
  },
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  })
);

test("login validation if there is loginData", () => {
  loginfns.loginListner();
});

test("onsubmit validation", () => {
  const event = { preventDefault: () => {} };
  loginfns.onSubmitLogin(event, document.getElementById("login"));
});

test("check if the status is 200", async () => {
  MOCK_RESPONSE.status = 200;
  const res = MOCK_RESPONSE;
  loginfns.checkStatus(res);
  Object.defineProperty(window, "location", {
    writable: true,
    value: { replace: jest.fn() },
  });
  window.location.replace();
  expect(window.location.replace).toHaveBeenCalled();
});

test("else case for respone", async () => {
  MOCK_RESPONSE.status = 422;
  const res = MOCK_RESPONSE;
  loginfns.checkStatus(res);
});
