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


### Agregar múltiples impuestos

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