export const PROJECTS_DATA = [
  {
    id: 1,
    slug: 'redber',
    title: 'Redber AI',
    category: 'AI Automation',
    year: '2024',
    color: '#4f46e5',
    tagline: 'The AI Receptionist That Never Sleeps.',
    overview: 'Redber AI is a cutting-edge conversational platform designed to handle 24/7 business inquiries. It acts as an expert digital employee, capturing leads, booking meetings, and providing instant support with a human-like touch.',
    challenge: 'Businesses lose over 60% of potential leads after office hours or during high-traffic peaks. Traditional chatbots are rigid, frustrating, and often fail to convert high-intent visitors.',
    solution: 'We engineered a low-latency LLM orchestration layer that allows Redber to respond in under 3 seconds. By integrating persistent memory and a custom Knowledge Base, we ensured the AI understands specific business nuances better than a human trainee.',
    results: [
      { label: 'Uptime', value: '100%' },
      { label: 'Response Time', value: '< 3s' },
      { label: 'Lead Conversion', value: '+40%' }
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Framer Motion'],
    nextSlug: 'sohub'
  },
  {
    id: 2,
    slug: 'sohub',
    title: 'SOHub',
    category: 'Digital Experience',
    year: '2024',
    color: '#7c3aed',
    tagline: 'Revolutionizing Digital Community Spaces.',
    overview: 'SOHub is a high-performance immersive platform built to host thousands of simultaneous users in a fluid, 3D-driven environment. It redefines how brands interact with their global audience.',
    challenge: 'Creating a web-based 3D environment that remains performant across mobile devices while supporting real-time data synchronization for thousands of concurrent users.',
    solution: 'A custom WebGL rendering engine built on Three.js, optimized with a hybrid state management system. We prioritized raw performance to ensure a 60FPS experience even on mid-range smartphones.',
    results: [
      { label: 'Avg Session', value: '12min' },
      { label: 'User Retention', value: '300%' },
      { label: 'Peak Capacity', value: '50k+' }
    ],
    techStack: ['Three.js', 'React Three Fiber', 'WebSockets', 'AWS Lambda'],
    nextSlug: 'worldquant-foundry'
  },
  {
    id: 3,
    slug: 'worldquant-foundry',
    title: 'WorldQuant Foundry',
    category: 'Platform Engineering',
    year: '2025',
    color: '#0ea5e9',
    tagline: 'Engineering the Future of Quantitative Finance.',
    overview: 'WorldQuant Foundry is an enterprise-grade platform that streamlines quantitative research and financial modeling through high-speed distributed computing.',
    challenge: 'Quant teams needed a secure, reliable way to run massive datasets through complex mathematical models without infrastructure bottlenecks.',
    solution: 'We built a cloud-native orchestration layer that scales compute resources dynamically based on model complexity, reducing research latency by 70%.',
    results: [
      { label: 'Latency', value: '-70%' },
      { label: 'Compute Efficiency', value: '+55%' },
      { label: 'Security', value: 'ISO 27001' }
    ],
    techStack: ['Go', 'Rust', 'Kubernetes', 'Next.js'],
    nextSlug: 'redber'
  }
];
