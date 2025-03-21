export const alphaToHex = (alphaDecimal: number) => {
  const alpha = alphaDecimal / 100

  // Calculate the equivalent alpha value in the range of 0 to 255
  const alphaInt = Math.round(alpha * 255)

  // Convert alphaInt to hexadecimal string
  const alphaHex = alphaInt.toString(16).toUpperCase()

  // Pad the hexadecimal value with leading zero if needed
  const paddedAlphaHex = alphaHex.padStart(2, '0')

  return paddedAlphaHex
}
