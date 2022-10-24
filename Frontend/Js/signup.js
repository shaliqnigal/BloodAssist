export let signupData = document.getElementById("userDetails");
export const signUpListner = function () {
  if (signupData) {
    signupData.addEventListener("submit", onSubmit);
  }
};
export const onSubmit = async function (e) {
  if (e) {
    e.preventDefault();
  }
  const userData = new FormData(signupData).entries();
  // TODO: update API with production path operation
  const response = await fetch("http://127.0.0.1:8000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(userData)),
  });
  const output = document.getElementById("result");
  const result = await response.json();
  if (response.status == 409) {
    output.innerHTML = result.detail;
  }
  if (response.status == 422) {
    output.innerHTML = "Please enter valid email";
  } else {
    output.innerHTML = result;
  }
};

signUpListner();
