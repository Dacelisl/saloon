# MODULOS PENDIENTES
- reportes
- expense


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


--interfaz de historico de procedimientos, se podria gregar un estado (en proceso, cotizacion, pago) 

--implementar temporizador a la ruta de tickets para evitar su acceso despues de cierta hora
--ventana principal datos relacionados con el sueldo 
--modificar iconos de la view main
renderizado condicional segun el rol
--limitar a un solo rol de admin

--evitar colocar un monto mayor del adeudado en los abonos del ticket

diseño responsive y renderizado condicional segun permisos :
-modal de inicio y ventanas
-EarningsEmployee
-RegisterClient
-EmployeeRegister
-ProductRegister
-ProviderRegister
-ClientList
-ProductList
-ProviderList
-employeelist


ventana de earnings completar para seleccionar empleados, salon, 