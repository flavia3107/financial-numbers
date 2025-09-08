const suffixMultipliers: { [key: string]: number } = {
  k: 1_000,
  m: 1_000_000,
  b: 1_000_000_000,
};

export function isValidNumberWithSuffix(value: string): boolean {
  if (!value) return false;

  value = value.toLowerCase().trim();
  const cleanValue = value.replace(/,/g, '');
  const suffixKeys = Object.keys(suffixMultipliers).join('|');
  const regex = new RegExp(`^(\\d+(?:\\.\\d+)?)(?:(${suffixKeys}))?$`, 'i');
  const match = cleanValue.match(regex);

  if (!match || !match[1]) return false;

  const numberPart = parseFloat(match[1]);
  if (isNaN(numberPart)) return false;

  return true;
}

export function convertShorthandToNumber(value: string): number | null {
  if (!value || !isValidNumberWithSuffix(value)) {
    return null;
  }

  value = value.toLowerCase().trim();
  const cleanValue = value.replace(/,/g, '');
  const suffixKeys = Object.keys(suffixMultipliers).join('|');
  const regex = new RegExp(`^(\\d+(?:\\.\\d+)?)(?:(${suffixKeys}))?$`, 'i');

  const match = cleanValue.match(regex);
  if (!match) {
    return null;
  }

  const numberPart = parseFloat(match[1]);
  const suffix = match[2];

  if (isNaN(numberPart)) {
    return null;
  }

  const multiplier = suffix ? suffixMultipliers[suffix] : 1;
  return numberPart * multiplier;
}