# MODULOS PENDIENTES

- reportes
- expense
- proveedores
- login

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

-en los roles se empleo solo el 'name' pero se puede asignar el objeto completo con id, name, y permisions
  -al finalizar se podra usar el useContext para usar un solo toast en la app y evitar el uso de ellos en todo lado
  
-usar el servicio de email para la recuperacion de contraseña link:https://firebase.google.com/docs/auth/admin/email-action-links?hl=es-419

-en el middleware de auth modificar para redirigir a ruta 404
