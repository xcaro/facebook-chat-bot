const login = require('facebook-chat-api');
const request = require('request');

const api_key = 'simsimi_api_key';
const fb = {
	email: 'your_username',
	password: 'your_password'
};

login(fb, (err, api) => {
    if(err) return console.error(err);
 
    api.listen((err, message) => {
        console.log(`message from ${message.threadID}`);
        request(`http://api.simsimi.com/request.p?key=${api_key}&lc=vn&ft=1&text=${encodeURI(message.body)}`, (error, res, body) => {
              if (error) return;
              let response = JSON.parse(body);
              if (response.result == 100) api.sendMessage(response.response, message.threadID);
          });
    });
});