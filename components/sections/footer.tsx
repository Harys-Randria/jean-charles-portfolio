"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail, ChevronUp, Sparkles, Briefcase, MapPin, Calendar, Calendar as CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#expertise", label: "Expertise" },
  { href: "#competences", label: "Compétences" },
  { href: "#experience", label: "Expérience" },
  { href: "#formation", label: "Formation" },
  { href: "#contact", label: "Contact" },
]

const quickInfo = [
  { icon: MapPin, text: "Bordeaux, France" },
  { icon: Calendar, text: "Disponible immédiatement" },
  { icon: Briefcase, text: "Freelance & CDI" },
]

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/jean-charles-decourtheix/",
    bgColor: "bg-primary/10",
    hoverBg: "hover:bg-primary",
    textColor: "text-primary",
    hoverText: "hover:text-white",
    isCustomIcon: false,
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:jc.decourtheix@outlook.com",
    bgColor: "bg-primary/10",
    hoverBg: "hover:bg-primary",
    textColor: "text-primary",
    hoverText: "hover:text-white",
    isCustomIcon: false,
  },
  {
    icon: null,
    customIcon: "/icons/malt.png",
    label: "Malt",
    href: "https://www.malt.fr/profile/jeancharlesdecourtheix",
    bgColor: "bg-red-50 dark:bg-red-500/10",
    hoverBg: "hover:bg-red-500",
    textColor: "text-red-600 dark:text-red-400",
    hoverText: "hover:text-white",
    isCustomIcon: true,
    hasWhiteBackground: true,
  },
  {
    icon: null,
    customIcon: "/icons/collective.png",
    label: "Collective",
    href: "https://www.collective.work/profile/jeancharles-decourtheix",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    hoverBg: "hover:bg-orange-500",
    textColor: "text-orange-600 dark:text-orange-400",
    hoverText: "hover:text-white",
    isCustomIcon: true,
    hasWhiteBackground: true,
  },
  {
    icon: CalendarIcon,
    label: "Calendly",
    href: "https://calendly.com/jc-decourtheix",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    hoverBg: "hover:bg-purple-500",
    textColor: "text-purple-600 dark:text-purple-400",
    hoverText: "hover:text-white",
    isCustomIcon: false,
  },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
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
      
      if (!footerRef.current) return
      
      const rect = footerRef.current.getBoundingClientRect()
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  return (
    <footer
      ref={footerRef}
      className="relative py-16 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:bg-none border-t border-gray-200 dark:border-white/10"
    >
      {/* Animated background decorations */}
      {isMounted && (
        <>
          <motion.div 
            style={{ x: mousePosition.x, y: mousePosition.y }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div 
            style={{ x: -mousePosition.x * 0.5, y: -mousePosition.y * 0.5 }}
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 dark:bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand column */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-gradient">
                  JC.Dev
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-muted-foreground mb-4">
                Développeur Full Stack Senior spécialisé dans les applications métier et l'optimisation de processus.
              </p>
              
              {/* Social links grid */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.1 }}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                      ${link.bgColor} ${link.textColor} ${link.hoverBg} ${link.hoverText}
                    `}
                    aria-label={link.label}
                  >
                    {link.isCustomIcon && link.customIcon ? (
                      <div className="w-5 h-5 relative">
                        <Image
                          src={link.customIcon}
                          alt={link.label}
                          width={20}
                          height={20}
                          className="object-contain w-5 h-5"
                        />
                      </div>
                    ) : (
                      link.icon && <link.icon className="w-4 h-4" />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-muted-foreground hover:text-primary transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick info */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Informations</h4>
              <ul className="space-y-3">
                {quickInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <li key={index} className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600 dark:text-muted-foreground">
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{info.text}</span>
                    </li>
                  )
                })}
                <li className="pt-2">
                  <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Disponible pour missions
                  </Badge>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-gray-200 dark:border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 dark:text-muted-foreground order-2 md:order-1">
                © 2025 Jean-Charles DECOURTHEIX. Tous droits réservés.
              </p>
              
              <div className="flex items-center gap-4 order-1 md:order-2">
                <Link
                  href="#"
                  className="text-xs text-gray-500 dark:text-muted-foreground hover:text-primary transition-colors"
                >
                  Mentions légales
                </Link>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <Link
                  href="#"
                  className="text-xs text-gray-500 dark:text-muted-foreground hover:text-primary transition-colors"
                >
                  Confidentialité
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}