document.querySelector("#signup").addEventListener("submit", event => {
  event.preventDefault();
  const userObj = {
    username: document.querySelector("#signupUsername").value,
    password: document.querySelector("#signupPassword").value,
  };
  console.log(userObj);
  fetch("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        console.log("User signed up successfully");
        location.href = "/dashboard";
      } else {
        alert("Please try again");
      }
    })
    .catch(error => {
      console.log(error);
    });
});



document.querySelector("#login").addEventListener("submit", event => {
  event.preventDefault();
  const userObj = {
    username: document.querySelector("#loginUsername").value,
    password: document.querySelector("#loginPassword").value,
  };
  console.log(userObj);
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        console.log("User is logged in");
        location.href = "/dashboard";
      } else {
        alert("Please try again");
      }
    })
    .catch(error => {
      console.log(error);
    });
});



document.querySelector("#logout").addEventListener("click", () => {
  fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        console.log("User logged out successfully");
        location.href = "/login";
      } else {
        alert("Logout failed");
      }
    })
    .catch(error => {
      console.log(error);
    });
});
