export function formatPopulation(num: number | undefined): string {
  if (num === undefined || isNaN(num)) return "Noma'lum";
  return new Intl.NumberFormat("uz-UZ").format(num);
}

export function formatArea(area: number | undefined): string {
  if (area === undefined || isNaN(area)) return "Noma'lum";
  return new Intl.NumberFormat("uz-UZ").format(area) + " km²";
}

export function listLanguages(languages?: { [key: string]: string }): string {
  if (!languages || Object.keys(languages).length === 0) return "Noma'lum";
  return Object.values(languages).join(", ");
}

export function listCurrencies(currencies?: { [key: string]: { name: string; symbol?: string } }): string {
  if (!currencies || Object.keys(currencies).length === 0) return "Noma'lum";
  return Object.values(currencies)
    .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`)
    .join(", ");
}

export function listCapitals(capital?: string[]): string {
  if (!capital || capital.length === 0) return "Noma'lum";
  return capital.join(", ");
}
