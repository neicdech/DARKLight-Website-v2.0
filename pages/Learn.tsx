import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DOC_DATA } from '../constants';
import { BookOpen, ChevronRight } from 'lucide-react';

export const Learn: React.FC = () => {
  const { hash } = useLocation();

  // Scroll to hash on load/change
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0,0);
    }
  }, [hash]);

  const categories = Array.from(new Set(DOC_DATA.map(d => d.category)));

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          {categories.map(category => (
            <div key={category}>
              <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-brand-500" />
                {category}
              </h5>
              <ul className="space-y-1 border-l border-gray-800 ml-2">
                {DOC_DATA.filter(d => d.category === category).map(doc => (
                  <li key={doc.id}>
                    <a 
                      href={`#/learn#${doc.id}`}
                      className={`block pl-4 py-1 text-sm border-l-2 transition-colors ${
                        hash === `#${doc.id}` 
                        ? 'border-brand-500 text-brand-400' 
                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-6">Learn</h1>
          <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
            Complete technical reference and tutorials for the DarkLight microcontroller ecosystem.
          </p>
           <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
                Digital Outputs on the DarkLight Microcontroller
                Introduction
                Digital inputs and outputs form the foundation of nearly all embedded systems. Whether you are switching on an LED, controlling a relay, enabling a motor driver, 
                or interfacing with higher‑power electronics through external circuitry, the concept is the same: the microcontroller drives a pin either LOW or HIGH.
                In this tutorial, we focus on digital outputs and, specifically, how to use the DigitalOut class on the DarkLight microcontroller development board. 
                By the end of this lesson, you will understand the electrical concept behind digital outputs, how DarkLight pins behave, and how to write and debug a complete program that blinks an LED.

             
          </p>
          
           <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
                What Is a Digital Output?
                A digital output pin is a microcontroller pin that can generate two distinct voltage levels:
                •	Logic 0 (LOW) → approximately 0 V with respect to ground
                •	Logic 1 (HIGH) → approximately 3.3 V with respect to ground
                On the DarkLight development board, the microcontroller is powered from a 3.3 V regulator. As a result:
                •	0 V represents OFF, LOW, CLEAR, FALSE, or Logic 0
                •	3.3 V represents ON, HIGH, SET, TRUE, or Logic 1
                All of these terms are used interchangeably in embedded systems literature and practice

              A Simple Digital Output Circuit
              Consider a basic circuit consisting of:
              •	A DarkLight microcontroller
              •	A current‑limiting resistor
              •	An LED
              https://drive.google.com/file/d/1mrTgFnfdBFI5h1BxITZat8cP_rK-DSTR/view?usp=sharing
             
              When the microcontroller pin is driven HIGH (3.3 V), a voltage potential exists across the LED and resistor, current flows, and the LED turns ON. 
             When the pin is driven LOW (0 V), the potential difference disappears, no current flows, and the LED turns OFF.
             If pin PTD2, for example, can generate both 0 V and 3.3 V, then PTD2 is functioning as a digital output pin.
           </p>

           <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
               
                Digital Output Pins on the DarkLight Board
                The DarkLight development board exposes microcontroller pins through multiple headers:
                •	J1, J2, J3, J4
                •	J5, J6, J7
                •	Debug header
                 https://drive.google.com/file/d/1iDOCyqj7ZmZXPVoG3HLKuUnemb4bCKe_/view?usp=drive_link
                All pins labeled in violet colour on these headers can be configured as digital output pins except:
                •	PTA13
                •	PTA14
                These two pins are reserved for debugging and should not be repurposed for general I/O.
                The DarkLight also has two on board LEDs which are attached to pins  PTA8 for BoardLED1 and pin PTB8 attached to BoardLED2   
           </p>

          <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
              The DigitalOut Class
              To configure and control a digital output pin in software, DarkLight provides the DigitalOut class defined in DarkLight.h library. This class abstracts away low‑level 
              register manipulation and provides a clean, readable interface.
              
              The DigitalOut class provides three essential functions:
              
              Function Name	        Purpose
              DigitalOut()	        Configures a specified pin as a digital output pin
              write()	              Sets the output state of the pin (HIGH or LOW)
              read()	              Returns the current logical state of the pin
              
              
              Declaring a Digital Output
              To configure a pin as a digital output pin, you declare a DigitalOut object by providing:
              1.	A descriptive variable name
              2.	The physical pin name
              
              Examples:
              •	A light switch on PTB2:
              DigitalOut lightSwitch(PTB2);
              •	An AC control signal on PTD2:
              DigitalOut ACcontrol(PTD2);
              The variable name should describe the function of the pin, not just the pin itself. This improves readability and maintainability.
          </p>
         
          <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
            Practical Demonstration: Blinking an LED
            Objective
            Write software to blink an on boardLED1 connected to PTA8 every 500 milliseconds.

            Setting Up the Project
            1.	Make a Copy of the DarkLight Template project Folder you have already downloaded to your computer.
            2.	Create a new project by renaming the copy of the Template project folder as was shown in the section on getting sarted with Darklight.
            3.  Navigate into the new project folder, locate the Template Project, rename it to any Name of your choice and  and Double click on it to  Open the SEGGER Embedded Studio IDE.
            4.	Within the IDE project browser on the left, click on source file and double click on the main.cpp to open
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
   
            Writing the Code
            Including the DarkLight Libraries
            Every DarkLight project must begin by including the main board support header:
            #include "darklight.h"
            This header pulls in all DarkLight‑specific libraries, including the DigitalOut class.
            </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">

            Declaring the LED Pin
            We configure PTA8 as a digital output and name it ledControl:
            DigitalOut ledControl(PTA8);
            ________________________________________
            Main Loop Logic
            The program structure uses an infinite loop to repeatedly toggle the LED:

              
            #include "darklight.h"
              
            int main()
            {
                while (true)
                {
                    ledControl.write(1);   // Turn LED ON
                    wait_ms(500);
            
                    ledControl.write(0);   // Turn LED OFF
                    wait_ms(500);
                }
            }
              
            How It Works
            •	write(1) drives PTA8 HIGH, turning the LED ON.
            •	The program waits for 500 ms.
            •	write(0) drives PTA8 LOW, turning the LED OFF.
            •	The program waits another 500 ms.
            •	The loop repeats indefinitely while the board is powered.
            This results in a blinking LED with a 1‑second period.

            </p>

       <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
         
        Compiling and Flashing the Code
        1.	In SEGGER Embedded Studio, select:
        o	Build → Rebuild Project
        2.	Connect the external debugger to your computer 
        3.	Go to:Target → Connect J‑Link
        4.	When the connection completes successfully, proceed to debugging.
        ________________________________________
        Running and Debugging
        •	Run: Click ▶️ to execute the program.
        •	Pause: Temporarily halt execution.
        •	Breakpoints: Breakpoints allow you to pause code execution at specific lines, enabling you to inspect variable values and program flow.
          Click in the margin on the left to insert a breakpoint.
        •	Press on (F11) to Step Into a function call.
        •	Press (F10) on your keyboard to Step Over a function without entering it.
        •	Stop: Terminates execution.
        •	Continue: Resume execution after a pause or breakpoint.
         
        Observe the onbaord LED1 on the DarkLight blinking once per second, confirming correct digital output operation.
        ________________________________________
        Summary
        In this tutorial, you learned:
        •	What a digital output is and how logic levels map to voltages
        •	Which DarkLight pins can be used as digital outputs
        •	How the DigitalOut class abstracts hardware control
        •	How to write, flash, and debug a real digital output application
        Digital outputs are the gateway to controlling the physical world. Mastering them is a critical first step toward more advanced embedded systems designs.

         You can also watch the video lecture on the tuitorial on Digital Output by clicking on this link 
          https://drive.google.com/file/d/1mzOJ9fyoM0UbUY4gzhd7-JL7tS_J9gaJ/view?usp=drive_link
        </p>
          
          <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
            Digital Inputs on the DarkLight Microcontroller
            Introduction
            In the previous lesson, we explored digital outputs and how a microcontroller can actively drive a pin HIGH or LOW to control external hardware such as LEDs. 
            In this tutorial, we shift focus to the complementary concept: digital inputs.
            Digital inputs allow the microcontroller to observe the external world. Through digital input pins, the DarkLight board can detect user actions, sensor outputs, 
            and logic-level signals from other electronic systems. Common examples include push buttons, limit switches, PIR motion sensors, and logic outputs from other devices.
            This tutorial explains the electrical principles behind digital inputs, introduces the DigitalIn class, and walks through a complete hardware and software example using a push-button switch.
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
              What Is a Digital Input?
              A digital input pin reads one of two valid voltage levels:
              Logic 0 (LOW) → approximately 0 V
              Logic 1 (HIGH) → approximately 3.3 V
              
              Because the DarkLight microcontroller operates at 3.3 V, these voltages map directly to Boolean logic:
              0 V → OFF, LOW, CLEAR, FALSE, Logic 0
              3.3 V → ON, HIGH, SET, TRUE, Logic 1
              Unlike digital outputs, digital inputs do not drive a voltage. Instead, they sense the voltage applied to the pin by external circuitry.
              Practical Motivation: PIR Motion Sensors
              A common real-world example of a digital input device is a PIR (Passive Infrared) sensor. https://www.theengineeringprojects.com/2017/08/pir-sensor-arduino-interfacing.html
              PIR sensors detect motion from objects that emit infrared radiation, such as humans or animals.The output of a PIR sensor is typically:
              LOW (0 V) when no motion is detected
              HIGH (3.3 V or 5 V) when motion is detected
              This type of output is a digital signal, making it ideal for direct connection to a microcontroller’s digital input pin. Using such inputs, a system can automatically 
              control lighting, air conditioning, alarms, or access control mechanisms.
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
              Digital Input Pins on the DarkLight
              The DarkLight board provides 49 general-purpose digital I/O pins, all of which can be configured as either inputs or outputs.https://drive.google.com/file/d/1iDOCyqj7ZmZXPVoG3HLKuUnemb4bCKe_/view?usp=drive_link 
              The same electrical and terminology conventions apply to both.To read digital signals from switches or sensors, we configure selected pins as digital inputs using the DigitalIn class.
              
              The DarkLight software library provides the DigitalIn class to simplify digital input configuration and usage.   
              
              Function Name	        Purpose
              DigitalIn()	          Configures a specified pin as a digital input
              mode()	              Configures the internal pin mode:Pull-up or Pull-down
              read()	              Reads the current logical state of the pin:Returns 0 for LOW and 1 for HIGH

              Digital input pins must never be left floating. A floating pin can randomly read HIGH or LOW due to electrical noise.
              To ensure a stable default state, a resistor is used:
              Pull-down resistor → forces the pin to 0 V when the switch is open.
              Pull-up resistor → forces the pin to 3.3 V when the switch is open. 
              https://www.circuitbread.com/ee-faq/why-are-pull-up-and-pull-down-resistors-used


              
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>

            <p className="text-xl text-gray-400 mb-12 border-b border-gray-800 pb-8">
          </p>
          <div className="space-y-20">
            {DOC_DATA.map((doc) => (
              <section key={doc.id} id={doc.id} className="scroll-mt-24">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-brand-500 text-sm font-mono uppercase tracking-wider">{doc.category}</span>
                  <ChevronRight size={14} className="text-gray-600" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">{doc.title}</h2>
                <div className="prose prose-invert prose-brand max-w-none">
                  {doc.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
