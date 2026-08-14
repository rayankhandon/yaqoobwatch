import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsSubmitted(true);
    addToast('Welcome to the AURELIS Private Circle.', 'success');
  };

  return (
    <section className="py-24 bg-[#FAF9F6] relative border-t border-[#e5e0d8] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/30 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-5 h-5 text-[#B8924A]" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block mb-2">
          Private Circle
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171717] tracking-wide mb-4">
          STAY IN TIME.
        </h2>

        <p className="text-sm text-stone-600 font-light max-w-lg mx-auto leading-relaxed mb-8">
          Be the first to discover new collections, limited editions, and stories from AURELIS.
        </p>

        {isSubmitted ? (
          <div className="p-6 bg-white border border-[#B8924A]/40 max-w-md mx-auto space-y-2 animate-fade-in shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-[#B8924A] mx-auto" />
            <h4 className="font-serif text-xl text-[#171717] font-normal">Subscription Confirmed</h4>
            <p className="text-xs text-stone-600">
              You are now enrolled in the AURELIS Gazette. Expect private previews in your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-4 bg-white border border-[#e5e0d8] text-[#171717] placeholder-stone-400 text-xs font-sans focus:outline-none focus:border-[#B8924A] transition-colors shadow-sm"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group shrink-0 shadow-sm"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-6">
          We respect your privacy. Unsubscribe at any moment with one click.
        </p>
      </div>
    </section>
  );
};
