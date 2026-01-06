import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Zap, Cpu, Layers, Check, X, Box, Wifi, Gauge, 
  Settings, Terminal, Play, ChevronDown, Cloud, Disc, Triangle, 
  Share2, PenTool, Activity, MoveUpRight, Anchor, Minimize2, Battery,
  Quote, Grid, Wrench, ShieldCheck, Cpu as CpuIcon
} from 'lucide-react';
import { ImageCarousel } from '../components/ImageCarousel';

// Brand Data
const BRANDS = [
  { name: 'HexaCore', icon: Box },
  { name: 'Voltaic', icon: Zap },
  { name: 'Nebula Sys', icon: Cloud },
  { name: 'CyberDyne', icon: Cpu },
  { name: 'Orbit Robotics', icon: Disc },
  { name: 'Apex Logic', icon: Triangle },
  { name: 'Synapse AI', icon: Share2 },
  { name: 'Quantum', icon: Layers },
  { name: 'IronWorks', icon: PenTool },
  { name: 'Pulse Dynamics', icon: Activity },
  { name: 'Vector Labs', icon: MoveUpRight },
  { name: 'Titan Heavy', icon: Anchor },
  { name: 'NanoTech', icon: Minimize2 },
  { name: 'Echo Comms', icon: Wifi },
  { name: 'Flux Energy', icon: Battery },
];

export const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isPinoutModalOpen, setIsPinoutModalOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Pinout Modal Popup */}
      {isPinoutModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsPinoutModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
              <div className="flex items-center gap-2">
                <Cpu className="text-brand-500" size={20} />
                <h3 className="text-white font-bold">DarkLight Core v2 Technical Pinout</h3>
              </div>
              <button 
                onClick={() => setIsPinoutModalOpen(false)}
                className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-2 md:p-8 bg-gray-900 flex items-center justify-center min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1555664424-778a69022365?auto=format&fit=crop&q=100&w=1600" 
                alt="Detailed Hardware Schematic" 
                className="max-w-full h-auto rounded shadow-lg border border-gray-800"
              />
            </div>
            <div className="p-4 bg-gray-950 border-t border-gray-800 text-center">
              <p className="text-sm text-gray-400">High Resolution Reference Diagram - 3.3V Logic Levels Required</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-300 mb-6">
            <span>New: DarkLight Core v2.0 Released</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Precision, Speed, Control<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-500">
              Redefined.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            The ultimate platform to LEARN, BUILD and DEPLOY fast & deterministic 
            real-time embedded systems applications for the most 
            challenging environment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/learn" className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
              Start Learning <ArrowRight size={18} />
            </Link>
            <Link to="/community" className="w-full sm:w-auto px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg font-semibold transition-all">
              Download Resources
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>

      {/* Showcase Section with Image Carousel */}
      <section className="py-12 bg-gray-950 border-y border-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
             <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-4">Hardware Excellence</h2>
                <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                  Uhuru is the entry board in the DarkLight's development board line-up, the DarkLight Core features isn't just powerful—it's built to last. Experience the next level of embedded hardware.
                </p>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-start text-gray-300">
                        <div className="w-5 h-5 bg-brand-500/20 border border-brand-500 rounded flex items-center justify-center mr-3 shrink-0 mt-0.5">
                          <Check size={12} className="text-brand-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white">48MHz Arm Cortex M0 CPU</p>
                          <p className="text-xs text-gray-500">Maximum density for space-constrained industrial projects.</p>
                        </div>
                    </li>
                    <li className="flex items-start text-gray-300">
                         <div className="w-5 h-5 bg-brand-500/20 border border-brand-500 rounded flex items-center justify-center mr-3 shrink-0 mt-0.5">
                          <Check size={12} className="text-brand-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white">256 Kbytes Flash</p>
                          <p className="text-xs text-gray-500">Fast programming and native serial monitor support.</p>
                        </div>
                    </li>
                    <li className="flex items-start text-gray-300">
                         <div className="w-5 h-5 bg-brand-500/20 border border-brand-500 rounded flex items-center justify-center mr-3 shrink-0 mt-0.5">
                          <Check size={12} className="text-brand-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white">32 Kbytes SRAM</p>
                          <p className="text-xs text-gray-500">ENIG finish for reliable electrical contact and corrosion resistance.</p>
                        </div>
                    </li>
                    <li className="flex items-start text-gray-300">
                         <div className="w-5 h-5 bg-brand-500/20 border border-brand-500 rounded flex items-center justify-center mr-3 shrink-0 mt-0.5">
                          <Check size={12} className="text-brand-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white">48 Multiplexed I/O</p>
                          <p className="text-xs text-gray-500">Ultra-low noise LDO for precision analog performance.</p>
                        </div>
                    </li>
                    <li className="flex items-start text-gray-300">
                         <div className="w-5 h-5 bg-brand-500/20 border border-brand-500 rounded flex items-center justify-center mr-3 shrink-0 mt-0.5">
                          <Check size={12} className="text-brand-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white">2 SPI, 2 UART, 2 I2C</p>
                          <p className="text-xs text-gray-500">2 Independent Watchdog Timers</p>
                        </div>
                    </li>
                    <li className="flex items-start text-gray-300">
                         <div className="w-5 h-5 bg-brand-500/20 border border-brand-500 rounded flex items-center justify-center mr-3 shrink-0 mt-0.5">
                          <Check size={12} className="text-brand-400" />
                        </div>
                        <div>
                          <p className="font-bold text-white">16 Channel ADC</p>
                          <p className="text-xs text-gray-500">Advanced PWM Timer</p>
                        </div>
                    </li>
                </ul>
                <button 
                  onClick={() => setIsPinoutModalOpen(true)}
                  className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1 group focus:outline-none"
                >
                   View Interactive Pinout <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
             </div>
             
             {/* Carousel Container */}
             <div className="lg:w-1/2 h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 relative shadow-2xl">
                 <ImageCarousel />
             </div>
          </div>
        </div>
      </section>

      {/* Component Breakdown Section (HD Images) */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Engineered for Perfection</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Every square millimeter of the DarkLight Core is optimized for signal integrity, thermal performance, and longevity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                {/* Main Processor - Large Card */}
                <div className="lg:col-span-2 group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop"
                        alt="Core Processor Macro"
                        className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                         <h3 className="text-2xl font-bold text-white mb-2">120MHz Cortex-M4 Core</h3>
                         <p className="text-gray-300">The heart of the beast. Single-cycle DSP instructions, Floating Point Unit (FPU), and 1MB Flash memory.</p>
                    </div>
                </div>

                {/* Power Management */}
                <div className="group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
                     <img
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
                        alt="Power Regulation Components"
                        className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                         <h3 className="text-xl font-bold text-white mb-2">Ultra-Low Noise LDO</h3>
                         <p className="text-gray-300 text-sm">Clean 3.3V power delivery with &lt;10mV ripple for precision analog readings.</p>
                    </div>
                </div>

                {/* Connectivity */}
                <div className="group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
                     <img
                        src="https://images.unsplash.com/photo-1601057474415-4c0798150394?q=80&w=1974&auto=format&fit=crop"
                        alt="USB-C Connector"
                        className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                         <h3 className="text-xl font-bold text-white mb-2">USB-C Native</h3>
                         <p className="text-gray-300 text-sm">Reversible connector for programming, debugging, and serial monitoring.</p>
                    </div>
                </div>

                {/* GPIO Headers - Large Card (Span 2) */}
                <div className="lg:col-span-2 group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
                     <img
                        src="https://images.unsplash.com/photo-1555664424-778a69022365?q=80&w=2070&auto=format&fit=crop"
                        alt="Gold Plated Headers"
                        className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                         <h3 className="text-2xl font-bold text-white mb-2">Gold-Plated Contacts</h3>
                         <p className="text-gray-300">ENIG finish ensures corrosion resistance and reliable electrical contact for years of prototyping.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Why DarkLight Philosophy & Specs */}
      <section className="py-24 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why DarkLight?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              DarkLight is a complete ecosystem of development boards, libraries, and professional tooling that combines the industry’s most robust embedded technologies into a single, unified environment.
            </p>
          </div>

          {/* Core Philosophy Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-brand-500/40 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center mb-6 text-brand-400 group-hover:bg-brand-500/20">
                <Wrench size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Professional Build & Debug</h3>
              <p className="text-gray-400 leading-relaxed">
                Built on the power of <strong>SEGGER Embedded Studio</strong> and the J-Link debug ecosystem. DarkLight provides the depth, flexibility, and support you need to learn, build, and deploy high-performance embedded applications with confidence.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-brand-500/40 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-6 text-yellow-400 group-hover:bg-yellow-500/20">
                <Zap size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Truly Non-Blocking I/O</h3>
              <p className="text-gray-400 leading-relaxed">
                Our libraries are built on a <strong>non-blocking architecture</strong>. By leveraging DMA and asynchronous drivers, the CPU never stalls for peripherals. Communication runs in the background, freeing your processor for complex application logic.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-brand-500/40 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-500/20">
                <Layers size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Powerful & Transparent APIs</h3>
              <p className="text-gray-400 leading-relaxed">
                Get precise control over hardware with safe abstractions. Our naming conventions are explicit and easy to learn, allowing you to focus on high-level logic while we handle the low-level register nuances.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-gray-950/50 border border-gray-800 hover:border-brand-500/40 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500/20">
                <Terminal size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Unrestricted Coding</h3>
              <p className="text-gray-400 leading-relaxed">
                No monolithic setup loops or fragile code-generation boundaries. Mix high-level abstractions with direct register access whenever precision is required, maintaining total ownership of your source structure.
              </p>
            </div>

            {/* Feature 5 - Highlighted summary card */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-r from-brand-900/20 to-gray-950 border border-brand-500/20 group">
              <div className="flex flex-col md:flex-row items-center gap-8">
                 <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400 shrink-0">
                   <ShieldCheck size={32} />
                 </div>
                 <div>
                    <h3 className="text-white font-bold text-2xl mb-2">Prototype to Production</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Transition smoothly from experimental breadboards to production-ready systems using the same libraries, boards, and debuggers. Using professional-grade tooling from day one ensures your code is reliable and ready for industrial rigors.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4 text-left text-gray-500 font-medium">Feature</th>
                  <th className="p-4 text-left text-brand-400 font-bold text-lg bg-gray-800/50 rounded-t-lg">DarkLight Core v2</th>
                  <th className="p-4 text-left text-gray-400 font-medium">DarkLight Uhuru. 8-bit</th>
                  <th className="p-4 text-left text-gray-400 font-medium">DarkLight Ultra 32-bit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="p-4 text-white font-medium">Clock Speed</td>
                  <td className="p-4 text-brand-300 font-bold bg-gray-800/30">120 MHz</td>
                  <td className="p-4 text-gray-500">16 MHz</td>
                  <td className="p-4 text-gray-500">72 MHz</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">ADC Resolution</td>
                  <td className="p-4 text-brand-300 font-bold bg-gray-800/30">12-bit (4096 levels)</td>
                  <td className="p-4 text-gray-500">10-bit</td>
                  <td className="p-4 text-gray-500">12-bit</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Logic Level</td>
                  <td className="p-4 text-brand-300 font-bold bg-gray-800/30">3.3V (Modern)</td>
                  <td className="p-4 text-gray-500">5V (Legacy)</td>
                  <td className="p-4 text-gray-500">3.3V</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Digital I/O Pins</td>
                  <td className="p-4 text-brand-300 font-bold bg-gray-800/30">49</td>
                  <td className="p-4 text-gray-500">14</td>
                  <td className="p-4 text-gray-500">30-40</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-medium">Non-Blocking API</td>
                  <td className="p-4 text-brand-300 font-bold bg-gray-800/30">
                    <span className="flex items-center gap-2"><Check size={16} /> Native (Ticker)</span>
                  </td>
                  <td className="p-4 text-gray-500"><X size={16} /></td>
                  <td className="p-4 text-gray-500">RTOS Required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-gray-950/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 bg-brand-900/50 rounded-lg flex items-center justify-center mb-6 text-brand-400">
                <CpuIcon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Powerful I/O</h3>
              <p className="text-gray-400">
                49 Digital Pins, 18 PWM channels, and 16 Analog Inputs. 
                Complete control over your hardware environment.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Non-Blocking Core</h3>
              <p className="text-gray-400">
                Built-in Ticker class for lightweight scheduling. 
                Run concurrent tasks without freezing your main loop.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-brand-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6 text-purple-400">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Robust Comms</h3>
              <p className="text-gray-400">
                High-speed SPI up to 24MHz and dual independent UARTs 
                supporting up to 6 Mbps baud rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Expansion */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">DarkLight Ecosystem</h2>
              <p className="text-gray-400 max-w-xl">
                The Core is just the beginning. Expand your capabilities with our modular stackable shields.
              </p>
            </div>
            <Link to="/tools" className="hidden md:flex text-brand-400 hover:text-white items-center gap-2 text-sm font-semibold mt-4 md:mt-0">
               View Compatibility Guide <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-500/50 transition-all">
               <div className="h-32 bg-gray-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1563770095-39d468f95c83?auto=format&fit=crop&q=80&w=400" alt="WiFi Shield" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 right-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</div>
               </div>
               <div className="p-4">
                  <h4 className="text-white font-bold mb-1">Connect Shield</h4>
                  <p className="text-xs text-gray-500">WiFi 6 & BLE 5.0 Combo</p>
               </div>
            </div>

            <div className="group bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-500/50 transition-all">
               <div className="h-32 bg-gray-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1555664424-778a69022365?auto=format&fit=crop&q=80&w=400" alt="Motor Shield" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
               </div>
               <div className="p-4">
                  <h4 className="text-white font-bold mb-1">Drive Shield</h4>
                  <p className="text-xs text-gray-500">4-Channel Stepper/DC</p>
               </div>
            </div>

            <div className="group bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-500/50 transition-all">
               <div className="h-32 bg-gray-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400" alt="Display" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" />
               </div>
               <div className="p-4">
                  <h4 className="text-white font-bold mb-1">Vision Module</h4>
                  <p className="text-xs text-gray-500">2.4" OLED 128x64 SPI</p>
               </div>
            </div>

            <div className="group bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-500/50 transition-all flex flex-col items-center justify-center p-6 text-center">
               <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mb-3 group-hover:bg-gray-800">
                  <Grid className="text-gray-500" />
               </div>
               <h4 className="text-gray-400 font-bold text-sm">Custom Proto</h4>
               <p className="text-[10px] text-gray-600 mt-1">Design your own</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Testimonials Section */}
      <section className="py-24 bg-black border-y border-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Engineering Voices</h2>
            <p className="text-gray-400">Trusted by lead engineers for critical embedded applications.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl relative">
              <Quote className="absolute top-8 right-8 text-brand-900" size={48} />
              <p className="text-gray-300 mb-6 relative z-10 leading-relaxed">
                "The <span className="text-brand-400">Ticker</span> class changed how we approach prototyping. Being able to schedule 100Hz PID loops without blocking the main telemetry thread is a game changer for our drone stabilization units."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">S</div>
                <div>
                  <div className="text-white font-bold">Mark Cofie</div>
                  <div className="text-xs text-brand-500 uppercase tracking-wider">Lead Robotics Eng.</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl relative">
              <Quote className="absolute top-8 right-8 text-brand-900" size={48} />
              <p className="text-gray-300 mb-6 relative z-10 leading-relaxed">
                "Finally, a dev board with a noise floor low enough for serious audio work. The 12-bit ADC at 3.3V is incredibly clean compared to standard hobbyist boards. We use it for all our synth modules."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">M</div>
                <div>
                  <div className="text-white font-bold">Kwame Amoako</div>
                  <div className="text-xs text-brand-500 uppercase tracking-wider">Audio Systems Arch.</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl relative md:hidden lg:block">
              <Quote className="absolute top-8 right-8 text-brand-900" size={48} />
              <p className="text-gray-300 mb-6 relative z-10 leading-relaxed">
                "The documentation is actually readable. Clear examples for the UART packet structure saved our team weeks of debugging. DarkLight is now the standard for our industrial sensor nodes."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">D</div>
                <div>
                  <div className="text-white font-bold">Richard Mensah</div>
                  <div className="text-xs text-brand-500 uppercase tracking-wider">IoT Principal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="py-24 bg-gray-900 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Seamless Workflow</h2>
              <p className="text-gray-400">From concept to deployment in minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-800 via-brand-900 to-gray-800 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-950 border-2 border-gray-800 flex items-center justify-center mb-6 shadow-lg group hover:border-brand-500 transition-colors">
                      <Settings size={32} className="text-gray-400 group-hover:text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">1. Connect</h3>
                  <p className="text-sm text-gray-400 max-w-xs">Plug in via USB-C. No proprietary programmers needed. Drivers install automatically.</p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-950 border-2 border-gray-800 flex items-center justify-center mb-6 shadow-lg group hover:border-brand-500 transition-colors">
                      <Terminal size={32} className="text-gray-400 group-hover:text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">2. Develop</h3>
                  <p className="text-sm text-gray-400 max-w-xs">Write code in VS Code or CLion using our robust C++ SDK with intelligent autocomplete.</p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-24 h-24 rounded-full bg-gray-950 border-2 border-gray-800 flex items-center justify-center mb-6 shadow-lg group hover:border-brand-500 transition-colors">
                      <Play size={32} className="text-gray-400 group-hover:text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">3. Deploy</h3>
                  <p className="text-sm text-gray-400 max-w-xs">Drag and drop the compiled .bin file onto the virtual drive, or flash directly via CLI.</p>
              </div>
          </div>
        </div>
      </section>

      {/* Built With DarkLight (Community Showcase) */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
           <div>
             <h2 className="text-3xl font-bold text-white mb-2">Built With DarkLight</h2>
             <p className="text-gray-400">See what our community is building.</p>
           </div>
           <Link to="/community" className="hidden md:flex text-brand-400 hover:text-white items-center gap-2 text-sm font-semibold">
              View All Projects <ArrowRight size={16} />
           </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="group relative rounded-xl overflow-hidden aspect-video bg-gray-800 cursor-pointer">
             <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" alt="Robot" className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                   <Box size={14} className="text-brand-400" />
                   <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Robotics</span>
                </div>
                <h3 className="text-xl font-bold text-white">Hexapod Walker</h3>
             </div>
          </div>
          
          <div className="group relative rounded-xl overflow-hidden aspect-video bg-gray-800 cursor-pointer">
             <img src="https://images.unsplash.com/photo-1555664424-778a69022365?auto=format&fit=crop&q=80&w=800" alt="Dashboard" className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                   <Gauge size={14} className="text-purple-400" />
                   <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Industrial</span>
                </div>
                <h3 className="text-xl font-bold text-white">CAN Bus Logger</h3>
             </div>
          </div>
          
          <div className="group relative rounded-xl overflow-hidden aspect-video bg-gray-800 cursor-pointer">
             <img src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800" alt="Home Automation" className="object-cover w-full h-full opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                   <Wifi size={14} className="text-blue-400" />
                   <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">IoT</span>
                </div>
                <h3 className="text-xl font-bold text-white">Smart Plant Monitor</h3>
             </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-900/20 to-gray-900 border-t border-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Stay on the Bleeding Edge</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
             Join 15,000+ engineers receiving firmware updates, application notes, and early access to new hardware revisions.
          </p>
          {subscribed ? (
             <div className="animate-in fade-in zoom-in duration-300 bg-brand-500/10 border border-brand-500/50 rounded-lg px-6 py-4 max-w-md mx-auto">
                <p className="text-brand-300 font-semibold flex items-center justify-center gap-2">
                   <Check size={20} /> Thanks for subscribing!
                </p>
             </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-500 focus:outline-none" 
               />
               <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Subscribe
               </button>
            </form>
          )}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      </section>

      {/* Trusted Brands Carousel */}
      <section className="py-12 bg-gray-900 border-t border-gray-800 overflow-hidden">
        <div className="text-center mb-8">
           <p className="text-sm font-semibold text-brand-400 uppercase tracking-widest">Trusted By Engineering Teams At</p>
        </div>
        <div className="relative w-full flex overflow-hidden">
           {/* Gradient Masks */}
           <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-900 to-transparent"></div>
           <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-900 to-transparent"></div>
           
           {/* Scrolling Content */}
           <div className="flex animate-marquee whitespace-nowrap">
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                  <div key={i} className="mx-8 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default group">
                     <brand.icon size={28} className="text-gray-500 group-hover:text-brand-400 transition-colors" />
                     <span className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors">{brand.name}</span>
                  </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};