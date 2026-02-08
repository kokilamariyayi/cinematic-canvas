import { Download, Briefcase, GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const internships = [
  {
    role: 'Artificial Intelligence Intern',
    company: 'Infosys Springboard 6.0',
    period: 'Sep — Dec 2025',
    description:
      'Designed an AI-based Expense Forecasting Tool using Python and included a chatbot module for user interaction.',
  },
  {
    role: 'Emerging Technologies (AI & Cloud)',
    company: 'Edunet Foundation (AICTE)',
    period: 'Jul — Aug 2025',
    description:
      'Built a cloud-based ML Prediction system using IBM AutoAI involving automated feature engineering, model training and evaluation.',
  },
  {
    role: 'Data Analytics Intern',
    company: 'NoviTech R&D Pvt. Ltd, Coimbatore',
    period: 'Aug — Sep 2024',
    description:
      'Built an HR Analysis Dashboard using Power BI to analyze workforce metrics such as employee distribution, attrition trends, and performance indicators.',
  },
];

const education = [
  {
    degree: 'B.Tech Artificial Intelligence And Data Science',
    school: 'Anna University, Nehru Institute Of Engineering And Technology, Coimbatore',
    period: '2023 — 2027',
    detail: '8.79 CGPA',
  },
  {
    degree: 'HSC & SSLC',
    school: 'State Board, Dhanalakshmi Srinivasan Higher Secondary School, Perambalur',
    period: '2022 — 2023',
    detail: '89.99%',
  },
];

const certifications = [
  'Google Business Intelligence — Coursera & Google (2025)',
  'Deep Learning For Developers — Infosys (2025)',
  'Introduction to LLMs — NPTEL (2025)',
  'Deep Learning — NPTEL (2025)',
  'IBM Generative AI Engineering — IBM & Coursera (2025)',
  'Prompt Engineering — Infosys (2025)',
  'Microsoft AI & ML Engineering — Microsoft & Google (2025)',
  'SQL & Relational Databases — Cognizant & IBM (2024)',
];

const workshops = [
  {
    title: 'Full Stack Web Application Development',
    org: 'Entire Skill, Coimbatore',
    period: 'Nov 2025 (3 days)',
  },
  {
    title: 'Generative AI, LLMs, and Prompt Engineering',
    org: 'Gateway Software Solutions, Coimbatore',
    period: 'Mar 2025 (7 days)',
  },
  {
    title: 'Python Programming Skills',
    org: 'Gateway Software Solutions, Coimbatore',
    period: 'Sep — Oct 2024 (6 days)',
  },
  {
    title: 'Codeless Data Science',
    org: 'Industry Expert, Coimbatore',
    period: 'Oct 2024',
  },
];

const Resume = () => {
  const reducedMotion = useReducedMotion();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/KOKILA_CV.pdf';
    link.download = 'Kokila_M_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageTransition>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                  Resume
                </h1>
                <p className="text-muted-foreground">
                  My professional journey at a glance.
                </p>
              </div>
              <motion.div
                whileHover={reducedMotion ? {} : { scale: 1.05 }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
              >
                <Button
                  variant="glow"
                  size="lg"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Internships */}
          <AnimatedSection delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-heading font-semibold">
                Internships
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-6 mb-12">
            {internships.map((item, i) => (
              <AnimatedSection key={item.role} delay={0.15 + i * 0.1}>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-heading font-semibold">{item.role}</h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-primary text-sm mb-2">{item.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Education */}
          <AnimatedSection delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-heading font-semibold">
                Education
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-6 mb-12">
            {education.map((item, i) => (
              <AnimatedSection key={item.degree} delay={0.35 + i * 0.1}>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-heading font-semibold">{item.degree}</h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-primary text-sm mt-1">{item.school}</p>
                  <p className="text-muted-foreground text-sm mt-1 font-mono">{item.detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Certifications */}
          <AnimatedSection delay={0.45}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-heading font-semibold">
                Certifications
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="p-5 rounded-xl bg-card border border-border mb-12">
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2">
                    <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Workshops */}
          <AnimatedSection delay={0.55}>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-heading font-semibold">
                Workshops
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {workshops.map((item, i) => (
              <AnimatedSection key={item.title} delay={0.6 + i * 0.1}>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-heading font-semibold">{item.title}</h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-primary text-sm mt-1">{item.org}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Resume;
