const generos = require('./sequelize-init').generos;
const series = require('./sequelize-init').series;
const peliculas = require('./sequelize-init').peliculas;
const documentales = require('./sequelize-init').documentales;
const cortos = require('./sequelize-init').cortos;
const usuarios = require('./sequelize-init').usuarios;


async function inicializarBaseDeDatos() {
    try {
        await generos.sync();
    await series.sync();
    await peliculas.sync();
    await documentales.sync();
    await cortos.sync();
    await usuarios.sync();


    const generosCreados = await generos.findAll();
    if (generosCreados.length === 0) {
        await generos.bulkCreate([
            {idGenero: 1, nombreGenero: 'TERROR'},
            {idGenero: 2, nombreGenero: 'AVENTURA'},
            {idGenero: 3, nombreGenero: 'COMEDIA'},
            {idGenero: 4, nombreGenero: 'ACCIÓN'},
            {idGenero: 5, nombreGenero: 'DRAMA'},
            {idGenero: 6, nombreGenero: 'FICCIÓN'},
            {idGenero: 7, nombreGenero: 'MISTERIO'},
            {idGenero: 8, nombreGenero: 'THRILLER'},
            {idGenero: 9, nombreGenero: 'CIENCIA FICCIÓN'},
            {idGenero: 10, nombreGenero: 'ROMANCE'},
            {idGenero: 11, nombreGenero: 'FANTASÍA'},
            {idGenero: 12, nombreGenero: 'ANIMACIÓN'},
            {idGenero: 13, nombreGenero: 'NATURALEZA'},
            {idGenero: 14, nombreGenero: 'ESPACIAL'}
        ]);
    }

    const seriesCreadas = await series.findAll();
    if (seriesCreadas.length === 0) {
        await series.bulkCreate([
            {idSerie: 1, titulo: 'Stranger Things', descripcion: 'Un grupo de niños en la década de 1980 descubre experimentos secretos del gobierno y dimensiones paralelas.', 
            fechaEstreno: new Date('2016-07-15'), temporadas: 4, 
            idGenero: 11, calificacion: 8.7, 
            creador: 'The Duffer Brothers', trailer_url: 'https://www.youtube.com/watch?v=b9EkMc79ZSU'},
            {idSerie: 2, titulo: 'The Mandalorian', descripcion: 'Un cazador de recompensas en las regiones exteriores de la galaxia protege a un niño misterioso.', 
            fechaEstreno: new Date('2019-11-12'), temporadas: 3, 
            idGenero: 9, calificacion: 8.8, 
            creador: 'Jon Favreau', trailer_url: 'https://www.youtube.com/watch?v=aOC8E8z_ifw'},
            {idSerie: 3, titulo: 'The Crown', descripcion: 'Sigue las rivalidades políticas y el romance del reinado de la Reina Elizabeth II.', 
            fechaEstreno: new Date('2016-11-04'), temporadas: 5, 
            idGenero: 5, calificacion: 8.6, 
            creador: 'Peter Morgan', trailer_url: 'https://www.youtube.com/watch?v=JWtnJjn6ng0'},
            {idSerie: 4, titulo: 'The Witcher', descripcion: 'Geralt de Rivia, un cazador de monstruos mutado a sueldo, se dirige hacia su destino en un mundo turbulento.', 
            fechaEstreno: new Date('2019-12-20'), temporadas: 3, 
            idGenero: 11, calificacion: 8.2, 
            creador: 'Lauren Schmidt Hissrich', trailer_url: 'https://www.youtube.com/watch?v=ndl1W4ltcmg'},
            {idSerie: 5, titulo: 'Breaking Bad', descripcion: 'Un profesor de química de secundaria convertido en productor de metanfetaminas navega por los peligros del narcotráfico.', 
            fechaEstreno: new Date('2008-01-20'), temporadas: 5, 
            idGenero: 5, calificacion: 9.5, 
            creador: 'Vince Gilligan', trailer_url: 'https://www.youtube.com/watch?v=HhesaQXLuRY'},
            {idSerie: 6, titulo: 'Game of Thrones', descripcion: 'Nueve familias nobles luchan por el control de las tierras de Westeros, mientras un antiguo enemigo regresa.', 
            fechaEstreno: new Date('2011-04-17'), temporadas: 8, 
            idGenero: 11, calificacion: 9.3, 
            creador: 'David Benioff, D.B. Weiss', trailer_url: 'https://www.youtube.com/watch?v=KPLWWIOCOOQ'},
            {idSerie: 7, titulo: 'The Boys', descripcion: 'Un grupo de vigilantes se propone derrocar a los superhéroes corruptos que abusan de sus superpoderes.', 
            fechaEstreno: new Date('2019-07-26'), temporadas: 3, 
            idGenero: 9, calificacion: 8.7, 
            creador: 'Eric Kripke', trailer_url: 'https://www.youtube.com/watch?v=M4H8hT2A5F0'},
            {idSerie: 8, titulo: 'Black Mirror', descripcion: 'Una serie de antología que explora un multiverso retorcido y de alta tecnología donde chocan las mayores innovaciones y los instintos más oscuros de la humanidad.', 
            fechaEstreno: new Date('2011-12-04'), temporadas: 5, 
            idGenero: 9, calificacion: 8.8, 
            creador: 'Charlie Brooker', trailer_url: 'https://www.youtube.com/watch?v=jDiYGjp5iFg'},
            {idSerie: 9, titulo: 'The Handmaid\'s Tale', descripcion: 'En un futuro distópico, una mujer se ve obligada a vivir como concubina bajo una dictadura teocrática fundamentalista.', 
            fechaEstreno: new Date('2017-04-26'), temporadas: 4, 
            idGenero: 5, calificacion: 8.4, 
            creador: 'Bruce Miller', trailer_url: 'https://www.youtube.com/watch?v=81PyH5TH-NQ'},
            {idSerie: 10, titulo: 'Money Heist', descripcion: 'Un grupo inusual de ladrones intenta llevar a cabo el robo más perfecto de la historia de España.', 
            fechaEstreno: new Date('2017-05-02'), temporadas: 5, 
            idGenero: 4, calificacion: 8.3, 
            creador: 'Álex Pina', trailer_url: 'https://www.youtube.com/watch?v=To_kVMMu-Ls'}
           ]);
    }

    const peliculasCreadas = await peliculas.findAll();
    if (peliculasCreadas.length === 0) {
        await peliculas.bulkCreate([
            {idPelicula: 1, titulo: 'Everything Everywhere All At Once', fechaEstreno: new Date('2022-03-11'), duracion: 139, idGenero: 6, cantidadPremios: 7},
            {idPelicula: 2, titulo: 'Once Upon A Time In Hollywood', fechaEstreno: new Date('2019-07-26'), duracion: 161, idGenero: 3, cantidadPremios: 5},
            {idPelicula: 3, titulo: 'The Babadook', fechaEstreno: new Date('2014-11-28'), duracion: 93, idGenero: 1, cantidadPremios: 1},
            {idPelicula: 4, titulo: 'El Lobo de Wallstreet', fechaEstreno: new Date('2013-12-25'), duracion: 180, idGenero: 3, cantidadPremios: 4},
            {idPelicula: 5, titulo: 'Barbie', fechaEstreno: new Date('2023-07-21'), duracion: 114, idGenero: 3, cantidadPremios: 3},
            {idPelicula: 6, titulo: 'Intensamente', fechaEstreno: new Date('2015-06-19'), duracion: 95, idGenero: 11, cantidadPremios: 1},
            {idPelicula: 7, titulo: 'Una Mujer Bajo La Influencia', fechaEstreno: new Date('1974-11-18'), duracion: 155, idGenero: 5, cantidadPremios: 0},
            {idPelicula: 8, titulo: 'Noche de Estreno', fechaEstreno: new Date('1977-12-25'), duracion: 144, idGenero: 5, cantidadPremios: 0},
            {idPelicula: 9, titulo: 'Pitch Perfect', fechaEstreno: new Date('2012-10-05'), duracion: 112, idGenero: 3, cantidadPremios: 0},
            {idPelicula: 10, titulo: 'Harry Potter y El Prisionero de Azkaban', fechaEstreno: new Date('2004-06-04'), duracion: 142, idGenero: 2, cantidadPremios: 1},
            {idPelicula: 11, titulo: 'Knives Out', fechaEstreno: new Date('2019-11-27'), duracion: 130, idGenero: 7, cantidadPremios: 2},
            {idPelicula: 12, titulo: 'The Holdovers', fechaEstreno: new Date('2023-11-10'), duracion: 133, idGenero: 6, cantidadPremios: 3},
            {idPelicula: 13, titulo: 'Mamma Mia!', fechaEstreno: new Date('2008-07-18'), duracion: 108, idGenero: 10, cantidadPremios: 1},
            {idPelicula: 14, titulo: 'Los Juegos Del Hambre', fechaEstreno: new Date('2012-03-23'), duracion: 142, idGenero: 9, cantidadPremios: 1},
            {idPelicula: 15, titulo: 'Poor Things', fechaEstreno: new Date('2023-09-08'), duracion: 141, idGenero: 6, cantidadPremios: 5},
            {idPelicula: 16, titulo: 'Avengers: Endgame', fechaEstreno: new Date('2019-04-26'), duracion: 181, idGenero: 4, cantidadPremios: 0},
            {idPelicula: 17, titulo: 'Mas Barato Por Docena', fechaEstreno: new Date('2003-12-25'), duracion: 98, idGenero: 3, cantidadPremios: 0},
            {idPelicula: 18, titulo: 'Relatos Salvajes', fechaEstreno: new Date('2014-08-21'), duracion: 122, idGenero: 8, cantidadPremios: 1},
            {idPelicula: 19, titulo: 'Nanny McPhee', fechaEstreno: new Date('2005-10-21'), duracion: 97, idGenero: 11, cantidadPremios: 0},
            {idPelicula: 20, titulo: 'Hereditary', fechaEstreno: new Date('2018-06-08'), duracion: 127, idGenero: 1, cantidadPremios: 2}
        ]);
    }

    const documentalesCreados = await documentales.findAll();
    if (documentalesCreados.length === 0) {
        await documentales.bulkCreate([
            {idDocumental: 1, titulo: 'Planet Earth', investigador: 'David Attenborough', director: 'Alastair Fothergill', idGenero: 13, fechaEstreno: new Date('2006-03-05')},
            {idDocumental: 2, titulo: 'The Blue Planet', investigador: 'David Attenborough', director: 'Alastair Fothergill', idGenero: 13, fechaEstreno: new Date('2001-09-12')},
            {idDocumental: 3, titulo: 'Cosmos: A Spacetime Odyssey', investigador: 'Neil deGrasse Tyson', director: 'Brannon Braga', idGenero: 14, fechaEstreno: new Date('2014-03-09')},
            {idDocumental: 4, titulo: 'The Civil War', investigador: 'Ken Burns', director: 'Ken Burns', idGenero: 4, fechaEstreno: new Date('1990-09-23')},
            {idDocumental: 5, titulo: 'March of the Penguins', investigador: 'Luc Jacquet', director: 'Luc Jacquet', idGenero: 13, fechaEstreno: new Date('2005-01-26')},
            {idDocumental: 6, titulo: 'Blackfish', investigador: 'Gabriela Cowperthwaite', director: 'Gabriela Cowperthwaite', idGenero: 13, fechaEstreno: new Date('2013-01-19')},
            {idDocumental: 7, titulo: 'An Inconvenient Truth', investigador: 'Al Gore', director: 'Davis Guggenheim', idGenero: 5, fechaEstreno: new Date('2006-05-24')},
            {idDocumental: 8, titulo: 'Jiro Dreams of Sushi', investigador: 'David Gelb', director: 'David Gelb', idGenero: 5, fechaEstreno: new Date('2011-06-11')},
            {idDocumental: 9, titulo: 'Man on Wire', investigador: 'Philippe Petit', director: 'James Marsh', idGenero: 5, fechaEstreno: new Date('2008-07-25')},
            {idDocumental: 10, titulo: 'Free Solo', investigador: 'Alex Honnold', director: 'Elizabeth Chai Vasarhelyi', idGenero: 5, fechaEstreno: new Date('2018-08-31')},
            {idDocumental: 11, titulo: 'The Cove', investigador: 'Richard O\'Barry', director: 'Louie Psihoyos', idGenero: 7, fechaEstreno: new Date('2009-07-31')},
            {idDocumental: 12, titulo: 'Amy', investigador: 'Asif Kapadia', director: 'Asif Kapadia', idGenero: 7, fechaEstreno: new Date('2015-05-16')},
            {idDocumental: 13, titulo: 'Exit Through the Gift Shop', investigador: 'Banksy', director: 'Banksy', idGenero: 2, fechaEstreno: new Date('2010-01-24')},
            {idDocumental: 14, titulo: 'The Act of Killing', investigador: 'Joshua Oppenheimer', director: 'Joshua Oppenheimer', idGenero: 5, fechaEstreno: new Date('2012-09-08')},
            {idDocumental: 15, titulo: 'Grizzly Man', investigador: 'Timothy Treadwell', director: 'Werner Herzog', idGenero: 13, fechaEstreno: new Date('2005-05-14')}
        ]);
    }

    const cortosCreados = await cortos.findAll();
    if (cortosCreados.length === 0) {
        await cortos.bulkCreate([
            {idCorto: 1, titulo: 'La Jetée', fechaEstreno: new Date('1962-02-16'), sinopsis: 'Una historia de amor contada a través de una serie de imágenes fijas.', guionista: 'Chris Marker', presupuesto: 5000.00, idGenero: 9, cantidadNominaciones: 3},
            { idCorto: 2, titulo: 'Luxo Jr.', fechaEstreno: new Date('1986-08-17'), sinopsis: 'Una lámpara de escritorio se enfrenta a su hijo.', guionista: 'John Lasseter', presupuesto: 10000.00, idGenero: 3, cantidadNominaciones: 1 },
            { idCorto: 3, titulo: 'Destino', fechaEstreno: new Date('2003-06-02'), sinopsis: 'Un cortometraje animado de Walt Disney y Salvador Dalí.', guionista: 'Salvador Dalí', presupuesto: 7500.00, idGenero: 5, cantidadNominaciones: 5 },
            { idCorto: 4, titulo: 'Geri\'s Game', fechaEstreno: new Date('1997-11-25'), sinopsis: 'Un anciano juega una partida de ajedrez contra sí mismo.', guionista: 'Jan Pinkava', presupuesto: 3000.00, idGenero: 3, cantidadNominaciones: 2 },
            { idCorto: 5, titulo: 'The Red Balloon', fechaEstreno: new Date('1956-10-15'), sinopsis: 'La historia de un niño pequeño y su globo rojo.', guionista: 'Albert Lamorisse', presupuesto: 9500.00, idGenero: 5, cantidadNominaciones: 4 },
            { idCorto: 6, titulo: 'Paperman', fechaEstreno: new Date('2012-06-01'), sinopsis: 'Un hombre y una mujer se conocen a través de aviones de papel.', guionista: 'John Kahrs', presupuesto: 11000.00, idGenero: 10, cantidadNominaciones: 0 },
            { idCorto: 7, titulo: 'Presto', fechaEstreno: new Date('2008-06-18'), sinopsis: 'Un mago lucha con su conejo durante una actuación.', guionista: 'Doug Sweetland', presupuesto: 8500.00, idGenero: 11, cantidadNominaciones: 6 },
            { idCorto: 8, titulo: 'Piper', fechaEstreno: new Date('2016-06-16'), sinopsis: 'Un pajarito aprende a superar su miedo al agua.', guionista: 'Alan Barillaro', presupuesto: 12000.00, idGenero: 5, cantidadNominaciones: 1 },
            { idCorto: 9, titulo: 'For the Birds', fechaEstreno: new Date('2000-06-05'), sinopsis: 'Una serie de pequeños pájaros se enfrentan a un gran pájaro torpe.', guionista: 'Ralph Eggleston', presupuesto: 7000.00, idGenero: 3, cantidadNominaciones: 3 },
            { idCorto: 10, titulo: 'Bao', fechaEstreno: new Date('2018-06-15'), sinopsis: 'Una mujer china que sufre de síndrome del nido vacío recibe una segunda oportunidad cuando uno de sus dumplings cobra vida.', guionista: 'Domee Shi', presupuesto: 8000.00, idGenero: 5, cantidadNominaciones: 2 },
            { idCorto: 11, titulo: 'Feast', fechaEstreno: new Date('2014-11-07'), sinopsis: 'La vida amorosa de un hombre vista a través de las comidas compartidas con su perro adoptado.', guionista: 'Patrick Osborne', presupuesto: 9000.00, idGenero: 10, cantidadNominaciones: 2 },
            { idCorto: 12, titulo: 'The Danish Poet', fechaEstreno: new Date('2006-08-25'), sinopsis: 'Un poeta danés y su búsqueda de inspiración.', guionista: 'Torill Kove', presupuesto: 6000.00, idGenero: 10, cantidadNominaciones: 4 },
            { idCorto: 13, titulo: 'Borrowed Time', fechaEstreno: new Date('2016-10-14'), sinopsis: 'Un sheriff atormentado por el pasado vuelve al lugar de un accidente.', guionista: 'Andrew Coats', presupuesto: 7000.00, idGenero: 5, cantidadNominaciones: 3 },
            { idCorto: 14, titulo: 'Hair Love', fechaEstreno: new Date('2019-08-14'), sinopsis: 'La historia de un padre que intenta peinar el cabello de su hija por primera vez.', guionista: 'Matthew A. Cherry', presupuesto: 5000.00, idGenero: 3, cantidadNominaciones: 1 },
            { idCorto: 15, titulo: 'Knick Knack', fechaEstreno: new Date('1989-05-27'), sinopsis: 'Un muñeco de nieve en una bola de cristal intenta escapar para unirse a otros souvenirs de verano.', guionista: 'John Lasseter', presupuesto: 8000.00, idGenero: 3, cantidadNominaciones: 5 },
            { idCorto: 16, titulo: 'The Blue Umbrella', fechaEstreno: new Date('2013-02-12'), sinopsis: 'Un paraguas azul se enamora de un paraguas rojo en una ciudad lluviosa.', guionista: 'Saschka Unseld', presupuesto: 10000.00, idGenero: 10, cantidadNominaciones: 0 },
            { idCorto: 17, titulo: 'Sanjay\'s Super Team', fechaEstreno: new Date('2015-11-25'), sinopsis: 'Un niño indio imagina a los dioses hindúes como superhéroes.', guionista: 'Sanjay Patel', presupuesto: 9500.00, idGenero: 11, cantidadNominaciones: 2 },
            { idCorto: 18, titulo: 'World of Tomorrow', fechaEstreno: new Date('2015-01-22'), sinopsis: 'Una niña es llevada a un viaje a través de su propio futuro por un clon más viejo.', guionista: 'Don Hertzfeldt', presupuesto: 12000.00, idGenero: 7, cantidadNominaciones: 6 },
            { idCorto: 19, titulo: 'Purl', fechaEstreno: new Date('2019-01-18'), sinopsis: 'Una bola de lana llamada Purl consigue un trabajo en una empresa donde debe encontrar la manera de encajar.', guionista: 'Kristen Lester', presupuesto: 11000.00, idGenero: 3, cantidadNominaciones: 3 },
            { idCorto: 20, titulo: 'La Luna', fechaEstreno: new Date('2011-06-06'), sinopsis: 'Un niño pequeño aprende el trabajo de su padre y abuelo en la luna.', guionista: 'Enrico Casarosa', presupuesto: 8500.00, idGenero: 5, cantidadNominaciones: 1 }
        ]);
    }

    const usuariosCreados = await usuarios.findAll();
    if (usuariosCreados.length === 0) {
        await usuarios.bulkCreate([
            {idUsuario: 1, nombre: 'admin', email: 'admin@algo.com', password: 'pepe1234', rol: 'admin'},
            {idUsuario: 2, nombre: 'user', email: 'user@algo.com', password: 'pepe5678', rol: 'user'}
        ]);
    }
    } catch (error) {
        console.error('Error en la inicialización de la base de datos:', error);
    }
}



module.exports = inicializarBaseDeDatos;