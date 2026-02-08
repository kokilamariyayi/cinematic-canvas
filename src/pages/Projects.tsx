import { PageTransition } from '@/components/PageTransition';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/ProjectCard';

const projects = [
  {
    id: 1,
    title: 'Social Media Sentiment Analysis',
    description:
      'Developed a comparative sentiment analysis project using TF-IDF + Logistic Regression and RoBERTa, highlighting model performance differences on text classification tasks.',
    category: 'NLP / AI',
    tags: ['Python', 'TF-IDF', 'RoBERTa', 'NLP'],
    link: '#',
  },
  {
    id: 2,
    title: 'AI Powered Financial Fraud Detection',
    description:
      'Designed a behavior-driven fraud detection approach using anomaly detection techniques to identify deviations from normal transaction patterns.',
    category: 'Machine Learning',
    tags: ['Python', 'Anomaly Detection', 'ML', 'Data Analysis'],
    link: '#',
  },
  {
    id: 3,
    title: 'Voice Controlled Assistant For Elderly Care',
    description:
      'Developed an AI-based voice assistant using Python, NLP, and IoT to support elderly care through speech-based interaction.',
    category: 'AI / IoT',
    tags: ['Python', 'NLP', 'IoT', 'Speech Recognition'],
    link: '#',
  },
  {
    id: 4,
    title: 'AI Expense Forecasting Tool',
    description:
      'Built an AI-based Expense Forecasting Tool using Python with a chatbot module for interactive user queries and financial planning.',
    category: 'AI / Finance',
    tags: ['Python', 'AI', 'Chatbot', 'Forecasting'],
    link: '#',
  },
  {
    id: 5,
    title: 'HR Analysis Dashboard',
    description:
      'Built an HR Analysis Dashboard using Power BI to analyze workforce metrics such as employee distribution, attrition trends, and performance indicators.',
    category: 'Data Analytics',
    tags: ['Power BI', 'Data Visualization', 'HR Analytics'],
    link: '#',
  },
  {
    id: 6,
    title: 'Cloud-Based ML Prediction System',
    description:
      'Built a cloud-based ML Prediction system using IBM AutoAI involving automated feature engineering, model training and evaluation.',
    category: 'Cloud / ML',
    tags: ['IBM AutoAI', 'Cloud', 'ML', 'AutoML'],
    link: '#',
  },
];

const Projects = () => (
  <PageTransition>
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Projects
          </h1>
          <p className="text-muted-foreground max-w-lg mb-12">
            A selection of work that reflects my approach: problem → solution → impact.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  </PageTransition>
);

export default Projects;
