export function parseAndBuildQuery(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const skip = (page - 1) * limit;
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const tag = searchParams.get("tag");

  return { page, limit, skip, search, category, tag, status };
}

export function applyCategoryTagFilters(
  items: any[],
  filters: {
    category?: string | null;
    tag?: string | null;
    status?: string | null;
  } = {}
) {
  let filtered = items;

  if (filters.category) {
    filtered = filtered.filter(
      (item) =>
        Array.isArray(item.categories) &&
        item.categories.includes(filters.category!)
    );
  }

  if (filters.tag) {
    filtered = filtered.filter(
      (item) => Array.isArray(item.tags) && item.tags.includes(filters.tag!)
    );
  }

  if (filters.status) {
    filtered = filtered.filter((item) =>
      filters.status === "Actived"
        ? item.status === true
        : item.status === false
    );
  }

  return filtered;
}
