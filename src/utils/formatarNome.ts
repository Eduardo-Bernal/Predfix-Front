export function FormatarIconNome(nome: string) {
  return nome
    .trim()
    .split(" ")
    .map((letra) => letra[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
}