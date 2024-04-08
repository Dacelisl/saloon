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

--agregar notificaciones de acciones 


-modulo de tickets: a tener en cuenta el id del cliente y el empleado, el id del cleinte puede ser enviado como prop, los empleados pueden ser cargados en un select,  
datos a mostrar: fecha, nombre cliente, nombre empleado, select con producto o servicio, tabla con los datos segun seleccion. (la tabla debe tener el boton de agregar una vez agregado mostrar una ventana modal para asignar cantidad y valor ), metodo de pago seria un select, informativo total a pagar, valor a pagar y de manera informativa se queda deuda pendiente 

datos: recibe como prop, cliente. dentro del componente se llama a los productos, servicios, y medios de pago para llenar los selects.
