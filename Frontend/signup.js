const signupData = document.getElementById("userDetails");

signupData.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userData = new FormData(signupData).entries();
  const response = await fetch("http://127.0.0.1:8000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(userData)),
  });
  const output = document.getElementById("result");
  const result = await response.json();
  if (response.status == 409) {
    output.innerHTML = result.detail;
  } else {
    output.innerHTML = result;
  }
});
