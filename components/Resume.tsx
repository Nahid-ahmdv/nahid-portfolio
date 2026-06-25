'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaDownload,
  FaEye,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaCertificate,
  FaTrophy,
  FaExternalLinkAlt,
} from 'react-icons/fa'

const Resume = ({ content }: { content: any }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const resumeData = content

  const handleViewResume = () => {
    window.open('/resume.pdf', '_blank')
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = content.resumeFileName || 'Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderCertificationContent = (cert: any) => (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2" />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-white font-semibold text-sm leading-tight">
            {cert.name}
          </h4>

          {cert.credentialUrl && (
            <FaExternalLinkAlt className="text-green-400 text-xs flex-shrink-0 mt-1" />
          )}
        </div>

        <div className="flex justify-between items-center gap-2 mb-2">
          <p className="text-gray-400 text-xs truncate">{cert.issuer}</p>
          <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
            {cert.date}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {cert.skills.map((skill: string, i: number) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>

          <p className="text-gray-400 text-lg mb-8">
            View my data science and machine learning resume
          </p>

          {/* Contact Info */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {content.email && (
              <div className="flex items-center gap-2">
                <span>📧</span>
                <a
                  href={`mailto:${content.email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {content.email}
                </a>
              </div>
            )}

            {content.phone && (
              <div className="flex items-center gap-2">
                <span>📱</span>
                <a
                  href={`tel:${content.phone}`}
                  className="hover:text-green-400 transition-colors"
                >
                  {content.phone}
                </a>
              </div>
            )}

            {content.rollNo && (
              <div className="flex items-center gap-2">
                <span>🎓</span>
                <span>Roll No: {content.rollNo}</span>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Education & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Education */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaGraduationCap className="text-purple-400" />
                Education
              </h3>

              <div className="space-y-4">
                {resumeData.education.map((edu: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/5 hover:border-green-500/30 transition-all"
                  >
                    <h4 className="font-bold text-base text-white mb-1">
                      {edu.degree}
                    </h4>

                    {edu.field && (
                      <p className="text-purple-400 font-semibold text-sm mb-2">
                        {edu.field}
                      </p>
                    )}

                    <p className="text-gray-400 text-xs mb-2 leading-relaxed">
                      {edu.institution}
                    </p>

                    <div className="flex justify-between items-center text-sm gap-2">
                      <span className="text-gray-500 text-xs">{edu.period}</span>
                      <span className="text-green-400 font-bold text-sm flex-shrink-0">
                        {edu.grade}
                      </span>
                    </div>

                    {edu.rollNo && (
                      <p className="text-xs text-gray-500 mt-2">
                        Roll No: {edu.rollNo}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaCertificate className="text-green-400" />
                Certifications
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {resumeData.certifications.map((cert: any, index: number) =>
                  cert.credentialUrl ? (
                    <motion.a
                      key={index}
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="block p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/5 hover:border-green-500/30 transition-all"
                    >
                      {renderCertificationContent(cert)}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-300 dark:border-white/5 hover:border-green-500/30 transition-all"
                    >
                      {renderCertificationContent(cert)}
                    </motion.div>
                  )
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaCode className="text-blue-400" />
                Quick Stats
              </h3>

              <div className="space-y-3">
                {(content.quickStats || [
                  { label: 'M.Sc. GPA', value: '18.55/20' },
                  { label: 'ML Projects', value: '10+' },
                  { label: 'Medium Articles', value: '10+' },
                  { label: 'B.Sc. Rank', value: '1st' },
                  { label: 'Publication', value: 'PRA' },
                ]).map((stat: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className="text-white font-bold">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Projects & Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Projects & Experience */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <FaBriefcase className="text-blue-400" />
                Projects & Experience
              </h3>

              <div className="space-y-8">
                {resumeData.experience.map((exp: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Line and Dot */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/30">
                      <div className="absolute top-2 -left-[7px] w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900" />
                    </div>

                    {/* Content */}
                    <div className="pl-8">
                      <div className="mb-3">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="text-xl font-bold text-white pr-2">
                            {exp.title}
                          </h4>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        <p className="text-blue-400 font-semibold text-sm mb-1">
                          {exp.company}
                        </p>

                        <p className="text-gray-500 text-sm">{exp.period}</p>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                Achievements
              </h3>

              <div className="space-y-4">
                {resumeData.achievements.map((achievement: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-5 rounded-xl bg-gradient-to-r ${achievement.color} bg-opacity-10 border border-gray-300 dark:border-white/10`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">
                        {achievement.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-bold text-white">
                            {achievement.title}
                          </h4>

                          <span className="text-xs text-gray-300 whitespace-nowrap flex-shrink-0">
                            {achievement.date}
                          </span>
                        </div>

                        <p className="text-sm text-white">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Want to know more?</h3>

          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          View or download my resume for a concise overview of my technical skills, projects, and academic background.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              onClick={handleViewResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg flex items-center gap-2"
            >
              <FaEye />
              View Resume
            </motion.button>

            <motion.button
              onClick={handleDownloadResume}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white inline-flex items-center gap-2"
            >
              <FaDownload />
              Download PDF
            </motion.button>

            <motion.a
              href={content.githubProfileUrl || 'https://github.com/Nahid-ahmdv'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white shadow-lg flex items-center gap-2"
            >
              <FaCode />
              GitHub Profile
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
      `}</style>
    </section>
  )
}

export default Resume