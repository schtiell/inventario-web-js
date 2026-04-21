# Sistema de Inventarios Web

Proyecto desarrollado para practicar Javascript moderno, modularidad, manipulación del DOM y persistencia de datos.

Este proyecto forma parte de mi preparación para convertirme en Desarrollador Web Fullstack utilizando:

- JavaScript
- ReactJS
- Node.js

## Objetivo
Convertirme en desarrollador web utilizando Javascript, ReactJS y Node.js, construyendo proyectos prácticos con arquitectura modular y buenas prácticas.

## Tecnologías
- HTML 5
- CSS 3 
- JavaScript ( ES6+ )
- ES Modules
- LocalStorage
- Git

## Funcionalidades implementadas
- Agregar productos
- Mostrar inventarios
- Buscar productos por nombre
- Filtro por categoria
- Ordenamiento por nombre
- Ordenamiento por precio
- Filtro combinado ( busqueda + categoria + orden )
- Eliminar productos
- Confirmación antes de eliminar productos
- Actualizar stock
- Disminuir stock
- Render dinámico del DOM
- Modularidad con ES Modules
- Persistencia con LocalStorage
- Formato de moneda MXN
- Dashboard de estadísticas
- UI responsive


## Dashboard de Inventario
Se implementó un panel de estadísticas en tiempo real:
- Total de productos
- Valor total del inventario

Las estadísticas se actualizan automáticamente al:
- Agregar productos
- Eliminar productos
- Modificar stock


## Persistencia con LocalStorage
Se agregó persistencia del inventario utilizando LocalStorage.

Características:
- Guardado automático del inventario
- Mantener datos al recargar el navegador
- Actualización persistencte del stock
- Eliminación persistente de productos


## Mejora UI
Se implementó una mejora visual del sistema para proporcionar una interfaz más profesional.

Nuevas características:
- Header principal
- Layout centrado
- Paneles con diseño moderno
- Tarjetas de productos
- Dashboard con estadísticas
- Diseño responsive con CSS Grid


## Arquitectura del Proyecto
js/
- app.js - UI y eventos
- inventario.js - lógica del inventario
- utils.js - funciones reutilizables
- storage.js - persistencia LocalStorage

css/
- styles.css - estilos UI

index.html - estructura de la aplicación


## Conceptos aplicados
- Arrays y Objetos
- Destructuring
- Spread operator
- map()
- filter()
- reduce()
- sort()
- localeCompare()
- FIltro combiando
- Copia de arrays con spread operator
- Modularidad
- Manipulación del DOM
- Event Listeners
- Persistencia de datos LocalStorage
- CSS Grid
- Flexbox


## Aprendizajes
- JavaScript moderno (ES6+)
- Arquitectura modular
- Persistencia de datos
- Manejo de filtros dinámicos
- Optimización de event listeners
- Generación dinámica de select options
- Diseño de Dashboard
- Separación UI/lógica
- Git workflow
- Diseño responsive



## Próximas funcionalidades
- Ordenar productos
- Editar productos
- Mejoras UI adicionales
- Migración a ReactJS



## Filtro por Categoría
Se implementó un filtro dinámico por categoria que permite visualizar únicamente los productos pertenecientes a la categoria seleccionada.

Características:
- Categorias generadas dinámicamente
- Filtrado en tiempo real
- Integración con render dinámico
- Mejora en experiencia de usuario

## Ordenamiento Dinámico
Se implementó un sistema de ordenamiento dinámico de productos

- Ordenar por nombre (A-Z)
- Ordenar por nombre (Z-A)
- Ordenar por precio de menor a mayor
- Ordenar por precio de mayor a menor

El ordenamiento funciona de manera combinada con:
 - Búsqueda por texto
 - Filtro por categoria

Esto permite una experiencia más profesional y flexible en la gestión del inventario.




## Mejoras UX
- Confirmación antes de eliminar productos
- Filtro dinámico por categoria
- Interfaz más intuitiva
