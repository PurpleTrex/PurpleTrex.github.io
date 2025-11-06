import { motion } from 'framer-motion';
import { useGitHubUser } from '../../hooks/useGitHub';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatNumber } from '../../lib/utils';
import { generateResumePDF } from '../../lib/resume-pdf';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'octocat';

const professionalInfo = {
  name: 'JOSHUA HAMM',
  location: 'Omaha, NE 68127',
  email: 'PurpleApps.dev@proton.me',
  summary: 'Full Stack Developer with 8+ years of experience designing and implementing scalable web applications and internal tools. Proven expertise in React/TypeScript front-end development and C#/.NET Core back-end systems. Strong background in DevOps practices, RESTful API development, and SQL database optimization. Skilled at automating workflows and building efficient solutions that enhance operational efficiency and user experience.',
  skills: {
    'Front-End': ['React', 'TypeScript', 'JavaScript', 'Vue.js', 'HTML', 'CSS', 'Bootstrap', 'UI/UX Design'],
    'Back-End': ['C#', '.NET Core', 'ASP.NET', 'Node.js', 'Java', 'Python', 'Go'],
    'Databases': ['SQL', 'MySQL', 'MongoDB', 'Redis', 'Database Optimization'],
    'DevOps': ['Git', 'Docker', 'Kubernetes', 'CI/CD', 'Bamboo', 'AWS'],
    'APIs & Integration': ['RESTful APIs', 'GraphQL', 'SOAP', 'OAuth 2.0', 'JWT', 'Microservices'],
    'Development Tools': ['Jira', 'Maven', 'Eclipse', 'Shell Scripting', 'Bash'],
    'Methodologies': ['Agile/Scrum', 'SAFe', 'Design Patterns', 'MVC'],
  },
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'APEX Fintech Solutions',
      location: 'Omaha, NE',
      period: 'July 2018 – Present',
      highlights: [
        'Design and develop full-stack internal web tools using React/TypeScript front-end and C#/.NET Core back-end, serving 500+ internal users and improving operational efficiency by 35%',
        'Build and maintain RESTful APIs and microservices architecture supporting critical financial transaction workflows processing $2M+ daily volume',
        'Implement OAuth 2.0 and JWT-based authorization frameworks ensuring secure authentication across multiple internal applications',
        'Optimize SQL queries and database performance, reducing average query execution time by 40% and improving data integrity across relational database systems',
        'Lead DevOps initiatives utilizing Git, Docker, and CI/CD pipelines to automate deployment processes, reducing release time by 50%',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'First National Bank of Omaha (FNBO)',
      location: 'Omaha, NE',
      period: 'July 2016 – November 2018',
      highlights: [
        'Developed front-end applications using JavaScript frameworks and back-end services with C# and Java for internal banking tools',
        'Created and maintained RESTful web services supporting account management and transaction processing systems',
        'Wrote complex SQL queries and stored procedures for relational databases, ensuring data accuracy and optimal performance',
        'Participated in Agile development team, contributing to sprint planning, daily standups, and retrospectives',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Software Engineering',
    school: 'Bellevue University',
    location: 'Bellevue, NE',
    graduated: 'April 2020',
  },
};

export function About() {
  const { data: user, isLoading } = useGitHubUser(GITHUB_USERNAME);

  const handleDownloadResume = () => {
    generateResumePDF(professionalInfo);
  };

  if (isLoading) {
    return (
      <section id="about" className="section bg-gray-50 dark:bg-gray-800/50">
        <div className="container">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  const stats = user ? [
    { label: 'Public Repositories', value: formatNumber(user.public_repos) },
    { label: 'Followers', value: formatNumber(user.followers) },
    { label: 'Following', value: formatNumber(user.following) },
  ] : [];

  return (
    <section id="about" className="section bg-gray-50 dark:bg-gray-800/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            About Me
          </h2>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              For employers: Feel free to download a PDF version of my resume
            </p>
            <Button onClick={handleDownloadResume} size="lg" className="gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume PDF
            </Button>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {user && (
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full blur-xl opacity-20"></div>
                      <img
                        src={user.avatar_url}
                        alt={professionalInfo.name}
                        className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-2">{professionalInfo.name}</h3>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{professionalInfo.location}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <a href={`mailto:${professionalInfo.email}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {professionalInfo.email}
                        </a>
                      </div>
                    </div>
                    {user && stats.length > 0 && (
                      <div className="flex gap-4 justify-center md:justify-start">
                        {stats.map((stat) => (
                          <div key={stat.label} className="text-center">
                            <div className="text-xl font-bold text-primary-600 dark:text-primary-400">{stat.value}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {professionalInfo.summary}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(professionalInfo.skills).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Professional Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {professionalInfo.experience.map((job, index) => (
                    <div key={index} className={index > 0 ? 'pt-6 border-t border-gray-200 dark:border-gray-700' : ''}>
                      <div className="mb-3">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{job.title}</h4>
                        <div className="text-gray-700 dark:text-gray-300 font-medium">{job.company} – {job.location}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">{job.period}</div>
                      </div>
                      <ul className="space-y-2 list-disc list-inside">
                        {job.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{professionalInfo.education.degree}</h4>
                  <div className="text-gray-700 dark:text-gray-300 font-medium">{professionalInfo.education.school} – {professionalInfo.education.location}</div>
                  <div className="text-gray-600 dark:text-gray-400">Graduated: {professionalInfo.education.graduated}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
