var socket = io('');

/**
 * Sockets 
 */
socket.on('alert', function(data) {
    Swal.fire({
        icon: data.icon,
        title: data.title,
        text: data.text,
    })
})

socket.on('userAuth', function(email) {
    sessionStorage.setItem('auth', email);
    window.location.href = './About'
})

socket.on('loadNameUser', function(nome) {
    $("#nameUser").html('<h5><i class="fas fa-user"></i> ' + nome + '</h5>')
})

socket.on('reloadSystem', function() {
    window.location.href = './'
})

/**
 * Funções 
 */
$("#submitRegister").click(function() {

    var name = $("#inputName").val()
    var email = $("#inputEmail").val()
    var pass = $("#inputPassword1").val()
    var passCheck = $("#inputPassword2").val()

    if (name != '' && email != '' && pass != '' && passCheck != '') {
        if (pass == passCheck) {
            socket.emit('registerUser', {
                name: name,
                email: email,
                pass: pass
            })
            $("#inputName").val('')
            $("#inputEmail").val('')
            $("#inputPassword1").val('')
            $("#inputPassword2").val('')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'As senhas digitadas não coincidem',
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha todos os campos',
        })
    }
})

$("#submitLogin").click(function() {

    var email = $("#inputEmail").val()
    var pass = $("#inputPassword").val()

    if (email != '' && pass != '') {
        socket.emit('authUser', {
            email: email,
            pass: pass
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha os campos',
        })
    }
})

$(document).ready(function() {
    $("#nameUser").html('<a class="sign_in" href="./Login"> Sign in </a><a class="sign_up" href="./Register"> Sign up </a>')

    sessionStorage.getItem('auth') ? $(".logout").show() : $(".logout").hide()

    if (window.location.pathname == '/About') {
        if (sessionStorage.getItem('auth')) {
            socket.emit('call_loadNameUser', sessionStorage.getItem('auth'))
        } else {
            window.location.href = './Login'
        }
    }
});

$("#logout").click(function() {
    sessionStorage.clear()
    window.location.href = './'
})