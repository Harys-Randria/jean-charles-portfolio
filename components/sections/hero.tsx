"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Code2, Database, Server, Cloud, Terminal, Sparkles, Zap, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

const techBadges = [
  { label: "Symfony", accent: "hover:border-white/40" },
  { label: "Laravel", accent: "hover:border-white/40" },
  { label: "Vue.js", accent: "hover:border-white/40" },
  { label: "PHP 8.4", accent: "hover:border-white/40" },
  { label: "Docker", accent: "hover:border-white/40" },
]

const floatingIcons = [
  { Icon: Code2, delay: 0, position: "top-20 left-10", duration: 20 },
  { Icon: Database, delay: 0.5, position: "top-40 right-20", duration: 25 },
  { Icon: Server, delay: 1, position: "bottom-40 left-20", duration: 22 },
  { Icon: Cloud, delay: 1.5, position: "top-60 right-10", duration: 28 },
  { Icon: Terminal, delay: 2, position: "bottom-20 right-40", duration: 24 },
]

export function HeroSection() {
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([])
  const [isMounted, setIsMounted] = useState(false)

  // Parallax effect on scroll
  const y1 = useTransform(scrollY, [0, 500], [0, -100])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const scale = useTransform(scrollY, [0, 300], [1, 0.95])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Générer les particules après le montage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newParticles = [...Array(5)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }))
      setParticles(newParticles)
    }
  }, [])

  // Mouse move parallax for gradient blobs
  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      setMousePosition({
        x: (clientX - centerX) * 0.02,
        y: (clientY - centerY) * 0.02,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMounted])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      }
    },
  }

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.4,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
      }
    },
  }

  return (
    <section
      id="accueil"
      className="relative h-screen flex flex-col gradient-background"
    >
      {/* Animated gradient blobs with mouse parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: -mousePosition.x * 0.5,
            y: -mousePosition.y * 0.5,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        
        {/* Additional soft gradient layers */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"
        />
      </div>

      {/* Floating tech icons with smoother animations */}
      {floatingIcons.map(({ Icon, delay, position, duration }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay, duration: 1.2, ease: "easeOut" }}
          className={`absolute ${position} hidden lg:block`}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration, 
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          >
            <Icon className="w-12 h-12 text-primary/30" />
          </motion.div>
        </motion.div>
      ))}

      {/* Subtle particle effect - Version corrigée */}
      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
              }}
              animate={{ 
                y: [0, -30, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{ 
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <motion.div 
        style={{ opacity, scale }}
        className="flex-1 flex items-center container mx-auto px-4 relative z-10 pt-16"
      >
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Colonne texte — gauche */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={itemVariants}>
              <motion.span 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-primary/80 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="w-3 h-3" />
                <span>Full Stack Developer</span>
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground"
            >
              Jean-Charles{" "}
              <motion.span 
                className="block text-gradient"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                DECOURTHEIX
              </motion.span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              <motion.span 
                className="text-gradient inline-block"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Développeur Full Stack Senior
              </motion.span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-4"
            >
              Expert PHP · Symfony · Vue.js · DevOps
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl text-balance"
            >
              Je conçois des Applications métier pour optimiser vos processus
            </motion.p>

            <motion.div
              variants={badgeContainerVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              {techBadges.map((badge, index) => (
                <motion.span
                  key={badge.label}
                  variants={badgeVariants}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -2,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transition: { type: "spring", damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium
                    bg-white/10 backdrop-blur-md
                    border border-white/20 ${badge.accent}
                    text-foreground/90
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.1)]
                    transition-all duration-300 cursor-default select-none
                  `}
                >
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Boutons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="gradient-primary text-white hover:opacity-90 transition-opacity relative overflow-hidden group"
                >
                  <a href="#experience">
                    <span className="relative z-10">Voir mes projets</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </a>
                </Button>
              </motion.div>

              {/* Bouton CV */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="glass border-primary/30 hover:border-primary relative overflow-hidden group"
                >
                  <a href="/cv-jean-charles-decourtheix.pdf" download>
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="relative z-10">Télécharger CV</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/5"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 3 }}
                      transition={{ duration: 0.5 }}
                    />
                  </a>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="glass relative overflow-hidden group"
                >
                  <a href="#contact">
                    <span className="relative z-10">Me contacter</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/5"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 3 }}
                      transition={{ duration: 0.5 }}
                    />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Colonne photo — droite */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center order-1 lg:order-2"
          >
            <motion.div 
              className="relative"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              {/* Anneau gradient autour de la photo avec animation */}
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full gradient-primary p-1"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(var(--primary), 0.3)",
                    "0 0 40px rgba(var(--primary), 0.5)",
                    "0 0 20px rgba(var(--primary), 0.3)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/jean_charles.png"
                    alt="Jean-Charles Decourtheix"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Décorations animées */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
              
              {/* Badge de disponibilité */}
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-green-400 border border-green-500/30"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Disponible
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.a
          href="#apropos"
          aria-label="Défiler vers le bas"
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          whileHover={{ scale: 1.2 }}
          className="cursor-pointer block"
        >
          <div className="relative">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary/20 blur-md"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}