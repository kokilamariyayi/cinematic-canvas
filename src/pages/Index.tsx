import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, User, Code, Award, Lightbulb } from 'lucide-react';
import { ParticleCanvas } from '@/components/ParticleCanvas';

import { AnimatedSection } from '@/components/AnimatedSection';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const storyItems = [
  {
    icon: User,
    title: 'Who I Am',
    description:
      'An aspiring AI & ML engineer with a strong foundation in data analysis, statistics, and machine learning — driven by curiosity and a passion for impactful technology.',
  },
  {
    icon: Code,
    title: 'What I Do',
    description:
      'Building intelligent systems with Python, NLP, LLMs, and cloud technologies. From sentiment analysis to fraud detection — I turn data into decisions.',
  },
  {
    icon: Award,
    title: 'What I\'ve Built',
    description:
      'AI-powered expense forecasting tools, sentiment analysis platforms, fraud detection systems, and voice-controlled assistants for elderly care.',
  },
  {
    icon: Lightbulb,
    title: 'How I Think',
    description:
      'Every dataset tells a story. I approach problems with analytical thinking and visualization skills to derive meaningful insights and support data-driven decisions.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Index = () => {
  const reducedMotion = useReducedMotion();

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />
        

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-mesh" aria-hidden="true" />

        <div className="container relative z-10 px-6 text-center flex flex-col items-center">
          <motion.div
            variants={reducedMotion ? {} : containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.p
              variants={itemVariants}
              className="text-primary font-mono text-sm tracking-widest uppercase mb-4"
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight"
            >
              <span className="text-gradient-primary">Kokila M</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mt-4 max-w-xl"
            >
              Aspiring AI & ML Engineer
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Button variant="glow" size="lg" asChild>
                <Link to="/contact">Hire Me</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">View Projects</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
              The Story
            </h2>
            <p className="text-muted-foreground text-center max-w-lg mx-auto mb-16">
              Data science meets creative problem-solving.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {storyItems.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300">
                  <item.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Let's Build Something{' '}
              <span className="text-gradient-primary">Great</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              I'm open to new opportunities and exciting collaborations.
            </p>
            <Button variant="glow" size="lg" asChild>
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
