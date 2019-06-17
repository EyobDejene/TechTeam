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
        console.log(error);
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


//
async function placeDataExplore(){
    try {
        let data = await dataExplore();
        // console.log(data);
        var randomItem = data[Math.floor(Math.random()*data.length)];
        let loader = document.querySelector('.loader');
        let section = document.querySelector('.stack');
        let refreshButton = document.querySelector('.refresh');
       // console.log(randomItem);
        //document.querySelector('.results-count').innerHTML = data.length;
        // console.log(loader);
        loader.classList.remove('not-visible');
        section.classList.add('not-visible');
        refreshButton.disabled = true;
        setTimeout(function () {
                    loader.classList.add('not-visible');
                    section.classList.remove('not-visible');
                    refreshButton.disabled = false;
                    document.getElementById('avatar').src = "upload/"+randomItem.avatar;
                    document.querySelector('.first-name').innerHTML = randomItem.first_name;
                    document.querySelector('.age').innerHTML = randomItem.age;
                    document.querySelector('.distance-location').innerHTML = randomItem.location;
                    document.querySelector('.bio-text').innerHTML = randomItem.bio;
        }, Math.floor(Math.random() * 2500));


        // "/images/"+randomItem.avatar;
    } catch(error) {
        console.error(error);
    }
}


let search = document.querySelector('.refresh');
if(search) {
    search.addEventListener("click", function () {
        placeDataExplore();
    });
}


// check if js in enabled

let js = document.querySelectorAll('.js');
let nojs = document.querySelectorAll('.nojs');


if(js) {

    let input = document.getElementsByTagName('input');

    for (var i = 0; i < input.length; i++) {
        input[i].removeAttribute("hidden");
    }



    js.forEach(function (js) {
        js.classList.remove('hide');
    });

    nojs.forEach(function (nojs) {
        nojs.classList.add('hide');
        nojs.remove();
    });

}







