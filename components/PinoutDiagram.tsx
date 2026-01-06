import React, { useState } from 'react';
import { Zap, Activity, Radio, Cpu, Info, Minimize2 } from 'lucide-react';

interface PinData {
  id: number;
  name: string;
  capabilities: string[];
  description: string;
}

// Generate 49 pins with simulated specific capabilities matching DarkLight specs
// 0-15: Port A (ADC capable)
// 16-33: Port B (PWM capable)
// 34-48: Port C (General Digital/Interrupt)
const generatePins = (): PinData[] => {
  return Array.from({ length: 49 }, (_, i) => {
    const caps = ['DigitalIn', 'DigitalOut'];
    let port = 'A';
    let pinNum = i;
    let desc = "General Purpose I/O";

    if (i < 16) {
      port = 'A';
      caps.push('AnalogIn');
      desc = "High-precision Analog Input (ADC) enabled pin.";
    } else if (i < 34) {
      port = 'B';
      pinNum = i - 16;
      caps.push('PwmOut');
      caps.push('InterruptIn'); // Overlapping interrupt capability
      desc = "PWM capable pin for motor control or signal generation.";
    } else {
      port = 'C';
      pinNum = i - 34;
      caps.push('InterruptIn');
      desc = "Digital I/O with hardware interrupt capability.";
    }

    return {
      id: i + 1,
      name: `PT${port}${pinNum}`,
      capabilities: caps,
      description: desc
    };
  });
};

const PINS = generatePins();

export const PinoutDiagram: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<PinData | null>(null);

  const renderPin = (pin: PinData) => {
    const isSelected = selectedPin?.id === pin.id;
    const isPWM = pin.capabilities.includes('PwmOut');
    const isADC = pin.capabilities.includes('AnalogIn');

    // Color coding based on primary capability
    let pinColor = "bg-gray-700 hover:bg-gray-600";
    if (isPWM) pinColor = "bg-purple-900/80 hover:bg-purple-800 border-purple-500/50";
    else if (isADC) pinColor = "bg-blue-900/80 hover:bg-blue-800 border-blue-500/50";
    
    if (isSelected) pinColor = "bg-brand-600 border-brand-400 ring-2 ring-brand-400/50";

    return (
      <button
        key={pin.id}
        onClick={() => setSelectedPin(pin)}
        className={`w-10 h-10 md:w-12 md:h-12 rounded flex items-center justify-center text-[10px] md:text-xs font-mono font-bold transition-all border border-transparent ${pinColor} text-white relative group`}
        title={`${pin.name} - Click for details`}
      >
        {pin.id}
        {isSelected && (
           <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
        )}
      </button>
    );
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Visual Board Representation */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-gray-400 mb-4 text-sm flex gap-4">
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-900 rounded border border-blue-500/50"></div> Analog (ADC)</div>
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-900 rounded border border-purple-500/50"></div> PWM</div>
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-700 rounded border border-gray-600"></div> Digital I/O</div>
          </div>

          <div className="relative bg-gray-950 rounded-2xl border-2 border-gray-800 p-4 md:p-8 shadow-inner max-w-2xl w-full">
            {/* Chip Label */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <Cpu size={200} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <h3 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-widest">DARKLIGHT</h3>
                <span className="text-gray-800 font-mono">DL-CORE-V2</span>
            </div>

            {/* Pins Grid - Simulating a board layout */}
            <div className="relative z-10 flex justify-between gap-8 md:gap-16">
              {/* Left Bank */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {PINS.slice(0, 25).map(renderPin)}
              </div>
              
              {/* Right Bank */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {PINS.slice(25, 49).map(renderPin)}
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:w-80 bg-gray-800/50 rounded-xl border border-gray-700 p-6 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Info size={20} className="text-brand-400" />
            Pin Details
          </h3>
          
          {selectedPin ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                <span className="text-5xl font-mono font-bold text-brand-500">{selectedPin.name}</span>
                <span className="block text-gray-500 text-sm mt-1">Physical Pin: {selectedPin.id}</span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Capabilities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPin.capabilities.map(cap => (
                    <span key={cap} className="px-2 py-1 bg-gray-700 rounded text-xs text-white border border-gray-600 flex items-center gap-1">
                      {cap === 'PwmOut' && <Zap size={10} className="text-yellow-400" />}
                      {cap === 'AnalogIn' && <Activity size={10} className="text-blue-400" />}
                      {cap === 'InterruptIn' && <Radio size={10} className="text-red-400" />}
                      {cap === 'DigitalOut' && <Minimize2 size={10} className="text-green-400" />}
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {selectedPin.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 space-y-4 min-h-[200px]">
              <Cpu size={48} className="opacity-20" />
              <p>Select a pin on the board diagram to view its specific configuration and hardware capabilities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};