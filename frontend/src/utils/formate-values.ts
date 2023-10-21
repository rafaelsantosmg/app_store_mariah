export function formateValueUnitKg(value: number): number | string {
  const fvalue = value
  const numberToText = Number(fvalue.toString().split('.')[1])

  return numberToText > 0 ? fvalue.toFixed(3) : fvalue
}

export function formateValueInputNumeric(value: string) {
  const inputValue = value.replace(',', '.')
  const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
  if (sanitizedValue.split('.').length > 2) {
    return sanitizedValue.slice(0, -1)
  }
  let inputQuantity: string
  if (sanitizedValue.includes('.') && sanitizedValue.split('.')[1].length > 3) {
    inputQuantity = parseFloat(sanitizedValue).toFixed(3)
  } else {
    inputQuantity = sanitizedValue
  }
  return inputQuantity
}

export function formateValueInputNumericPrice(value: string) {
  const inputValue = value.replace(',', '.')
  const sanitizedValue = inputValue.replace(/[^0-9.]/g, '')
  if (sanitizedValue.split('.').length > 2) {
    return sanitizedValue.slice(0, -1)
  }
  let inputQuantity: string
  if (sanitizedValue.includes('.') && sanitizedValue.split('.')[1].length > 2) {
    inputQuantity = parseFloat(sanitizedValue).toFixed(2)
  } else {
    inputQuantity = sanitizedValue
  }
  return inputQuantity
}

export function formatedCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
