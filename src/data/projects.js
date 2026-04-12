export const PROJECTS_DATA = [
  {
    id: 1,
    slug: 'redber',
    title: 'Redber AI',
    category: 'AI Product',
    year: '2024',
    color: '#4f46e5',
    tagline: 'The AI Receptionist That Never Sleeps.',
    overview: 'Redber AI is an AI-powered communication platform built by Acenzos. It handles customer inquiries 24/7, captures leads, books appointments, and provides instant intelligent support — trained on your business knowledge.',
    challenge: 'Businesses lose over 60% of potential leads after office hours. Traditional chatbots are rigid, frustrating, and fail to convert high-intent visitors into customers.',
    solution: 'We built a low-latency LLM orchestration layer that lets Redber respond in under 3 seconds. With persistent memory and a custom Knowledge Base, it understands your business better than a human trainee — and never takes a day off.',
    results: [
      { label: 'Uptime', value: '100%' },
      { label: 'Response Time', value: '< 3s' },
      { label: 'Lead Conversion', value: '+40%' }
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Framer Motion'],
    nextSlug: 'shopify-storefront'
  },
  {
    id: 2,
    slug: 'shopify-storefront',
    title: 'Custom Shopify Store',
    category: 'E-Commerce',
    year: '2024',
    color: '#96bf48',
    tagline: 'Conversion-First Shopify Experiences.',
    overview: 'We design and develop high-converting Shopify stores for brands that want more than a template. Custom themes built with Liquid, tailored to each brand\'s identity and customer journey.',
    challenge: 'Off-the-shelf Shopify themes limit brand potential, have poor LCP scores, and can\'t handle the unique business logic that sets growing brands apart.',
    solution: 'We develop fully custom Shopify themes from scratch using Liquid, React components, and Shopify Metafields — giving brands complete design freedom with full Shopify platform compatibility.',
    results: [
      { label: 'Page Speed', value: '95+' },
      { label: 'Conversion', value: '+35%' },
      { label: 'Bounce Rate', value: '-28%' }
    ],
    techStack: ['Shopify', 'Liquid', 'Alpine.js', 'Tailwind CSS', 'Shopify APIs'],
    nextSlug: 'acenzos-platform'
  },
  {
    id: 3,
    slug: 'acenzos-platform',
    title: 'Acenzos Platform',
    category: 'SaaS Development',
    year: '2025',
    color: '#0ea5e9',
    tagline: 'Our In-House SaaS Infrastructure.',
    overview: 'The internal platform powering all of Acenzos operations — from client project management to product delivery pipelines. Built to be scalable, extensible, and beautifully simple.',
    challenge: 'Managing multiple concurrent client projects, internal deployments, and product iterations across team members required a centralized, purpose-built tool.',
    solution: 'We built a modular SaaS backbone with role-based access, real-time collaboration features, and automated delivery pipelines that cut our internal overhead by half.',
    results: [
      { label: 'Efficiency', value: '+50%' },
      { label: 'Deploy Time', value: '-60%' },
      { label: 'Team Size', value: 'Lean 5' }
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Vercel'],
    nextSlug: 'redber'
  }
];
