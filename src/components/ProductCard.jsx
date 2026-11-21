import { Card, Tile } from './ui/Card.jsx';
import Button from './ui/Button.jsx';

export default function ProductCard({ product }) {
  const { name, category, description, price, rating, reviews, tone } = product;
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
