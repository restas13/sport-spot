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
