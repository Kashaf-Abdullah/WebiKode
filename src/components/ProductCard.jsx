import { Card, Tile } from './ui/Card.jsx';
import Button from './ui/Button.jsx';
import ImageSlider from './ImageSlider.jsx';

export default function ProductCard({ product }) {
  const { name, category, description, summary, price, rating, reviews, tone, demoUrl, slug, images } = product;

  if (demoUrl && slug) {
    return (
      <Card className="project-card">
        <ImageSlider images={images} label={`${name} screenshots`} className="image-slider--card" />
        <span className="tag">{category}</span>
        <h3>{name}</h3>
        <p className="project-card__summary">{summary}</p>
        <div className="row">
          <Button variant="outline" size="sm" to={demoUrl} target="_blank" rel="noreferrer">Live demo</Button>
          <Button size="sm" to={`/portfolio/${slug}`}>View details</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Tile tone={tone} />
      <span className="tag">{category}</span>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className="row row--between">
        <strong>{price}</strong>
        <span>★ {rating} · {reviews}</span>
      </div>
      <div className="row">
        <Button variant="outline" size="sm" to="#">Demo</Button>
        <Button size="sm" to="#">View Details</Button>
      </div>
    </Card>
  );
}
