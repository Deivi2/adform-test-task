const fetch = require('node-fetch');
const request = require('request');
const zlib = require('zlib');
const JSONStream = require('JSONStream')


////TASK 1


function getStreetNames() {

    var headers = {
        'Accept-Encoding': 'gzip'
    };

    request({
        url: 'https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json',
        'headers': headers
    })
        .pipe(zlib.createGunzip())
        .pipe(JSONStream.parse('features.*'))
        .on('data', function (chunk) {
            console.log(chunk.properties.STREET)
        })

}


////TASK 2


const taskTwo = (function () {

    let requests = [];
    let timer = 0;


    let addRequest = function (value) {
        requests.push(value);
    };

    let addHighPriorityRequest = function (value) {
        requests.unshift(value)
    };


    let renRequests = function (atTheTime ,delay ) {
        let count = 0;
            for (let i = 0; i < requests.length; i++) {
                for (let j = 0; j < atTheTime; j++) {
                    timer = setTimeout( function(){
                        if(count < requests.length){
                          fetch(requests[count])
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data)
                                })
                                .catch(err => {
                                    console.log(err)
                                });
                        }else{
                            clearTimeout(timer)
                        }
                        count++;
                    }, i*delay);
                }
            }
    };

    return{
        addRequest: addRequest,
        renRequests: renRequests,
        addHighPriorityRequest: addHighPriorityRequest
    }

})();


getStreetNames();


for (let i = 1; i < 100; i++) {
    taskTwo.addRequest(`https://jsonplaceholder.typicode.com/todos/${i}`)
}
taskTwo.addHighPriorityRequest(`https://jsonplaceholder.typicode.com/todos/101`);
taskTwo.renRequests(5,1000);





