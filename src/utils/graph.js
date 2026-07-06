import { districts, roads } from '../data/tripData';

export function findShortestPath(source, destination) {
  if (!source || !destination || source === destination) return null;

  const distances = Object.fromEntries(districts.map((district) => [district, Infinity]));
  const previous = Object.fromEntries(districts.map((district) => [district, null]));
  const unvisited = new Set(districts);
  distances[source] = 0;

  while (unvisited.size) {
    const current = [...unvisited].sort((a, b) => distances[a] - distances[b])[0];
    if (!current || distances[current] === Infinity) break;
    unvisited.delete(current);
    if (current === destination) break;

    roads
      .filter((road) => road.source === current || road.target === current)
      .forEach((road) => {
        const neighbor = road.source === current ? road.target : road.source;
        if (!unvisited.has(neighbor)) return;
        const nextDistance = distances[current] + road.distance;
        if (nextDistance < distances[neighbor]) {
          distances[neighbor] = nextDistance;
          previous[neighbor] = current;
        }
      });
  }

  if (!Number.isFinite(distances[destination])) return null;

  const path = [];
  for (let at = destination; at; at = previous[at]) path.unshift(at);
  const segments = path.slice(0, -1).map((node, index) => {
    const next = path[index + 1];
    return roads.find((road) => (road.source === node && road.target === next) || (road.source === next && road.target === node));
  });

  return {
    path,
    distance: distances[destination],
    time: Number(segments.reduce((sum, road) => sum + road.time, 0).toFixed(2)),
    segments,
  };
}

export function edgeKey(source, target) {
  return [source, target].sort().join('__');
}
