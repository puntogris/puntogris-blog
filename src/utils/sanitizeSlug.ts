export default function sanitizeSlug(slug: string): string {
  return slug.replaceAll(" ", "-");
}
