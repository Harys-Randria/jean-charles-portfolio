"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Code2, Database, Box, Wrench, Cloud, GitBranch, Layout, Cpu } from "lucide-react"

// Icônes par catégorie pour plus de personnalisation
const categoryIcons: Record<string, React.ElementType> = {
  "Langages Backend": Code2,
  "Frameworks Backend": Box,
  "Langages Frontend": Layout,
  "Frameworks & Bibliothèques Frontend": Layout,
  "Bases de données": Database,
  "Architecture & Patterns": Cpu,
  "DevOps & CI/CD": Cloud,
  "Méthodologies": Wrench,
  "Outils de développement": Wrench,
  "Gestion de version": GitBranch,
  "CMS & E-commerce": Layout,
  "Systèmes d'exploitation": Cpu,
  "Cloud & Infrastructure": Cloud,
  "Autres outils": Wrench,
}

const skillCategories = [
  {
    category: "Langages Backend",
    skills: ["PHP 5 à 8.4", "TypeScript"],
    color: "from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20",
    lightColor: "bg-blue-50 dark:bg-transparent",
  },
  {
    category: "Frameworks Backend",
    skills: ["Symfony (3 à 7)", "Laravel", "CodeIgniter", "Zend", "Laminas"],
    color: "from-purple-100 to-purple-200 dark:from-purple-500/20 dark:to-purple-600/20",
    lightColor: "bg-purple-50 dark:bg-transparent",
  },
  {
    category: "Langages Frontend",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
    color: "from-amber-100 to-amber-200 dark:from-amber-500/20 dark:to-amber-600/20",
    lightColor: "bg-amber-50 dark:bg-transparent",
  },
  {
    category: "Frameworks & Bibliothèques Frontend",
    skills: ["Vue.js","Nuxt.js", "Twig", "Sass"],
    color: "from-emerald-100 to-emerald-200 dark:from-emerald-500/20 dark:to-emerald-600/20",
    lightColor: "bg-emerald-50 dark:bg-transparent",
  },
  {
    category: "Bases de données",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Optimisation de données"],
    color: "from-cyan-100 to-cyan-200 dark:from-cyan-500/20 dark:to-cyan-600/20",
    lightColor: "bg-cyan-50 dark:bg-transparent",
  },
  {
    category: "Architecture & Patterns",
    skills: [
      "Architecture hexagonale",
      "DDD (Domain-Driven Design)",
      "Clean Code",
      "CQRS",
      "APIs RESTful",
      "Reverse engineering",
    ],
    color: "from-rose-100 to-rose-200 dark:from-rose-500/20 dark:to-rose-600/20",
    lightColor: "bg-rose-50 dark:bg-transparent",
  },
  {
    category: "DevOps & CI/CD",
    skills: ["Docker", "GitLab", "Jenkins", "Gitea", "Intégration continue"],
    color: "from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20",
    lightColor: "bg-orange-50 dark:bg-transparent",
  },
  {
    category: "Méthodologies",
    skills: ["Agile", "Scrum", "TMA", "Sprints", "Semi-agilité"],
    color: "from-teal-100 to-teal-200 dark:from-teal-500/20 dark:to-teal-600/20",
    lightColor: "bg-teal-50 dark:bg-transparent",
  },
  {
    category: "Outils de développement",
    skills: [
      "PhpStorm",
      "WebStorm",
      "Postman",
      "Asana",
      "MobaXterm",
      "Workbench",
      "VS Code",
    ],
    color: "from-indigo-100 to-indigo-200 dark:from-indigo-500/20 dark:to-indigo-600/20",
    lightColor: "bg-indigo-50 dark:bg-transparent",
  },
  {
    category: "Gestion de version",
    skills: ["Git", "GitLab", "Gitea"],
    color: "from-pink-100 to-pink-200 dark:from-pink-500/20 dark:to-pink-600/20",
    lightColor: "bg-pink-50 dark:bg-transparent",
  },
  {
    category: "CMS & E-commerce",
    skills: ["WordPress", "Prestashop"],
    color: "from-violet-100 to-violet-200 dark:from-violet-500/20 dark:to-violet-600/20",
    lightColor: "bg-violet-50 dark:bg-transparent",
  },
  {
    category: "Systèmes d'exploitation",
    skills: ["Windows", "Linux", "MacOS"],
    color: "from-slate-100 to-slate-200 dark:from-slate-500/20 dark:to-slate-600/20",
    lightColor: "bg-slate-50 dark:bg-transparent",
  },
  {
    category: "Cloud & Infrastructure",
    skills: ["Amazon Lightsails", "Shell"],
    color: "from-sky-100 to-sky-200 dark:from-sky-500/20 dark:to-sky-600/20",
    lightColor: "bg-sky-50 dark:bg-transparent",
  },
  {
    category: "Autres outils",
    skills: [
      "TurboSync",
      "Wamp",
      "Doctrine",
      "Bootstrap",
      "jQuery",
      "Ajax",
      "JSON",
    ],
    color: "from-gray-100 to-gray-200 dark:from-gray-500/20 dark:to-gray-600/20",
    lightColor: "bg-gray-50 dark:bg-transparent",
  },
]

export function SkillsSection() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.05,
      }
    }),
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        delay: index * 0.01,
      }
    }),
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        damping: 10,
      }
    }
  }

  return (
    <section
      id="competences"
      ref={sectionRef}
      className="py-8 lg:py-12 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:bg-none"
    >
      {/* Animated background decorations - version light mode adaptée */}
      {isMounted && (
        <>
          <motion.div 
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="absolute top-40 right-20 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
            className="absolute bottom-40 left-20 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Floating particles - version light mode */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stack technique</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Compétences <span className="text-gradient relative">
              Techniques
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Les technologies et outils que je maîtrise
          </p>
        </motion.div>

        {/* Skills grid - 2 colonnes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category, categoryIndex) => {
            const Icon = categoryIcons[category.category] || Code2
            
            return (
              <motion.div
                key={category.category}
                custom={categoryIndex}
                variants={categoryVariants}
                whileHover={{ y: -4 }}
                className="group relative h-full"
              >
                <div className={`
                  bg-white dark:bg-white/5 backdrop-blur-sm
                  border border-gray-200 dark:border-white/10
                  rounded-xl p-6 relative overflow-hidden 
                  transition-all duration-300 
                  group-hover:shadow-lg dark:group-hover:shadow-xl
                  ${category.lightColor} dark:bg-transparent
                `}>
                  {/* Gradient overlay on hover - adapté light/dark */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-30 dark:group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Header with icon */}
                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-md dark:shadow-none"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", damping: 10 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-primary">
                        {category.category}
                      </h3>
                    </div>
                    
                    {/* Skill count badge */}
                    <motion.div 
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + categoryIndex * 0.03 }}
                    >
                      {category.skills.length}
                    </motion.div>
                  </div>

                  {/* Skills badges */}
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        custom={skillIndex}
                        variants={badgeVariants}
                        whileHover="hover"
                      >
                        <Badge
                          variant="secondary"
                          className={`
                            px-3 py-1.5 text-sm 
                            bg-gray-100 dark:bg-white/10 
                            text-gray-700 dark:text-gray-300
                            border border-gray-200 dark:border-white/10
                            hover:bg-primary hover:text-white 
                            dark:hover:bg-primary dark:hover:text-white
                            transition-all duration-300 cursor-default
                          `}
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative corner - version light */}
                  <motion.div 
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats summary - version light optimisée */}
        <motion.div 
          style={{ opacity }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          {[
            { label: "Catégories", value: skillCategories.length },
            { label: "Technologies", value: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0) },
            { label: "Frameworks", value: skillCategories.filter(c => c.category.includes("Framework")).reduce((acc, cat) => acc + cat.skills.length, 0) },
            { label: "Outils", value: skillCategories.filter(c => c.category.includes("Outils") || c.category.includes("Autres")).reduce((acc, cat) => acc + cat.skills.length, 0) },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none"
            >
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div 
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </div>
    </section>
  )
}