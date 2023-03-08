import { io } from "./http.js";

let users = []

io.on('connection', socket => {

    console.log('New connection => ' + socket.id)

    // Registra um usuário
    socket.on('registerUser', data => {
        const checkUser = users.filter(u => u.email === data.email)

        if (checkUser.length == 0) {
            users.push({
                socket_id: socket.id,
                name: data.name,
                email: data.email,
                pass: data.pass
            })
            socket.emit('alert', {
                icon: 'success',
                title: 'Sucesso',
                text: 'Usuário cadastrado! Faça login',
            })
        } else {
            socket.emit('alert', {
                icon: 'error',
                title: 'Oops...',
                text: 'E-mail já existe!',
            })
        }

        console.log(users)

    })

    socket.on('authUser', data => {
        const userInUsers = users.filter(u => u.email === data.email && u.pass === data.pass)

        if (userInUsers.length > 0) {
            socket.emit('userAuth', data.email)
        } else {
            socket.emit('alert', {
                icon: 'error',
                title: 'Oops...',
                text: 'Usuário e senha incorretos!',
            })
        }
    })

    socket.on('call_loadNameUser', email => {
        const nameUser = users.filter(u => u.email === email)

        if (nameUser.length > 0) {
            nameUser.forEach(item => {
                socket.emit('loadNameUser', item.name)
            });
        } else {
            socket.emit('reloadSystem')
        }
    })

    // Detela todos os jogadores que o usuário utilizou quando ele se desconectar do App
    socket.on("disconnect", () => {
        console.log('Bye')
    });
})