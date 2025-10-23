---
title: "Facturas"
category: "facturacion"
description: "Gestiona facturas electrónicas y consulta el historial de facturación"
tags: ["facturas", "billing", "invoices"]
method: "GET"
endpoint: "/api/v1/facturas"
---
# Documentación de Facturas

Aquí va toda la información detallada sobre cómo gestionar las facturas a través de la API.

## Endpoint Principal

`GET /api/v1/facturas`

## Respuesta Esperada

```json
{
  "id": "fact-123",
    "amount": 150.75,
      "status": "paid"
      }