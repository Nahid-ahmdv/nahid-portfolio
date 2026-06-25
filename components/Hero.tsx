'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa'
import ParticleBackground from './ParticleBackground'

interface HeroContent {
  greeting: string
  name: string
  taglines: string[]
  bio: string
  ctaButtons: { label: string; href: string; primary: boolean }[]
  socialLinks: { platform: string; url: string }[]
}

const SOCIAL_ICONS: Record<string, any> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  medium: FaMedium,
}

const SOCIAL_COLORS: Record<string, string> = {
  github: 'hover:text-gray-400',
  linkedin: 'hover:text-blue-400',
  instagram: 'hover:text-pink-400',
}

const Hero = ({ content }: { content: HeroContent }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Build the TypeAnimation sequence from taglines
  const typeSequence = content.taglines.flatMap(t => [t, 2000])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Interactive Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground />
        {/* Subtle gradient overlay to blend with page */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 dark:to-gray-900/50 pointer-events-none" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="px-4 py-2 rounded-full glass text-sm text-blue-400 font-semibold">
            {content.greeting}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">{content.name}</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="text-2xl md:text-4xl mb-8 h-20">
          <TypeAnimation
            sequence={typeSequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          {content.bio}
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-6 justify-center mb-12">
          {content.ctaButtons.map((btn, i) => (
            <motion.a
              key={i}
              href={btn.href}
              whileHover={{ scale: 1.05, ...(btn.primary ? { boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)' } : {}) }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full font-semibold ${btn.primary
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'glass text-white'
                }`}
            >
              {btn.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-6 justify-center">
          {content.socialLinks.map((social, index) => {
            const Icon = SOCIAL_ICONS[social.platform] || FaGithub
            const color = SOCIAL_COLORS[social.platform] || 'hover:text-gray-400'
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 glass rounded-full text-white transition-colors ${color}`}
              >
                <Icon size={24} />
              </motion.a>
            )
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero