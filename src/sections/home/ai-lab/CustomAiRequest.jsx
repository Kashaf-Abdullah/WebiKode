import { Card } from '../../../components/ui/Card.jsx';
import Button from '../../../components/ui/Button.jsx';
import { AI_EXAMPLES } from '../../../data/home.js';

export default function CustomAiRequest() {
  return (
    <>
      <h3 className="subhead">Request Custom AI for Your Product</h3>
      <p style={{ marginBottom: 'var(--space-5)', maxWidth: 660 }}>Describe your requirement and the Webikode team will build a customised AI integration. For example:</p>
      <div className="grid grid--3">{AI_EXAMPLES.map((x) => <Card key={x}><p>{x}</p></Card>)}</div>
      <div style={{ marginTop: 'var(--space-5)' }}><Button to="/contact">Request Custom AI</Button></div>
    </>
  );
}
