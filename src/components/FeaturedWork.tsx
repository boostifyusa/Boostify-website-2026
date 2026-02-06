import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
type Project = {
  id: number;
  title: string;
  category: string;
  gradient: string;
};
const projects: Project[] = [
{
  id: 1,
  title: 'Nebula Finance',
  category: 'Branding & Web',
  gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
},
{
  id: 2,
  title: 'Arctic Studio',
  category: 'Web Design',
  gradient: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)'
},
{
  id: 3,
  title: 'Pulse Health',
  category: 'App Design',
  gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
},
{
  id: 4,
  title: 'Vertex AI',
  category: 'Brand Identity',
  gradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)'
}];

function ProjectCard({ project }: {project: Project;}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d'
      }}
      className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden cursor-none">

      <div
        className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out hover:scale-110"
        style={{
          background: project.gradient
        }} />


      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300 p-8 flex flex-col justify-end transform translate-z-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5
          }}
          style={{
            transform: 'translateZ(50px)'
          }}>

          <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">
            {project.category}
          </span>
          <h3 className="text-3xl md:text-4xl font-syne font-bold text-white">
            {project.title}
          </h3>
        </motion.div>
      </div>
    </motion.div>);

}
export function FeaturedWork() {
  return (
    <section
      id="work"
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
          Selected Work
        </h2>
        <div className="h-1 w-24 bg-accent" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project) =>
        <ProjectCard key={project.id} project={project} />
        )}
      </div>
    </section>);

}