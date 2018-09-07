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


const taskTwo = (function () {

    let urls = [];
    let highPriorityReq = false;

    function queue(reqPerTime, numberOfRequests, intervalTime, cb) {

        let count = 1;
        let interval = setInterval(
            function () {
                if (count >= numberOfRequests) {
                    clearInterval(interval);
                }
                for (let i = 0; i < reqPerTime; i++) {
                    if (urls.length > 1 && i >= 1) {
                        highPriorityReq = true;
                    }
                    cb()
                }
                highPriorityReq = false;
                count++;

            }, intervalTime);
    }


    let runRequestQueue = function () {

        urls.length && urls.length < 3 ?
            queue(5, 20, 1000, function () {

                console.log(urls[+highPriorityReq])

                // fetch(urls[+highPriorityReq])
                //     .then(response => response.json())
                //     .then(data => {
                //         console.log(data)
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            })
            : console.log('No URL or more then 2 urls added')
    };


    let addRequestURL = function (value) {
        urls.unshift(value)
    };


    return {
        runRequestQueue: runRequestQueue,
        addRequestURL: addRequestURL
    }

})();

getStreetNames();
taskTwo.addRequestURL('https://jsonplaceholder.typicode.com/todos/1');
taskTwo.addRequestURL('https://jsonplaceholder.typicode.com/todos/2');
taskTwo.runRequestQueue();



