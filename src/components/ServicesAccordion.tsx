import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
const services = [
{
  id: '01',
  title: 'Brand Strategy',
  description:
  'We define your brand’s voice, vision, and value proposition to create a lasting connection with your audience. Our strategic approach ensures every touchpoint aligns with your business goals.'
},
{
  id: '02',
  title: 'Web Design & Development',
  description:
  'We build immersive, high-performance websites that blend aesthetics with functionality. From responsive layouts to complex interactions, we ensure your digital presence stands out.'
},
{
  id: '03',
  title: 'Motion Design',
  description:
  'We bring your brand to life with fluid animations and cinematic effects. Our motion design enhances user experience, guides attention, and adds a layer of polish that separates you from competitors.'
},
{
  id: '04',
  title: 'Digital Marketing',
  description:
  'We amplify your reach through targeted campaigns and data-driven strategies. Our marketing solutions are designed to convert visitors into loyal customers and drive sustainable growth.'
}];

export function ServicesAccordion() {
  const [activeId, setActiveId] = useState<string | null>('01');
  return (
    <section
      id="services"
      className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">

      <motion.div
        initial={{
          opacity: 0,
          y: 40
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.8
        }}
        className="mb-16 md:mb-24">

        <h2 className="text-4xl md:text-6xl font-syne font-bold mb-4">
          What We Do
        </h2>
        <div className="h-1 w-24 bg-accent" />
      </motion.div>

      <div className="space-y-4">
        {services.map((service) =>
        <motion.div
          key={service.id}
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.5
          }}
          className="border-b border-white/10">

            <button
            onClick={() =>
            setActiveId(activeId === service.id ? null : service.id)
            }
            className="w-full py-8 flex items-center justify-between text-left group focus:outline-none">

              <div className="flex items-center gap-6 md:gap-12">
                <span
                className={`text-sm md:text-base font-mono ${activeId === service.id ? 'text-accent' : 'text-secondary'}`}>

                  {service.id}
                </span>
                <h3
                className={`text-2xl md:text-4xl font-syne font-bold transition-colors duration-300 ${activeId === service.id ? 'text-white' : 'text-secondary group-hover:text-white'}`}>

                  {service.title}
                </h3>
              </div>
              <span
              className={`p-2 rounded-full transition-colors duration-300 ${activeId === service.id ? 'bg-accent text-white' : 'bg-white/5 text-white group-hover:bg-white/10'}`}>

                {activeId === service.id ?
              <Minus size={20} /> :

              <Plus size={20} />
              }
              </span>
            </button>

            <AnimatePresence>
              {activeId === service.id &&
            <motion.div
              initial={{
                height: 0,
                opacity: 0
              }}
              animate={{
                height: 'auto',
                opacity: 1
              }}
              exit={{
                height: 0,
                opacity: 0
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut'
              }}
              className="overflow-hidden">

                  <div className="pb-8 pl-12 md:pl-20 max-w-3xl">
                    <p className="text-lg text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
            }
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>);

}