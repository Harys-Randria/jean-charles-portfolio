"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Briefcase, Users, Code, Sparkles, Target, Zap, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    value: "8+",
    label: "ans d'expérience",
    description: "Depuis 2016 dans le web",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Briefcase,
    value: "10+",
    label: "projets livrés",
    description: "Du SaaS aux apps métier",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    icon: Users,
    value: "10",
    label: "personnes managées",
    description: "Leadership technique",
    color: "from-amber-500/20 to-amber-600/20"
  },
  {
    icon: Code,
    value: "PHP 5 → 8.4",
    label: "maîtrisé",
    description: "Évolution continue",
    color: "from-emerald-500/20 to-emerald-600/20"
  },
]

const achievements = [
  {
    icon: Target,
    title: "Architecture robuste",
    description: "Conception de systèmes scalables et maintenables"
  },
  {
    icon: Zap,
    title: "Performance optimisée",
    description: "Optimisation des temps de réponse et de charge"
  },
  {
    icon: TrendingUp,
    title: "Innovation continue",
    description: "Veille technologique et adoption des bonnes pratiques"
  }
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Mouse parallax effect avec vérifications
  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      
      // Vérification que sectionRef.current existe
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      
      // Vérification que rect est valide
      if (rect.width === 0 || rect.height === 0) return
      
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (index: number) => ({ 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        delay: 0.1 * index,
      }
    }),
  }

  return (
    <section 
      id="apropos" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Animated background decorations - seulement si monté */}
      {isMounted && (
        <>
          <motion.div 
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
        </>
      )}
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Qui suis-je ?</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            À <span className="text-gradient relative">
              propos
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez mon parcours et ma passion pour le développement
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <p className="text-lg leading-relaxed text-foreground/90 pl-6">
                Avec plus de <span className="font-bold text-primary">8 ans d&apos;expérience</span> dans le développement full stack, 
                j&apos;ai participé à la conception et à la réalisation de projets variés, 
                allant de la refonte de plateformes web complexes à la mise en œuvre de 
                solutions innovantes.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-secondary to-primary rounded-full" />
              <p className="text-lg leading-relaxed text-foreground/90 pl-6">
                Grâce à ma maîtrise des technologies backend et frontend, j&apos;accompagne 
                les entreprises dans la création de systèmes performants, évolutifs et 
                sécurisés. Chaque projet est une opportunité de résoudre des problématiques 
                complexes en combinant expertise technique et collaboration d&apos;équipe.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-primary/50 to-secondary/50 rounded-full" />
              <p className="text-lg leading-relaxed text-foreground/90 pl-6">
                Toujours en <span className="font-bold text-secondary">veille technologique</span>, je m&apos;efforce 
                d&apos;intégrer les dernières innovations pour maximiser l&apos;impact 
                des solutions livrées.
              </p>
            </motion.div>

            {/* Achievement badges */}
            <motion.div variants={itemVariants} className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-center group"
                >
                  <achievement.icon className="w-5 h-5 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{achievement.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats section with visual timeline */}
          <motion.div
            ref={statsRef}
            style={{ y, opacity }}
            className="space-y-6"
          >
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={statVariants}
                    whileHover={{ 
                      y: -8,
                      transition: { type: "spring", damping: 10 }
                    }}
                    className="relative group"
                  >
                    <Card className="glass border-none overflow-hidden">
                      <CardContent className="p-6 text-center relative">
                        {/* Gradient background on hover */}
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:text-white transition-colors" />
                          </motion.div>
                          
                          <motion.div 
                            className="text-2xl md:text-3xl font-bold text-gradient mb-1"
                            animate={statsInView ? { 
                              scale: [1, 1.1, 1],
                            } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          >
                            {stat.value}
                          </motion.div>
                          
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                            {stat.label}
                          </p>
                          <p className="text-xs text-muted-foreground/60 mt-1">
                            {stat.description}
                          </p>
                        </div>

                        {/* Decorative corner */}
                        <motion.div 
                          className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Timeline / Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Ma philosophie de développement
              </h3>
              <div className="space-y-3">
                {[
                  "Code propre et maintenable",
                  "Tests et qualité continue",
                  "Documentation vivante",
                  "Performance par conception"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={statsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative line */}
        <motion.div 
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
      </div>
    </section>
  )
}