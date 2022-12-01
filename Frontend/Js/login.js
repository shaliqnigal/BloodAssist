// listner for login form
export const loginListner = function () {
  let loginData = document.getElementById("login");
  if (loginData) {
    loginData.addEventListener("submit", (e) => onSubmitLogin(e, loginData));
  }
};

// function on submit of login form
export const onSubmitLogin = async function (e, logdata) {
  e.preventDefault();
  const login = new FormData(logdata).entries();
  // TODO: update API with production path operation
  // checks the details in database
  const response = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(login)),
  });
  checkStatus(response);
};

// checks the status of the api call
export const checkStatus = async (response) => {
  const output = document.getElementById("loginresult");
  const result = await response.json();

  if (response.status == 200) {
    output.innerHTML = "Login Success";
    // on successful login it return the JWT token
    // window.location.replace("/Frontend/Templates/loginpage.html");
    setTimeout(
      () => window.location.replace("/Frontend/Templates/loginpage.html"),
      1300
    );
    // setting the api call JWT token as a cookie
    document.cookie = result;
  } else {
    output.innerHTML = "Invalid details";
  }
};

loginListner();
