// MTD . BACK-END

const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades.js/utilidades');
const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat', ( usuario, callback )=>{
        if (!usuario.nombre) {
            return callback({
                error: true,
                mensaje: 'Parametro nombre es obligatorio'
            });
        }
        let personas = usuarios.agregarPersona(client.id, usuario.nombre);
        client.broadcast.emit('listaPersona', usuarios.getPersonas());
        callback(personas);
    });
    client.on('crearMensaje', (data)=>{
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);
    })
    
    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salió`));
        client.broadcast.emit('listaPersona', usuarios.getPersonas());

    });
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    })
});