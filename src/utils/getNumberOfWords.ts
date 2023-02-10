export default function numberOfWords(content: string) {
  const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
  const words = clean.split(/\s/g).filter((str) => str !== "");
  return words.length;
}
