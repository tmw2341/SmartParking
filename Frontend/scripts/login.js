function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if(username == "admin" && password == "admin"){
      //admin
     
    }
    else if(username[0] == "U"){
      //undergraduate student
      localStorage.setItem("user", "student");
      localStorage.setItem("username", username);
      window.location.href = "./booksLibrary.html";
    }
    else{
      //failed login
      alert("Invalid username and/or password");
    }
  }