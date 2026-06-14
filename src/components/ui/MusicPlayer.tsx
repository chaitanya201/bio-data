import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazy-create a simple generated tone via Web Audio API (no external file needed)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startAmbience = () => {
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const gain = ctx.createGain();
      gain.gain.value = volume * 0.08;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      // Soft ambient drone – multiple detuned sine oscillators
      const freqs = [130.81, 196, 261.63, 329.63];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        osc.detune.value = i * 5;
        osc.connect(gain);
        osc.start();
        oscillatorsRef.current.push(osc);
      });
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopAmbience = () => {
    audioCtxRef.current?.suspend();
  };

  const toggle = () => {
    if (!playing) {
      startAmbience();
      setPlaying(true);
    } else {
      stopAmbience();
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume * 0.08;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(o => o.stop());
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-20 left-4 z-50"
    >
      <div className="glass rounded-2xl p-3 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              playing
                ? 'bg-amber-400 text-navy shadow-lg shadow-amber-400/30'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Equalizer bars */}
          {playing && (
            <div className="flex items-end gap-[2px] h-5">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-amber-400"
                  style={{ transformOrigin: 'bottom' }}
                  animate={{ scaleY: [0.2, 1, 0.3, 0.8, 0.2] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                  initial={{ scaleY: 0.2, height: 20 }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {playing ? <Volume2 size={14} /> : <Music size={14} />}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2"
            >
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <VolumeX size={12} className="text-gray-400" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  className="w-20 accent-amber-400"
                />
                <Volume2 size={12} className="text-gray-400" />
              </div>
              <p className="text-[10px] text-gray-500 mt-1 text-center">Ambient Drone</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
