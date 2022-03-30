export function formatter(id: string, params?: { pattern: string }) {
  const _params = params || {};
  const json = { id, params: _params };

  return json;
}
