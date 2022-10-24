export const loginListner = function () {
    let loginData = document.getElementById("login");
    if (loginData) {
      loginData.addEventListener("submit", (e) => onSubmitLogin(e, loginData));
    }
  };
  export const onSubmitLogin = async function (e, logdata) {
    e.preventDefault();
    const login = new FormData(logdata).entries();
    // TODO: update API with production path operation
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(login)),
    });
    checkStatus(response);
  };
  
  export const checkStatus = async (response) => {
    const output = document.getElementById("loginresult");
    const result = await response.json();
  
    if (response.status == 200) {
      output.innerHTML = "Login Success";
      window.location.replace("/Frontend/Templates/loginpage.html");
      document.cookie = result;
    } else {
      output.innerHTML = "Invalid details";
    }
  };
  
  loginListner();