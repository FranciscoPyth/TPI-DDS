// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/multimedia.db");

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      "INSERT into usuarios VALUES	(1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'generos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table generos( idGenero INTEGER PRIMARY KEY AUTOINCREMENT, nombreGenero text NOT NULL UNIQUE);"
    );
    console.log("tabla generos creada!");
    await db.run(
      "insert into generos values (1,'TERROR'),(2,'AVENTURA'),(3,'COMEDIA'),(4,'ACCIÓN'),(5,'DRAMA'),(6,'FICCIÓN'),(7,'MISTERIO'),(8,'THRILLER'),(9,'CIENCIA FICCIÓN'),(10,'ROMANCE'),(11,'FANTASÍA');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table peliculas( 
              idPelicula INTEGER PRIMARY KEY AUTOINCREMENT, 
              titulo text NOT NULL UNIQUE,
              fechaEstreno DATE NOT NULL,
              duracion INTEGER NOT NULL,
              idGenero INTEGER NOT NULL,
              cantidadPremios INTEGER NOT NULL,
            FOREIGN KEY (idGenero) REFERENCES generos(idGenero)
            );`
    );
    console.log("tabla peliculas creada!");

    await db.run(
      `insert into peliculas values
      (1, 'Everything Everywhere All At Once', '2022-03-11', 139,6 , 7),
      (2, 'Once Upon A Time In Hollywood', '2019-07-26', 161, 3, 5),
      (3, 'The Babadook', '2014-11-28', 93, 1, 1),
      (4, 'El Lobo de Wallstreet', '2013-12-25', 180, 3, 4),
      (5, 'Barbie', '2023-07-21', 114, 3, 3),
      (6, 'Intensamente', '2015-06-19', 95, 11, 1),
      (7, 'Una Mujer Bajo La Influencia', '1974-11-18', 155, 5, 0),
      (8, 'Noche de Estreno', '1977-12-25', 144, 5, 0),
      (9, 'Pitch Perfect', '2012-10-05', 112, 3, 0),
      (10, 'Harry Potter y El Prisionero de Azkaban', '2004-06-04', 142, 2, 1),
      (11, 'Knives Out', '2019-11-27', 130, 7, 2),
      (12, 'The Holdovers', '2023-11-10', 133, 6, 3),
      (13, 'Mamma Mia!', '2008-07-18', 108, 10, 1),
      (14, 'Los Juegos Del Hambre', '2012-03-23', 142, 9, 1),
      (15, 'Poor Things', '2023-09-08', 141, 6, 5),
      (16, 'Avengers: Endgame', '2019-04-26', 181, 4, 0),
      (17, 'Mas Barato Por Docena', '2003-12-25', 98, 3, 0),
      (18, 'Relatos Salvajes', '2014-08-21', 122, 8, 1),
      (19, 'Nanny McPhee', '2005-10-21', 97, 11, 0),
      (20, 'Hereditary', '2018-06-08', 127, 1, 2)
      ;`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'series'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE series(
            idSerie INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL UNIQUE,
            descripcion TEXT,
            fechaEstreno DATE NOT NULL,
            temporadas INTEGER NOT NULL,
            idGenero INTEGER NOT NULL,
            calificacion FLOAT,
            creador TEXT,
            trailer_url TEXT,
            FOREIGN KEY (idGenero) REFERENCES generos(idGenero)
          );`
    );
    console.log("tabla series creada!");

    await db.run(
      `INSERT INTO series (titulo, descripcion, fechaEstreno, temporadas, idGenero, calificacion, creador, trailer_url) VALUES
      ('Stranger Things', 'A group of kids in the 1980s discover secret government experiments and parallel dimensions.', '2016-07-15', 4, 11, 8.7, 'The Duffer Brothers', 'https://www.youtube.com/watch?v=b9EkMc79ZSU'),
      ('The Mandalorian', 'A bounty hunter in the outer reaches of the galaxy protects a mysterious child.', '2019-11-12', 3, 9, 8.8, 'Jon Favreau', 'https://www.youtube.com/watch?v=aOC8E8z_ifw'),
      ('The Crown', 'Follows the political rivalries and romance of Queen Elizabeth IIs reign.', '2016-11-04', 5, 5, 8.6, 'Peter Morgan', 'https://www.youtube.com/watch?v=JWtnJjn6ng0'),
      ('The Witcher', 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world.', '2019-12-20', 3, 11, 8.2, 'Lauren Schmidt Hissrich', 'https://www.youtube.com/watch?v=ndl1W4ltcmg'),
      ('Breaking Bad', 'A high school chemistry teacher turned methamphetamine producer navigates the dangers of the drug trade.', '2008-01-20', 5, 5, 9.5, 'Vince Gilligan', 'https://www.youtube.com/watch?v=HhesaQXLuRY'),
      ('Game of Thrones', 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.', '2011-04-17', 8, 11, 9.3, 'David Benioff, D.B. Weiss', 'https://www.youtube.com/watch?v=KPLWWIOCOOQ'),
      ('The Boys', 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.', '2019-07-26', 3, 9, 8.7, 'Eric Kripke', 'https://www.youtube.com/watch?v=M4H8hT2A5F0'),
      ('Black Mirror', 'An anthology series exploring a twisted, high-tech multiverse where humanitys greatest innovations and darkest instincts collide.', '2011-12-04', 5, 9, 8.8, 'Charlie Brooker', 'https://www.youtube.com/watch?v=jDiYGjp5iFg'),
      ('The Handmaids Tale', 'In a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.', '2017-04-26', 4, 5, 8.4, 'Bruce Miller', 'https://www.youtube.com/watch?v=81PyH5TH-NQ'),
      ('Money Heist', 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.', '2017-05-02', 5, 4, 8.3, 'Álex Pina', 'https://www.youtube.com/watch?v=To_kVMMu-Ls')
      ;`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'cortos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
        `CREATE TABLE cortos(
            idCorto INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo text NOT NULL UNIQUE,
            fechaEstreno DATE NOT NULL,
            sinopsis TEXT NOT NULL,
            guionista TEXT NOT NULL,
            presupuesto DECIMAL(15, 2) NOT NULL,
            idGenero INTEGER NOT NULL,
            cantidadNominaciones INTEGER NOT NULL,
            FOREIGN KEY (idGenero) REFERENCES generos(idGenero)
          );`
    );
    console.log("tabla cortos creada!");

    await db.run(
      `INSERT INTO cortos VALUES
        (1, 'La Jetée', '1962-02-16', 'Una historia de amor contada a través de una serie de imágenes fijas.', 'Chris Marker', 5000.00, 9, 3),
        (2, 'Luxo Jr.', '1986-08-17', 'Una lámpara de escritorio se enfrenta a su hijo.', 'John Lasseter', 10000.00, 3, 1),
        (3, 'Destino', '2003-06-02', 'Un cortometraje animado de Walt Disney y Salvador Dalí.', 'Salvador Dalí', 7500.00, 5, 5),
        (4, 'Geri''s Game', '1997-11-25', 'Un anciano juega una partida de ajedrez contra sí mismo.', 'Jan Pinkava', 3000.00, 3, 2),
        (5, 'The Red Balloon', '1956-10-15', 'La historia de un niño pequeño y su globo rojo.', 'Albert Lamorisse', 9500.00, 5, 4),
        (6, 'Paperman', '2012-06-01', 'Un hombre y una mujer se conocen a través de aviones de papel.', 'John Kahrs', 11000.00, 10, 0),
        (7, 'Presto', '2008-06-18', 'Un mago lucha con su conejo durante una actuación.', 'Doug Sweetland', 8500.00, 11, 6),
        (8, 'Piper', '2016-06-16', 'Un pajarito aprende a superar su miedo al agua.', 'Alan Barillaro', 12000.00, 5, 1),
        (9, 'For the Birds', '2000-06-05', 'Una serie de pequeños pájaros se enfrentan a un gran pájaro torpe.', 'Ralph Eggleston', 7000.00, 3, 3),
        (10, 'Bao', '2018-06-15', 'Una mujer china que sufre de síndrome del nido vacío recibe una segunda oportunidad cuando uno de sus dumplings cobra vida.', 'Domee Shi', 8000.00, 5, 2),
        (11, 'Feast', '2014-11-07', 'La vida amorosa de un hombre vista a través de las comidas compartidas con su perro adoptado.', 'Patrick Osborne', 9000.00, 10, 2),
        (12, 'The Danish Poet', '2006-08-25', 'Un poeta danés y su búsqueda de inspiración.', 'Torill Kove', 6000.00, 10, 4),
        (13, 'Borrowed Time', '2016-10-14', 'Un sheriff atormentado por el pasado vuelve al lugar de un accidente.', 'Andrew Coats', 7000.00, 5, 3),
        (14, 'Hair Love', '2019-08-14', 'La historia de un padre que intenta peinar el cabello de su hija por primera vez.', 'Matthew A. Cherry', 5000.00, 3, 1),
        (15, 'Knick Knack', '1989-05-27', 'Un muñeco de nieve en una bola de cristal intenta escapar para unirse a otros souvenirs de verano.', 'John Lasseter', 8000.00, 3, 5),
        (16, 'The Blue Umbrella', '2013-02-12', 'Un paraguas azul se enamora de un paraguas rojo en una ciudad lluviosa.', 'Saschka Unseld', 10000.00, 10, 0),
        (17, 'Sanjay''s Super Team', '2015-11-25', 'Un niño indio imagina a los dioses hindúes como superhéroes.', 'Sanjay Patel', 9500.00, 11, 2),
        (18, 'World of Tomorrow', '2015-01-22', 'Una niña es llevada a un viaje a través de su propio futuro por un clon más viejo.', 'Don Hertzfeldt', 12000.00, 7, 6),
        (19, 'Purl', '2019-01-18', 'Una bola de lana llamada Purl consigue un trabajo en una empresa donde debe encontrar la manera de encajar.', 'Kristen Lester', 11000.00, 3, 3),
        (20, 'La Luna', '2011-06-06', 'Un niño pequeño aprende el trabajo de su padre y abuelo en la luna.', 'Enrico Casarosa', 8500.00, 5, 1)
        ;`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
