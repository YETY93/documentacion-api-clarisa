
export const codeExamples = {
  curl: `curl -X POST https://api.clarisa.co/v1/factura/nacional \
  -H "Content-Type: application/json" \
  -d '{
    "nit": "12345",
    "numeroResolucion": "18760000001",
    "consecutivoDcto": "990000001",
    "prefijoDcto": "SETP",
    "fechaVencimiento": "2024-05-24",
    "formaPago": "1",
    "mediosPago": ["10", "30"],
    "total": "119000.0",
    "cliente": {
      "nombreRazonSocial": "CONSUMIDOR FINAL",
      "tipoIdentificacion": "NI",
      "numIdentificacion": "222222222222",
      "naturaleza": "NATURAL"
    },
    "items": [{
      "codigo": "TC1",
      "nombreItem": "Botella Cocacola 2.5 lt",
      "precioBaseUnitario": 10000,
      "cantidad": 10,
      "unidad": "94",
      "impuestos": [{
        "tipo": "IVA",
        "claseImpuesto": "PO",
        "tarifaTributo": 19
      }]
    }]
  }'`,
  javascript: `import fetch from 'node-fetch';

const url = 'https://api.clarisa.co/v1/factura/nacional';
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    nit: '12345',
    numeroResolucion: '18760000001',
    // ... (resto del cuerpo del JSON)
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`,
  python: `import requests
import json

url = "https://api.clarisa.co/v1/factura/nacional"

payload = {
    "nit": "12345",
    "numeroResolucion": "18760000001",
    # ... (resto del cuerpo del JSON)
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, data=json.dumps(payload), headers=headers)

print(response.json())`
};

export const tabsData = [
  { id: 'curl', label: 'cURL', lang: 'bash' },
  { id: 'javascript', label: 'JavaScript', lang: 'javascript' },
  { id: 'python', label: 'Python', lang: 'python' },
];

export const exampleResponse = {
  "status": "success",
  "message": "Factura creada exitosamente.",
  "cufe": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "transactionID": "xyz-123-abc-456"
};
