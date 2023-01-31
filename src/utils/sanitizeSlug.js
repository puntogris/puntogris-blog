export default function sanitizeSlug(slug) {
  return slug.replaceAll(" ", "-");
}
