import filter from './modules/search.js';
import explore from './modules/explore.js';

// searchRequest
let elementsArray = document.querySelectorAll('.filtering');
elementsArray.forEach(function(elem) {
    elem.addEventListener("input", function() {
        placeData();
    });
});

let formHash = location.hash;
if(formHash === "#filters"){
        placeData();
}

//filter button
let filterButton = document.querySelector('.filter-button');
if(filterButton) {
    filterButton.addEventListener("click", function () {
        placeData();
    });
}



function countData() {
    return new Promise((resolve, reject) => {
        filter()
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
    //      document.querySelector('.results-count').innerHTML = data.length;
}


async function placeData(){
    try {
        let data = await countData();
        // console.log(data.length);
        document.querySelector('.results-count').innerHTML = data.length;
    } catch(error) {
        console.error(error);
    }
}


function dataExplore() {
    return new Promise((resolve, reject) => {
        explore()
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
    //      document.querySelector('.results-count').innerHTML = data.length;
}


async function placeDataExplore(){
    try {
        let data = await dataExplore();
        // console.log(data);
        var randomItem = data[Math.floor(Math.random()*data.length)];
       // console.log(randomItem);
        //document.querySelector('.results-count').innerHTML = data.length;
       document.getElementById('avatar').src = "images/"+randomItem.avatar;
       document.querySelector('.first-name').innerHTML = randomItem.first_name;
       document.querySelector('.age').innerHTML = randomItem.age;
       document.querySelector('.distance-location').innerHTML = randomItem.location;
       document.querySelector('.bio-text').innerHTML = randomItem.bio;
        // "/images/"+randomItem.avatar;
    } catch(error) {
        console.error(error);
    }
}


let search = document.querySelector('.like');
search.addEventListener("click", function () {
    placeDataExplore();
});



