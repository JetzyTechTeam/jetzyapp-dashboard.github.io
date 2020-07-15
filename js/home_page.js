console.log("Hello")
var text_field = document.getElementById("user-counter"); 

let api = "https://jetzyapi.herokuapp.com/TotalUserCount"; //Beware of Cors Error due to running on localhost.

fetch(api)
  .then(response =>{
    return response.json();
  })

  .then(data => {
    var number = data["Count"][0][0]; 
    text_field.innerHTML = number+" Users and Counting!"
})
