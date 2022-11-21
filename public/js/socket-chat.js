//NTE . FRONT-END

var socket = io();
var params = new URLSearchParams(window.location.search);
if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
    
}
var usuario = {
    nombre: params.get('nombre')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp){
        console.log('Usuarios conectados', resp);
    } );
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});
socket.on('crearMensaje', function(mensaje){
    console.log('Servidor:', mensaje);
});

socket.on('listaPersona', function(personas){
    console.log('Servidor:', personas);
});
socket.on('mensajePrivado', function(mensaje){
    console.log('Mensaje privado:', mensaje);
})

