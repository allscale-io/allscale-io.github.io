// Taxonomy in fixed order — matters for filter UI rendering.
export const TAXONOMY = {
  surface:  ['WordPress', 'Telegram', 'POS hardware', 'AI agents / Claude Code', 'Solana', 'Web/API', 'Shopify'],
  audience: ['Merchants', 'Developers', 'POS resellers', 'Payment companies', 'Creators', 'AI agents'],
  type:     ['Plugin', 'SaaS', 'White-label', 'Open source', 'Skill / agent tool', 'Demo'],
  status:   ['Live', 'Beta', 'Experiment'],
  built_by: ['AllScale', 'Community', 'Partner'],
};

export function emptyFilters() {
  return {
    surface: new Set(),
    audience: new Set(),
    type: new Set(),
    status: new Set(),
    built_by: new Set(),
  };
}

export function totalSelected(filters) {
  return Object.values(filters).reduce((n, s) => n + s.size, 0);
}

export function matchEntry(entry, filters, search) {
  for (const key of ['surface', 'audience', 'type']) {
    const sel = filters[key];
    if (sel && sel.size > 0) {
      const any = entry[key].some((v) => sel.has(v));
      if (!any) return false;
    }
  }
  for (const key of ['status', 'built_by']) {
    const sel = filters[key];
    if (sel && sel.size > 0 && !sel.has(entry[key])) return false;
  }
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    const hay = (entry.name + ' ' + entry.one_liner + ' ' + entry.long_description).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export function sortEntries(list, mode) {
  const copy = list.slice();
  if (mode === 'newest') {
    copy.sort((a, b) => (b.launch_date || '').localeCompare(a.launch_date || ''));
  } else if (mode === 'az') {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    copy.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (a.sort_order || 0) - (b.sort_order || 0);
    });
  }
  return copy;
}
