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

# Documentación adicional
| Nombre del campo | Formato | Tamaño | Descripción |
|------------------|---------|--------|-------------|
| nit | Alfanumérico | 100 | Hace referencia del NIT de la empresa. |
| numeroDocumentoComercial | numérico | 100 | Numero de la nota crédito |
| fechaGeneracion | String | 100 | Fecha de generación del documento electrónico (Formato: yyyy-MM-ddThh:mm:ss) |
| fechaVencimiento | String | 100 | Fecha de vencimiento del documento electrónico(Formato: yyyy-MM-ddThh:mm:ss) |
| numeroFacturaAsociada | String | 100 | Numero de la factura asociada a la nota crédito. |
| tipo | String | 100 | Código de la DIAN que identifica el Tipo de la nota crédito, puede ser de tipo DEVOLUCION_BIENES o ANULACION |
| mediosPago | Alfanumérico | 100 | Códigos de la DIAN de los medios de pago con los que se pagó el documento electrónico, dichos códigos van separados por coma. revisar tabla **medios de pago** |
| Observación | Alfanumérico | 100 | Observación. |
| formaPago | numérico | 100 | Código de la DIAN asociado a la forma de pago del documento electrónico. revisar tabla**formaPago** |
| total | numérico | 100 | Valor total del documento electrónico. |
| cliente |  |  | Datos del Cliente del documento electrónico |
| cliente.nombreRazonSocial | Alfanumérico | 100 | Cliente: Razón social o Nombre |
| cliente.tipoIdentificacion | Alfanumérico | 100 | Codigo del tipo de identificación, vease la lista **tipo de identificación**. |
| cliente.numIdentificacion | númerico | 100 | Número de identificación de cliente |
| cliente.naturaleza | String | 100 | Naturaleza del cliente Juridica o Natural revisar tabla **Naturaleza** |
| cliente.direccion | Alfanumérico | 100 | Dirección Cliente |
| cliente.ciudad | numérico | 100 | Identificador de la ciudad del cliente, si la factura a la que se hace la nota es de tipo exportación. De lo contrario, enviar código DANE de la ciudad, véase **la tabla ciudad** |
| cliente.telefono | numérico | 100 | Telefono del cliente |
| cliente.email | Alfanumérico | 100 | correo Electronico |
| cliente.responsabilidadesFiscales | Alfanumérico | 100 | Código de responsabilidades fiscales, véase tabla **Responsabilidades fiscales cliente** |
| cliente.respTributarias | Alfanumérico | 100 | Código de responsabilidades tributarias, véase tabla **Valores para Responsabilidades tributarias cliente** |
| items | Array [] |  | Lineas de la Nota Credito. |
| items.nombreItemVenta | Alfanumérico | 100 | Nombre del producto vendido |
| items.precioVentaUnitario | numérico | 100 | Precio de venta unitario del producto |
| items.precioBaseUnitario | numérico | 100 | Precio base unitario del producto. Este atributo remplaza a items.precioVentaUnitario en caso que desee que los cálculos del item se hagan a partir del precio base y no a partir del precio con impuesto. |
| items.precioReferencia | numérico | 100 | Precio de referencia del producto cuando éste se considera un regalo, es decir, su precio resultante es igual a cero. Este campo es obligatorio si items.descuentoPorcentaje = 100 o si items.precioVentaUnitario = 0 o items.precioBaseUnitario = 0 |
| items.cantidad | numérico | 100 | Cantidad vendida del item |
| items.impuesto | ImpuestoEnum | 100 | Impuesto aplicado, revisar tabla **ImpuestoEnum** |
| items.codigo | Alfanumérico | 100 | Código del producto vendido. |
| items.unidad | Alfanumérico | 100 | código de la DIAN de la Unidad del producto. REVISAR tabla **unidad** |
| items.codigoDescuento | Alfanuméricos | 100 | Código de la dian del tipo de descuento aplicado al item. |
| items.descuentoPorcentaje | numérico | 100 | porcentaje de descuento aplicado al item |
| items.observacion | Alfanumérico | 100 | Observación del item |

