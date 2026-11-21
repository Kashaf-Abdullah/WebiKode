import Hero from '../sections/home/Hero.jsx';
import FeaturedProducts from '../sections/home/FeaturedProducts.jsx';
import Categories from '../sections/home/Categories.jsx';
import WhyWebikode from '../sections/home/WhyWebikode.jsx';
import AiLab from '../sections/home/ai-lab/AiLab.jsx';
import FreeTools from '../sections/home/FreeTools.jsx';
import HowItWorks from '../sections/home/HowItWorks.jsx';
import LatestLaunches from '../sections/home/LatestLaunches.jsx';
import Testimonials from '../sections/home/Testimonials.jsx';
import HomeFaq from '../sections/home/HomeFaq.jsx';
import Newsletter from '../sections/home/Newsletter.jsx';

// Section order = page order. Reorder or remove lines to change the page.
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <WhyWebikode />
      <AiLab />
      <FreeTools />
      <HowItWorks />
      <LatestLaunches />
      <Testimonials />
      <HomeFaq />
      <Newsletter />
    </>
  );
}
