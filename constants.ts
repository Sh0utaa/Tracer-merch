import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ATLAS Detector Blueprint Tee',
    price: 29.99,
    category: 'Apparel',
    image: 'https://picsum.photos/id/1/400/400', 
    description: 'Premium heavy-cotton t-shirt featuring authentic wireframe blueprints of the ATLAS particle detector at CERN. Perfect for physicists and engineering students.',
    aiPromptContext: 'A premium t-shirt showing the technical wireframe of the ATLAS particle detector at CERN.'
  },
  {
    id: 'p2',
    name: 'Particle Collision Hoodie',
    price: 49.99,
    category: 'Apparel',
    image: 'https://picsum.photos/id/2/400/400',
    description: 'Ultra-soft fleece hoodie displaying a high-resolution simulation of a Higgs Boson decay event. Inspired by Tracer Core 3D visualizations.',
    aiPromptContext: 'A high-quality hoodie displaying a colorful high-energy particle collision event simulation.'
  },
  {
    id: 'p3',
    name: 'Tracer Thermo-Reactive Mug',
    price: 15.00,
    category: 'Accessories',
    image: 'https://picsum.photos/id/30/400/400',
    description: 'Matte black ceramic mug with the Tracer script logo. Heat-reactive technology reveals hidden CERN particle tracks when filled with hot liquid.',
    aiPromptContext: 'A ceramic coffee mug for physicists that reveals hidden particle tracks when hot liquid is poured in.'
  },
  {
    id: 'p4',
    name: 'Standard Model Laboratory Notebook',
    price: 12.50,
    category: 'Stationery',
    image: 'https://picsum.photos/id/24/400/400',
    description: 'Professional grade laboratory notebook containing the Standard Model of particle physics and universal constants. Essential for GTU science research.',
    aiPromptContext: 'A laboratory notebook for students with the Standard Model of particle physics printed on the cover.'
  },
  {
    id: 'p5',
    name: 'LHC Tunnel 4K Panoramic Poster',
    price: 19.99,
    category: 'Accessories',
    image: 'https://picsum.photos/id/20/400/400',
    description: 'High-definition panoramic print of the Large Hadron Collider (LHC) tunnel. A stunning addition to any nuclear engineering lab or academic workspace.',
    aiPromptContext: 'A wide poster showing the futuristic tunnel of the Large Hadron Collider at CERN.'
  },
  {
    id: 'p6',
    name: 'GTU Engineering Precision Pen Set',
    price: 8.99,
    category: 'Stationery',
    image: 'https://picsum.photos/id/6/400/400',
    description: 'Set of three precision technical drawing pens featuring the Georgian Technical University crest. Optimized for drafting complex particle visualizations.',
    aiPromptContext: 'A set of precision technical drawing pens used by engineering students at GTU.'
  }
];