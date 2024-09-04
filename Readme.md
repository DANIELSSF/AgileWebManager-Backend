# Agile Web Manager Backend

Este proyecto es una aplicación backend diseñada para simular funcionalidades similares a Trello, una aplicación popular basada en la web para la gestión de tareas y proyectos con un estilo Kanban. El backend proporciona APIs para gestionar tablas (similares a los tableros de Trello) y tareas (todos, similares a las tarjetas de Trello), entre otras características.

## Funcionalidades Clave

- **Gestión de Tablas:** Permite crear, actualizar y eliminar tablas. Las tablas funcionan como los tableros de Trello, que contienen las tareas.
- **Gestión de Tareas:** Permite crear, actualizar y eliminar tareas (todos), que son los elementos de trabajo dentro de las tablas.
- **Autenticación y Autorización:** Utiliza middleware para validar JSON Web Tokens (JWT) y permisos de usuario, asegurando que solo usuarios autenticados y autorizados puedan realizar ciertas operaciones.
- **Validación de Datos:** Antes de realizar operaciones, el backend valida los datos de entrada utilizando `express-validator` para garantizar que los datos cumplan con los formatos y valores esperados.

## Arquitectura y Patrones de Diseño

La arquitectura sigue el patrón MVC (Modelo-Vista-Controlador), que es común en el desarrollo de aplicaciones web y ayuda a separar la lógica de la aplicación en componentes distintos:

- **Modelo:** Representa la estructura dinámica de datos de la aplicación, independiente de la interfaz de usuario. Los modelos se definen utilizando esquemas de Mongoose para MongoDB, incluyendo tablas, tareas, comentarios, y usuarios.
- **Controlador:** Gestiona las solicitudes HTTP, interactúa con los modelos para recuperar datos y envía las respuestas correspondientes.
- **Rutas:** Actúan como la configuración para los controladores, determinando qué acciones del controlador se activan por las solicitudes HTTP.

### Otros Patrones Utilizados

- **Middleware:** Funciones que tienen acceso al objeto de solicitud y respuesta, y pueden modificar el flujo de procesamiento de la solicitud. Ejemplos incluyen validación de JWT, validación de campos y permisos de usuario.
- **Modularización:** La estructura del código se organiza en módulos separados para modelos, rutas, controladores y helpers, promoviendo la reutilización y mantenibilidad del código.
- **Variables de Entorno:** Utiliza dotenv para la gestión de variables de entorno, configurando aspectos de la aplicación como las conexiones a la base de datos.

## Estructura del Proyecto

- **Modelos:** Define varios modelos Mongoose para interactuar con la base de datos MongoDB, incluyendo modelos para usuarios, tareas, comentarios y tablas.
- **Controladores:** Gestionan la lógica de negocio de la aplicación, como los controladores de tareas que realizan operaciones relacionadas con las tareas.
- **Helpers:** Incluye funciones auxiliares para la validación de datos y otras utilidades comunes.
- **Rutas:** Define los endpoints de la aplicación y mapea las solicitudes a las funciones correspondientes en los controladores.
- **Public:** Sirve archivos estáticos desde el directorio `public`, como el archivo `index.html`, que podría usarse para servir una aplicación frontend o activos estáticos.

## Dependencias

El proyecto utiliza varias dependencias clave de Node.js, incluyendo:

- **Express:** Framework para la creación de servidores web y APIs.
- **Mongoose:** ODM para la modelación de datos en MongoDB.

Este backend está diseñado para proporcionar un servicio RESTful para la gestión de usuarios, tareas, comentarios y tablas, enfocado en operaciones CRUD e interacciones con la base de datos.
