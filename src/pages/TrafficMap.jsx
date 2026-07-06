import { motion } from 'framer-motion';
import { LocateFixed, Route, Shuffle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import DelhiGraph from '../components/DelhiGraph';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import StatPill from '../components/StatPill';
import { api } from '../services/api';
import { findShortestPath } from '../utils/graph';

export default function TrafficMap() {
  const [traffic, setTraffic] = useState(null);
  const [source, setSource] = useState('Central Delhi');
  const [destination, setDestination] = useState('South Delhi');
  const [selectedPath, setSelectedPath] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTraffic().then(setTraffic).finally(() => setLoading(false));
  }, []);

  const districtOptions = traffic?.districts || [];
  const roadStats = useMemo(() => {
    if (!traffic) return [];
    return ['LOW', 'NORMAL', 'HIGH'].map((level) => ({
      label: level,
      value: traffic.roads.filter((road) => road.traffic === level).length,
    }));
  }, [traffic]);

  function handleFindPath() {
    if (!source || !destination) {
      toast.error('Choose both source and destination.');
      return;
    }
    if (source === destination) {
      toast.error('Source and destination must be different.');
      return;
    }
    const path = findShortestPath(source, destination);
    if (!path) {
      toast.error('No route exists for those districts.');
      return;
    }
    setSelectedPath(path);
    toast.success('Shortest route highlighted.');
  }

  function handleNodeClick(nodeId) {
    if (!source || (source && destination)) {
      setSource(nodeId);
      setDestination('');
      setSelectedPath(null);
    } else {
      setDestination(nodeId);
    }
  }

  if (loading) return <LoadingSpinner label="Fetching traffic map" />;

  return (
    <>
      <PageHeader eyebrow="Traffic Map" title="Live-feeling Delhi road graph">
        Select source and destination districts to highlight the shortest path. Road colors reflect traffic intensity.
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <section className="panel p-5">
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="field-label">Source district</span>
              <select className="input" value={source} onChange={(event) => setSource(event.target.value)}>
                {districtOptions.map((district) => <option key={district}>{district}</option>)}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="field-label">Destination district</span>
              <select className="input" value={destination} onChange={(event) => setDestination(event.target.value)}>
                <option value="">Select destination</option>
                {districtOptions.map((district) => <option key={district}>{district}</option>)}
              </select>
            </label>
            <button className="primary-button" onClick={handleFindPath}>
              <Route size={18} />
              Find shortest path
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                const shuffled = [...districtOptions].sort(() => Math.random() - 0.5);
                setSource(shuffled[0]);
                setDestination(shuffled[1]);
                setSelectedPath(null);
              }}
            >
              <Shuffle size={18} />
              Random pair
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {roadStats.map((stat) => <StatPill key={stat.label} label={stat.label} value={stat.value} />)}
          </div>

          {selectedPath && (
            <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-[8px] bg-skyglass-50 p-4 dark:bg-slate-950">
              <div className="mb-3 flex items-center gap-2 font-black text-skyglass-800 dark:text-skyglass-200">
                <LocateFixed size={18} />
                Recommended route
              </div>
              <p className="text-sm font-bold leading-6 text-slate-700 dark:text-slate-200">{selectedPath.path.join(' -> ')}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <StatPill label="Distance" value={`${selectedPath.distance} km`} />
                <StatPill label="Time" value={`${selectedPath.time} hrs`} />
              </div>
            </motion.div>
          )}
        </section>

        <section className="panel p-3">
          <div className="mb-3 flex flex-wrap gap-3 px-2 pt-2 text-xs font-black">
            <span className="text-green-600">LOW</span>
            <span className="text-amber-600">NORMAL</span>
            <span className="text-red-600">HIGH</span>
            <span className="text-skyglass-700 dark:text-skyglass-300">Blue = shortest path</span>
          </div>
          <DelhiGraph districts={traffic.districts} roads={traffic.roads} selectedPath={selectedPath} onNodeClick={handleNodeClick} />
        </section>
      </div>
    </>
  );
}
