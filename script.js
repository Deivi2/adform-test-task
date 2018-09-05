const fetch = require('node-fetch');


////TASK 1


function getStreetNames() {
    fetch('https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json', {size: 16000000})
        .then(response => response.json())
        .then(data => {

            data.features.forEach(function (data) {
                console.log(data.properties.STREET)
            })
        })
        .catch(err => {
            console.log('Data exceeds 16mb')
        })
}


////TASK 2


function runRequestQueue() {

    queue(5, 1000, 100, function () {

        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}


function queue(reqPerSec, interval, numberOfRequests, cb) {

    var count = 0;
    var interval = setInterval(
        function () {
            for (var i = 0; i < reqPerSec; i++) {
                cb()
            }
            if (count >= numberOfRequests) {
                clearInterval(interval);
            }
            count++;
        }, interval);

}


getStreetNames();
runRequestQueue();
