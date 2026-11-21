import Section, { SectionHeader } from '../../../components/ui/Section.jsx';
import AiIntegrations from './AiIntegrations.jsx';
import CustomAiRequest from './CustomAiRequest.jsx';
import AiConfigurator from './AiConfigurator.jsx';
import AiPricing from './AiPricing.jsx';

export default function AiLab() {
  return (
    <Section id="ai-lab">
      <SectionHeader eyebrow="Webikode AI Lab" title="Give Your Products an AI Upgrade." text="Choose your product, select AI features and transform your software into something smarter." />
      <AiIntegrations />
      <CustomAiRequest />
      <AiConfigurator />
      <AiPricing />
    </Section>
  );
}
