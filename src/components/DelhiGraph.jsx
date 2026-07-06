import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import { edgeKey } from '../utils/graph';

const trafficColor = {
  LOW: '#16a34a',
  NORMAL: '#f59e0b',
  HIGH: '#ef4444',
};

export default function DelhiGraph({ districts, roads, selectedPath, onNodeClick }) {
  const svgRef = useRef(null);
  const innerRef = useRef(null);
  const [hoveredRoad, setHoveredRoad] = useState(null);
  const selectedEdges = new Set(selectedPath?.segments?.map((road) => edgeKey(road.source, road.target)) || []);
  const selectedNodes = new Set(selectedPath?.path || []);

  const positions = useMemo(() => {
    const points = [
      [390, 260],
      [595, 245],
      [430, 410],
      [170, 145],
      [275, 150],
      [120, 360],
      [435, 115],
      [580, 530],
      [610, 390],
      [260, 555],
      [185, 430],
    ];
    return Object.fromEntries(districts.map((district, index) => [district, { x: points[index][0], y: points[index][1] }]));
  }, [districts]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const inner = d3.select(innerRef.current);
    const zoom = d3.zoom().scaleExtent([0.75, 2.2]).on('zoom', () => {
      inner.attr('transform', d3.event.transform);
    });
    svg.call(zoom);
    return () => svg.on('.zoom', null);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[8px] border border-skyglass-100 bg-white/90 dark:border-slate-700 dark:bg-slate-900/90">
      <svg ref={svgRef} viewBox="0 0 760 640" className="h-[580px] w-full touch-none">
        <defs>
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g ref={innerRef}>
          {roads.map((road) => {
            const from = positions[road.source];
            const to = positions[road.target];
            const active = selectedEdges.has(edgeKey(road.source, road.target));
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            return (
              <g key={edgeKey(road.source, road.target)} onMouseEnter={() => setHoveredRoad(road)} onMouseLeave={() => setHoveredRoad(null)}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={active ? 'animate-pulse' : ''}
                  stroke={active ? '#0ea5e9' : trafficColor[road.traffic]}
                  strokeWidth={active ? 7 : 4}
                  strokeLinecap="round"
                  opacity={active ? 1 : 0.72}
                  filter={active ? 'url(#pathGlow)' : undefined}
                />
                <text x={midX} y={midY - 8} textAnchor="middle" className="pointer-events-none fill-slate-700 text-[11px] font-black dark:fill-slate-100">
                  {road.distance}km | {road.traffic}
                </text>
              </g>
            );
          })}

          {districts.map((district) => {
            const point = positions[district];
            const active = selectedNodes.has(district);
            return (
              <g key={district} className="cursor-pointer transition" onClick={() => onNodeClick(district)}>
                <circle cx={point.x} cy={point.y} r={active ? 25 : 21} fill={active ? '#0284c7' : '#e0f2fe'} stroke="#0284c7" strokeWidth="3" className="transition hover:brightness-105" />
                <text x={point.x} y={point.y + 42} textAnchor="middle" className="pointer-events-none fill-slate-800 text-[12px] font-black dark:fill-white">
                  {district.replace(' Delhi', '')}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      {hoveredRoad && (
        <div className="absolute bottom-4 left-4 rounded-[8px] border border-skyglass-100 bg-white/95 p-4 text-sm font-bold shadow-lift dark:border-slate-700 dark:bg-slate-950/95">
          <p className="font-black text-skyglass-800 dark:text-skyglass-200">{hoveredRoad.source} to {hoveredRoad.target}</p>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{hoveredRoad.distance} km, {hoveredRoad.time} hrs, {hoveredRoad.traffic} traffic</p>
        </div>
      )}
    </div>
  );
}
