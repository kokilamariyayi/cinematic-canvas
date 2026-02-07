import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, User, Code, Award, Lightbulb } from 'lucide-react';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { RobotScene } from '@/components/RobotScene';
import { AnimatedSection } from '@/components/AnimatedSection';
import { PageTransition } from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const storyItems = [
  {
    icon: User,
    title: 'Who I Am',
    description:
      'A curious engineer driven by the intersection of design and technology. I believe that great software should feel as good as it looks.',
  },
  {
    icon: Code,
    title: 'What I Do',
    description:
      'Full-stack development with a focus on React, TypeScript, and modern web technologies. I build performant, accessible experiences that scale.',
  },
  {
    icon: Award,
    title: 'What I\'ve Built',
    description:
      'From AI-powered platforms to real-time analytics dashboards — projects that solve real problems and push boundaries.',
  },
  {
    icon: Lightbulb,
    title: 'How I Think',
    description:
      'Every line of code is a design decision. I approach engineering with the mindset of a craftsman — simplicity, clarity, and intention.',
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
        <RobotScene />

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-mesh" aria-hidden="true" />

        <div className="container relative z-10 px-6 md:text-left text-center">
          <motion.div
            variants={reducedMotion ? {} : containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl md:max-w-lg lg:max-w-xl"
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
              <span className="text-gradient-primary">Alex Chen</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mt-4 max-w-xl"
            >
              Full-Stack Developer & Creative Engineer
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mt-8"
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
              Engineering discipline meets creative vision.
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
