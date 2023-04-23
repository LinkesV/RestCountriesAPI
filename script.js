let url = 'https://restcountries.com/v3.1/all';

//Giving ID to the body
let mainbody = document.querySelector("body");
mainbody.id = "main"
// mainbody.className = "bg-light text-dark";

//Appending Container to the body
let maindiv = document.createElement("div");
maindiv.className = "container"
maindiv.id = "maindiv"
document.getElementById("main").appendChild(maindiv);

//Appending Row to the body
let row = document.createElement("div");
row.className = "row"
row.id = "tablerow"
document.getElementById("maindiv").appendChild(row);

//Appending Columns filled with Data from 250 Countries

let fetchUrl = fetch(url)
fetchUrl
.then((res) => res.json())
.then((countrydetails) => {
    let count = 1;
    for (let country of countrydetails) {
        // console.log(`${flag.flags.png}`)
        
        // Making a column
        let column = document.createElement("div");
        column.className = "col-lg-4 col-sm-12";
        column.id = "country" + count;
        document.getElementById("tablerow").appendChild(column);

        //Making a Card
        let card = document.createElement("div")
        card.className ="card  mb-3";
        card.id = "card" + count;
        document.getElementById("country" + count).appendChild(card);

        //Card Img
        let pic = document.createElement("img");
        pic.className = "card-img-top";
        pic.id = "img" + count;
        pic.src = `${country.flags.png}`;
        pic.style.height = "250px";
        document.getElementById("card" + count).appendChild(pic);

        // Class Body
        let textbox = document.createElement("div");
        textbox.className = "card-body";
        textbox.id = `${country.latlng[0]} ${country.latlng[1]}`;
        document.getElementById("card" + count).appendChild(textbox);

        //Country Name
        let countryname = document.createElement("h3");
        countryname.className = "card-title"
        countryname.id = `${country.name.official}`;
        countryname.innerHTML = `<u>${country.name.official}</u>`;
        document.getElementById(`${country.latlng[0]} ${country.latlng[1]}`).appendChild(countryname);

        // Country Capital
        let capital = document.createElement("p");
        capital.className = "card-text"
        capital.id = `${country.capital}`;
        capital.innerHTML = `Capital:  ${country.capital}`;
        document.getElementById(`${country.latlng[0]} ${country.latlng[1]}`).appendChild(capital);
    
        //Country Region
        let region = document.createElement("p");
        region.className = "card-text"
        region.id = `${country.region}`;
        region.innerHTML = `Region:  ${country.region}`;
        document.getElementById(`${country.latlng[0]} ${country.latlng[1]}`).appendChild(region);

        //Country Code 
        let code = document.createElement("p");
        code.className = "card-text"
        code.id = `${country.ccn3}`;
        code.innerHTML = `Country Code: ${country.ccn3} ${country.cca3}`;
        document.getElementById(`${country.latlng[0]} ${country.latlng[1]}`).appendChild(code);

        //Latitude Longitude
        let latlng = document.createElement("p");
        latlng.className = "card-text"
        latlng.id = `${country.latlng[0]}}`;
        latlng.innerHTML = `Latitude: ${country.latlng[0].toFixed(3)}<br> Longitude: ${country.latlng[1].toFixed(3)}`;
        document.getElementById(`${country.latlng[0]} ${country.latlng[1]}`).appendChild(latlng);


       

        // Each Country will have a different count 

        //Button for weather APIlet anchor = document.createElement("a");
        let anchor = document.createElement("a");
        anchor.className = "btn btn-primary";
        anchor.classList.add("weather" + count);
        anchor.id = "weather" + count;
        anchor.innerHTML = "Click for Weather"
        
        document.getElementById(`${country.latlng[0]} ${country.latlng[1]}`).appendChild(anchor);

        let x = document.getElementById("weather" + count);
        x.addEventListener("click",getWeather);

         //Empty Para for weather 
        let para = document.createElement("p");
        para.className = "para-text";
        para.classList.add("weather" + count);
        para.style.height = "70px";
        document.getElementById(`${country.latlng[0]} ${country.latlng[1]}`).appendChild(para);

        count++;
        }
    });


    function getWeather(){
        x = this.parentElement
        var y = this.classList[2];
       
        lat = x.id.split(' ')[0];
        lon = x.id.split(' ')[1];
        
        let weatherurl = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon=" + lon +"&appid=fbd77dfd88be9ba399fc6eb082f0204b&units=metric";
        
        let fetchWeatherUrl = fetch(weatherurl);
        fetchWeatherUrl
                .then((res) => res.json())
                .then((weatherdetails) => {
                   
                    z = document.querySelectorAll(`p.${y}`);
                    z[0].innerHTML = ` Weather --> ${weatherdetails.weather[0].description.toUpperCase()} 
                    <br>Current temperature is <strong>${weatherdetails.main.temp} °C </strong> 
                    <br> Temperature feels like <strong>${weatherdetails.main.feels_like} °C </strong>
                    <br> Wind speed is <strong>${weatherdetails.wind.speed} m/s </strong>`
                    
                });

    }
    