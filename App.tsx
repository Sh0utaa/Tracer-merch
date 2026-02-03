import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Menu, X, ArrowRight, Zap, Box, Info, Trash2, Atom, Search, Globe, Microscope, Cpu } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem, ViewState, AIGeneratedContent } from './types';
import { generateMarketingCopy } from './services/geminiService';

// --- Components ---

// 1. Navigation Bar (Semantic Header)
const Navbar: React.FC<{ 
  cartCount: number; 
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}> = ({ cartCount, onNavigate, currentView }) => (
  <header className="sticky top-0 z-50 bg-science-dark/90 backdrop-blur-md border-b border-science-panel">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(ViewState.HOME)}>
          <div className="flex flex-col">
            <h1 className="text-4xl font-script font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-science-accent to-science-secondary transform group-hover:scale-105 transition-transform duration-300 select-none pb-1">
              Tracer
            </h1>
            <div className="flex items-center gap-2">
               <p className="text-[10px] text-gray-400 font-sans tracking-widest uppercase ml-1">Core V.7.0 2025</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block">
          <ul className="ml-10 flex items-baseline space-x-4">
            <li>
              <button 
                onClick={() => onNavigate(ViewState.HOME)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === ViewState.HOME ? 'text-science-accent' : 'text-gray-300 hover:text-white'}`}
              >
                Store Home
              </button>
            </li>
            <li>
              <a href="https://tracer-core.web.cern.ch/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                CERN Visualizer
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={() => onNavigate(ViewState.CART)}
             aria-label={`View Cart (${cartCount} items)`}
             className="relative p-2 text-gray-400 hover:text-white transition-colors group"
           >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-science-dark transform translate-x-1/4 -translate-y-1/4 bg-science-accent rounded-full">
                {cartCount}
              </span>
            )}
            <div className="absolute inset-0 rounded-full bg-science-accent/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </nav>
  </header>
);

// 2. Hero Section
const Hero = () => (
  <section className="relative overflow-hidden bg-science-dark border-b border-science-panel">
    <div className="absolute inset-0 particle-bg opacity-30 pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
      <h2 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
        <span className="block">Shop Authentic</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-science-accent to-science-secondary">
          CERN Particle Physics Gear
        </span>
      </h2>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Official merchandise for the <strong>Georgian Technical University (GTU)</strong> & <strong>CERN</strong> collaboration. 
        Wear the science of the <strong>Large Hadron Collider</strong> and the <strong>ATLAS detector</strong>.
      </p>
      <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
         <div className="rounded-md shadow">
          <a href="#products" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-science-dark bg-science-accent hover:bg-emerald-400 md:py-4 md:text-lg transition-all shadow-[0_0_20px_rgba(46,231,157,0.3)] hover:shadow-[0_0_30px_rgba(46,231,157,0.5)]">
            Explore Collection
          </a>
        </div>
      </div>
    </div>
  </section>
);

// 3. AI Product Card
const ProductCard: React.FC<{ 
  product: Product; 
  onAdd: (p: Product) => void; 
}> = ({ product, onAdd }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [aiContent, setAiContent] = useState<AIGeneratedContent | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (isHovered && !aiContent && !loadingAi) {
      setLoadingAi(true);
      generateMarketingCopy(product.name, product.aiPromptContext)
        .then(content => {
          if (mounted) {
            setAiContent(content);
            setLoadingAi(false);
          }
        });
    }
    return () => { mounted = false; };
  }, [isHovered]);

  return (
    <article 
      className="group relative bg-science-panel rounded-xl border border-gray-800 overflow-hidden hover:border-science-accent/50 transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-900 relative">
        <img
          src={product.image}
          alt={`Official Tracer ${product.name} - ${product.category}`}
          loading="lazy"
          className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <header className="flex justify-between items-start">
          <div>
            <p className="text-xs font-mono text-science-accent mb-1">{product.category.toUpperCase()}</p>
            <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
          </div>
          <p className="text-lg font-mono font-medium text-gray-200">${product.price.toFixed(2)}</p>
        </header>

        <div className="mt-4 flex-1">
          <div className="min-h-[80px]">
            {loadingAi ? (
              <div className="flex items-center gap-2 text-xs text-science-accent animate-pulse">
                <Zap size={12} />
                <span>Generating Scientific Copy...</span>
              </div>
            ) : aiContent ? (
              <div className="animate-in fade-in duration-500">
                <p className="text-xs font-bold text-science-secondary italic mb-1">"{aiContent.slogan}"</p>
                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{aiContent.extendedDescription}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{product.description}</p>
            )}
          </div>
        </div>

        <button
          onClick={() => onAdd(product)}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-science-accent hover:text-science-dark text-white px-4 py-3 rounded-lg transition-all duration-300 font-medium group-hover:shadow-[0_0_15px_rgba(46,231,157,0.2)]"
        >
          <Box size={18} />
          Add to Requisition
        </button>
      </div>
    </article>
  );
};

// 4. Cart View
const CartView: React.FC<{
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
  onBack: () => void;
}> = ({ items, onUpdateQuantity, onCheckout, onBack }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="max-w-4xl mx-auto px-4 py-12" aria-labelledby="cart-heading">
      <button onClick={onBack} className="mb-6 text-science-accent hover:underline flex items-center gap-2">
        ← Return to Physics Store
      </button>
      <h2 id="cart-heading" className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Requisition Manifest (Cart)</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-20 bg-science-panel rounded-lg border border-dashed border-gray-700">
          <Box size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg italic">Your matter containment unit currently contains no localized items.</p>
        </div>
      ) : (
        <div className="bg-science-panel rounded-xl overflow-hidden border border-gray-800">
          <ul className="divide-y divide-gray-800" role="list">
            {items.map((item) => (
              <li key={item.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-700 bg-gray-900">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-400 font-mono text-science-accent">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-900 rounded-lg border border-gray-700">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-2 text-gray-400 hover:text-white" aria-label="Decrease quantity">-</button>
                    <span className="px-4 font-mono text-white">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-2 text-gray-400 hover:text-white" aria-label="Increase quantity">+</button>
                  </div>
                  <button onClick={() => onUpdateQuantity(item.id, -item.quantity)} className="text-gray-500 hover:text-red-500" aria-label="Remove item">
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-gray-900/50 p-6 border-t border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl text-gray-300 uppercase tracking-widest">Total Valuation</span>
              <span className="text-3xl font-mono font-bold text-science-accent">${total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-gradient-to-r from-science-secondary to-science-accent text-science-dark font-bold py-4 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(46,231,157,0.4)] transition-all uppercase tracking-tighter">
              Initiate Secure Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// 5. Checkout Mock
const CheckoutView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <section className="max-w-2xl mx-auto px-4 py-16 text-center">
    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <Zap size={48} className="text-science-accent" />
    </div>
    <h2 className="text-3xl font-bold text-white mb-4">Transmission Successful</h2>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">
      Thank you for supporting <strong>Tracer</strong> research. Your order has been processed through the GTU Nuclear Engineering facility. 
      Estimated logistics arrival: <span className="text-science-accent font-mono">T+72 Hours</span>.
    </p>
    <button onClick={onBack} className="inline-flex items-center px-8 py-3 rounded-md text-science-dark bg-science-accent hover:bg-emerald-400 font-bold">
      Return to Store
    </button>
  </section>
);

// 6. SEO Content Block (New)
const SEOContent = () => (
  <section className="bg-science-panel/50 border-t border-gray-900 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold text-white mb-8">About Tracer: CERN Visualization & Georgian Technical University</h2>
        <div className="grid md:grid-cols-2 gap-12 text-gray-400 leading-relaxed">
          <div>
            <p className="mb-4">
              The <strong>Tracer</strong> project is a cutting-edge 3D particle accelerator visualization tool developed at the 
              <strong> Georgian Technical University (GTU) Nuclear Engineering Center</strong>. By bridging high-performance computing with 
              intuitive UI/UX design, we allow students and researchers to see the unseen: the invisible dance of subatomic particles 
              within the <strong>ATLAS detector</strong> at <strong>CERN</strong>.
            </p>
            <p>
              Our store features exclusive <strong>physics merchandise</strong> and <strong>science apparel</strong> designed by the same engineering 
              teams working on the Tracer Core V.7.0. Every purchase directly funds student research and open-source development in 
              the field of <strong>particle physics</strong>.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <Globe className="text-science-accent shrink-0" size={24} />
              <div>
                <h4 className="text-white font-bold">Global Collaboration</h4>
                <p className="text-sm italic text-gray-500 uppercase">Tbilisi, Georgia / Geneva, Switzerland</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Microscope className="text-science-accent shrink-0" size={24} />
              <div>
                <h4 className="text-white font-bold">Scientific Accuracy</h4>
                <p className="text-sm italic text-gray-500 uppercase">Verified LHC Collision Data</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Cpu className="text-science-accent shrink-0" size={24} />
              <div>
                <h4 className="text-white font-bold">Open-Source Innovation</h4>
                <p className="text-sm italic text-gray-500 uppercase">Building the Future of Physics Education</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setNotification(`Added ${product.name} to manifest`);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setView(ViewState.HOME);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-science-accent selection:text-black">
      <Navbar cartCount={cartCount} onNavigate={setView} currentView={view} />

      <main className="flex-grow">
        {notification && (
          <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-science-panel border border-science-accent text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
               <Box size={16} className="text-science-accent" />
               {notification}
            </div>
          </div>
        )}

        {view === ViewState.HOME && (
          <>
            <Hero />
            
            <section className="bg-black py-12 border-b border-gray-900" aria-label="Features">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
                <article className="p-6 bg-science-panel rounded-lg border border-gray-800">
                  <div className="text-science-secondary mb-4"><Atom size={32} /></div>
                  <h3 className="text-white font-bold text-lg mb-2">Higgs Boson Visuals</h3>
                  <p className="text-gray-400 text-sm">Every garment design is sourced directly from <strong>LHC particle collision events</strong>.</p>
                </article>
                <article className="p-6 bg-science-panel rounded-lg border border-gray-800">
                  <div className="text-science-accent mb-4"><Zap size={32} /></div>
                  <h3 className="text-white font-bold text-lg mb-2">GTU Student Support</h3>
                  <p className="text-gray-400 text-sm">Directly supporting <strong>nuclear engineering</strong> students at the Georgian Technical University.</p>
                </article>
                <article className="p-6 bg-science-panel rounded-lg border border-gray-800">
                  <div className="text-white mb-4"><Search size={32} /></div>
                  <h3 className="text-white font-bold text-lg mb-2">CERN Licensed Art</h3>
                  <p className="text-gray-400 text-sm">Authentic <strong>ATLAS detector</strong> schematics and research-grade technical illustrations.</p>
                </article>
              </div>
            </section>

            <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="products-title">
              <div className="flex items-center justify-between mb-8">
                <h2 id="products-title" className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-science-accent rounded-sm inline-block"></span>
                  Scientific Inventory
                </h2>
                <div className="text-sm text-gray-500 font-mono tracking-widest uppercase">
                  ACTIVE EXPERIMENTS: {PRODUCTS.length}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} onAdd={addToCart} />
                ))}
              </div>
            </section>

            <SEOContent />
          </>
        )}

        {view === ViewState.CART && (
          <CartView items={cart} onUpdateQuantity={updateQuantity} onCheckout={() => setView(ViewState.CHECKOUT)} onBack={() => setView(ViewState.HOME)} />
        )}

        {view === ViewState.CHECKOUT && (
          <CheckoutView onBack={clearCart} />
        )}
      </main>

      <footer className="bg-black border-t border-gray-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between text-center md:text-left">
            <div className="flex justify-center md:justify-start space-x-6 md:order-2 mb-8 md:mb-0">
               <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">GTU</span>
               <span className="text-gray-700">|</span>
               <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">CERN</span>
               <span className="text-gray-700">|</span>
               <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">ATLAS</span>
            </div>
            <div className="md:order-1">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Tracer Store. Part of the Georgian Technical University <strong>Nuclear Engineering Center</strong>.
                <br />
                All particle visualizations generated via Tracer Core V.7.0.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}