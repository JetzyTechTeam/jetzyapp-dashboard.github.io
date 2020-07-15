function check()
  {
    if(document.getElementById("username").value=="JetzyApp" && document.getElementById("password").value=="JetzyApp@2020")
    {
        localStorage.setItem("login", true);
        console.log("hello");
        window.location.href="information_table.html";
    }
    else
    {
        localStorage.setItem("login", false);

      alert("Invalid Credentials")
    }
  }