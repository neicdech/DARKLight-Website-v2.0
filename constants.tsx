import React from 'react';
import { DocSection } from './types';
import { CodeBlock } from './components/CodeBlock';

// Helper to render section headers
const H2 = ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold text-brand-400 mt-8 mb-4 border-b border-gray-700 pb-2">{children}</h2>;
const H3 = ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3">{children}</h3>;
const P = ({ children }: { children?: React.ReactNode }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>;
const UL = ({ children }: { children?: React.ReactNode }) => <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">{children}</ul>;

export const DOC_DATA: DocSection[] = [
  {
    id: 'intro',
    title: 'Introduction & Terminology',
    category: 'Getting Started',
    keywords: ['voltage', 'logic', '3.3v', 'terminology', 'setup', 'darklight.h'],
    content: (
      <>
        <H2>Platform Overview</H2>
        <P>
          DarkLight microcontrollers are high-performance embedded systems designed for modern IoT and robotics applications. 
          The core of the system operates on a <strong>3.3 Volt power rail</strong>. It is critical to ensure all interfaced sensors 
          and actuators are compatible with 3.3V logic levels to prevent hardware damage.
        </P>
        
        <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="font-bold text-yellow-500">Important:</p>
          <p className="text-yellow-200">Always include the core library header at the top of your main file:</p>
          <CodeBlock code='#include "DarkLight.h"' language="cpp" />
        </div>

        <H2>Digital Logic Terminology</H2>
        <P>
          Throughout this documentation and the API, we use specific terms to denote digital states. 
          Understanding these interchangeable terms is key to mastering the platform.
        </P>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-brand-300">
                <th className="p-3">State</th>
                <th className="p-3">Voltage</th>
                <th className="p-3">Common Terms</th>
                <th className="p-3">Boolean / Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-800/50">
                <td className="p-3 font-bold text-green-400">ON</td>
                <td className="p-3">3.3V</td>
                <td className="p-3">Closed, High, Set</td>
                <td className="p-3">True, Logic 1</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="p-3 font-bold text-red-400">OFF</td>
                <td className="p-3">0V</td>
                <td className="p-3">Open, Low, Clear</td>
                <td className="p-3">False, Logic 0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  {
    id: 'digital-io',
    title: 'Digital Input / Output',
    category: 'Hardware I/O',
    keywords: ['gpio', 'digitalout', 'digitalin', 'led', 'pins', '49'],
    content: (
      <>
        <H2>Pin Configuration</H2>
        <P>
          The DarkLight board features <strong>49 digital IO pins</strong>. Each pin can be individually configured as a 
          digital input or digital output via software. Additionally, the board includes an <strong>on-board LED</strong> 
          pre-configured on a specific pin for quick status indication.
        </P>

        <H2>Digital Output (DigitalOut)</H2>
        <P>The <code>DigitalOut</code> class controls the state of a pin, driving it to 3.3V (1) or 0V (0).</P>
        
        <H3>Key Functions</H3>
        <UL>
          <li><code>DigitalOut(pin_name)</code>: Constructor to create the object.</li>
          <li><code>write(int value)</code>: Sets the pin state. 0 for Low, 1 for High.</li>
          <li><code>read()</code>: Returns the current output setting (0 or 1).</li>
        </UL>

        <H3>Example</H3>
        <CodeBlock code={`#include "DarkLight.h"

DigitalOut myLed(LED_BUILTIN); // Initialize on-board LED

int main() {
    while(1) {
        myLed.write(1); // Turn ON (3.3V)
        wait_ms(500);
        myLed.write(0); // Turn OFF (0V)
        wait_ms(500);
    }
}`} language="cpp" />

        <H2>Digital Input (DigitalIn)</H2>
        <P>The <code>DigitalIn</code> class reads the digital state of a pin. 0V returns Logic 0, and 3.3V returns Logic 1.</P>

        <H3>Key Functions</H3>
        <UL>
          <li><code>DigitalIn(pin_name)</code>: Constructor.</li>
          <li><code>mode(PullMode mode)</code>: Sets internal resistors (PullUp, PullDown, PullNone).</li>
          <li><code>read()</code>: Returns integer 0 or 1.</li>
        </UL>
      </>
    )
  },
  {
    id: 'analog',
    title: 'Analog Input (ADC)',
    category: 'Hardware I/O',
    keywords: ['adc', 'analogin', '12-bit', 'resolution', 'sampling', 'voltage'],
    content: (
      <>
        <H2>ADC Overview</H2>
        <P>
          DarkLight supports <strong>up to 16 Analog input pins</strong>. It utilizes a high-precision 
          <strong>12-bit Analog-to-Digital Converter (ADC)</strong>.
        </P>

        <H3>Resolution Calculation</H3>
        <P>
          Resolution determines the smallest change in voltage the system can detect. 
          With a system voltage of 3.3V and 12-bit depth ($2^{12} = 4096$ levels):
        </P>
        <div className="bg-gray-800 p-4 rounded mb-4 font-mono text-center text-brand-300">
          Resolution = 3.3V / 4096 ≈ 0.81 mV
        </div>

        <H2>AnalogIn Usage</H2>
        <P>
          The <code>AnalogIn</code> library abstracts the raw values. The <code>read()</code> function 
          returns a <strong>normalized float in the range [0.0, 1.0]</strong>, where 0.0 represents 0V 
          and 1.0 represents 3.3V.
        </P>

        <div className="bg-blue-900/20 p-4 border-l-4 border-blue-500 mb-6">
          <h4 className="font-bold text-blue-400">Note on Sampling Frequency</h4>
          <p className="text-sm text-gray-300">
            Ensure your sampling frequency is at least twice the highest frequency component of the signal (Nyquist theorem), 
            though 5x-10x is recommended for better reconstruction.
          </p>
        </div>

        <H3>Example</H3>
        <CodeBlock code={`#include "DarkLight.h"

AnalogIn sensor(PTB5); // Initialize Analog pin

int main() {
    while(1) {
        float normalized = sensor.read(); // 0.0 to 1.0
        float voltage = normalized * 3.3; // Convert to actual voltage
        
        printf("Voltage: %.2f V\\n", voltage);
        wait_ms(100);
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'pwm',
    title: 'Pulse Width Modulation (PWM)',
    category: 'Hardware I/O',
    keywords: ['pwm', 'pwmout', 'duty cycle', 'period', 'analog simulation'],
    content: (
      <>
        <H2>PWM Concept</H2>
        <P>
          PWM is a technique to generate an analog-like voltage using digital signals. By switching a pin ON (3.3V) and OFF (0V) 
          rapidly, the average voltage is determined by the <strong>duty cycle</strong> (the percentage of time the signal is high).
        </P>
        <P>DarkLight supports <strong>up to eighteen PWM outputs</strong>.</P>

        <H2>PwmOut Library</H2>
        <UL>
          <li><code>write(float value)</code>: Sets duty cycle as a normalized float (0.0 = 0%, 1.0 = 100%).</li>
          <li><code>period(float seconds)</code>: Sets the PWM period in seconds.</li>
          <li><code>read()</code>: Returns current duty cycle setting.</li>
        </UL>

        <H3>Example: Fading LED</H3>
        <CodeBlock code={`#include "DarkLight.h"

PwmOut led(PTC2);

int main() {
    led.period(0.020); // 20ms period (50Hz)
    
    while(1) {
        // Fade in
        for(float i=0.0; i<1.0; i+=0.1) {
            led.write(i);
            wait_ms(50);
        }
        // Fade out
        for(float i=1.0; i>0.0; i-=0.1) {
            led.write(i);
            wait_ms(50);
        }
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'interrupts',
    title: 'Interrupts & Debouncing',
    category: 'Advanced Control',
    keywords: ['interrupt', 'interruptin', 'isr', 'debounce', 'rise', 'fall'],
    content: (
      <>
        <H2>External Hardware Interrupts</H2>
        <P>
          Interrupts allow the DarkLight controller to pause its main program loop to immediately handle a time-critical 
          event (like a button press or sensor trigger) via an Interrupt Service Routine (ISR).
        </P>

        <H2>InterruptIn Library</H2>
        <UL>
          <li><code>rise(callback)</code>: Triggers ISR on Rising Edge (0V → 3.3V).</li>
          <li><code>fall(callback)</code>: Triggers ISR on Falling Edge (3.3V → 0V).</li>
          <li><code>rise_fall(callback)</code>: Triggers on both edges.</li>
        </UL>

        <H2>Switch Debouncing</H2>
        <P>
          Mechanical switches physically "bounce" when pressed, creating multiple electrical transitions in milliseconds. 
          Without debouncing, a single press might trigger the ISR dozens of times.
        </P>
        <P>
          <strong>Recommended Solution:</strong> Use software timestamping. Only process the interrupt if the time 
          difference from the last valid interrupt is greater than <strong>15ms</strong>.
        </P>

        <H3>Debounced Button Example</H3>
        <CodeBlock code={`#include "DarkLight.h"

InterruptIn button(PTD4);
DigitalOut led(LED1);
Timer debounce;

void toggle_led() {
    // Only toggle if >15ms has passed
    if (debounce.read_ms() > 15) {
        led = !led;
        debounce.reset(); // Reset timer for next press
    }
}

int main() {
    debounce.start();
    button.rise(&toggle_led); // Attach ISR
    
    while(1) {
        // Main loop is free to do other things
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'ticker',
    title: 'Task Scheduling (Ticker)',
    category: 'Advanced Control',
    keywords: ['ticker', 'scheduler', 'multitasking', 'non-blocking', 'attach'],
    content: (
      <>
        <H2>The Ticker Class</H2>
        <P>
          The <code>Ticker</code> class acts as a lightweight scheduler, allowing you to execute functions repeatedly 
          at a specific interval without using blocking delay loops.
        </P>

        <H2>Non-Blocking Requirement</H2>
        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
          <h4 className="font-bold text-red-400">CRITICAL</h4>
          <p className="text-gray-300">
             Functions attached to a Ticker <strong>must be non-blocking</strong>. Do not use <code>wait_ms()</code> 
             or long synchronous operations inside a Ticker callback, as this will stall the entire system.
          </p>
        </div>

        <H3>Functions</H3>
        <UL>
          <li><code>attach(callback, float interval)</code>: Schedule function every <em>interval</em> seconds.</li>
          <li><code>detach()</code>: Stop the scheduler.</li>
        </UL>

        <H3>Example: Blinking LED without Wait</H3>
        <CodeBlock code={`#include "DarkLight.h"

Ticker flasher;
DigitalOut led(LED2);

void flash() {
    led = !led;
}

int main() {
    // Call 'flash' every 0.5 seconds
    flasher.attach(&flash, 0.5);
    
    while(1) {
        // Main loop is completely free
        printf("Doing other work...\\n");
        wait_ms(1000); 
    }
}`} language="cpp" />
      </>
    )
  },
  {
    id: 'comms',
    title: 'Communication (SPI & UART)',
    category: 'Communication',
    keywords: ['spi', 'uart', 'serial', 'baud', 'mosi', 'miso', 'async'],
    content: (
      <>
        <H2>SPI (Serial Peripheral Interface)</H2>
        <P>SPI is a high-speed, 4-wire, master/slave protocol (SCLK, MOSI, MISO, CS/SS).</P>
        
        <H3>Configuration</H3>
        <UL>
          <li><strong>Frequency:</strong> Up to 24 MHz (Default 1.5 MHz).</li>
          <li><strong>Data Width:</strong> 8 or 16 bits.</li>
          <li><strong>Mode:</strong> Clock polarity and phase (0-3).</li>
        </UL>

        <H3>Methods</H3>
        <UL>
          <li><code>write(int data)</code>: Blocking write/read exchange.</li>
          <li><code>asyncWrite(data, length)</code>: Non-blocking asynchronous transfer.</li>
        </UL>

        <hr className="border-gray-700 my-8" />

        <H2>UART (Serial)</H2>
        <P>
          Universal Asynchronous Receiver/Transmitter is a two-wire (Tx/Rx) protocol. DarkLight features 
          <strong>two independent UARTs</strong> (UART1, UART2).
        </P>

        <H3>Packet Structure & Config</H3>
        <P>Devices must match parameters exactly:</P>
        <UL>
          <li><strong>Baud Rate:</strong> Default 9600, supports up to 6,000,000 bps.</li>
          <li><strong>Data Bits:</strong> Typically 8.</li>
          <li><strong>Parity:</strong> None, Odd, Even, Forced1, Forced0.</li>
          <li><strong>Stop Bits:</strong> 1 or 2.</li>
        </UL>
      </>
    )
  }
];