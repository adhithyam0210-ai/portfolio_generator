import React from 'react';
import { PortfolioProfile } from '@/lib/types';
import { ModernGlassTemplate } from './ModernGlassTemplate';
import { UIUXDesignerTemplate } from './UIUXDesignerTemplate';
import { FullStackDeveloperTemplate } from './FullStackDeveloperTemplate';
import { AIResearcherTemplate } from './AIResearcherTemplate';
import { CybersecurityAnalystTemplate } from './CybersecurityAnalystTemplate';
import { DevOpsEngineerTemplate } from './DevOpsEngineerTemplate';
import { QAEngineerTemplate } from './QAEngineerTemplate';
import { MLEngineerTemplate } from './MLEngineerTemplate';
import { DataAnalystTemplate } from './DataAnalystTemplate';
import { SnowlyFrostTemplate } from './SnowlyFrostTemplate';
import { JoneLeeModernTemplate } from './JoneLeeModernTemplate';
import { DanielVioletTemplate } from './DanielVioletTemplate';
import { JessicaCrimsonTemplate } from './JessicaCrimsonTemplate';
import { ModernTechTemplate } from './ModernTechTemplate';
import { MinimalistSlateTemplate } from './MinimalistSlateTemplate';
import { CreativeAuroraTemplate } from './CreativeAuroraTemplate';
import { ExecutiveClassicTemplate } from './ExecutiveClassicTemplate';
import { CanvaPopTemplate } from './CanvaPopTemplate';
import { AdobeBehanceTemplate } from './AdobeBehanceTemplate';
import { FigmaGlassTemplate } from './FigmaGlassTemplate';
import { MinimalNordicTemplate } from './MinimalNordicTemplate';

interface TemplateRendererProps {
  profile: PortfolioProfile;
  isPublicView?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ profile, isPublicView }) => {
  const templateId = profile.settings?.templateId || 'modern-glass';

  switch (templateId) {
    case 'modern-glass':
      return <ModernGlassTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-uiux':
      return <UIUXDesignerTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-fullstack':
      return <FullStackDeveloperTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-ai-researcher':
      return <AIResearcherTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-cybersecurity':
      return <CybersecurityAnalystTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-devops':
      return <DevOpsEngineerTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-qa':
      return <QAEngineerTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-ml-engineer':
      return <MLEngineerTemplate profile={profile} isPublicView={isPublicView} />;
    case 'role-data-analyst':
      return <DataAnalystTemplate profile={profile} isPublicView={isPublicView} />;
    case 'coral-modernist':
      return <JoneLeeModernTemplate profile={profile} isPublicView={isPublicView} />;
    case 'cyber-violet':
      return <DanielVioletTemplate profile={profile} isPublicView={isPublicView} />;
    case 'crimson-studio':
      return <JessicaCrimsonTemplate profile={profile} isPublicView={isPublicView} />;
    case 'nexus-developer':
      return <ModernTechTemplate profile={profile} isPublicView={isPublicView} />;
    case 'slate-editorial':
      return <MinimalistSlateTemplate profile={profile} isPublicView={isPublicView} />;
    case 'aurora-creative':
      return <CreativeAuroraTemplate profile={profile} isPublicView={isPublicView} />;
    case 'executive-classic':
      return <ExecutiveClassicTemplate profile={profile} isPublicView={isPublicView} />;
    case 'canva-pop':
      return <CanvaPopTemplate profile={profile} isPublicView={isPublicView} />;
    case 'adobe-behance':
      return <AdobeBehanceTemplate profile={profile} isPublicView={isPublicView} />;
    case 'figma-glass':
      return <FigmaGlassTemplate profile={profile} isPublicView={isPublicView} />;
    case 'minimal-nordic':
      return <MinimalNordicTemplate profile={profile} isPublicView={isPublicView} />;
    case 'frost-academic':
    default:
      return <SnowlyFrostTemplate profile={profile} isPublicView={isPublicView} />;
  }
};
