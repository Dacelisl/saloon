# MODULOS PENDIENTES

- reportes
- expense
- proveedores

# Firebase

- implementar el uso del hosting con firebase login
- iniciar el proyecto firebase init
- agregar al firebase.json
  {
  "hosting": {
    "site": "fabiosaloon",
    "public": "public",
    ...
    }
  }
- correr el deploy  firebase deploy --only hosting:fabiosaloon

.-tener en cuenta los estilos para movil en modo vertil y horizontal

# ROLES

-en los roles se empleo solo el 'name' pero se puede asignar el objeto completo con id, name, y permisions
  -al finalizar se podra usar el useContext para usar un solo toast en la app y evitar el uso de ellos en todo lado
  
# MIDDLEWARE NAVIGATE
-en el middleware de auth modificar para redirigir a ruta 404

# USECONTEXT
- implementar el useContext para hacer uso de un solo toast a nivel app


# OTROS

- creacion de la UI princiapl
- ui en color

usar un componente principal para ejecutar el modalProduct y productDetailTable, en el principal se envian los datos obtenidos en mongo y se realizan las operaciones de guardado 


--interfaz de historico de procedimientos, se podria gregar un estado (en proceso, cotizacion, pago) 

--interfaz de listar el historico de consumo en servicios y productos
--agregar notificaciones de acciones 