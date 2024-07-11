// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/multimedia.db", {
    timezone: "+00:00",
});

// definicion del modelo de datos
const generos = sequelize.define(
    "generos",
    {
        idGenero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreGenero: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido",
                },
                len: {
                    args: [5, 20],
                    msg: "Nombre debe ser tipo caracteres, entre 5 y 20 de longitud",
                },
            },
        },
    },
    {
        // pasar a mayusculas
        hooks: {
            beforeValidate: function (genero, options) {
                if (typeof genero.nombreGenero === "string") {
                    genero.nombreGenero = genero.nombreGenero.toUpperCase().trim();
                }
            },
        },

        timestamps: false,
    }
);

const peliculas = sequelize.define(
    "peliculas",
    {
        idPelicula: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Titulo es requerido",
                },
                len: {
                    args: [3, 70],
                    msg: "Titulo debe ser tipo caracteres, entre 3 y 70 de longitud",
                },
            },
            unique: {
                args: true,
                msg: "este titulo ya existe en la tabla!",
            },
        },
        fechaEstreno: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha de Estreno es requerida",
                },
            },
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Duración es requerido",
                },
                isInt: {
                    args: true,
                    msg: "Duración debe ser numérico",
                },
                min: {
                    args: [1],
                    msg: "Duración no puede ser igual o menor a 0",
                },
            }
        },
        idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "IdGenero es requerido",
                }
            }
        },
        cantidadPremios: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Cantidad de Premios es requerido",
                },
                isInt: {
                    args: true,
                    msg: "Cantidad de Premios debe ser numérico",
                },
                min: {
                    args: [0],
                    msg: "Cantidad de Premios no puede ser negativo",
                },
            }
        },
    },
    {
        timestamps: false,
    }
);

const series = sequelize.define(
    "series",
    {
        idSerie: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(70),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Titulo es requerido",
                },
                len: {
                    args: [3, 70],
                    msg: "Titulo debe ser tipo caracteres, entre 3 y 70 de longitud",
                },
            },
            unique: {
                args: true,
                msg: "este titulo ya existe en la tabla!",
            },
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        fechaEstreno: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Fecha de Estreno es requerida",
                },
            },
        },
        temporadas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Numero de temporadas es requerido",
                },
                isInt: {
                    args: true,
                    msg: "Numero de temporadas debe ser numérico",
                },
            },
        },
        idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "IdGenero es requerido",
                },
            },
        },
        calificacion: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: {
                    args: [0],
                    msg: "Calificación mínima es 0",
                },
                max: {
                    args: [10],
                    msg: "Calificación máxima es 10",
                },
            },
        },
        creador: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        trailer_url: {
            type: DataTypes.STRING(200),
            allowNull: true,
        }
        //TODO: agregar campo imagen
    },
    {
        // pasar a mayusculas
        hooks: {
            beforeValidate: function (serie, options) {
                if (typeof serie.titulo === "string") {
                    serie.titulo = serie.titulo.toUpperCase().trim();
                }
            },
        },

        timestamps: false,
    }
);

const documentales = sequelize.define(
    'documentales', 
    {
    idDocumental: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Titulo es requerido",
            },
            len: {
                args: [3, 70],
                msg: "Titulo debe ser tipo caracteres, entre 3 y 70 de longitud",
            },
        },
        unique: {
            args: true,
            msg: "este titulo ya existe en la tabla!",
        }
    },
    investigador: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    director: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    idGenero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "IdGenero es requerido",
          },
        },
    },
    fechaEstreno: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: "Fecha de Estreno es requerida",
            }
        }
    },
},
{
    // pasar a mayusculas
    hooks: {
        beforeValidate: function (serie, options) {
            if (typeof serie.titulo === "string") {
                serie.titulo = serie.titulo.toUpperCase().trim();
            }
        },
    },

    timestamps: false,
});

const cortos = sequelize.define(
  "cortos",
  {
      idCorto: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      titulo: {
          type: DataTypes.STRING(70),
          allowNull: false,
          validate: {
              notEmpty: {
                  args: true,
                  msg: "Titulo es requerido",
              },
              len: {
                  args: [3, 70],
                  msg: "Titulo debe ser tipo caracteres, entre 3 y 70 de longitud",
              },
          },
          unique: {
              args: true,
              msg: "este titulo ya existe en la tabla!",
          },
      },
      fechaEstreno: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
              notNull: {
                  args: true,
                  msg: "Fecha de Estreno es requerida",
              },
          },
      },
      sinopsis: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
              notNull: {
                  args: true,
                  msg: "Sinopsis es requerida",
              },
              len: {
                  args: [3, 500],
                  msg: "Sinopsis debe ser tipo caracteres, entre 3 y 500 de longitud",
              },
          },
      },
      guionista: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
              notNull: {
                  args: true,
                  msg: "Guionista es requerido",
              },
              len: {
                  args: [3, 100],
                  msg: "Guionista debe ser tipo caracteres, entre 3 y 40 de longitud",
              },
          },
      },
      presupuesto: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: false,
          validate: {
              notNull: {
                  args: true,
                  msg: "Presupuesto es requerido",
              },
              isDecimal: {
                  args: true,
                  msg: "Presupuesto debe ser numérico (decimal)",
              },
          },
      },
      idGenero: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "IdGenero es requerido",
            },
          },
      },
      cantidadNominaciones: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              args: true,
              msg: "Cantidad de Nominaciones es requerido",
            },
            isInt: {
              args: true,
              msg: "Cantidad de Nominaciones debe ser numérico",
            },
          }
      },
  },
  {
      // pasar a mayusculas
      hooks: {
        beforeValidate: function (corto, options) {
          if (typeof corto.titulo === "string") {
            corto.titulo = corto.titulo.toUpperCase().trim();
          }
        },
      },
  
      timestamps: false,
    }
);

const usuarios = sequelize.define(
    "usuarios",
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido",
                },
                len: {
                    args: [3, 50],
                    msg: "Nombre debe ser tipo caracteres, entre 3 y 50 de longitud",
                },
            },
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email es requerido",
                },
                isEmail: {
                    args: true,
                    msg: "Email no es válido",
                },
            },
            unique: {
                args: true,
                msg: "este email ya existe en la tabla!",
            },
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Password es requerido",
                },
                len: {
                    args: [6, 100],
                    msg: "Password debe ser tipo caracteres, entre 6 y 100 de longitud",
                }
            }
        },
        rol: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Rol es requerido",
                },
                isIn: {
                    args: [['admin', 'user']],
                    msg: "Rol debe ser 'admin' o 'user'",
                },
            },
        },
    },
    {
        // pasar a mayusculas
        hooks: {
            beforeValidate: function (usuario, options) {
                if (typeof usuario.nombre === "string") {
                    usuario.nombre = usuario.nombre.toUpperCase().trim();
                }
            },
        },

        timestamps: false,
    }
);


peliculas.belongsTo( generos, 
    { 
        foreignKey: "idGenero",
        as: "genero"
    });

series.belongsTo( generos,
    {
        foreignKey: "idGenero",
        as: "genero"
    });

documentales.belongsTo( generos,
    {
        foreignKey: "idGenero",
        as: "genero"
    });
cortos.belongsTo( generos,
    {
        foreignKey: "idGenero",
        as: "genero"
    });


module.exports = {
  sequelize,
  generos,
  peliculas,
  series,
  cortos,
  documentales,
  usuarios
};

