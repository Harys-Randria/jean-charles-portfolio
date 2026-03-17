"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Users, Settings, Sparkles } from "lucide-react"

const expertiseAreas = [
  {
    icon: Server,
    title: "Expertise Backend & Développement PHP/Symfony",
    description:
      "Maîtrise complète des projets de développement avec PHP 5 à 8.4 et Framework Symfony (3 à 7). Expert en conception d'architectures hexagonales, DDD et clean code, avec pilotage de refontes complexes et développement d'APIs sécurisées. Expérience avérée en reverse engineering, refactorisation de code en CQRS et coordination de projets techniques avec déploiements multi-environnements. Capacité à moderniser des stacks techniques legacy vers des architectures modernes performantes.",
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    icon: Users,
    title: "Leadership Technique & Gestion de Projet",
    description:
      "Expérience avérée en lead développement avec gestion de projets IT end-to-end incluant pilotage de planning, TMA sur applications existantes et coordination d'équipes de 10 personnes. Capacité de mentoring des développeurs, revue de code et collaboration inter-équipes pour delivery orientée qualité. Maîtrise des méthodologies Agile/Scrum avec forte orientation résultats et fiabilité. Analyse concurrentielle fonctionnelle et technologique pour positionnement stratégique.",
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    icon: Settings,
    title: "Architecture & Optimisation de Systèmes",
    description:
      "Spécialiste de l'accompagnement technique avec expertise en rédaction de spécifications techniques et fonctionnelles, création d'environnements et tests techniques et fonctionnels. Forte capacité en refonte de systèmes complexes (rapprochement financier automatique, tunnels de souscription, extranet client). Approche orientée amélioration continue des processus et optimisation des performances avec sécurisation systématique des APIs et intégration de solutions innovantes.",
    color: "from-amber-500/20 to-amber-600/20",
  },
]

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([])
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  useEffect(() => {
    setIsMounted(true)
    const newParticles = [...Array(6)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 0.1 * index,
      }
    }),
  }

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Animated background decorations */}
      {isMounted && (
        <>
          <motion.div 
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Floating particles */}
      {isMounted && particles.length > 0 && (
        <>
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}

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
            <span className="text-sm font-medium">Mon savoir-faire</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Domaines d&apos;<span className="text-gradient relative">
              Expertise
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mes compétences clés pour réussir vos projets
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ 
                  y: -5,
                  transition: { type: "spring", damping: 15 }
                }}
                className="h-full"
              >
                <Card className="h-full glass border-none overflow-hidden relative group">
                  {/* Gradient overlay on hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", damping: 10 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {area.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {area.description}
                    </p>
                  </CardContent>

                  {/* Decorative corner */}
                  <motion.div 
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  />
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom decorative element */}
        <motion.div 
          style={{ opacity }}
          className="mt-16 text-center"
        >
          <motion.p 
            className="text-sm text-muted-foreground/60 inline-flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="w-1 h-1 rounded-full bg-primary" />
            {expertiseAreas.length} domaines d'expertise complémentaires
            <span className="w-1 h-1 rounded-full bg-secondary" />
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}