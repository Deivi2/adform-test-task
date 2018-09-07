const fetch = require('node-fetch');


////TASK 1


function getStreetNames() {
    fetch('https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json', {size: 16000000})
        .then(response => response.json())
        .then(data => {

            data.features.forEach(function (data) {
                console.log(data.properties.STREET)
            });

            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`The request uses approximately ${used} MB`);

        })
        .catch(err => {
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`Data exceeds 16mb, request uses approximately ${used} MB`);

        })
}


////TASK 2


function runRequestQueue() {

    queue(10, 1000, 100, function () {

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


function queue(reqPerTime, intervalTime, numberOfRequests, cb) {

    var count = 0;
    var interval = setInterval(
        function () {
            for (var i = 0; i < reqPerTime; i++) {
                cb()
            }
            if (count >= numberOfRequests) {
                clearInterval(interval);
            }
            count++;
        }, intervalTime);

}


getStreetNames();
runRequestQueue();
