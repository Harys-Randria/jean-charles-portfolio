"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Briefcase, ChevronRight, Sparkles } from "lucide-react"

const experiences = [
  {
    period: "09/2025 - 11/2025",
    company: "Sancare",
    role: "Développeur Full Stack PHP-Symfony Freelance",
    location: "Paris 2e",
    description:
      "Sancare est une start-up française spécialisée dans l'analyse et la valorisation des données médicales grâce à l'intelligence artificielle. Elle développe une solution de machine learning destinée aux hôpitaux pour automatiser et fiabiliser le codage des séjours, améliorant ainsi la qualité et la performance du traitement des données hospitalières.",
    projects: [
      {
        name: "Réalli — TMA sur application existante",
        tasks: ["Refonte en architecture hexagonale"],
      },
      {
        name: "Codage — TMA sur application existante",
        tasks: ["Refonte en architecture hexagonale"],
      },
    ],
    stack: [
      "PHP 8.3→8.4",
      "Symfony 7",
      "TypeScript",
      "Vue.js",
      "GitLab",
      "Windows",
      "Architecture hexagonale",
      "DDD",
      "Clean Code",
    ],
  },
  {
    period: "02/2024 - 09/2025",
    company: "INVESTLEASE",
    role: "LEAD Développeur Full Stack Freelance",
    location: null,
    description:
      "Investlease est une société de leasing de matériel pour professionnels. La plateforme permet de proposer des demandes de financement auprès de plusieurs établissements financiers et investisseurs, et permet aux équipes de gérer un financement de A à Z (constitution du dossier, gestion de flux, cession en fin de contrat). Au sein d'une équipe de 10 personnes.",
    projects: [
      {
        name: "Plateforme — TMA sur application existante",
        tasks: [
          "État des lieux",
          "Reverse engineering en vue de l'amélioration du système de rapprochement financier automatique",
          "Rédaction de spécifications techniques et fonctionnelles",
          "Ajout de fonctionnalités, développement d'API",
          "Sécurisation des API",
          "Module de facture d'achat",
          "Dashboard suivi de facturation",
          "Module export comptable",
          "Refonte du rapprochement financier manuel",
          "Revue de code",
          "Analyse concurrentielle (fonctionnelle et technologique)",
        ],
      },
      {
        name: "Sécurisation Réseau et poste",
        tasks: [
          "Mise en place d'un réseau collaborateur",
          "Création d'accès VPN",
          "Mise en place de softphone",
        ],
      },
    ],
    stack: [
      "PHP 8.1→8.2",
      "Symfony 6",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Twig",
      "GitLab",
      "Windows",
      "Amazon Lightsails",
      "Postman",
      "Shell",
      "MySQL",
      "Docker",
      "TurboSync",
    ],
  },
  {
    period: "03/2021 - 12/2023",
    company: "Bordeaux Métropole Énergie",
    role: "Développeur PHP Full Stack Freelance",
    location: null,
    description:
      "BME est l'acteur principal de distribution de gaz en Gironde et d'énergie sur l'ensemble du territoire. Au sein d'un SI d'une trentaine de personnes.",
    projects: [
      {
        name: "ExtranetDom (Espace client)",
        tasks: [
          "Maintenance de l'applicatif existant",
          "Rédaction de spécifications techniques et fonctionnelles",
          "Ajout de fonctionnalités, développement d'API",
          "Sécurisation des API",
          "Intégration de contenu",
          "Reverse engineering en vue de séparation fonctionnelle",
          "Tests techniques et fonctionnels",
          "Revue de code",
        ],
      },
      {
        name: "GDBSouscription (Tunnel de souscription)",
        tasks: [
          "Refonte du tunnel de souscription",
          "Analyse du besoin et des points de vulnérabilité",
          "Refactorisation du code en CQRS",
          "Intégration Vue.js",
          "Rédaction de spécifications techniques et fonctionnelles",
          "Création d'environnements",
          "Tests techniques et fonctionnels",
          "Revue de code",
        ],
      },
      {
        name: "Front Office",
        tasks: [
          "TMA sur application existante",
          "Ajout de fonctionnalités",
          "Reverse Engineering",
        ],
      },
    ],
    stack: [
      "PHP 5.6→8.1",
      "Zend2",
      "Laminas",
      "Symfony 5.4",
      "HTML5",
      "CSS3",
      "Sass",
      "JavaScript",
      "Twig",
      "Vue.js",
      "Gitea",
      "Windows",
      "MobaXterm",
      "Jenkins",
      "Postman",
    ],
  },
  {
    period: "03/2020 - 07/2020",
    company: "gridky.com",
    role: "Développeur PHP Full Stack Freelance",
    location: null,
    description:
      "Gridky est une start-up qui propose un comparateur de bien immobilier intelligent, permettant de simplifier l'investissement ainsi que la réduction d'impôt.",
    projects: [
      {
        name: "Application principale",
        tasks: [
          "Analyse de l'existant",
          "Maintenance corrective et évolutive de l'applicatif",
          "Ajout de fonctionnalités",
          "Intégration du contenu",
          "Reverse engineering",
          "Tests techniques et fonctionnels de l'application",
          "Rédaction de la documentation technique et fonctionnelle",
        ],
      },
    ],
    stack: [
      "PHP 7",
      "Laravel 7",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Vue.js",
      "SQL",
      "Postman",
      "MySQL",
      "Linux",
    ],
  },
  {
    period: "03/2019 - 03/2020",
    company: "garantie-privee.com",
    role: "Concepteur Développeur PHP Full Stack Freelance",
    location: null,
    description:
      "Garantie-privée est une filiale d'Ealis Groupe, spécialisée dans l'assurance et l'extension de garantie. Équipe de 6 collaborateurs. Interventions sur plusieurs projets en parallèle. Semi-agilité, sprints de 2 semaines.",
    projects: [
      {
        name: "Maintenance de l'applicatif existant (garantie-privee.com)",
        tasks: [
          "Rédaction de spécifications techniques et fonctionnelles",
          "Ajout de fonctionnalités, développement d'API",
          "Création de l'interface de suivi de vente",
          "Intégration du contenu",
          "Reverse engineering",
          "Création d'environnements",
          "Mise en place du versioning",
          "Tests techniques et fonctionnels",
          "Approche DevOps",
        ],
      },
      {
        name: "Cigusto (franchise de cigarettes électroniques)",
        tasks: [
          "MCO de la plateforme",
          "Maintenance corrective et évolutive de l'application",
          "Correction et développement de nouvelles fonctionnalités",
          "Reprise de données",
          "Correction de bugs et amélioration de la performance",
          "Création d'un environnement de préproduction",
        ],
      },
      {
        name: "FNAC France et FNAC Belgique",
        tasks: [
          "Développement d'un outil de suivi de vente d'assurance à granularité variable",
          "Analyse et création de nouveaux modules",
          "Développement et amélioration d'un outil de suivi du parcours de souscription",
          "Amélioration/vérification IBAN",
          "Modification, appel et réponse API",
          "Mise en place d'une nouvelle API sur les différents environnements",
          "Récupération de paniers et informations client",
        ],
      },
      {
        name: "BUT",
        tasks: [
          "Analyse et développement d'un module pour une offre produit spécifique",
          "Création de nouveaux modules (ajout de produits éligibles)",
          "Gestion des doublons",
          "Test du module",
        ],
      },
    ],
    stack: [
      "PHP 7",
      "CodeIgniter 3",
      "HTML5",
      "CSS3",
      "JavaScript",
      "SQL",
      "MySQL",
      "GitLab",
      "Linux",
      "MobaXterm",
      "Workbench",
      "Postman",
    ],
  },
  {
    period: "01/2018 - 12/2020",
    company: "Béta-Alternative",
    role: "Développeur PHP Full Stack Freelance",
    location: null,
    description:
      "Béta-Alternative est un forum d'échanges de bons plans voyages et une plateforme de mise en relation avec les ambassades.",
    projects: [
      {
        name: "Plateforme complète",
        tasks: [
          "Cadrage du projet",
          "Rédaction des spécifications techniques du projet",
          "Création de templates Twig à partir des maquettes",
          "Configuration et migration vers VP5",
          "Développement de nouvelles fonctionnalités front-office",
          "Développement d'un système de notifications",
          "Développement d'une barre de recherche dynamique",
          "Développement d'un moteur de recherche avec filtres",
          "Développement d'un back-office pour la gestion des utilisateurs et modération du forum",
          "Tests techniques et fonctionnels de l'application",
        ],
      },
    ],
    stack: [
      "PHP 7",
      "Symfony 3.4",
      "HTML5",
      "CSS3",
      "Ajax",
      "JSON",
      "Bootstrap",
      "jQuery",
      "GitLab",
      "PhpStorm",
      "Wamp",
      "Doctrine",
      "MySQL",
    ],
  },
  {
    period: "01/2017 - présent",
    company: "Diverses PME & Auto-entrepreneurs",
    role: "Développeur Full Stack Freelance",
    location: null,
    description: "Pour le compte de diverses PME et auto-entrepreneurs.",
    projects: [
      {
        name: "Missions diverses",
        tasks: [
          "Développement, paramétrage, installation de sites web et de plug-ins",
          "Travaux de référencement (SEO)",
          "Refonte du site web www.cattoen.fr",
          "Reprise technique du site escale-bijoux.biz",
          "Reprise technique du site lilo-marques.com",
          "Développement full-stack / méthodologie Agile",
          "Migration base de données Prestashop",
          "Installation CMS",
          "Ajout et paramétrage de blog",
        ],
      },
    ],
    stack: ["PHP 5→8.3", "Prestashop", "WordPress", "SQL", "GitLab", "HTML", "CSS", "Agile"],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([])
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

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

  const toggleProject = (projectKey: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectKey]: !prev[projectKey]
    }))
  }

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
        delay: index * 0.1,
      }
    }),
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:bg-none"
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
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Parcours professionnel</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Expériences <span className="text-gradient relative">
              Professionnelles
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Mon parcours professionnel en tant que développeur freelance
          </p>
        </motion.div>

        {/* Timeline - Version moderne sans ligne verticale */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {experiences.map((exp, index) => {
            const projectKey = `${exp.company}-${index}`
            
            return (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="group"
              >
                <Card className="bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Gradient bar on top */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />
                  
                  <CardHeader className="pb-2">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="gradient-primary text-white border-0">
                            {exp.company}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </div>
                        
                        <CardTitle className="text-lg text-gray-800 dark:text-white">
                          {exp.role}
                        </CardTitle>
                        
                        {exp.location && (
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <Briefcase className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed bg-gray-50 dark:bg-white/5 p-4 rounded-lg">
                      {exp.description}
                    </p>

                    {/* Projects */}
                    <div className="space-y-4">
                      {exp.projects.map((project, pIndex) => {
                        const isExpanded = expandedProjects[`${projectKey}-${pIndex}`]
                        const displayedTasks = isExpanded ? project.tasks : project.tasks.slice(0, 3)
                        
                        return (
                          <div key={pIndex} className="border-l-2 border-primary/30 pl-4">
                            <h4 className="font-semibold text-sm text-gray-800 dark:text-white mb-2">
                              {project.name}
                            </h4>
                            
                            <ul className="space-y-1.5">
                              {displayedTasks.map((task, tIndex) => (
                                <motion.li
                                  key={tIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: tIndex * 0.05 }}
                                  className="text-xs text-gray-600 dark:text-muted-foreground flex items-start gap-2"
                                >
                                  <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{task}</span>
                                </motion.li>
                              ))}
                            </ul>

                            {project.tasks.length > 3 && (
                              <button
                                onClick={() => toggleProject(`${projectKey}-${pIndex}`)}
                                className="mt-2 text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                              >
                                {isExpanded ? "Voir moins" : `Voir les ${project.tasks.length - 3} autres tâches`}
                                <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Stack technique */}
                    <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                      <p className="text-xs font-medium text-gray-500 dark:text-muted-foreground mb-2">
                        Stack technique :
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.stack.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
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