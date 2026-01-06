import React, { useState, useEffect } from 'react';
import { CodeBlock } from './CodeBlock';
import { Settings, RefreshCw, Layers } from 'lucide-react';

type ComponentType = 'DigitalOut' | 'DigitalIn' | 'PwmOut' | 'AnalogIn' | 'Ticker' | 'InterruptIn';

export const CodeGenerator: React.FC = () => {
  const [type, setType] = useState<ComponentType>('DigitalOut');
  const [pin, setPin] = useState('PTA0');
  const [variableName, setVariableName] = useState('myDevice');
  const [extraParam, setExtraParam] = useState('0.5'); // Used for period, interval, etc.
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    generate();
  }, [type, pin, variableName, extraParam]);

  const generate = () => {
    const includes = `#include "DarkLight.h"`;
    let setup = '';
    let loop = '';
    let globals = '';
    let functions = '';

    switch (type) {
      case 'DigitalOut':
        globals = `DigitalOut ${variableName}(${pin});`;
        loop = `    ${variableName}.write(1); // Set High (3.3V)\n    wait_ms(500);\n    ${variableName}.write(0); // Set Low (0V)\n    wait_ms(500);`;
        break;
      case 'DigitalIn':
        globals = `DigitalIn ${variableName}(${pin});`;
        setup = `    ${variableName}.mode(PullUp); // Internal pull-up resistor`;
        loop = `    int state = ${variableName}.read();\n    if(state) {\n        // Pin is High\n    }`;
        break;
      case 'PwmOut':
        globals = `PwmOut ${variableName}(${pin});`;
        setup = `    ${variableName}.period(0.020); // 20ms period`;
        loop = `    ${variableName}.write(${extraParam}); // ${parseFloat(extraParam) * 100}% Duty Cycle\n    wait_ms(100);`;
        break;
      case 'AnalogIn':
        globals = `AnalogIn ${variableName}(${pin});`;
        loop = `    float val = ${variableName}.read(); // 0.0 - 1.0\n    float volts = val * 3.3;\n    wait_ms(100);`;
        break;
      case 'Ticker':
        globals = `Ticker ${variableName};\nDigitalOut led(LED1);`;
        functions = `void blink_callback() {\n    led = !led;\n}`;
        setup = `    // Call callback every ${extraParam} seconds\n    ${variableName}.attach(&blink_callback, ${extraParam});`;
        loop = `    // Main loop runs freely\n    wait_ms(1000);`;
        break;
      case 'InterruptIn':
        globals = `InterruptIn ${variableName}(${pin});\nvolatile bool triggered = false;`;
        functions = `void isr_handler() {\n    triggered = true;\n}`;
        setup = `    ${variableName}.rise(&isr_handler); // Trigger on rising edge`;
        loop = `    if(triggered) {\n        printf("Interrupt Fired!\\n");\n        triggered = false;\n    }`;
        break;
    }

    const code = `${includes}\n\n${globals}\n${functions ? '\n' + functions + '\n' : ''}\nint main() {\n${setup ? setup + '\n\n' : ''}    while(1) {\n${loop}\n    }\n}`;
    setGeneratedCode(code);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Configuration Panel */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 h-fit">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Settings size={20} className="text-brand-400" />
          Configuration
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Function / Class</label>
            <div className="grid grid-cols-2 gap-2">
              {(['DigitalOut', 'DigitalIn', 'PwmOut', 'AnalogIn', 'Ticker', 'InterruptIn'] as ComponentType[]).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors text-left flex items-center gap-2 ${
                    type === t ? 'bg-brand-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {type === t && <Layers size={14} />}
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Object Name</label>
                <input 
                  type="text" 
                  value={variableName}
                  onChange={(e) => setVariableName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
                />
             </div>
             
             {type !== 'Ticker' && (
               <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Pin Name</label>
                  <select 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
                  >
                    <option value="PTA0">PTA0</option>
                    <option value="PTA5">PTA5</option>
                    <option value="PTB2">PTB2</option>
                    <option value="PTC10">PTC10</option>
                    <option value="LED1">LED1</option>
                    <option value="LED_BUILTIN">LED_BUILTIN</option>
                  </select>
               </div>
             )}
          </div>

          {(type === 'PwmOut' || type === 'Ticker') && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                {type === 'PwmOut' ? 'Duty Cycle (0.0 - 1.0)' : 'Interval (seconds)'}
              </label>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max={type === 'PwmOut' ? "1" : "100"}
                value={extraParam}
                onChange={(e) => setExtraParam(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          )}
          
          <button 
             onClick={generate}
             className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors mt-4"
          >
             <RefreshCw size={16} /> Regenerate
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-lg font-semibold text-gray-300">Generated Snippet</h3>
           <span className="text-xs text-gray-500">main.cpp</span>
        </div>
        <div className="h-full">
           <CodeBlock code={generatedCode} language="cpp" />
           <p className="text-sm text-gray-500 mt-2">
             Copy this code directly into your main project file. Ensure you have the DarkLight library linked in your build system.
           </p>
        </div>
      </div>
    </div>
  );
};