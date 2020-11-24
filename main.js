"use strict"
let _cars = [];

//Getting data from JSON file
async function loadData(){
    let data = await fetch ('http://duckwise.net/assignments/frontend-internship/cars.json').then(res => res.json());
    console.log(data);
    _cars = data.data;

    appendCars(_cars);
}

loadData();

//Display all cars
function appendCars(cars){
    let htmlTemplate = "";
    for (let car of cars) {
        if(!car.images){
            htmlTemplate +=`
    
        <article class="car-content">
            <div class="main-info">
                <h2 class="car-brand">${car.initials.brand}</h2>
                <p class="car-model">${car.title}</p>
                <p class="car-price"><i class="fas fa-dollar-sign"></i> ${car.initials.price} DKK</p>

                <a href="#${car.initials.brand}/${car.title}" onclick="appendDetails(${car.ID})" class="more">More details</a>
            </div>
        </article>`
        } else {
        htmlTemplate +=`
        <article class="car-content">
            <a href="#${car.initials.brand}/${car.title}" onclick="appendDetails(${car.ID})"><img src="${car.images[0]}" alt="${car.title}"></a>
            <div class="main-info">
                <h2 class="car-brand">${car.initials.brand}</h2>
                <p class="car-model">${car.title}</p>
                <p class="car-price"><i class="fas fa-dollar-sign"></i> ${car.initials.price} DKK</p>

                <a href="#${car.initials.brand}/${car.title}" onclick="appendDetails(${car.ID})" class="more">More details</a>
            </div>
        </article>`
        }
    }
    document.querySelector(".container").innerHTML += htmlTemplate;
}

//Display details info
function appendDetails(carId){
    console.log(carId);
    
    let specificCarDetails = "";
    for (let car of _cars) {
        if(car.ID === carId){
            specificCarDetails = car;
        }
    }
    console.log(specificCarDetails.title);
    
    let htmlDetailsTemplate = "";
    htmlDetailsTemplate += `
    <article class="details-info">
        <div class="main-info">
            <img src="${specificCarDetails.images}" alt="${specificCarDetails.title}">
            <div class="initials-container">
                <div class="brand-model">
                    <h2 class="car-brand">${specificCarDetails.initials.brand}</h2>
                    <p class="car-model">${specificCarDetails.title}</p>
                    <p class="car-model">Variant: ${specificCarDetails.initials.variant}</p>
                    <p class="car-model">Segment: ${specificCarDetails.initials.segment}</p>
                </div>
                <p class="car-model">Description: ${specificCarDetails.description}</p>
                <p class="car-model">Main: ${specificCarDetails.main.Rækkevide.data} ${specificCarDetails.main.Rækkevide.after}</p>
                <p class="car-model">Battery: ${specificCarDetails.main.Batteri.data} ${specificCarDetails.main.Batteri.after}</p>
                <p class="car-model">Garanti: ${specificCarDetails.main.Garanti}</p>
                <p class="car-model">0-100 km/h: </p>
                <p class="car-model">Weight: ${specificCarDetails.main.Vægt.data} ${specificCarDetails.main.Vægt.after}</p>

                <p>EXTRA</p>
                
            </div>
            <p class="car-price"><i class="fas fa-dollar-sign"></i> ${specificCarDetails.initials.price} DKK</p>
        </div>
    </article>
    `
    
    
    document.querySelector(".container").style.display = "none";
    document.querySelector(".header").style.display = "none";
    document.querySelector(".main-header").innerHTML = "<span class='back'>Go back</span>";
    document.querySelector(".details").innerHTML = htmlDetailsTemplate;
}