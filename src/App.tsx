/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Zap, Gamepad2, Wallet, CheckCircle2, Star, Globe, MessageSquare, Send } from 'lucide-react';
import { HLSVideo } from './components/HLSVideo';
import { motion } from 'motion/react';
import React, { useRef, useState } from 'react';
import { ReactLenis } from 'lenis/react';

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function App() {
  return (
    <ReactLenis root>
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <div className="bg-noise"></div>
      {/* TopNavBar */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 rounded-full mt-8 mx-auto max-w-5xl bg-[#120a1d]/40 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          Woofer
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-label font-bold uppercase tracking-wider" href="#">How It Works</a>
          <a className="text-emerald-300 font-bold border-b border-emerald-300 text-sm font-label uppercase tracking-wider" href="#">Offers</a>
          <a className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-label font-bold uppercase tracking-wider" href="#">Cashout</a>
          <a className="text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-label font-bold uppercase tracking-wider" href="#">FAQ</a>
        </div>
        <button className="bg-primary-fixed-dim text-on-primary-fixed px-6 py-2 rounded-full font-bold hover:scale-105 active:scale-95 duration-200 ease-in-out transition-all">
          Join Waitlist
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden bg-[#120a1d]">
        <div className="absolute inset-0 w-full h-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-100">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260309_042944_4a2205b7-b061-490a-852b-92d9e9955ce9.mp4" type="video/mp4" />
          </video>
          {/* Subtle dark overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Creative glowing transition orb at the bottom of hero */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-[100%] pointer-events-none z-0"></div>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-4xl flex flex-col items-center mt-16">
          <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">Early Access</span>
            Coming Soon
          </motion.div>
          <motion.h1 variants={fadeUpItem} className="text-hero-heading text-5xl md:text-8xl text-white mb-6">
            Offerwall Rewards.<br />Rebuilt.<br /><span className="text-primary-fixed-dim">Coming Soon.</span>
          </motion.h1>
          <motion.p variants={fadeUpItem} className="text-hero-sub text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10">
            Woofer is building a cleaner way to earn. A premium offerwall experience designed for clarity, speed, and real value.
          </motion.p>
          <motion.div variants={fadeUpItem} className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-primary-fixed-dim text-on-primary-fixed text-lg px-10 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(115,219,154,0.3)] transition-all active:scale-95">
              Join the Waitlist
            </button>
            <button className="bg-surface-container-high/50 backdrop-blur-md text-white border border-outline-variant/30 text-lg px-10 py-4 rounded-full font-bold hover:bg-surface-container-highest transition-all active:scale-95">
              See What's Coming
            </button>
          </motion.div>
          <motion.p variants={fadeUpItem} className="mt-12 text-on-surface-variant/60 font-label uppercase tracking-widest text-xs">
            Built for the next wave of reward seekers worldwide
          </motion.p>
        </motion.div>

        {/* Creative glow transition to Section 2 - Matching the subtle glow of Section 2-3 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent blur-sm z-30"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent z-30"></div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-32 px-8 overflow-hidden bg-surface-container-lowest">
        {/* Premium Precision Background Animation */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {/* Animated Dot Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(134,239,172,0.25)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-80"></div>
          
          {/* Glowing Orbs */}
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse-glow"></div>
          <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '4s' }}></div>

          {/* Precision Rings (SVG HUD) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-70 flex items-center justify-center">
            <svg viewBox="0 0 800 800" className="absolute w-full h-full animate-spin-slow">
              <circle cx="400" cy="400" r="390" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500/40" strokeDasharray="4 12" />
              <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500/30" strokeDasharray="1 8" />
            </svg>
            <svg viewBox="0 0 800 800" className="absolute w-full h-full animate-spin-slow-reverse">
              <circle cx="400" cy="400" r="345" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500/30" strokeDasharray="20 10 5 10" />
            </svg>
            {/* Crosshairs */}
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent"></div>
            {/* Center node */}
            <div className="absolute w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,1)]"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/30 mb-6">
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">Preview</span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Core Product</span>
            </div>
            <h2 className="text-hero-heading text-4xl md:text-5xl text-white mb-4">Why Woofer<br/>Will Feel Different</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">A pre-launch look at the product principles shaping Woofer from day one.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="liquid-glass p-10 rounded-[2rem] flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 rounded-2xl bg-primary-container/20 flex items-center justify-center">
                <Zap className="text-primary-fixed-dim w-8 h-8" />
              </div>
              <h3 className="text-2xl font-headline font-bold text-white">Cleaner Offer Discovery</h3>
              <p className="text-on-surface-variant leading-relaxed">A simpler offerwall that helps users find worthwhile surveys, games, and paid tasks without digging through clutter.</p>
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="text-2xl font-headline font-bold text-emerald-300 mb-1">Better</div>
                <div className="text-xs font-label uppercase text-zinc-500 tracking-widest">signal over noise</div>
              </div>
            </div>
            <div className="liquid-glass p-10 rounded-[2rem] flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500 border-emerald-500/20 shadow-2xl shadow-emerald-950/20">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center">
                <Gamepad2 className="text-background w-8 h-8 fill-current" />
              </div>
              <h3 className="text-2xl font-headline font-bold text-white">Reward-First Game Offers</h3>
              <p className="text-on-surface-variant leading-relaxed">Game offers designed to feel clearer, more motivating, and easier to track from first install to final milestone.</p>
              <div className="mt-auto pt-6 border-t border-emerald-500/20">
                <div className="text-2xl font-headline font-bold text-emerald-300 mb-1">More</div>
                <div className="text-xs font-label uppercase text-zinc-500 tracking-widest">clarity per task</div>
              </div>
            </div>
            <div className="liquid-glass p-10 rounded-[2rem] flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-14 h-14 rounded-2xl bg-primary-container/20 flex items-center justify-center">
                <Wallet className="text-primary-fixed-dim w-8 h-8" />
              </div>
              <h3 className="text-2xl font-headline font-bold text-white">Faster Cashout Experience</h3>
              <p className="text-on-surface-variant leading-relaxed">A payout experience built to reduce friction, show clear balances, and make rewards feel real as soon as possible.</p>
              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="text-2xl font-headline font-bold text-emerald-300 mb-1">Less</div>
                <div className="text-xs font-label uppercase text-zinc-500 tracking-widest">waiting, more trust</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHESS SECTION 1 */}
      <section className="relative py-32 px-8 bg-black">
        {/* Seamless transition from Section 2 (#120a1d) to black with a creative glow */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#120a1d] to-black pointer-events-none z-0"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent blur-sm"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10"
        >
          <div className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 aspect-video relative">
            <HLSVideo src="https://stream.mux.com/1CCfG6mPC7LbMOAs6iBOfPeNd3WaKlZuHuKHp00G62j8.m3u8" autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/30 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">Soon</span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Smart Matching</span>
            </div>
            <h2 className="text-hero-heading text-4xl md:text-5xl text-white leading-tight">Better Offers.<br/><span className="text-primary-fixed-dim">Less Guesswork.</span></h2>
            <p className="text-hero-sub text-lg text-on-surface-variant">Woofer is being built to match users with the offers most relevant to them — so the experience feels more useful, less noisy, and easier to trust.</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-white font-medium">
                <CheckCircle2 className="text-emerald-400 w-6 h-6" />
                Smarter offer discovery
              </li>
              <li className="flex items-center gap-4 text-white font-medium">
                <CheckCircle2 className="text-emerald-400 w-6 h-6" />
                Cleaner task selection
              </li>
              <li className="flex items-center gap-4 text-white font-medium">
                <CheckCircle2 className="text-emerald-400 w-6 h-6" />
                Better user-to-offer fit
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-surface-container-high text-emerald-300 border border-emerald-500/20 px-8 py-3 rounded-full font-bold hover:bg-emerald-500/10 transition-all">Join Early Access</button>
              <button className="bg-transparent text-white border border-outline-variant/30 px-8 py-3 rounded-full font-bold hover:bg-surface-container-highest transition-all">Read the Vision</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* NUMBERS SECTION */}
      <section className="relative py-48 px-8 flex flex-col items-center justify-center overflow-hidden">
        {/* Creative glow transition from previous section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent blur-sm z-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent z-20"></div>

        {/* Smooth transition from the black background of the previous section */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10"></div>
        
        {/* Premium Background Animations */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Slow panning grid */}
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_10%,transparent_100%)]"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Floating Aurora Orbs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]"
            animate={{
              x: [0, -100, 50, 0],
              y: [0, 100, -50, 0],
              scale: [1, 0.8, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden opacity-30 mix-blend-screen">
          <HLSVideo src="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>

        <div className="z-20 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm font-label uppercase tracking-[0.4em] text-emerald-300 mb-6"
          >
            Built for the User
          </motion.div>
          
          <div className="relative inline-block overflow-hidden pb-4">
            {/* Sweeping Light Ray over the text */}
            <motion.div 
              className="absolute top-0 bottom-0 z-30 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] w-32"
              animate={{
                left: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[8rem] md:text-[15rem] font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-none tracking-tighter drop-shadow-2xl relative z-20"
            >
              100%
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto mt-8 relative z-20"
          >
            We’re rethinking the entire reward loop—from the moment you click an offer to the second you cash out.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex justify-center gap-16 mt-16 relative z-20"
          >
            <div>
              <div className="text-5xl font-headline font-bold text-white mb-2">0</div>
              <div className="text-sm font-label uppercase tracking-widest text-emerald-300">Fake Promises</div>
            </div>
            <div>
              <div className="text-5xl font-headline font-bold text-white mb-2">1</div>
              <div className="text-sm font-label uppercase tracking-widest text-emerald-300">Clear Mission</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative py-32 px-8">
        {/* Creative glow transition from previous section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent blur-sm z-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent z-20"></div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-20">
            <h2 className="text-hero-heading text-4xl text-white mb-4">Who We’re Building For</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Woofer is being designed for the people who actually use offerwalls.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="liquid-glass p-8 rounded-[2rem] flex flex-col gap-6">
              <p className="text-lg text-white italic leading-relaxed">"You want reliable payouts, fast loading times, and a feed that doesn’t waste your time with broken links."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden">
                  <img alt="The Grinder" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-gZ2LqxVhmbUxOiMJTtQdIfv6_dAPJMRQ9DFGge3z1RTWqW6jr-pix4Wb-7bmpr1voL1HhoxM4Q9_EmkwZvLop-rJsZfJv47kkfXeQuJjZq7wWkkgiwxZxBuAXSCWRQXyJ_9JEnzrYL9UOZh7I_2xrkptIoAFVtlHE6ve1FVOcblu2LeDEXkgDV-a3_le36Ftah49V8Xlric5ZtHdWn7U5uOFzJUoR-ThQ-pVIJ85e5GISmBJQVVdGZcULTO7LzmMk_1XYbi1-RM" />
                </div>
                <div>
                  <div className="font-bold text-white">The Grinder</div>
                  <div className="text-xs text-zinc-500">High-Volume Earner</div>
                </div>
              </div>
            </div>
            <div className="liquid-glass p-10 rounded-[2rem] flex flex-col gap-8 md:-translate-y-8 border-emerald-500/40 shadow-emerald-500/10 shadow-2xl scale-105">
              <div className="flex gap-1 text-emerald-300">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-xl text-white font-medium leading-relaxed">"You want clear milestones, games that are actually fun, and tracking that works the first time, every time."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest overflow-hidden">
                  <img alt="The Gamer" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxhf-ZRYiYHXE-IdirJmPov2Q5ckKiUC2AED23GIGTTxHEZl1PIF_WlIcoXo9vN_pESC29jw0WV_UKNe3JEADfBVjDNtaFROZVHfyaL8VaNAEJP3oRlb1S1Afxvz6wDZfpSSRH6mojcmRz_30uNvTHhyGEs0QCp7I3VzCxUN5wdpIF9Rn6Y6WJp9VTvCtHmj2dIqsAvjOAJR7A7I3Lbo2xVBZQBuUGFYso3DIY04oZB9y-9vEKp8zWrVC7aqwdoHuOwkAJE3BZprw" />
                </div>
                <div>
                  <div className="font-bold text-white">The Gamer</div>
                  <div className="text-xs text-zinc-500">Play-to-Earn User</div>
                </div>
              </div>
            </div>
            <div className="liquid-glass p-8 rounded-[2rem] flex flex-col gap-6">
              <p className="text-lg text-white italic leading-relaxed">"You want a clean interface, easy-to-understand tasks, and a platform that feels safe and premium."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden">
                  <img alt="The Casual" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa-4Yb8Q9y0AIIrpLZH9MyGzxJzdz3n_GCJkD4O_hqjFYfJucjC0DVzg3o647m0CJrpBWTEt5JQJBTn8MRtoDxdpoqUBzv1CpOtcxzF8GPzriIBUoLjODQwEMTYLXvaSTaUuoEGIjyQoABX_KCR5-FT5QTMO46pNmZvQ6-fr2ffdenqr9XpZkFInjD3nTh2MQgAg_5p0_mr32rk0lpFSqx_eRROaf2cjAO0rodyPkPnqKiLBr5NjqfTvBw64E5cWNlcGuta4qYv68" />
                </div>
                <div>
                  <div className="font-bold text-white">The Casual</div>
                  <div className="text-xs text-zinc-500">Spare Time Earner</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA + FOOTER SECTION */}
      <section className="relative pt-48 overflow-hidden">
        {/* Creative glow transition from previous section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent blur-sm z-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent z-20"></div>

        <div className="absolute top-0 left-0 w-full h-full z-[-2] overflow-hidden opacity-30">
          <HLSVideo src="https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>
        
        {/* Top Gradient to fade video in smoothly from previous section */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#181023] via-[#181023]/80 to-transparent pointer-events-none z-[-1]"></div>

        {/* Smooth Premium Gradient Transition to Footer */}
        <div className="absolute bottom-0 left-0 w-full h-[1000px] bg-gradient-to-b from-transparent via-[#0d0714]/90 to-[#050208] pointer-events-none z-[-1]"></div>

        <div className="max-w-5xl mx-auto px-8 mb-32 relative z-10">
          <div className="liquid-glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
            <h2 className="text-hero-heading text-4xl md:text-6xl text-white mb-4">Be the First to Know</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-8">Woofer is currently in development. Join the waitlist to get early access when we launch.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-primary-fixed-dim text-on-primary-fixed text-xl px-12 py-5 rounded-full font-bold hover:shadow-[0_0_50px_rgba(115,219,154,0.4)] transition-all active:scale-95">
                Join the Waitlist
              </button>
              <button className="bg-transparent text-white border border-outline-variant/30 text-xl px-12 py-5 rounded-full font-bold hover:bg-surface-container-highest transition-all active:scale-95">
                Follow Updates
              </button>
            </div>
          </div>
        </div>
        <footer className="w-full py-16 px-8 md:px-24 grid grid-cols-2 md:grid-cols-5 gap-12 relative z-10 border-t border-white/[0.03] mt-16">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold text-emerald-300 mb-6">Woofer</div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">The next generation of digital rewards. Built for clarity.</p>
            <div className="flex gap-4">
              <Globe className="text-zinc-500 hover:text-emerald-300 transition-colors cursor-pointer w-6 h-6" />
              <MessageSquare className="text-zinc-500 hover:text-emerald-300 transition-colors cursor-pointer w-6 h-6" />
              <Send className="text-zinc-500 hover:text-emerald-300 transition-colors cursor-pointer w-6 h-6" />
            </div>
          </div>
          <div>
            <h4 className="text-emerald-300 font-headline font-bold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Waitlist</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Vision</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Updates</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-300 font-headline font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">About</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Careers</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Press</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Brand</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-300 font-headline font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Help Center</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Community</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Terms</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-300 font-headline font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Terms</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Privacy</a></li>
              <li><a className="text-zinc-500 hover:text-zinc-200 hover:translate-x-1 transition-all inline-block" href="#">Cookies</a></li>
            </ul>
            <div className="mt-8 text-zinc-600 text-[10px] font-label uppercase tracking-widest">
              © 2024 Woofer. All rights reserved.
            </div>
          </div>
        </footer>
      </section>
    </div>
    </ReactLenis>
  );
}
