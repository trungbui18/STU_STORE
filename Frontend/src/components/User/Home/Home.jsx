import React from "react";
import HeroSection from "./HeroSection";
import CategoryNavigation from "./CategoryNavigation";
import NewsletterSignup from "./NewsletterSignup";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryNavigation />
      <NewsletterSignup />
    </div>
  );
}
