const { v4: uuidV4 } = require('uuid');

class Band{

    constructor(name = 'no-name'){
        this.id = uuidV4();
        this.name = name;
        this.votes = 0;
        this.episodio = "";
        this.fecha = "";
        this.duracion = "";

    }
}

module.exports = Band;
