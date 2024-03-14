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
- agregar mejor estructura a la tabla react, en datelle debe poderse ver toda la info del cliente 

usar un componente principal para ejecutar el modalProduct y productDetailTable, en el principal se envian los datos obtenidos en mongo y se realizan las operaciones de guardado 


--se debe verificar la insercion de datos en el historico de consumo y servicios de los clicnetes, lo mas seguro sea tres estados: el estado iniciail del servicio, el estado de pago y finalmente actualizacion del estado del cliente.

--dos interfaces mas con tablas y listas para veficar los usuarios a la hora de pagar y otra para listar