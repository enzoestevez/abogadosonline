# Cómo publicar esta web (GitHub + Vercel + dominio de GoDaddy)

## 1. Subir el código a GitHub

1. Creá un repositorio nuevo en GitHub (puede ser privado).
2. Desde esta carpeta, en tu computadora:
   ```bash
   git init
   git add .
   git commit -m "Sitio Escalante & Estévez - versión inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
   (`.gitignore` ya excluye `node_modules`, `dist` y archivos `.env`, así que no se sube nada sensible.)

## 2. Conectar el repositorio a Vercel

1. Entrá a vercel.com, iniciá sesión (podés hacerlo con tu cuenta de GitHub).
2. "Add New..." → "Project" → elegí el repositorio que acabás de crear.
3. Vercel va a detectar automáticamente que es un proyecto Vite. **No hace falta tocar nada del build** — ya viene configurado en `vercel.json`.
4. Antes de darle a "Deploy", andá a la sección **Environment Variables** del mismo formulario y cargá:

   | Nombre | Valor |
   |---|---|
   | `DATABASE_URL` | La misma cadena de conexión a la base de datos que usabas en Manus (TiDB) |
   | `MP_ACCESS_TOKEN` | Tu Access Token de **producción** de Mercado Pago (empieza con `APP_USR-`) |
   | `PUBLIC_SITE_URL` | `https://eabogadosonline.com` |

   Estas quedan guardadas cifradas del lado de Vercel — nunca se suben a GitHub ni quedan visibles en el código.

5. Hacé clic en **Deploy**. En unos minutos vas a tener una URL tipo `tu-proyecto.vercel.app` funcionando.

## 3. Conectar el dominio de GoDaddy

1. En el proyecto de Vercel, andá a **Settings → Domains** y escribí `eabogadosonline.com` (y si querés, agregá también `www.eabogadosonline.com`).
2. Vercel te va a mostrar los registros DNS que hay que cargar. Normalmente son:
   - Un registro **A** para el dominio raíz (`@`) apuntando a `76.76.21.21`
   - Un registro **CNAME** para `www` apuntando a `cname.vercel-dns.com`
   
   (Los valores exactos te los muestra Vercel en pantalla — a veces cambian, así que copiá los que aparezcan ahí, no estos de memoria.)
3. Entrá a tu cuenta de GoDaddy → "Mis productos" → el dominio `eabogadosonline.com` → **DNS** → **Administrar zona DNS**.
4. Cargá ahí los registros que te dio Vercel (editá el registro A existente si ya hay uno, y agregá el CNAME para `www`).
5. Guardá los cambios. La propagación puede tardar entre unos minutos y unas horas. Vercel va a mostrar el dominio como "Valid" cuando esté listo, y emite el certificado HTTPS solo, sin que tengas que hacer nada más.

## 4. Probar el pago de punta a punta

Una vez que el dominio esté activo:

1. Entrá a `https://eabogadosonline.com`, andá a la sección de "Agenda tu Consulta".
2. Completá tus datos, elegí un horario, y hacé clic en "Pagar con Mercado Pago".
3. Te tiene que redirigir al checkout real de Mercado Pago.
4. Pagá (podés hacer una prueba real por el monto que sea, o pedirle a Mercado Pago usuarios de test si no querés mover plata real).
5. Debería devolverte a `https://eabogadosonline.com/gracias-turno`, mostrar "Confirmando tu pago..." por unos segundos y después "¡Tu turno ha sido confirmado!".
6. Revisá que te llegue el email de aviso (vía Formspree) con los datos del turno pagado.
7. Confirmá en Google Ads / Tag Manager que la conversión se registró.

## Notas

- **Cada vez que hagas un cambio de código**, con solo hacer `git push` a la rama `main`, Vercel vuelve a desplegar automáticamente.
- Si algo falla, en el dashboard de Vercel → tu proyecto → **Deployments** → el despliegue en cuestión → **Functions** vas a ver los logs del backend (útil para depurar errores de Mercado Pago o de la base de datos).
- El login/OAuth heredado de Manus quedó en el código pero no se usa en el sitio público — no necesita configuración para que la web funcione.
