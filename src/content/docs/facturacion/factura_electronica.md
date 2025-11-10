---
title: "Factura Electrónica"
category: "facturacion"
description: "Guía técnica para la emisión de facturas electrónicas a través de la API de Clarisa."
tags: ["facturas", "billing", "invoices", "api"]
method: "POST"
endpoint_prod: "https://api.clarisa.co/api/factura/rest/v1/factura/nacional"
endpoint_qa: "https://pru.clarisacloud.com:8443/api/factura/rest/v1/factura/nacional"

---

# Guía Técnica: Factura Electrónica

Nuestra API de facturación electrónica te permite integrar tu sistema con Clarisa para emitir, validar y gestionar documentos fiscales de manera eficiente, asegurando siempre el cumplimiento de la normativa de la DIAN.

Este documento detalla la estructura de los datos y los catálogos necesarios para una integración exitosa.

## Autenticación

> **Importante:** Todas las solicitudes a la API deben estar autenticadas. Deberás incluir tu **TOKEN** en la cabecera `Authorization` de cada petición, usando el que corresponda a cada entorno (Producción o Pruebas).

```http
Authorization: Bearer TU_TOKEN_DE_USUARIO
```

## Estructura de la Petición

A continuación, se muestra un ejemplo de una petición con los campos más comunes para generar una factura.

```json
{
   "nit": "12345",
   "numeroResolucion": "18760000001",
   "prefijoDcto": "SETP",
   "consecutivoDcto": "990000001",
   "fechaVencimiento": "2024-05-24",
   "formaPago": "1",
   "mediosPago": ["10", "30"],
   "total": "119000.0",
   "cliente": {
      "nombreRazonSocial": "CONSUMIDOR FINAL",
      "tipoIdentificacion": "NI",
      "numIdentificacion": "222222222222",
      "naturaleza": "NATURAL",
      "email": "cliente@email.com",
      "direccion": "Calle 123 # 45-67",
      "ciudad": "11001"
   },
   "items": [
      {
         "codigo": "TC1",
         "nombreItem": "Botella de Gaseosa 2.5 lt",
         "precioBaseUnitario": 10000,
         "cantidad": 10,
         "unidad": "94",
         "impuestos": [
            {
               "tipo": "IVA",
               "claseImpuesto": "PO",
               "tarifaTributo": 19
            }
         ]
      }
   ]
}
```

---

## Campos de la Factura

### Información General

| Campo              | Formato        | Descripción                                                                 |
| ------------------ | -------------- | --------------------------------------------------------------------------- |
| `nit`              | `String`       | NIT de tu empresa (emisor) sin dígito de verificación.                        |
| `numeroResolucion` | `String`       | Número de resolución de facturación aprobado por la DIAN.                      |
| `prefijoDcto`      | `String`       | Prefijo de la resolución de facturación.                                     |
| `consecutivoDcto`  | `String`       | Número consecutivo del documento.                                          |
| `fechaVencimiento` | `String`       | Fecha de vencimiento del documento en formato `YYYY-MM-DD`.                 |
| `formaPago`        | `String`       | Código de la forma de pago. Ver tabla de referencia **Formas de Pago**.     |
| `mediosPago`       | `Array<String>`| Lista de códigos de los medios de pago. Ver tabla **Medios de Pago**.      |
| `total`            | `String`       | Valor total del documento, incluyendo impuestos y descuentos.              |
| `observacion`      | `String`       | (Opcional) Observaciones generales de la factura.                           |

### Cliente

Estos campos van anidados dentro del objeto `cliente`.

| Campo                   | Formato  | Descripción                                                                       |
| ----------------------- | -------- | --------------------------------------------------------------------------------- |
| `nombreRazonSocial`     | `String` | Nombre o razón social del cliente.                                                |
| `tipoIdentificacion`    | `String` | Código del tipo de identificación. Ver tabla **Tipo de Identificación**.        |
| `numIdentificacion`     | `String` | Número de identificación del cliente (sin dígito de verificación si aplica).    |
| `naturaleza`            | `String` | Código de la naturaleza del cliente. Ver tabla **Naturaleza**.                    |
| `direccion`             | `String` | (Opcional) Dirección del cliente.                                                 |
| `ciudad`                | `String` | (Opcional) Código DANE de la ciudad/municipio.                                    |
| `telefono`              | `String` | (Opcional) Teléfono del cliente.                                                  |
| `email`                 | `String` | (Opcional) Correo electrónico del cliente para el envío de la factura.            |
| `responsabilidadesFiscales`| `String`| (Opcional) Código de responsabilidad fiscal. Ver tabla **Responsabilidades Fiscales**. |

### Items

La factura debe contener al menos un ítem dentro del array `items`.

| Campo              | Formato  | Descripción                                                                     |
| ------------------ | -------- | ------------------------------------------------------------------------------- |
| `codigo`           | `String` | Código o SKU del producto/servicio.                                             |
| `nombreItem`       | `String` | Descripción o nombre del ítem.                                                  |
| `precioBaseUnitario`| `Number` | Valor unitario del ítem antes de impuestos.                                     |
| `cantidad`         | `Number` | Cantidad de unidades del ítem.                                                  |
| `unidad`           | `String` | Código de la unidad de medida. Ver tabla **Unidad**.                              |
| `observacion`      | `String` | (Opcional) Observaciones específicas para este ítem.                              |
| `impuestos`        | `Array<Object>` | (Opcional) Lista de impuestos aplicados al ítem. Ver sección **Impuestos**. |
| `valorDescuento`   | `Number` | (Opcional) Monto del descuento a aplicar sobre el valor total del ítem.        |

---

## Casos de Uso Avanzados

### 1. Agregar Múltiples Impuestos a un Ítem

Puedes añadir varios impuestos a un mismo ítem, como IVA e Impuesto al Consumo de bolsas (IBUA), siempre que no sean del mismo tipo.

> **💡 ¿Qué es `factor`?**
> Para impuestos que dependen de una medida (como el IBUA, que se basa en el tamaño), el campo `factor` indica la cantidad sobre la cual se aplica la tarifa. Por ejemplo, `2500` para una botella de 2500 ml.

```json
"items": [
   {
      "codigo": "TC1",
      "nombreItem": "Botella Gaseosa 2.5 lt",
      "precioBaseUnitario": 10000,
      "cantidad": 10,
      "unidad": "94",
      "impuestos": [
         {
            "tipo": "IVA",
            "claseImpuesto": "PO",
            "tarifaTributo": 19
         },
         {
            "tipo": "IBUA",
            "claseImpuesto": "NM",
            "tarifaTributo": 18,
            "factor": 2500
         }
      ]
   }
]
```

### 2. Agregar Descuentos

#### Descuento por Ítem

Para aplicar un descuento a un ítem específico, utiliza el campo `valorDescuento`. Este valor se resta de la base imponible del ítem.

```json
"items": [
  {
     "codigo": "TC1",
     "nombreItem": "Botella Gaseosa 2.5 lt",
     "precioBaseUnitario": 10000,
     "cantidad": 10,
     "valorDescuento": 2000, // Descuento de $2000 sobre el total de este ítem
     "unidad": "94",
     "impuestos": [
        { "tipo": "IVA", "claseImpuesto": "PO", "tarifaTributo": 19 }
     ]
  }
]
```

#### Descuento o Cargo General

Para aplicar un descuento o un cargo que afecte el total de la factura (sin alterar la base imponible de los ítems), utiliza el array `listaDescuentosCargos`.

```json
"listaDescuentosCargos": [
   {
      "tipo": "DESCUENTO", // o "CARGO"
      "codigo": "00", // Ver tabla "Código de Descuento"
      "observacion": "Descuento por aniversario",
      "valor": 10000 // Monto a descontar del total
   }
]
```

---

## Tablas de Referencia

### 📌 Tipo de Identificación
| Nombre | Código |
|---|---|
| Cédula de Ciudadanía | CC |
| NIT | NI |
| Tarjeta de Identidad | TI |
| Pasaporte | PA |
| Cédula de Extranjería | CE |
| Sin identificación | SI |
| Permiso Especial de Permanencia | PE |

*(Se han omitido otros valores para brevedad)*

### 📌 Formas de Pago
| Nombre | Código |
|---|---|
| Contado | 1 |
| Crédito | 2 |

### 📌 Medios de Pago
| Nombre | Código |
|---|---|
| Efectivo | 10 |
| Consignación bancaria | 42 |
| Tarjeta Crédito | 30 |
| Tarjeta Débito | 49 |
| Acuerdo mutuo | ZZZ |

*(Se han omitido otros valores para brevedad)*

### 📌 Unidad
| Nombre | Código |
|---|---|
| Unidad / Pieza / Servicio | 94 |
| Kilogramo | KGM |
| Litro | LTR |

*(Se han omitido otros valores para brevedad)*

### 📌 Impuestos
| Descripción | Código |
|---|---|
| Excluido de impuesto | EXCLUIDO |
| Exento de impuesto | EXENTO |
| IVA 5% | IVA_5 |
| IVA 19% | IVA_19 |
| Impuesto al consumo 8% | IMPUESTO_CONSUMO_8 |

*(Se han omitido otros valores para brevedad)*

### 📌 Código de Descuento
| Nombre | Código |
|---|---|
| Descuento por impuesto asumido | 00 |
| Descuento por pronto pago | 03 |
| Descuento general | 09 |
| Otro descuento | 11 |

*(Se han omitido otros valores para brevedad)*

### 📌 Naturaleza
| Nombre | Código |
|---|---|
| Persona Natural | NATURAL |
| Persona Jurídica | JURIDICA |

### 📌 Ciudad
Para el campo `ciudad`, debes usar los códigos de municipios definidos por el DANE. Puedes consultar la lista oficial para obtener los códigos correctos.
