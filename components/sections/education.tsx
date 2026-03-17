"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Globe, Sparkles, Calendar, Award } from "lucide-react"

const education = [
  {
    date: "Avril 2017",
    school: "Wild Code School",
    diploma: "Certification Développeur Web",
    description: "Formation intensive aux technologies web modernes",
    skills: ["PHP", "JavaScript", "Symfony", "MySQL"],
  },
  {
    date: "Décembre 2016",
    school: "Philomathique de Bordeaux",
    diploma: "Certification Développeur et Intégrateur Web",
    description: "Formation aux fondamentaux du développement web et de l'intégration",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
]

const languages = [
  {
    flag: "🇫🇷",
    language: "Français",
    level: "Langue natale",
    proficiency: 100,
    color: "from-blue-500 to-blue-400",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-500/10",
  },
  {
    flag: "🇬🇧",
    language: "Anglais",
    level: "Niveau professionnel",
    proficiency: 85,
    color: "from-purple-500 to-purple-400",
    bgLight: "bg-purple-50",
    bgDark: "dark:bg-purple-500/10",
  },
]

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  useEffect(() => {
    setIsMounted(true)
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.15,
      }
    }),
  }

  return (
    <section
      id="formation"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:bg-none"
    >
      {/* Animated background decorations */}
      {isMounted && (
        <>
          <motion.div 
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="absolute top-20 right-20 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 dark:bg-primary/20 rounded-full"
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
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Formation Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Parcours académique</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-gradient relative">
              Formation
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Mon parcours académique et mes certifications
          </p>
        </motion.div>

        {/* Formation Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20"
        >
          {education.map((edu, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="h-full bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 dark:hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-md dark:shadow-none"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", damping: 10 }}
                    >
                      <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-primary/10 text-primary border-0 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {edu.date}
                        </Badge>
                        <Award className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                      </div>
                      
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1">
                        {edu.school}
                      </h3>
                      <p className="text-primary font-medium text-sm mb-2">
                        {edu.diploma}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-muted-foreground mb-3">
                        {edu.description}
                      </p>
                      
                      {/* Skills mini badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {edu.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className="text-xs bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-primary/30 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Langues Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none mb-4"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Langues parlées</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-gradient relative">
              Langues
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Les langues que je pratique
          </p>
        </motion.div>

        {/* Langues Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto"
        >
          {languages.map((lang, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="w-full sm:w-64"
            >
              <Card className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 dark:hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${lang.color} flex items-center justify-center shadow-md dark:shadow-none`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", damping: 10 }}
                    >
                      <span className="text-3xl" role="img" aria-label={lang.language}>
                        {lang.flag}
                      </span>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {lang.language}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-muted-foreground mb-2">
                        {lang.level}
                      </p>
                      
                      {/* Barre de progression */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">Niveau</span>
                          <span className="text-primary font-medium">{lang.proficiency}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${lang.proficiency}%` } : { width: 0 }}
                            transition={{ delay: 0.8 + index * 0.2, duration: 1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${lang.color}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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