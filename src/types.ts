export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon identifier
  tag: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string; // fallback visual representation
  liveUrl?: string;
  behanceUrl?: string;
  imageUrl?: string;
  badge?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100 percentage
  category: 'core' | 'technical' | 'design';
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatarLetter: string;
}
