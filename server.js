var login = require("facebook-chat-api");
 
var answeredThreads = {};

var usr = "username"; // your username or email facebook
var passwd = "password"; // your password facebook
var messages = "Auto Reply - Hiện tại mình đang bận, mình sẽ trả lời ngay khi thấy tin nhắn.";
login({email: usr, password: passwd}, function callback (err, api) {
    if(err) return console.error(err);
 
    api.listen(function callback(err, message) {
        console.log(message.threadID);
        if(!answeredThreads.hasOwnProperty(message.threadID)){
            answeredThreads[message.threadID] = true;
            api.sendMessage(messages, message.threadID);
        }
    });
});