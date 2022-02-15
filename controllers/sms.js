const credentials = {
    apiKey: 'a1386b9c6edeb766f29498cfd3ecdcff744cc8acd63cee58f723bd71641c825a',         // use your sandbox app API key for development in the test environment
    username: 'bakslash',      // use 'sandbox' for development in the test environment
};
const Africastalking = require('africastalking')(credentials);

exports.sendSmsCode =async (phone)=> {

// Initialize a service e.g. SMS
const sms = Africastalking.SMS

const code =  Math.floor( 999 + Math.random() * 9000);
// Use the service
const options = {
    //from: '+254706143819',
    to: `${phone}`,
    message: `Africals talking test code is ${code}`
}
console.log(options, 'test');
// Send message and capture the response or error
sms.send(options)
    .then( response => {
        console.log(response);
    })
    .catch( error => {
        console.log(error);
    });
}