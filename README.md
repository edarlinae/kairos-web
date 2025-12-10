# 🌐 Kairos Web – Aplicación en Angular 17+

Proyecto desarrollado en **Angular 17+** para la creación de un sitio web corporativo moderno, modular y escalable.  
Este repositorio tiene un enfoque **frontend técnico**, mostrando buenas prácticas en organización de código, arquitectura con **Standalone Components** y despliegue optimizado.

🔗 **[Demo en Producción](https://www.gabinetekairos.es/)**  
🔗 **[Repositorio en GitHub](https://github.com/edarlinae/kairos-web)**

---

## 📜 Descripción Técnica

El proyecto consiste en una **SPA (Single Page Application)** desarrollada con Angular en su última versión estable.  
Está diseñado para ser **modular**, **responsivo** y **escalable**, con posibilidad de añadir backend en el futuro.

Incluye:
- Routing standalone con lazy loading.  
- Consumo de datos desde archivos JSON en `/assets/`.  
- Arquitectura de carpetas clara: separación de **pages**, **layout**, **services** y **models**.  
- Preparado para integrarse con una API REST o CMS.  

---

## ✨ Características Técnicas

- ⚡ **Angular 17+** con Standalone Components.  
- 🎨 **SCSS modular** con estilos globales y parciales.  
- 📱 **Responsive Design** (mobile-first).  
- 🌍 Preparado para **internacionalización (i18n)**.  
- 🗂️ Datos gestionados desde JSON (`blog.json`, `agenda.json`).  
- 🚀 Despliegue en **Vercel** con soporte para `_redirects`.  

---

## 📂 Estructura de Carpetas

```bash
kairos-web/
│── angular.json
│── package.json
│── tsconfig.json
│── src/
    │── app/
    │   │── layout/        # Componentes de layout (navbar, footer…)
    │   │── models/        # Interfaces y tipados
    │   │── pages/         # Páginas principales (home, blog, contacto…)
    │   │── services/      # Servicios (blog, agenda, contacto…)
    │   │── app.component.* 
    │   │── app.routes.ts
    │
    │── assets/            # Datos estáticos (JSON, imágenes, logo…)
    │── environments/      # Configuración de entornos
    │── index.html         # Entrada principal
    │── styles.scss        # Estilos globales

🛠️ Tecnologías Utilizadas
- Categoría	Tecnologías
- Framework	Angular (v17+)
- Lenguajes	TypeScript, JavaScript (ES6+)
- Estilos	SCSS, CSS3, Flex/Grid Layout
- UI	Angular Animations, Heroicons SVG
- Arquitectura	Standalone Components, Lazy Loading Routes
Estado	RxJS (BehaviorSubject)
Control de versiones	Git + GitHub
Despliegue	Vercel
