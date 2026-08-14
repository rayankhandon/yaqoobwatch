import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SignatureCollection } from '../components/home/SignatureCollection';
import { ShopByCollection } from '../components/home/ShopByCollection';
import { BestSellers } from '../components/home/BestSellers';
import { BrandStory } from '../components/home/BrandStory';
import { SpecialEdition } from '../components/home/SpecialEdition';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { Newsletter } from '../components/home/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <HeroSection />
      <SignatureCollection />
      <ShopByCollection />
      <BestSellers />
      <BrandStory />
      <SpecialEdition />
      <ReviewsSection />
      <Newsletter />
    </div>
  );
};
