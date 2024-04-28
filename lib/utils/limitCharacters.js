export function limitCharacters(string = "", limit = 0) {
  const elipsis = string?.substring(0, limit).length >= limit ? "..." : "";

  return string ? string.substring(0, limit) + elipsis : null;
}
