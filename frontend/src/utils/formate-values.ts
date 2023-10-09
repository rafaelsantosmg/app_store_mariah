export const formateValueUnitKg = (value: number): number | string => {
  const fvalue = value / 1000
  const numberToText = Number(fvalue.toString().split('.')[1])

  console.log(numberToText > 0 ? Number(fvalue.toFixed(3)) : fvalue)
  return numberToText > 0 ? fvalue.toFixed(3) : fvalue
}
