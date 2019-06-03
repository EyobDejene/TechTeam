
// filter function
const filter = function () {
    let skillLevel = document.querySelector("#skill").value;
    let ageRange = document.querySelector("#age").value;
    let maxDistance = document.querySelector("#distance").value;
    let runningScheme = document.querySelector(".runningScheme:checked").value;
    let practiceTime = document.querySelector(".practiceTime:checked").value;

    const status = response => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        }
        return Promise.reject(new Error(response.statusText))
    }

    const json = response => response.json()

    const searchResponse =  fetch('/overview?skilLevel='+skillLevel+'&ageRange='+ageRange+'&maxDistance='+maxDistance+'&runningScheme='+runningScheme+'&practiceTime='+practiceTime,
        {
            method: 'get', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }})
        .then(status)
        .then(json)
        .then(data => {
           // console.log('Request succeeded with JSON response', data)
                console.log(data.length);
                document.querySelector('.results-count').innerHTML = data.length;
        })
        .catch(error => {
            console.log('Request failed', error)
        })

    return searchResponse;

};



export default filter;



