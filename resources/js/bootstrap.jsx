window._ = require('lodash');
import axios from 'axios';


// try {
//     require('bootstrap');
// } catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


// let token = document.getElementById('token')
// console.log("In bootstrap doc, token is:")
// console.log(token)

// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

console.log('Setting withCredentials to true');
axios.defaults.withCredentials = true;
console.log('withCredentials is now', axios.defaults.withCredentials);

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
