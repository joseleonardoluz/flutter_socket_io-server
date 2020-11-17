const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band( 'Queen' ));
bands.addBand(new Band( 'Gunns' ));
bands.addBand(new Band( 'Black eye ' ));

console.log(bands);

//Mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.emit('active-bands', bands.getBands());

    client.on('mensaje', (payload) => {
        console.log('mensaje', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
        
    });

    client.on('emitir-mensaje', (payload) => {
        console.log(payload);
       //io.emit('nuevo-mensaje',payload);//emite a todos
       client.broadcast.emit('nuevo-mensaje', payload);
    });

    client.on('vote-band', (payload) =>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('new-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) =>{
        console.log(payload.id);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
  });
