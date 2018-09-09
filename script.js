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
    let values = {
        reqPerTime: 0,
        numberOfRequests: 0,
        intervalTime: 0
    };

    function queue(values, cb) {

        let count = 1;
        let interval = setInterval(
            function () {
                if (count >= values.numberOfRequests) {
                    clearInterval(interval);
                }
                for (let i = 0; i < values.reqPerTime; i++) {
                    if (urls.length > 1 && i >= 1) {
                        highPriorityReq = true;
                    }
                    cb()
                }
                highPriorityReq = false;
                count++;

            }, values.intervalTime);
    }


    let runRequestQueue = function () {

        urls.length && urls.length < 3 ?
            queue(values, function () {
                fetch(urls[+highPriorityReq])
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        : console.log('No URL or more then 2 URL\'s added')
    };


    let addRequestURL = function (value) {
        urls.unshift(value)
    };

    let setValues = function (reqPerTime, numberOfRequests, intervalTime) {
        values = {reqPerTime, numberOfRequests, intervalTime};
    };


    return {
        runRequestQueue: runRequestQueue,
        addRequestURL: addRequestURL,
        setValues: setValues
    }

})();

getStreetNames();
taskTwo.addRequestURL('https://jsonplaceholder.typicode.com/todos/1');
taskTwo.addRequestURL('https://jsonplaceholder.typicode.com/todos/2');
taskTwo.setValues(5,20,1000);
taskTwo.runRequestQueue();



