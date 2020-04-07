class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#$(chatBoxId)`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectioHandler();
        }
    }


    connectioHandler() {
        let self = this;

        this.socket.on('connect', function() {
            console.log('connecion established using sockes...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'Conneqtion'
            });

        });
    }
}