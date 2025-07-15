# Panel de Administración con Autenticación y Gestión de eventos

## Objetivo

Desarrollar una **Single Page Application (SPA)** que permita gestionar evebtos, incluyendo un sistema de autenticación con roles diferenciados:

- **Administrador**: Puede crear, leer, editar y eliminar eventos.
- **Visitante**: Puede registrarse, iniciar sesión y visualizar eventos disponibles e inscribirse.

---

## Tecnologías Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Bootstrap 5**
- **json-server** (para simular una base de datos)

---

## Módulo de Autenticación

- Registro de nuevos usuarios (visitantes)
- Inicio de sesión validando credenciales
- Sesión persistente con `localStorage`
- Restricción de acceso según el rol

---

## Funcionalidades por Rol

### Administrador
- Acceso al panel administrativo (dashboard)
- CRUD de eventos

### Visitante
- Registro de cuenta
- Visualización de eventos
- Inscripción a eventos

---

## Interfaz de Usuario

- Pantalla de login y registro
- Dashboard solo para el administrador
- Vista pública para visitantes
- Nombre y Roll del usuario logueado
- Navegación por secciones
- Tablas de eventos
- Formularios para crear/editar eventos

---

## Estructura de Archivos Recomendada

```
/src
  /js
    admin_add.js
    admin_events.js
    main.js
    routes.js
    user_events.js
    user_insc.js
  /pages
    login.html
    register.html
    dashboard.html
    public.html
  /services
    auth_login.js
    auth_register.js
db.json
package.json
README.md
```

---

## Estructura de Datos (`db.json`)

```json
{
  "users": [
    {
      "name": "Admin",
      "email": "admin@admin.com",
      "password": 1234,
      "confirmPassword": 1234,
      "role": "admin"
    }
  ],
  "events": [
    {
      "name": "jose miguel cortes ",
      "description": "west",
      "capacity": "2",
      "date": "2025-07-12",
      "id": "4981"
    }
  ],
  "enrollments": [
    {
      "id": "8088",
      "courseId": "4981"
    }
  ]
}
```

---

## Instalación y Ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/josecortes99/Final_Js.git
   ```

2. Instala `json-server` si no lo tienes:
   ```bash
   npm install -g json-server
   ```

3. Inicia el servidor:
   ```bash
   json-server --watch db.json --port 3000
   ```

4. Inicia el package.json:
   ```bash
   npm init -y
   ```

4. Abre el archivo `login.html` en el navegador para empezar a usar la aplicación.

---

## Autor

Desarrollado por [Jose Miguel Cortes Escobar]  
Contacto: j.c.e555@hotmail.com