---
title: "Factura electronica"
category: "facturacion"
description: "Gestiona facturas electrónicas y consulta el historial de facturación"
tags: ["facturas", "billing", "invoices"]
method: "GET"
endpoint: "/api/factura/rest/v1/factura/nacional"
---
# Guía Técnica de Integración: Factura Electrónica 

Clarisa pone a su disposición una avanzada API que posibilita la integración fluida de su sistema, permitiéndole realizar diversas operaciones

Nuestro servicio incluye un riguroso proceso de verificación y validación de sus facturas, asegurando su aceptación y la correcta presentación de informes ante la  [DIAN](https://micrositios.dian.gov.co/sistema-de-facturacion-electronica/).

Estamos comprometidos en brindarle una experiencia eficiente y segura en la gestión de sus documentos financieros.


## Endpoint Pruebas

`POST https://api.clarisa.co:8443/api/factura/rest/v1/factura/nacional`


## Endpoint Producción

`POST https://api.clarisa.co:8443/api/factura/rest/v1/factura/nacional`

## Formato de la peticiócn

NOTA: El ejemplo anterior corresponde a un petición con los datos mínimos

```json
{
   "nit":"12345",
   "numeroResolucion":"18760000001",
   "consecutivoDcto":"990000001",
   "prefijoDcto":"SETP",
   "fechaVencimiento":"2024-05-24",
   "formaPago":"1",
   "mediosPago":[
      "10",
      "30"
   ],
   "total":"119000.0",
   "cliente":{
      "nombreRazonSocial":"CONSUMIDOR FINAL",
      "tipoIdentificacion":"NI",
      "numIdentificacion":"222222222222",
      "naturaleza":"NATURAL"
   },
   "items":[
      {
         "codigo":"TC1",
         "nombreItem":"Botella Cocacola 2.5 lt",
         "precioBaseUnitario":10000,
         "cantidad":10,
         "unidad":"94",
         "impuestos":[
            {
               "tipo":"IVA",
               "claseImpuesto":"PO",
               "tarifaTributo":19
            }
         ]
      }
   ]
}
```

## Propiedades Adicionales

### Agregar múltiples impuestos

```json
{
   "items":[
      {
         "codigo":"TC1",
         "nombreItem":"Botella Cocacola 2.5 lt",
         "precioBaseUnitario":10000,
         "cantidad":10,
         "observacion":"Plastico reciclable",
         "unidad":"94",
         "impuestos":[
            {
               "tipo":"IVA",
               "claseImpuesto":"PO",
               "tarifaTributo":19
            },
            {
               "tipo":"IBUA",
               "claseImpuesto":"NM",
               "tarifaTributo":18,
               "factor":2500
            }
         ]
      }
   ]
}
```

> Nota Adicional
>
>Es posible añadir múltiples impuestos a un ítem. Sin embargo, es importante tener en cuenta que no se pueden asignar dos impuestos del mismo tipo al mismo ítem. Por ejemplo, no es válido aplicar dos impuestos de tipo IVA sobre el mismo ítem. 
>> __tarifaTributo:__ esta se aplica según ley 

>> __factor:__ este representa la cantidad por la cual se aplica la tarifa en este caso representa 2500 ml de ítem por unidad


### Agregar descuento a un ítem

```json
{
   "nit":"12345",
   "numeroResolucion":"...",
   "total":95200,
   "observacion":"Esta es la observación general",
   "cliente":{
      "nombreRazonSocial":"..."
   },
   "items":[
      {
         "codigo":"TC1",
         "nombreItem":"Botella Cocacola 2.5 lt",
         "precioBaseUnitario":10000,
         "cantidad":10,
         "valorDescuento":2000,
         "observacion":"observación ítem",
         "unidad":"94",
         "impuestos":[
            {
               "tipo":"IVA",
               "claseImpuesto":"PO",
               "tarifaTributo":19
            }
         ]
      }
   ]
}
```

> **Nota Adicional**
>
>Todos los descuentos aplicados a un ítem afectan a las bases imponibles


### Agregar descuento general al total de la Factura Electrónica

```json
{
   "nit":"12345",
   "numeroResolucion":"...",
   "total":"109000.0",
   "observacion":"Esta es la observación",
   "listaDescuentosCargos":[
      {
         "tipo":"DESCUENTO",
         "codigo":"00",
         "observacion":"Esta es la observación descuento",
         "valor":10000
      }
   ],
   "cliente":{
      "nombreRazonSocial":"..."
   },
   "items":[
      {
         "codigo":"TC1",
         "nombreItem":"Botella Cocacola 2.5 lt",
         "precioBaseUnitario":10000,
         "cantidad":10,
         "observacion":"Plastico reciclable",
         "unidad":"94",
         "impuestos":[
            {
               "tipo":"IVA",
               "claseImpuesto":"PO",
               "tarifaTributo":19
            }
         ]
      }
   ]
}
```

> **Nota Adicional**
>
>Para la factura electrónica, es posible aplicar tanto descuentos como recargos generales sin afectar las bases imponibles del documento.

---

##  Estructura de la Factura Electrónica

| Nombre del campo                     | Formato         | Tamaño | Descripción                                                                                                                  |
|-------------------------------------|------------------|--------|------------------------------------------------------------------------------------------------------------------------------|
| NIT                               | Alfanumérico     | 100    | NIT de la empresa sin dígito de verificación                                                                                 |
| cliente                           | —                | —      | Datos del Cliente del documento electrónico                                                                                  |
| cliente.nombreRazonSocial         | Alfanumérico     | 100    | Cliente: Razón social o Nombre                                                                                               |
| cliente.tipoIdentificacion        | Alfanumérico     | 100    | Código del tipo de identificación, véase la lista **tipo de identificación**                                                  |
| cliente.numIdentificacion         | numérico         | 100    | Número de identificación de cliente, sin dígito de verificación                                                              |
| cliente.naturaleza                | String           | 100    | Código de la naturaleza del cliente, véase **valores para Naturaleza**                                                       |
| cliente.direccion                 | Alfanumérico     | 100    | Dirección Cliente                                                                                                            |
| cliente.ciudad                    | Alfanumérico     | 100    | Código DANE de la ciudad. La ciudad del cliente, véase la tabla **valores para ciudad**                                       |
| cliente.telefono                  | numérico         | 100    | Teléfono del cliente                                                                                                         |
| cliente.email                     | Alfanumérico     | 100    | Correo Electrónico                                                                                                           |
| cliente.responsabilidadesFiscales | Alfanumérico     | 100    | Código de responsabilidades fiscales, véase tabla **Responsabilidades fiscales cliente**                                     |
| cliente.respTributarias           | Alfanumérico     | 100    | Código de responsabilidades tributarias, véase tabla **Valores para Responsabilidades tributarias cliente**                  |
| numeroDocumentoComercial          | numérico         | 100    | Número del documento electrónico                                                                                             |
| fechaGeneracion                   | String           | 100    | Fecha de generación del documento electrónico (Formato: yyyy-MM-ddThh:mm:ss)                                               |
| fechaVencimiento                  | String           | 100    | Fecha de vencimiento del documento electrónico (Formato: yyyy-MM-ddThh:mm:ss)                                              |
| mediosPago                        | Alfanumérico     | 100    | Códigos de la DIAN de los medios de pago con los que se pagó el documento electrónico, dichos códigos van separados por coma. Revisar tabla **valores para medios de pago** |
| Observación                       | Alfanumérico     | 100    | Observación.                                                                                                                 |
| formaPago                         | numérico         | 100    | Código de la DIAN asociado a la forma de pago del documento electrónico. Revisar tabla **valores para forma de Pago**         |
| total                             | numérico         | 100    | Valor total del documento electrónico.                                                                                       |
| ítems                             | Array []       | —      | Líneas de la factura.                                                                                                        |
| items.nombreItemVenta             | Alfanumérico     | 100    | Nombre del producto vendido                                                                                                  |
| items.precioVentaUnitario         | numérico         | 100    | Precio de venta unitario del producto                                                                                        |
| items.precioBaseUnitario          | numérico         | 100    | Precio base unitario del producto. Este atributo reemplaza a items.precioVentaUnitario si los cálculos se hacen a partir del precio base y no del precio con impuesto. |
| items.precioReferencia            | numérico         | 100    | Precio de referencia del producto cuando éste se considera un regalo (precio resultante = 0). Obligatorio si descuentoPorcentaje = 100 o si precioVentaUnitario = 0 o precioBaseUnitario = 0 |
| items.cantidad                    | numérico         | 100    | Cantidad vendida del ítem                                                                                                    |
| items.impuesto                    | Alfanumérico     | 100    | Impuesto aplicado, revisar tabla **Valores para impuestos**                                                                  |
| items.código                      | Alfanumérico     | 100    | Código del producto vendido.                                                                                                 |
| items.unidad                      | Alfanumérico     | 100    | Código de la DIAN de la Unidad del producto. REVISAR tabla **Valores para unidad**                                           |
| items.códigoDescuento             | Alfanuméricos    | 100    | Código de la DIAN del tipo de descuento aplicado al ítem.                                                                    |
| items.descuentoPorcentaje         | numérico         | 100    | Porcentaje de descuento aplicado al ítem                                                                                     |
| items.observacion                 | Alfanumérico     | 100    | Observación del ítem                                                                                                         |
| numeroResolucion                  | numérico         | 100    | Número de resolución aprobada en la DIAN                                                                                     |
| códigoDescuento                   | Alfanumérico     | 100    | Código de la DIAN del tipo de descuento aplicado al ítem                                                                     |
| porcentajeDescuentoGeneral        | numérico         | 100    | Porcentaje de descuento aplicado al valor total                                                                              |
| periodoFacturacion                | —                | —      | Información del periodo de facturación asociado a la factura.                                                                |
| periodoFacturacion.fechaInicial   | String           | —      | Fecha de inicio del periodo de facturación en formato YYYY-MM-DD.                                                          |
| periodoFacturacion.horaInicial    | String           | —      | Hora de la fecha de inicio del periodo de facturación en formato hh:mm:ss                                                  |
| periodoFacturacion.fechaFinal     | String           | —      | Fecha de inicio del periodo de facturación en formato YYYY-MM-DD                                                           |
| periodoFacturacion.horaFinal      | String           | —      | Hora de la fecha de finalización del periodo de facturación en formato hh:mm:ss                                            |
| urlDescargaAdjuntos               | —                | —      | Describe los datos donde el emisor dispone de la información complementaria...                                               |
| urlDescargaAdjuntos.url           | —                | —      | Dirección donde se accede a la información complementaria                                                                    |
| urlDescargaAdjuntos.parametros    | —                | —      | Parámetros de la URL con sus respectivos valores. Ejemplo: nombre:Andrea;edad:24                                           |
| wsEntregaEventos                  | —                | —      | Grupo de información utilizado para la recepción de eventos...                                                               |
| wsEntregaEventos.url              | String           | —      | Dirección del Web Service                                                                                                    |
| wsEntregaEventos.parametros       | String           | —      | Parámetros del Web Service con sus respectivos valores. Ejemplo: nombre:Andrea;edad:24                                     |

---

### 📌 Tipo de Identificación

| Nombre                              | Código |
|------------------------------------|--------|
| cédula de ciudadanía               | CC     |
| NIT                                | NI     |
| tarjeta de identidad               | TI     |
| Pasaporte                          | PA     |
| Tarjeta de extranjería             | TE     |
| Cédula de extranjería              | CE     |
| Registro civil de nacimiento       | RC     |
| Nit de otro país                   | NO     |
| NUIP                               | NU     |
| Carné diplomático                  | CD     |
| Salvonconducto                     | SC     |
| Permiso Especial de permanencia    | PE     |
| Certificado de nacido vivo         | CN     |
| Adulto sin identificar             | AS     |
| Menor sin identificar              | MS     |
| Documento extranjero               | DE     |
| Sin identificación                 | SI     |
| PEP                                | PE     |

---

### 📌 Responsabilidades Fiscales Cliente

| Nombre                                              | Código     |
|----------------------------------------------------|------------|
| Gran contribuyente                                 | O-13       |
| Autorretenedor                                     | O-15       |
| Agente de retención en el impuesto sobre las ventas| O-23       |
| Régimen de tributación - SIMPLE                    | O-47       |
| No responsable                                     | R-99-PN    |

---

### 📌 Responsabilidades Tributarias Cliente

| Nombre                              | Código       |
|------------------------------------|--------------|
| Impuesto al valor agregado         | IVA          |
| Impuesto Nacional al Consumo       | INC          |
| IVA + INC                          | IVA_E_INC    |
| No aplica                          | NO_APLICA    |

---

### 📌 Régimen Contable Cliente

| Nombre                                      | Código                   |
|--------------------------------------------|--------------------------|
| Responsable del impuesto sobre las ventas  | IMPUESTO_SOBRE_VENTAS    |
| No responsable de IVA                      | NO_RESPONSABLE_IVA       |

---

### 📌 Medios de Pago

| Nombre                                                                 | Código |
|------------------------------------------------------------------------|--------|
| Acuerdo mutuo                                                          | ZZZ    |
| Efectivo                                                               | 10     |
| Consignación bancaria                                                  | 42     |
| Tarjeta crédito                                                        | 30     |
| Tarjeta Débito                                                         | 49     |
| Bonos                                                                  | 71     |
| Bookentry Crédito                                                      | 15     |
| Bookentry Débito                                                       | 16     |
| Cheque                                                                 | 20     |
| Cheque bancario                                                        | 23     |
| Cheque certificado                                                     | 25     |
| Cheque Local                                                           | 26     |
| Cheque local transferible                                              | 92     |
| Clearing entre partners                                                | 97     |
| Clearing Nacional o Regional                                           | 9      |
| Concentración de la demanda en efectivo / Desembolso (CCD) débito     | 18     |
| Concentración de la demanda en efectivo / Desembolso Crédito (CCD)     | 17     |
| Concentración Efectivo / Desembolso Crédito plus (CCD+)                | 32     |
| Concentración efectivo / Desembolso Débito plus (CCD+)                 | 43     |
| Concentración Efectivo / Desembolso Débito plus (CCD+)                 | 33     |
| Concentración efectivo ahorros / Desembolso Crédito (CCD)              | 35     |
| Concentración efectivo ahorros / Desembolso Drédito (CCD)              | 36     |
| Concentración efectivo/Desembolso Crédito plus (CCD+)                  | 41     |
| Crédito ACH                                                            | 2      |
| Crédito Ahorro                                                         | 13     |
| Crédito de demanda ACH                                                 | 6      |
| Crédito Negocio Intercambio Corporativo (CTX)                          | 28     |
| Crédito Negocio Intercambio Corporativo (CTX)                          | 39     |
| Crédito Pago negocio corporativo (CTP)                                 | 19     |
| Débito ACH                                                             | 3      |
| Débito Ahorro                                                          | 14     |
| Débito de demanda ACH                                                  | 7      |
| Débito Negocio Intercambio Corporativo (CTX)                           | 40     |
| Débito Negocio Intercambio Corporativo (CTX)                           | 29     |
| Débito Pago Negocio Corporativo (CTP)                                  | 27     |
| Giro formato abierto                                                   | 95     |
| Giro referenciado                                                      | 93     |
| Giro urgente                                                           | 94     |
| Instrumento no definido                                                | 1      |
| Mantener                                                               | 8      |
| Método de pago solicitado no usado                                     | 96     |
| Nota bancaria transferible                                             | 91     |
| Nota cambiaria                                                         | 44     |
| Nota cambiaria esperando aceptación                                    | 24     |
| Nota promisoria                                                        | 60     |
| Nota promisoria firmada                                                | 66     |
| Nota promisoria firmada por el acreedor                                | 61     |
| Nota promisoria firmada por el acreedor, avalada por el banco          | 62     |
| Nota promisoria firmada por el acreedor, avalada por un tercero        | 63     |
| Nota promisoria firmada por el banco                                   | 64     |
| Nota promisoria firmada por un banco avalada por otro banco            | 65     |
| Nota promisoria firmada por un tercero avalada por un banco            | 67     |
| Pago comercial urgente                                                 | 52     |
| Pago Negocio Corporativo Ahorros Crédito (CTP)                         | 37     |
| Pago Negocio Corporativo Ahorros Débito (CTP)                          | 38     |
| Pago y depósito pre acordado (PPD)                                     | 34     |
| Postgiro                                                               | 50     |
| Proyecto bancario                                                      | 21     |
| Proyecto bancario certificado                                          | 22     |
| Retiro de nota por el acreedor                                         | 70     |
| Retiro de nota por el acreedor sobre un banco                          | 74     |
| Retiro de nota por el acreedor, avalada por otro banco                 | 75     |
| Retiro de nota por el acreedor, sobre un banco avalada por un tercero  | 76     |
| Retiro de una nota por el acreedor sobre un tercero                    | 77     |
| Retiro de una nota por el acreedor sobre un tercero avalada por un banco | 78   |
| Reversión Crédito Ahorro                                               | 11     |
| Reversión crédito de demanda ACH                                       | 5      |
| Reversión Débito Ahorro                                                | 12     |
| Reversión débito de demanda ACH                                        | 4      |
| Tarjeta Crédito                                                        | 48     |
| Tarjeta débito                                                         | 31     |
| Telex estándar bancario francés                                        | 51     |
| Transferencia Crédito Bancario                                         | 45     |
| Transferencia Débito Bancaria                                          | 47     |
| Transferencia Débito Interbancario                                     | 46     |
| Vales                                                                  | 72     |

---

### 📌 Formas de Pago

| Nombre   | Código |
|----------|--------|
| Contado  | 1      |
| Crédito  | 2      |

---

### 📌 Unidad

| Nombre                          | Código |
|---------------------------------|--------|
| Unidad / Pieza / Servicio       | 94     |
| Centímetro                      | CMT    |
| Metro                           | MTR    |
| Pulgada                         | INH    |
| Centímetro cuadrado             | CMK    |
| Metro cuadrado (m²)             | MTK    |
| Pulgada cuadrada                | INK    |
| Mililitro                       | MLT    |
| Litro                           | LTR    |
| Galón                           | A76    |
| Gramo                           | GGR    |
| Kilogramo                       | KGM    |
| Tonelada                        | 54     |
| Libra                           | LBR    |
| Centímetro Cúbico (cm³)         | CMQ    |
| Metro Cúbico                    | MTQ    |

---

### 📌 Código de Descuento

| Nombre                                             | Código |
|----------------------------------------------------|--------|
| Descuento por impuesto asumido                     | 00     |
| Pague uno lleve otro                               | 01     |
| Descuentos contractuales                           | 02     |
| Descuento por pronto pago                          | 03     |
| Envío gratis                                       | 04     |
| Descuentos específicos por inventarios             | 05     |
| Descuento por monto de compras                     | 06     |
| Descuento de temporada                             | 07     |
| Descuento por actualización de productos/servicios | 08     |
| Descuento general                                  | 09     |
| Descuento por volumen                              | 10     |
| Otro descuento                                     | 11     |

---

### 📌 Impuestos

| Descripción                        | Código                  |
|-----------------------------------|-------------------------|
| Excluido de impuesto              | EXCLUIDO                |
| Exento de impuesto                | EXENTO                  |
| Impuesto al consumo 4%            | IMPUESTO_CONSUMO_4      |
| Impuesto al consumo 8%            | IMPUESTO_CONSUMO_8      |
| Impuesto al consumo 16%           | IMPUESTO_CONSUMO_16     |
| IVA 19% + INC Bolsas              | BOLSA_IVA               |
| IVA 5%                            | IVA_5                   |
| IVA 19%                           | IVA_19                  |

---

### 📌 Naturaleza

| Código       | Descripción      |
|--------------|------------------|
| NATURALES    | Persona natural  |
| JURIDICAS    | Persona Jurídica |

---

### 📌 Ciudad

> Revisar el Excel con los datos de las ciudades.

---

### 📌 Retenciones

| Nombre                                                                 | Código |
|------------------------------------------------------------------------|--------|
| Arrendamiento de bienes inmuebles (declarantes)                        | 1      |
| Compras generales (declarantes)                                        | 3      |
| Compras generales (no declarantes)                                     | 4      |
| Honorarios y comisiones (no declarantes)                               | 5      |

