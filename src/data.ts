import { Service, Project, Skill, Testimonial } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'shopify-design',
    title: 'Shopify Store Design',
    description: 'Bespoke Shopify storefronts designed for maximum conversion, built with custom liquid modifications, seamless brand integration, and fast checkout experiences.',
    iconName: 'ShoppingBag',
    tag: 'Shopify Expert',
    features: ['Custom Liquid Customization', 'Conversion Rate Optimization (CRO)', 'Mobile-First Layout Design', 'App Integration & Setup']
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Design',
    description: 'High-impact landing pages created to showcase single products or special promotions. Blending stunning typography with direct response visual cues.',
    iconName: 'Target',
    tag: 'CRO Focused',
    features: ['High-Converting Visual Copy', 'A/B Testing Layouts', 'Super-fast Load Times', 'Seamless Form Integrations']
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    description: 'Revamping older or underperforming websites into sleek, premium digital experiences that rebuild brand trust and re-engage your customers.',
    iconName: 'Sparkles',
    tag: 'Full Revamp',
    features: ['Modern Dark/Light Aesthetic', 'Improved User Navigation', 'Optimized SEO & Performance', 'Responsive Fluid Layouts']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'joynest-pk',
    title: 'Joynest PK',
    category: 'eCommerce Store',
    badge: 'eCommerce',
    description: 'Modern Shopify store with clean product presentation, responsive design, and optimized shopping experience.',
    tags: ['Shopify', 'eCommerce', 'UX Design', 'Minimalist'],
    gradient: 'from-[#FF5E97] to-[#FFA16C]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://joynest.pk/',
    liveUrl: 'https://joynest.pk/',
    behanceUrl: '#'
  },
  {
    id: 'irtaza-store',
    title: 'Irtaza Store',
    category: 'Kids Fashion Store',
    badge: 'Kids Fashion',
    description: 'Shopify-based kids clothing store focused on user-friendly navigation and mobile-first shopping experience.',
    tags: ['Shopify', 'Kids Fashion', 'Mobile-First', 'CRO'],
    gradient: 'from-[#4FACFE] to-[#00F2FE]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://irtazastore.com/',
    liveUrl: 'https://irtazastore.com/',
    behanceUrl: '#'
  },
  {
    id: 'the-hareer-store',
    title: 'Hareer Store',
    category: 'Fashion eCommerce',
    badge: 'Fashion eCommerce',
    description: 'Elegant online fashion store with premium UI design and conversion-focused layout.',
    tags: ['Shopify', 'Fashion', 'Premium UI', 'Conversion'],
    gradient: 'from-[#B14EFF] to-[#FF5CC8]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://thehareerstore.com/',
    liveUrl: 'https://thehareerstore.com/',
    behanceUrl: '#'
  },
  {
    id: 'belle-chic-outfit',
    title: 'Belle Chic Outfit',
    category: 'Women\'s Fashion',
    badge: 'Women\'s Fashion',
    description: 'Fashion-focused Shopify website featuring modern aesthetics and seamless customer journey.',
    tags: ['Shopify', 'Womens Fashion', 'Aesthetics', 'Liquid'],
    gradient: 'from-[#FF758C] to-[#FF7EB3]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://bellechicoutfit.com/',
    liveUrl: 'https://bellechicoutfit.com/',
    behanceUrl: '#'
  },
  {
    id: 'happy-kids-pk',
    title: 'Happy Kids PK',
    category: 'Kids eCommerce',
    badge: 'Kids eCommerce',
    description: 'Colorful and engaging online store designed specifically for children\'s products and apparel.',
    tags: ['Shopify', 'Kids Apparel', 'Vibrant Design', 'Speed'],
    gradient: 'from-[#FF007F] to-[#7F00FF]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://happykidspk.com/',
    liveUrl: 'https://happykidspk.com/',
    behanceUrl: '#'
  },
  {
    id: 'centaura-store',
    title: 'Centaura Store',
    category: 'General eCommerce',
    badge: 'eCommerce',
    description: 'Modern Shopify store with clean UI, responsive layouts, and optimized shopping flow.',
    tags: ['Shopify', 'Responsive', 'Clean UI', 'General Store'],
    gradient: 'from-[#30CFD0] to-[#330867]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://centaura.store/',
    liveUrl: 'https://centaura.store/',
    behanceUrl: '#'
  },
  {
    id: 'cozy-cart',
    title: 'Cozy Cart',
    category: 'Lifestyle Store',
    badge: 'Lifestyle Store',
    description: 'Product-focused Shopify experience designed for higher engagement and better conversions.',
    tags: ['Shopify', 'Lifestyle', 'Engagement', 'Conversions'],
    gradient: 'from-[#FAD961] to-[#F76B1C]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://cozycart.pk/',
    liveUrl: 'https://cozycart.pk/',
    behanceUrl: '#'
  },
  {
    id: 'zana-pk',
    title: 'Zana PK',
    category: 'Fashion Brand',
    badge: 'Fashion Brand',
    description: 'Premium Shopify storefront designed to highlight products and strengthen brand identity.',
    tags: ['Shopify', 'Fashion Brand', 'Identity', 'Visuals'],
    gradient: 'from-[#3B82F6] to-[#8B5CF6]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://zana.pk/',
    liveUrl: 'https://zana.pk/',
    behanceUrl: '#'
  },
  {
    id: 'nexoro-store',
    title: 'Nexoro Store',
    category: 'Shopify eCommerce',
    badge: 'Shopify eCommerce',
    description: 'Modern online store featuring responsive design, streamlined navigation, and optimized UX.',
    tags: ['Shopify', 'Responsive', 'Streamlined', 'Tech'],
    gradient: 'from-[#10B981] to-[#3B82F6]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://nexorostore.pk/',
    liveUrl: 'https://nexorostore.pk/',
    behanceUrl: '#'
  },
  {
    id: 'luxury-home',
    title: 'Luxury Home PK',
    category: 'Lifestyle Store',
    badge: 'Lifestyle Store',
    description: 'A premium, high-end Shopify store specializing in exquisite home decor, luxury furniture, and bespoke interior products designed with elegant typography and structured product layouts.',
    tags: ['Shopify', 'Home Decor', 'Premium Aesthetic', 'Responsive'],
    gradient: 'from-[#D4AF37] to-[#111111]',
    imageUrl: 'https://image.thum.io/get/width/800/crop/600/maxAge/24/https://luxuryhome.pk/',
    liveUrl: 'https://luxuryhome.pk/',
    behanceUrl: '#'
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: 'Shopify', level: 95, category: 'core', icon: 'ShoppingBag' },
  { name: 'Website Redesign', level: 98, category: 'design', icon: 'Palette' },
  { name: 'Responsive Design', level: 98, category: 'technical', icon: 'Smartphone' },
  { name: 'Landing Pages', level: 97, category: 'core', icon: 'Layout' }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Ayesha Malik',
    role: 'Founder',
    company: 'Belle Chic Outfit',
    text: "Faryal has an incredible eye for high-end fashion e-commerce. She turned Belle Chic Outfit into an absolute visual masterpiece. Our customer trust and checkout conversion rates have soared!",
    rating: 5,
    avatarLetter: 'B'
  },
  {
    id: 't2',
    name: 'Zainab Shah',
    role: 'Creative Director',
    company: 'The Hareer Store',
    text: "The craftsmanship Faryal put into custom-styling The Hareer Store is breathtaking. She translated our premium fabrics into a gorgeous, high-performance digital flagship store with frictionless navigation.",
    rating: 5,
    avatarLetter: 'H'
  },
  {
    id: 't3',
    name: 'Kamran Khan',
    role: 'E-commerce Manager',
    company: 'Happy Kids PK',
    text: "Faryal completely reimagined our shopping experience for Happy Kids PK. She delivered a playful, vibrant, yet highly optimized mobile layout with fast cart flows. It has been a complete game changer!",
    rating: 5,
    avatarLetter: 'K'
  },
  {
    id: 't4',
    name: 'Bilal Ahmed',
    role: 'Co-Founder',
    company: 'Nexoro Store',
    text: "Absolute genius with Shopify and Liquid! Faryal built an immersive, high-speed tech storefront for Nexoro Store that handles our dark-theme custom features flawlessly. Highly recommended!",
    rating: 5,
    avatarLetter: 'N'
  },
  {
    id: 't5',
    name: 'Sana Rizvi',
    role: 'Founder',
    company: 'JoyNest PK',
    text: "Working with Faryal to design JoyNest PK was an absolute dream. She crafted a serene, minimal storefront with delicate animations and layouts that perfectly capture our cozy home lifestyle aesthetic.",
    rating: 5,
    avatarLetter: 'J'
  },
  {
    id: 't6',
    name: 'Irtaza Ahmed',
    role: 'Founder',
    company: 'Irtaza Store',
    text: "Faryal has outstanding technical and creative skills. She turned Irtaza Store into an absolute masterpiece with intuitive product navigation, fast loading times, and a highly polished checkout funnel.",
    rating: 5,
    avatarLetter: 'I'
  }
];
