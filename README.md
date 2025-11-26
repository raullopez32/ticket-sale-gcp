
**Autor:** Gerardo Raúl López Aguilar  
**Fecha:** Octubre 2025  

---

##   Descripción general
Este proyecto implementa un **servicio HTTP escalable en Google Cloud Run** utilizando **FastAPI**.  
El objetivo es validar la capacidad del servicio para manejar picos de tráfico masivo con baja latencia y sin errores, ajustando parámetros de **concurrency**, **min_instances** y **CPU Boost**.

---

##   Caso de uso
**Compra de boletos (`/tickets/purchase`)**  
Simula solicitudes simultáneas de usuarios comprando boletos al abrir la venta de un artista.  
Incluye una operación *mock* con retardo de 120 ms para emular una llamada a base de datos o API externa.

---

##  Configuración del ambiente local


- [Google Cloud SDK] 
- [Docker] 
- [k6 (Load Testing)] 
- [Git] 
- [Python 3.11] 

---

##  Variables de entorno (PowerShell)
```powershell
$env:REGION = "us-central1"
$env:PROJECT_ID = (gcloud config get-value project)

Construcción y despliegue del servicio
1️- Construir la imagen Docker
gcloud builds submit .\scaler-demo\app --tag gcr.io/$env:PROJECT_ID/scaler-demo:latest
2️- Desplegar en Cloud Run
gcloud run deploy scaler-demo `
  --image gcr.io/$env:PROJECT_ID/scaler-demo:latest `
  --region $env:REGION `
  --allow-unauthenticated `
  --concurrency 10 `
  --min-instances 0 `
  --memory 512Mi `
  --timeout 60s
3- Obtener la URL del servicio
$env:TARGET_URL = (gcloud run services describe scaler-demo --region $env:REGION --format "value(status.url)")
$env:TARGET_URL
Pruebas de carga con k6
k6 run -e TARGET_URL=$env:TARGET_URL .\scaler-demo\load\k6-load.js | Tee-Object -FilePath .\k6-E1.txt


Licencia

© 2025 Gerardo Raúl López Aguilar — Todos los derechos reservados.
