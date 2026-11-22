import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import ImageSlider from '../components/ImageSlider.jsx';
import ProjectBookingModal from '../components/ProjectBookingModal.jsx';
import { PORTFOLIO_ITEMS } from '../data/products.js';

export default function ProjectDetails() {
  const { slug } = useParams();
  const [bookingOpen, setBookingOpen] = useState(false);
  const project = PORTFOLIO_ITEMS.find((item) => item.slug === slug);

  if (!project) return <Navigate to="/not-found" replace />;

  return (
    <>
      <PageHero title={project.name} text={project.summary} />
      <section className="container project-details">
        <ImageSlider images={project.images} label={`${project.name} screenshots`} className="image-slider--details" />
        <div className="project-details__description">
          <span className="tag">{project.category}</span>
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="row">
          <Button to={project.demoUrl} target="_blank" rel="noreferrer">Open live project</Button>
          <Button onClick={() => setBookingOpen(true)}>Book a call to discuss</Button>
          <Link className="btn btn--outline" to="/portfolio">Back to portfolio</Link>
        </div>
      </section>
      {bookingOpen && <ProjectBookingModal projectName={project.name} onClose={() => setBookingOpen(false)} />}
    </>
  );
}
