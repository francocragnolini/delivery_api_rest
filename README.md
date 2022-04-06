6. Una vez creado el usuario deberá ejecutarse la siguiente sentencia de SQL: `UPDATE users SET rol_id = 2 WHERE id = 1`; esto dará privilegios de administrador al usuario, dándole acceso a los endpoints reservados para administrador. Esta sentencia puede encontrarse dentro del archivo `setAdmin.sql` dentro de la carpeta `./sql`.

## Recursos.

- Se proporciona la especificación de la API en el formato Open API Specification, esta se encuentra en el archivo `API_Specification.yaml`.
- El modelo relacional de la base de datos se encuentra dentro de la carpeta `./sql/`, es una imagen `.png`. Esto ayudará a conocer de mejor manera cómo se encuentra estructurada la base de datos.

## Estructura del proyecto.

- La carpeta `controllers` contiene la implementación de cada uno de los métodos HTTP, mismos que brindan funcionamiento a los distintos endpoints y realizan las sentencias sobre la base de datos.
- La carpeta `database` incluye un archivo de configuración que permite conectar a la base de datos, para ello se utilizan las configuraciones guardadas en el archivo `.env`.
- La carpeta `models` contiene los modelos de Sequelize, estos se utilizan para mapear las respuestas de las sentencias SELECT.
- La carpeta `routes` incluye cada una de las rutas de express, en cada uno de estos archivos es implementan los métodos HTTP para cada uno de los endpoints por medio de express; a su vez, también se manda a llamar las validaciones y las implementaciones de la funcionalidad que se encuentran en la carpeta `controllers`.
- La carpeta `sql` contiene las especificaciones de la base de datos lo que incluye las sentencias de DDL para crear la base de datos, sus tablas y relacionas; así como también los diagramas realizados durante el modelado.
- En la carpeta `utils` se definen métodos o constantes que son utilizados repetidamente dentro de cada uno de los controladores u otros componentes.
- En la carpeta `validation` se definen las validaciones necesarias, de esta manera se corrobora que se está mandando la información necesaria y con el formato indicado a cada uno de los endpoints.
- El archivo `app.js` configura el servidor de express especificando cada una de las rutas, así como también el middleware de body-parser.
- El archivo `index.js` ejecuta el servidor.

## Modelo relacional de la Base de Datos

![Modelo relacional](./sql/diagrams/relational-model.png)
