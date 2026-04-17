export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

export function calculateAverage(values: number[]) {
  if (values.length === 0) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return Number((total / values.length).toFixed(2));
}

export function groupByWeek<T extends { created_at: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const date = new Date(item.created_at);
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() - date.getDay());
    const key = firstDay.toISOString().split("T")[0];
    groups[key] = groups[key] ? [...groups[key], item] : [item];
    return groups;
  }, {});
}
