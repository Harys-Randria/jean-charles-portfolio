"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Calendar, 
  Users, 
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2
} from "lucide-react"

interface ContactMethod {
  icon: any;
  label: string;
  value: string;
  href: string;
  gradient: string;
  bgLight: string;
  bgDark: string;
  isCustomIcon: boolean;
  customIcon?: string;
  hasWhiteBackground?: boolean;
}

const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "07 61 60 74 94",
    href: "tel:0761607494",
    gradient: "from-green-500 to-green-400",
    bgLight: "bg-green-50",
    bgDark: "dark:bg-green-500/10",
    isCustomIcon: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "jean-charles-decourtheix",
    href: "https://linkedin.com/in/jean-charles-decourtheix/",
    gradient: "from-blue-600 to-blue-500",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-600/10",
    isCustomIcon: false,
  },
  {
    icon: null,
    customIcon: "/icons/malt.png",
    label: "Malt",
    value: "Jean-charles Decourtheix",
    href: "https://www.malt.fr/profile/jeancharlesdecourtheix",
    gradient: "from-red-500 to-red-400",
    bgLight: "bg-red-50",
    bgDark: "dark:bg-red-500/10",
    isCustomIcon: true,
    hasWhiteBackground: true,
  },
  {
    icon: null,
    customIcon: "/icons/collective.png",
    label: "Collective",
    value: "Jean-charles Decourtheix",
    href: "https://www.collective.work/profile/jeancharles-decourtheix",
    gradient: "from-orange-500 to-orange-400",
    bgLight: "bg-orange-50",
    bgDark: "dark:bg-orange-500/10",
    isCustomIcon: true,
    hasWhiteBackground: true,
  },
]

export function ContactSection() {
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
    const newParticles = [...Array(8)].map(() => ({
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: index * 0.05,
      }
    }),
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-8 lg:py-12 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:bg-none"
    >
      {/* Animated background decorations */}
      {isMounted && (
        <>
          <motion.div 
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="absolute top-20 left-10 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Restons connectés</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Travaillons <span className="text-gradient relative">
              ensemble
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Prenons rendez-vous pour discuter de votre projet
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Contact info - Grille de contacts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
            >
              Me contacter
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((contact, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 dark:hover:border-primary/30">
                    <CardContent className="p-4">
                      <a
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3"
                      >
                        {/* Icône personnalisée ou Lucide */}
                        {contact.isCustomIcon ? (
                          contact.customIcon ? (
                            <motion.div 
                              className={`
                                w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md dark:shadow-none
                                ${contact.hasWhiteBackground 
                                  ? 'bg-white p-1.5'
                                  : `bg-gradient-to-r ${contact.gradient} p-0`
                                }
                              `}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", damping: 10 }}
                            >
                              <Image
                                src={contact.customIcon}
                                alt={contact.label}
                                width={contact.hasWhiteBackground ? 28 : 24}
                                height={contact.hasWhiteBackground ? 28 : 24}
                                className={`object-contain ${
                                  contact.hasWhiteBackground ? 'w-7 h-7' : 'w-5 h-5'
                                }`}
                              />
                            </motion.div>
                          ) : null
                        ) : (
                          <motion.div 
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${contact.gradient} flex items-center justify-center shrink-0 shadow-md dark:shadow-none`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", damping: 10 }}
                          >
                            {contact.icon && <contact.icon className="w-5 h-5 text-white" />}
                          </motion.div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 dark:text-muted-foreground">
                            {contact.label}
                          </p>
                          <p className="font-medium text-sm text-gray-800 dark:text-white truncate group-hover:text-primary transition-colors">
                            {contact.value}
                          </p>
                        </div>
                        
                        <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Disponibilité */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 bg-green-500/10 dark:bg-green-500/10 rounded-lg border border-green-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white">Disponible</span> pour de nouvelles missions
                </p>
              </div>
            </motion.div>

            {/* Badge de réponse rapide */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 dark:text-gray-500"
            >
              <Clock className="w-4 h-4" />
              <span>Réponse sous 24h</span>
            </motion.div>
          </motion.div>

          {/* Calendly Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full"
          >
            <Card className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/30 dark:hover:border-primary/30 h-full">
              
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <Calendar className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Planifions un rendez-vous
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Choisissez le créneau qui vous convient le mieux
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Gratuit · Sans engagement</span>
                  </div>
                </div>

                {/* Calendly Button */}
                <motion.a
                  href="https://calendly.com/jc-decourtheix"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <Button
                    size="lg"
                    className="w-full gradient-primary text-white hover:opacity-90 transition-opacity relative overflow-hidden group"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="relative z-10">Prendre rendez-vous</span>
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.a>

                {/* Avantages Calendly */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Appel vidéo</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-500">Google Meet / Teams</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Durée</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-500">30 minutes</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

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