// const form = document.querySelector("form");
// form.addEventListener("submit", (e)=>{
//     e.preventDefault();
//     const location = e.target["pick-a-location"].value;
//     console.log(location);
//     const url = `https://wttr.in/${location}?format=j1`;
    
//     fetch(url)
//     .then(response)=>{
//         return response.json();
//     })
//         .then((data)=> {
//             console.log(data);
//             const currentPlace = document.querySelector(".weather-of-current-place");
//             currentPlace.textContent = "";
//             currentPlace.innerHTML = `<div id = "display-location">
//                                     <h2>${pickLocation}</h2> </div>
//                                     <div id="display-text">
//                                     <div id="display-area">Area: ${data.nearest_area[0].areaName[0].value}</div>
//                                     <div id="display-region">Region: ${data.nearest_area[0].region[0].value}</div>
//                                     <div id="display-country">Country: ${data.nearest_area[0].county[0].value}</div>
//                                     <div id="display-currently">Currently: ${data.current_condition[0].feelsLikeF} °F</div>`

//             const today = document.querySelector("#today"); 
//             const avgTemp = data.weather[0].avgtempF;
//             const min = data.weather[0].mintempF;
//             const max = data.weather[0].maxtempF;

//             today.innerHTML = `<h3> Today <h3>
//                                <div id = "Average-Temp">AverageTemp:${avgTemp} F degrees</div>
//                                <div id = "Min-Temp">Min-Temp:${min} F degrees </div>
//                                <div id = "Max-Temp">Max-Temp:${max} F degrees </div>`;
            
//                                const tomorrow = document.querySelector("#today"); 
//                                const avgTemp1 = data.weather[1].avgtempF;
//                                const min1 = data.weather[1].mintempF;
//                                const max1 = data.weather[1].maxtempF;
                   
//                                tomorrow.innerHTML = `<h3> Tomorrow <h3>
//                                                   <div id = "Average-Temp">AverageTemp:${avgTemp1} F degrees</div>
//                                                   <div id = "Min-Temp">Min-Temp:${min1} F degrees </div>
//                                                   <div id = "Max-Temp">Max-Temp:${max1} F degrees </div>`;
                                                  
//                                                   const dayAfter = document.querySelector("#dayAfter"); 
//                                                   const avgTemp2 = data.weather[2].avgtempF;
//                                                   const min2 = data.weather[2].mintempF;
//                                                   const max2 = data.weather[2].maxtempF;
                                      
//                                                   dayAfter.innerHTML = `<h3> Day After Tomorrow <h3>
//                                                                      <div id = "Average-Temp">AverageTemp:${avgTemp2} F degrees</div>
//                                                                      <div id = "Min-Temp">Min-Temp:${min2} F degrees </div>
//                                                                      <div id = "Max-Temp">Max-Temp:${max2} F degrees </div>`;
//         })
//     })
// })

let form = document.querySelector("form")
let searches =[];

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let chooseLocation = e.target["location"].value;
    e.target["location"].value = "";
    // let errorMsg = document.querySelector("#error-message")
    let errorMsg = document.createElement("div")
    // console.log(chooseLocation)
    if(!chooseLocation){
        errorMsg.textContent = "Please enter a location"
        form.before.add(errorMsg);

    } else {
        errorMsg.textContent = "";
        // console.log(chooseLocation)
        fetch(`https://wttr.in/${chooseLocation}?format=j1`)
            .then((res)=> {
                return res.json();
            }).then((data)=> {

                // console.log(data);

                let dateTime = data.current_condition[0].localObsDateTime;


                // let previousSearch = document.querySelector("#previousSearches")
        
                // let listItem = document.createElement("li")
                let forecast = document.querySelector("#forecast")
               forecast.innerHTML = `
                <div id ="current-location" class="display"> </div>
                <h2>${data.nearest_area[0].areaName[0].value}</h2>
                <div><strong>${dateTime}<strong><div>
                <br>
                <div><strong>Area: </strong><span id="area">${data.nearest_area[0].areaName[0].value}</span></div>
                <br>
                <div><strong>Region: </strong><span id="region"> ${data.nearest_area[0].region[0].value}</span></div>
                <br>
                <div><strong>Country: </strong><span id="country">${data.nearest_area[0].country[0].value}</span></div>
                <br>
                <div><strong>Currently: </strong><span id="current">Feels like ${data.current_condition[0].FeelsLikeF}°F</span></div>
                
                <br>`;

                let threeDay = document.querySelector("#threeDay");

                threeDay.innerHTML =`
                <div id = "today">
                    <h3>Today</h3>
                    <div><strong>Average Temp: </strong><span>${data.weather[0].avgtempF} °F</span></div>
                    <br>
                    <div><strong>Max Temp: </strong><span> ${data.weather[0].maxtempF} °F</span></div>
                    <br>
                    <div><strong>Min Temp: </strong><span> ${data.weather[0].mintempF} °F</span></div>
                <br>      
                </div>
                <div id ="tomorrow">
                    <h3>Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[1].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[1].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[1].mintempF}°F</span></div>
                    <br>          
                 </div>
                 <div id="day-after">
                    <h3>Day After Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[2].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[2].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[2].mintempF}°F</span></div>
                    <br>
                 </div>`;


                let anchor = document.createElement("a");
                anchor.setAttribute("href", "#")
                let li = document.createElement("li")
                let span = document.createElement("span")
                span.innerHTML = ` - ${data.current_condition[0].FeelsLikeF}°F`
                // li.textContent =  ` - ${data.current_condition[0].FeelsLikeF}°F`
                anchor.textContent = chooseLocation;
                li.append(anchor,span)
                let ul = document.querySelector("#history-items")
                ul.append(li)

                let previousSearches = document.querySelector("#history-placeholder")
                if(previousSearches){
                    previousSearches.remove();
                }
                
                anchor.addEventListener("click", (e)=>{
                    e.preventDefault();
                    console.log(e.target.textContent)
                    updateWeather(e.target.textContent)
                    
                })

    
                // if (!searches.includes(anchor.textContent) && searches.length < 15){
                //     searches.push(anchor.textContent)

                    // li.prepend(anchor);
                    // ul.append(listItem);
                    // console.log(searches)

            })

            // }).catch((err)=>{
            //     throw err;// still returns data when random info entered into form 
            // });
    
    }

})



// });

function updateWeather(city){
    fetch(`https://wttr.in/${city}?format=j1`)
    .then((res)=> {
        return res.json();
    }).then((data)=> {
        let forecast = document.querySelector("#forecast")
        forecast.innerHTML = `
                <div id ="current-location" class="display"> </div>
                <h2>${data.nearest_area[0].areaName[0].value}</h2>
                <div><strong>${data.current_condition[0].localObsDateTime}<strong><div>
                <br>
                <div><strong>Area: </strong><span id="area">${data.nearest_area[0].areaName[0].value}</span></div>
                <br>
                <div><strong>Region: </strong><span id="region"> ${data.nearest_area[0].region[0].value}</span></div>
                <br>
                <div><strong>Country: </strong><span id="country">${data.nearest_area[0].country[0].value}</span></div>
                <br>
                <div><strong>Currently: </strong><span id="current">Feels like ${data.current_condition[0].FeelsLikeF}°F</span></div>
                <br>`;

        let threeDay = document.querySelector("#threeDay");

        threeDay.innerHTML =`
                <div id = "today">
                    <h3>Today</h3>
                    <div><strong>Average Temp: </strong><span>${data.weather[0].avgtempF} °F</span></div>
                    <br>
                    <div><strong>Max Temp: </strong><span> ${data.weather[0].maxtempF} °F</span></div>
                    <br>
                    <div><strong>Min Temp: </strong><span> ${data.weather[0].mintempF} °F</span></div>
                <br>      
                </div>
                <div id ="tomorrow">
                    <h3>Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[1].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[1].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[1].mintempF}°F</span></div>
                    <br>          
                 </div>
                 <div id="day-after">
                    <h3>Day After Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[2].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[2].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[2].mintempF}°F</span></div>
                    <br>
                 </div>`;


            }).catch((err)=>{
                throw err;
            });

}