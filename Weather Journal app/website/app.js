/*Global Variables */
const theForm=document.getElementsByClassName("app__form");
const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "aa37668a34d26cc94878185f0092556d";
const zip = document.querySelector("#zip").value;
const feelings = document.querySelector("#feelings").value;
const generate = document.querySelector("#generate")
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Function that Updates UI without reloading the page
const update = async () => {
    let infoRequest= await fetch ("/path2");
    try {
        let info = await infoRequest.json();
        let date = document.querySelectorAll('#date');
        let temp = document.querySelectorAll("#temp");
        let content = document.querySelectorAll("#content");
        date.innerHTML=info.date;
        temp.innerHTML=info.temp;
        content.innerHTML=info.content;
    }
    catch (err) {
        console.log(`${err} is error`);
    }
}

//Function that Posting info
const post = async (url="",infoContainer={}) => {
    let sendInfo = await fetch (url, {
        method:"post method",
        credentials: "same-origin",
        headers:{
            "content_type":"application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            date:infoContainer.date,
            temp: infoContainer.temp,
            content:infoContainer.content
        })
    })
    try {
        let jsonInfo=await sendInfo.json();
        return jsonInfo;
    }
    catch (err) {
        console.log(err);
    }
}

// Function that gets data from weather API
const Weather = async (baseURL, zip, apiKey) => {
    
    const fetching = await fetch(baseURL + zip + apiKey);
    try {
     
      const userData = await fetching.json();
      return userData;
    } catch (err) {
      console.log(`${err} is error`);
    }
  }

//the Event listener callback
function callback (cancelDefault) {
    cancelDefault.preventDefault();
  Weather(baseURL, zip, apiKey).then(function (freshInfo){
      update();
  })
  theForm.reset();    
}

//the event listener
generate.addEventListener("click", callback)