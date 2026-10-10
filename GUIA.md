# ROUND → App Store, sin Mac (guía paso a paso)

Todo lo técnico ya está hecho en este proyecto. Lo que sigue son los pasos que **solo tú** puedes hacer
(cuentas y claves tuyas). Tiempo aproximado: 1–2 horas de trámites + espera de Apple.

## 0. Qué necesitas
- Un iPhone (para probar con TestFlight).
- Cuenta de Apple Developer: **99 USD/año** (gratis solo para organizaciones sin fines de lucro, educativas o gubernamentales — pregunta a tu universidad si quiere ser el titular).
- Cuenta gratuita de GitHub.

## 1. Apple Developer
1. Entra a https://developer.apple.com/programs/enroll/ e inscríbete como persona (o como organización si tu universidad lo hace).
2. Anota tu **Team ID** (10 caracteres): developer.apple.com → Account → Membership details.

## 2. Registrar la app en App Store Connect (https://appstoreconnect.apple.com)
1. Apps → **+** → Nueva app. Plataforma iOS, nombre "ROUND: Ronda Médica", idioma Español (México).
2. **Bundle ID:** debe coincidir con `appId` de `capacitor.config.json` (`com.jafetsantana.round`).
   Si no aparece en la lista, créalo antes en developer.apple.com → Certificates, IDs & Profiles → Identifiers → +.
   Si prefieres otro, cámbialo en `capacitor.config.json` **y** ejecuta de nuevo `npx cap add ios` (o avísame y lo cambio).
3. SKU: cualquiera (p. ej. `round-001`).

## 3. Llave de API de App Store Connect (para que la nube firme y suba)
1. App Store Connect → Users and Access → Integrations → App Store Connect API → **+**.
2. Rol: **Admin** (Apple exige Admin para que la firma automática en la nube pueda crear el certificado de distribución; con App Manager puede fallar).
3. Descarga el archivo `.p8` (**solo se puede una vez**). Anota **Key ID** e **Issuer ID**.
4. Cuando termines de publicar, revoca la llave si no vas a seguir actualizando: es poderosa.

## 4. GitHub
1. Crea un repositorio nuevo (público = minutos de compilación gratis en ejecutores estándar; privado = consume tu cuota y los Mac gastan más minutos; revisa tu facturación).
2. Sube todo el contenido de esta carpeta (arrastrar archivos desde la web de GitHub funciona; incluye la carpeta oculta `.github`).
3. Settings → Secrets and variables → Actions → New repository secret. Crea 4:
   - `APPLE_TEAM_ID` → tu Team ID
   - `ASC_KEY_ID` → Key ID
   - `ASC_ISSUER_ID` → Issuer ID
   - `ASC_KEY_P8` → pega **todo el contenido** del archivo .p8 (incluidas las líneas BEGIN/END)
4. (Privacidad) Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/docs`.
   Tu política quedará en `https://jf6zy6877j-web.github.io/Round/privacy.html`.
   Pon esa URL en `PRIVACY_URL` dentro de `www/index.html` (así aparece también dentro de la app).

## 5. Compilar y subir
1. En GitHub: pestaña **Actions** → "Compilar y subir ROUND a TestFlight" → **Run workflow**.
2. Tarda unos 10–20 min. Si falla, abre el registro y pásamelo: lo corregimos (es normal que la primera vez haya que ajustar algo; no pude probar la compilación en un Mac desde aquí).
3. Al terminar, la compilación aparece en App Store Connect → TestFlight (tras unos minutos de procesamiento).

## 6. Probar en tu iPhone
1. Instala **TestFlight** desde la App Store.
2. En App Store Connect → TestFlight → agrégate como probador interno → recibirás la invitación.
3. Prueba: crear tarea, completar, iniciar guardia (acepta notificaciones, cierra la app y espera el aviso), exportar copia.

## 7. Enviar a revisión
1. App Store Connect → tu app → versión 1.0: pega los textos de `store/ficha-app-store.md`, sube capturas de `store/screenshots/`.
2. Elige la compilación subida, completa **Privacidad de la app** ("no recopilamos datos"), URL de privacidad y soporte, clasificación por edades.
3. Añade las "Notas para el revisor" del archivo de la ficha. → **Enviar a revisión**.
4. Respuesta típica: 1–3 días. Si piden cambios, me pasas el mensaje.

## Riesgos honestos
- **Guideline 4.2 (funcionalidad mínima):** Apple rechaza webs empaquetadas sin valor nativo. Por eso incluí notificaciones locales, háptica, hoja de compartir nativa y almacenamiento nativo, y la app funciona sin conexión. No hay garantía de aprobación.
- **Apps médicas (1.4.1):** la app incluye aviso médico y referencias solo educativas, y se declara como herramienta de estudio. Evita añadir funciones que parezcan diagnóstico o dosis.
- **Datos de pacientes:** pide siempre iniciales/códigos. Pregunta a tu facultad si sus reglas permiten anotar pacientes de prácticas en un teléfono personal.
- **Compilación en la nube:** no pude ejecutarla en un Mac desde aquí; el flujo sigue el método documentado por Apple (xcodebuild + llave de API), pero puede requerir un ajuste.
- **Mac prestado/alquilado** sigue siendo una alternativa si la nube diera problemas: `npm ci && npx cap open ios` en un Mac con Xcode 26+.
