import { motion } from 'framer-motion';
import { useGitHubUser } from '../../hooks/useGitHub';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { formatNumber } from '../../lib/utils';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'octocat';

export function About() {
  const { data: user, isLoading, error } = useGitHubUser(GITHUB_USERNAME);

  if (isLoading) {
    return (
      <section id="about" className="section bg-gray-50 dark:bg-gray-800/50">
        <div className="container">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (error || !user) {
    return null;
  }

  const stats = [
    { label: 'Public Repositories', value: formatNumber(user.public_repos) },
    { label: 'Followers', value: formatNumber(user.followers) },
    { label: 'Following', value: formatNumber(user.following) },
  ];

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
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-600 rounded-full blur-2xl opacity-20"></div>
              <img
                src={user.avatar_url}
                alt={user.name || user.login}
                className="relative w-64 h-64 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold mb-4">{user.name || user.login}</h3>
            {user.bio && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {user.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mb-6 text-gray-600 dark:text-gray-400">
              {user.location && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{user.location}</span>
                </div>
              )}
              {user.blog && (
                <a
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  <span>Website</span>
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary-600 dark:text-primary-400">
                        {stat.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
