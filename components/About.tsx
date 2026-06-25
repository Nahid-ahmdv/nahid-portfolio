'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FaCode, FaRocket, FaUsers, FaAward, FaGraduationCap, FaTrophy, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaStar, FaFire } from 'react-icons/fa'

import { useEffect, useState } from 'react'

const ICON_MAP: Record<string, any> = {
  FaCode, FaRocket, FaUsers, FaAward, FaGraduationCap, FaTrophy, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaStar, FaFire,
}

const SOCIAL_ICONS: Record<string, any> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
}

const SOCIAL_COLORS: Record<string, string> = {
  github: 'hover:text-gray-400',
  linkedin: 'hover:text-blue-400',
  email: 'hover:text-red-400',
}

const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState('0')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return

    // Extract numbers and non-numbers (e.g., '10+' -> num: 10, suffix: '+', '8.85' -> num: 8.85)
    const match = value.match(/([\d.]+)(.*)/)
    if (!match) {
      setCount(value)
      return
    }

    const num = parseFloat(match[1])
    const suffix = match[2] || ''
    const isFloat = match[1].includes('.')
    const decimals = isFloat ? match[1].split('.')[1].length : 0

    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const currentVal = num * easeProgress

      setCount(currentVal.toFixed(decimals) + suffix)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      } else {
        setCount(value) // ensure exact final value
      }
    }

    animationFrame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrame)
  }, [inView, value, duration])

  return <span ref={ref}>{count}</span>
}

const About = ({ content }: { content: any }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = content.stats.map((s: any) => ({ ...s, icon: ICON_MAP[s.icon] || FaCode }))
  const education = content.education
  const expertise = content.expertise
  const socialLinks = content.socialLinks.map((s: any) => ({
    icon: SOCIAL_ICONS[s.platform] || FaGithub,
    url: s.url,
    label: s.label || s.platform,
    color: SOCIAL_COLORS[s.platform] || 'hover:text-gray-400',
  }))
  const topSkills = content.topSkills
  const languages = content.languages

  return (
    <section id="about" className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg">{content.subtitle}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass p-6 rounded-xl text-center"
            >
              <stat.icon className={`text-4xl ${stat.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold mb-2">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Centered Profile Card & Bio - EQUAL HEIGHT */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Left Column - Profile Picture Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-2xl flex flex-col h-full"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-4"
            >
              <div className="relative w-48 h-48 mx-auto">
                {/* Animated Border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
                >
                  <div className="w-full h-full rounded-full bg-gray-900" />
                </motion.div>

                {/* Profile Image */}
                <div className="absolute inset-0 m-1">
                  <Image
                    src={content.profileImage}
                    alt={content.fullName}
                    width={192}
                    height={192}
                    className="rounded-full object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Status Badge */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900"
                  title="Available for opportunities"
                />
              </div>
            </motion.div>

            {/* Name & Title */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2 gradient-text">{content.fullName}</h3>
              <p className="text-gray-400 text-sm mb-1">{content.title}</p>
              <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {content.availability}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-4">
              {socialLinks.map((social: any, index: number) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 glass rounded-full transition-colors ${social.color}`}
                  title={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Quick Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10">
                <FaMapMarkerAlt className="text-pink-400 text-lg flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{content.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10">
                <FaGraduationCap className="text-purple-400 text-lg flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{content.graduationDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10">
                <FaBriefcase className="text-blue-400 text-lg flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{content.workStatus}</span>
              </div>
            </div>

            {/* Top Skills Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <FaFire className="text-orange-400 text-xl" />
                <h4 className="font-bold text-white">Top Skills</h4>
              </div>
              <div className="space-y-2">
                {topSkills.map((skill: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-sm text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🌐</span>
                <h4 className="font-bold text-white">Languages</h4>
              </div>
              <div className="space-y-6 flex-grow">
                {languages.map((lang: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-white">{lang.name}</span>
                    <span className="text-gray-400 text-xs">{lang.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Who I Am */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-8 rounded-2xl flex flex-col h-full"
          >
            <h3 className="text-3xl font-bold mb-6 gradient-text">Who I Am</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed flex-grow">
              {content.bio.map((paragraph: string, i: number) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            {/* Contact Info - At Bottom */}
            <div className="mt-6 pt-6 border-t border-gray-300 dark:border-white/10">
              <div className="grid grid-cols-1 gap-3">
                <a
                  href={`mailto:${content.email}`}
                  className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group"
                >
                  <FaEnvelope className="text-blue-400 text-lg flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white truncate">{content.email}</span>
                </a>
                <a
                  href={`tel:${content.phone}`}
                  className="flex items-center gap-3 text-sm p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group"
                >
                  <FaPhone className="text-green-400 text-lg flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{content.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Expertise Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Focus Areas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {expertise.map((area: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{area.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">{area.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Timeline - Enhanced with Animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass p-8 rounded-2xl mb-8 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.75 }}
            className="text-2xl font-bold mb-8 flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FaGraduationCap className="text-purple-400" />
            </motion.div>
            Educational Journey
          </motion.h3>

          <div className="relative space-y-8">
            {/* Animated vertical line */}
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute left-[15px] top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-50"
            />

            {education.map((edu: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.9 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="relative pl-12"
              >
                {/* Animated timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.9 + index * 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                  className="absolute left-0 top-4 z-10"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.7)',
                        '0 0 0 10px rgba(59, 130, 246, 0)',
                        '0 0 0 0 rgba(59, 130, 246, 0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      delay: index * 0.3
                    }}
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center"
                  >
                    <FaGraduationCap className="text-white text-xs" />
                  </motion.div>
                </motion.div>

                {/* Education card with gradient border */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`bg-gradient-to-r ${edu.color} p-0.5 rounded-xl shadow-lg`}
                >
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-xl">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <motion.h4
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 1 + index * 0.2 }}
                        className="text-lg font-bold text-gray-900 dark:text-white"
                      >
                        {edu.degree}
                      </motion.h4>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1.1 + index * 0.2 }}
                        className="text-sm px-4 py-1.5 bg-gray-200 dark:bg-white/10 rounded-full text-gray-700 dark:text-gray-300 font-medium"
                      >
                        {edu.period}
                      </motion.span>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.2 + index * 0.2 }}
                      className="text-blue-600 dark:text-blue-400 font-semibold mb-3 flex items-center gap-2"
                    >
                      <FaMapMarkerAlt className="text-sm" />
                      {edu.institution}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.3 + index * 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <FaStar className="text-yellow-500 dark:text-yellow-400" />
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg">{edu.grade}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">Key Highlights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.highlights.map((h: any, i: number) => (
              <div key={i} className={`p-4 ${h.bgColor} rounded-lg border ${h.borderColor} ${h.hoverColor} transition-all`}>
                <div className="text-3xl mb-2">{h.emoji}</div>
                <h4 className="font-bold mb-1">{h.title}</h4>
                <p className="text-sm text-gray-400">{h.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About