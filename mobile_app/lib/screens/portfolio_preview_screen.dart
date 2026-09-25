import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import '../main.dart';
import '../models/portfolio_models.dart';
import '../widgets/share_bottom_sheet.dart';

enum TemplateArchetype {
  terminal,
  popArt,
  editorial,
  cyberMatrix,
  aiResearcher,
  glassmorphism,
  bento,
  minimalNordic,
}

class TemplateConfig {
  final String id;
  final String title;
  final Color bgColor;
  final Color cardBgColor;
  final Color textColor;
  final Color subtextColor;
  final Color primaryColor;
  final Color secondaryColor;
  final bool isDark;
  final String roleBadge;
  final TemplateArchetype archetype;

  const TemplateConfig({
    required this.id,
    required this.title,
    required this.bgColor,
    required this.cardBgColor,
    required this.textColor,
    required this.subtextColor,
    required this.primaryColor,
    required this.secondaryColor,
    required this.archetype,
    this.isDark = false,
    required this.roleBadge,
  });

  bool get isTerminal => archetype == TemplateArchetype.terminal;
  bool get isPopArt => archetype == TemplateArchetype.popArt;
  bool get isEditorial => archetype == TemplateArchetype.editorial;
  bool get isCyberMatrix => archetype == TemplateArchetype.cyberMatrix;
  bool get isAiResearcher => archetype == TemplateArchetype.aiResearcher;
  bool get isGlassmorphism => archetype == TemplateArchetype.glassmorphism;
  bool get isBento => archetype == TemplateArchetype.bento;
  bool get isNordic => archetype == TemplateArchetype.minimalNordic;
}

class PortfolioPreviewScreen extends StatelessWidget {
  final PortfolioProfile profile;
  final VoidCallback? onBack;

  const PortfolioPreviewScreen({
    super.key,
    required this.profile,
    this.onBack,
  });

  static TemplateConfig getTemplateConfig(String templateId) {
    switch (templateId) {
      // 1. Bento / UIUX
      case 'role-uiux':
        return const TemplateConfig(
          id: 'role-uiux',
          title: 'UI/UX Designer (Bento Grid)',
          bgColor: Color(0xFFFFF7F7),
          cardBgColor: Colors.white,
          textColor: Color(0xFF1E293B),
          subtextColor: Color(0xFF64748B),
          primaryColor: Color(0xFFFF6B6B),
          secondaryColor: Color(0xFFFF8E8E),
          isDark: false,
          archetype: TemplateArchetype.bento,
          roleBadge: 'BENTO FIGMA CASE STUDIES',
        );

      // 2. Terminal Fullstack
      case 'role-fullstack':
        return const TemplateConfig(
          id: 'role-fullstack',
          title: 'Full Stack Developer',
          bgColor: Color(0xFF0B132B),
          cardBgColor: Color(0xFF1C2541),
          textColor: Colors.white,
          subtextColor: Color(0xFF94A3B8),
          primaryColor: Color(0xFF3A86EF),
          secondaryColor: Color(0xFFFBBF24),
          isDark: true,
          archetype: TemplateArchetype.terminal,
          roleBadge: 'TERMINAL // FULLSTACK ACTIVE',
        );

      // 3. AI Researcher
      case 'role-ai-researcher':
        return const TemplateConfig(
          id: 'role-ai-researcher',
          title: 'AI Researcher',
          bgColor: Color(0xFF18122B),
          cardBgColor: Color(0xFF281F3D),
          textColor: Colors.white,
          subtextColor: Color(0xFFC084FC),
          primaryColor: Color(0xFFD946EF),
          secondaryColor: Color(0xFF22D3EE),
          isDark: true,
          archetype: TemplateArchetype.aiResearcher,
          roleBadge: 'arXiv // NEURIPS CITATIONS',
        );

      // 4. Cybersecurity Analyst
      case 'role-cybersecurity':
        return const TemplateConfig(
          id: 'role-cybersecurity',
          title: 'Cybersecurity Analyst',
          bgColor: Color(0xFF0A0A0A),
          cardBgColor: Color(0xFF121417),
          textColor: Color(0xFFE2E8F0),
          subtextColor: Color(0xFF86EFAC),
          primaryColor: Color(0xFF00FF66),
          secondaryColor: Color(0xFF10B981),
          isDark: true,
          archetype: TemplateArchetype.cyberMatrix,
          roleBadge: 'SEC_OPS // CLEARANCE VERIFIED',
        );

      // 5. DevOps Engineer (Terminal)
      case 'role-devops':
        return const TemplateConfig(
          id: 'role-devops',
          title: 'DevOps Engineer',
          bgColor: Color(0xFF0F172A),
          cardBgColor: Color(0xFF1E293B),
          textColor: Colors.white,
          subtextColor: Color(0xFF94A3B8),
          primaryColor: Color(0xFF38BDF8),
          secondaryColor: Color(0xFFF97316),
          isDark: true,
          archetype: TemplateArchetype.terminal,
          roleBadge: 'CI/CD PASSING • K8S CLUSTER 99.99%',
        );

      // 6. QA Engineer (Matrix / Test Suites)
      case 'role-qa':
        return const TemplateConfig(
          id: 'role-qa',
          title: 'Software Tester / QA',
          bgColor: Color(0xFF0F2422),
          cardBgColor: Color(0xFF183B38),
          textColor: Colors.white,
          subtextColor: Color(0xFFA7F3D0),
          primaryColor: Color(0xFF2A9D8F),
          secondaryColor: Color(0xFF10B981),
          isDark: true,
          archetype: TemplateArchetype.cyberMatrix,
          roleBadge: 'TEST SUITES 100% PASSED',
        );

      // 7. ML Engineer (AI Researcher / Deep Tech)
      case 'role-ml-engineer':
        return const TemplateConfig(
          id: 'role-ml-engineer',
          title: 'Machine Learning Engineer',
          bgColor: Color(0xFF0B0F19),
          cardBgColor: Color(0xFF151C2C),
          textColor: Colors.white,
          subtextColor: Color(0xFFA5B4FC),
          primaryColor: Color(0xFF6366F1),
          secondaryColor: Color(0xFFF59E0B),
          isDark: true,
          archetype: TemplateArchetype.aiResearcher,
          roleBadge: 'ACCURACY: 98.4% • PYTORCH CUDA',
        );

      // 8. Data Analyst (Minimal Nordic / Metric BI)
      case 'role-data-analyst':
        return const TemplateConfig(
          id: 'role-data-analyst',
          title: 'Data Analyst',
          bgColor: Color(0xFFF0F9FF),
          cardBgColor: Colors.white,
          textColor: Color(0xFF0F172A),
          subtextColor: Color(0xFF64748B),
          primaryColor: Color(0xFF0284C7),
          secondaryColor: Color(0xFF06B6D4),
          isDark: false,
          archetype: TemplateArchetype.minimalNordic,
          roleBadge: 'EXECUTIVE BI SCORECARD',
        );

      // 9. Canva Pop Art (Pop Art / Neo-Brutalist)
      case 'canva-pop':
        return const TemplateConfig(
          id: 'canva-pop',
          title: 'Canva Pop Art',
          bgColor: Color(0xFFFAF8F5),
          cardBgColor: Colors.white,
          textColor: Color(0xFF0F172A),
          subtextColor: Color(0xFF334155),
          primaryColor: Color(0xFFF59E0B),
          secondaryColor: Color(0xFFEC4899),
          isDark: false,
          archetype: TemplateArchetype.popArt,
          roleBadge: '✨ CANVA POP ART • OPEN TO WORK',
        );

      // 10. Adobe Behance (Pop Art / Creative Studio)
      case 'adobe-behance':
        return const TemplateConfig(
          id: 'adobe-behance',
          title: 'Adobe Behance Portfolio',
          bgColor: Color(0xFFFFFBF0),
          cardBgColor: Colors.white,
          textColor: Color(0xFF1E1B18),
          subtextColor: Color(0xFF57534E),
          primaryColor: Color(0xFFFF5722),
          secondaryColor: Color(0xFFFFC107),
          isDark: false,
          archetype: TemplateArchetype.popArt,
          roleBadge: 'BEHANCE FEATURED CURATION',
        );

      // 11. Figma Glass (Glassmorphism)
      case 'figma-glass':
        return const TemplateConfig(
          id: 'figma-glass',
          title: 'Figma Glass Prototype',
          bgColor: Color(0xFF130C25),
          cardBgColor: Color(0xFF22163B),
          textColor: Colors.white,
          subtextColor: Color(0xFFC084FC),
          primaryColor: Color(0xFFA855F7),
          secondaryColor: Color(0xFF06B6D4),
          isDark: true,
          archetype: TemplateArchetype.glassmorphism,
          roleBadge: 'FIGMA AUTO-LAYOUT SYSTEM',
        );

      // 12. Minimal Nordic (Scandinavian Minimalism)
      case 'minimal-nordic':
        return const TemplateConfig(
          id: 'minimal-nordic',
          title: 'Minimalist Nordic',
          bgColor: Color(0xFFF7F6F2),
          cardBgColor: Colors.white,
          textColor: Color(0xFF1C1917),
          subtextColor: Color(0xFF57534E),
          primaryColor: Color(0xFF78716C),
          secondaryColor: Color(0xFF44403C),
          isDark: false,
          archetype: TemplateArchetype.minimalNordic,
          roleBadge: 'SCANDINAVIAN ARCHITECTURAL',
        );

      // 13. Creative Aurora (Glassmorphism / Glow)
      case 'aurora-creative':
        return const TemplateConfig(
          id: 'aurora-creative',
          title: 'Creative Aurora',
          bgColor: Color(0xFF0F0C20),
          cardBgColor: Color(0xFF1D1738),
          textColor: Colors.white,
          subtextColor: Color(0xFFF472B6),
          primaryColor: Color(0xFFEC4899),
          secondaryColor: Color(0xFF8B5CF6),
          isDark: true,
          archetype: TemplateArchetype.glassmorphism,
          roleBadge: 'AURORA MESH GRADIENT',
        );

      // 14. Frost Academic (Scientific / AI)
      case 'frost-academic':
        return const TemplateConfig(
          id: 'frost-academic',
          title: 'Frost Academic',
          bgColor: Color(0xFFF0F9FF),
          cardBgColor: Colors.white,
          textColor: Color(0xFF0F172A),
          subtextColor: Color(0xFF0369A1),
          primaryColor: Color(0xFF0284C7),
          secondaryColor: Color(0xFF38BDF8),
          isDark: false,
          archetype: TemplateArchetype.aiResearcher,
          roleBadge: 'CRYSTAL ICE ACADEMIC',
        );

      // 15. Coral Modernist (Editorial Magazine)
      case 'coral-modernist':
        return const TemplateConfig(
          id: 'coral-modernist',
          title: 'Coral Modernist',
          bgColor: Color(0xFFFAFAFA),
          cardBgColor: Colors.white,
          textColor: Color(0xFF0F172A),
          subtextColor: Color(0xFF475569),
          primaryColor: Color(0xFFFA5252),
          secondaryColor: Color(0xFFFF8787),
          isDark: false,
          archetype: TemplateArchetype.editorial,
          roleBadge: 'EDITORIAL CORAL MODERNIST',
        );

      // 16. Cyber Violet (Bento Grid)
      case 'cyber-violet':
        return const TemplateConfig(
          id: 'cyber-violet',
          title: 'Cyber Violet',
          bgColor: Color(0xFF090D16),
          cardBgColor: Color(0xFF131B2E),
          textColor: Colors.white,
          subtextColor: Color(0xFFC084FC),
          primaryColor: Color(0xFF8B5CF6),
          secondaryColor: Color(0xFFA855F7),
          isDark: true,
          archetype: TemplateArchetype.bento,
          roleBadge: 'ELECTRIC VIOLET GLOW',
        );

      // 17. Nexus Developer (Terminal CLI)
      case 'nexus-developer':
        return const TemplateConfig(
          id: 'nexus-developer',
          title: 'Nexus Developer',
          bgColor: Color(0xFF0F172A),
          cardBgColor: Color(0xFF1E293B),
          textColor: Colors.white,
          subtextColor: Color(0xFF94A3B8),
          primaryColor: Color(0xFF06B6D4),
          secondaryColor: Color(0xFF3B82F6),
          isDark: true,
          archetype: TemplateArchetype.terminal,
          roleBadge: 'NEXUS GIT COMMITS // LIVE',
        );

      // 18. Slate Editorial (Editorial Magazine)
      case 'slate-editorial':
        return const TemplateConfig(
          id: 'slate-editorial',
          title: 'Slate Editorial',
          bgColor: Color(0xFFF8FAFC),
          cardBgColor: Colors.white,
          textColor: Color(0xFF0F172A),
          subtextColor: Color(0xFF475569),
          primaryColor: Color(0xFF334155),
          secondaryColor: Color(0xFF64748B),
          isDark: false,
          archetype: TemplateArchetype.editorial,
          roleBadge: 'MONOCHROME EDITORIAL DIVIDERS',
        );

      // 19. Crimson Studio (Bento Grid)
      case 'crimson-studio':
        return const TemplateConfig(
          id: 'crimson-studio',
          title: 'Crimson Studio',
          bgColor: Color(0xFF141416),
          cardBgColor: Color(0xFF222228),
          textColor: Colors.white,
          subtextColor: Color(0xFFFDA4AF),
          primaryColor: Color(0xFFE11D48),
          secondaryColor: Color(0xFFFB7185),
          isDark: true,
          archetype: TemplateArchetype.bento,
          roleBadge: 'LUXURY RUBY STUDIO',
        );

      // 20. Executive Classic (Editorial / Corporate)
      case 'executive-classic':
        return const TemplateConfig(
          id: 'executive-classic',
          title: 'Executive Classic',
          bgColor: Color(0xFF0B192C),
          cardBgColor: Color(0xFF1E3E62),
          textColor: Colors.white,
          subtextColor: Color(0xFFFCD34D),
          primaryColor: Color(0xFFD97706),
          secondaryColor: Color(0xFFF59E0B),
          isDark: true,
          archetype: TemplateArchetype.editorial,
          roleBadge: 'EXECUTIVE BOARD ADVISORY',
        );

      // 21. Modern Glass (Featured Glassmorphism)
      case 'modern-glass':
      default:
        return const TemplateConfig(
          id: 'modern-glass',
          title: 'Modern Glass (Featured)',
          bgColor: Color(0xFF090D16),
          cardBgColor: Color(0xFF131B2E),
          textColor: Colors.white,
          subtextColor: Color(0xFF94A3B8),
          primaryColor: Color(0xFF10B981),
          secondaryColor: Color(0xFF2563EB),
          isDark: true,
          archetype: TemplateArchetype.glassmorphism,
          roleBadge: 'FROSTED GLASS GLOW // CV VERIFIED',
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    final templateId = profile.settings.templateId;
    final cfg = getTemplateConfig(templateId);

    return Scaffold(
      backgroundColor: cfg.bgColor,
      appBar: AppBar(
        backgroundColor: cfg.isDark ? cfg.bgColor : Colors.white,
        elevation: cfg.isPopArt ? 0 : 1,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: cfg.textColor),
          onPressed: () {
            if (onBack != null) {
              onBack!();
            } else if (Navigator.canPop(context)) {
              Navigator.pop(context);
            } else {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (_) => const MainNavigationShell()),
              );
            }
          },
        ),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: cfg.primaryColor.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(6),
                border: cfg.isPopArt
                    ? Border.all(color: const Color(0xFF0F172A), width: 1.5)
                    : null,
              ),
              child: Text(
                cfg.id.toUpperCase(),
                style: _getMonospaceStyle(
                  fontSize: 9,
                  fontWeight: FontWeight.w900,
                  color: cfg.primaryColor,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                profile.personal.fullName,
                overflow: TextOverflow.ellipsis,
                style: _getTitleStyle(cfg, fontSize: 14),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.share_outlined, color: cfg.primaryColor),
            onPressed: () => ShareBottomSheet.show(context, profile, () {}),
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          children: [
            // Top Role-Specific Theme Bar (matches website top banner)
            _buildThematicTopBar(cfg),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Hero / Bio Card
                  _buildHeroCard(context, cfg),
                  const SizedBox(height: 16),

                  // Analytics / Scorecard Bar (NO LIVE VIEWS!)
                  _buildScorecardBar(cfg),
                  const SizedBox(height: 20),

                  // Skills & Technologies Section
                  if (profile.skills.languages.isNotEmpty ||
                      profile.skills.frameworks.isNotEmpty ||
                      profile.skills.tools.isNotEmpty) ...[
                    _buildSectionHeader(
                      cfg.isTerminal
                          ? '> STACK --LIST'
                          : cfg.isCyberMatrix
                              ? '[SECURITY ARSENAL // SKILLS]'
                              : 'Technical Arsenal & Skills',
                      Icons.code,
                      cfg.primaryColor,
                      cfg.textColor,
                      cfg,
                    ),
                    const SizedBox(height: 10),
                    _buildSkillsCard(cfg),
                    const SizedBox(height: 20),
                  ],

                  // Featured Projects Section
                  if (profile.projects.isNotEmpty) ...[
                    _buildSectionHeader(
                      cfg.isTerminal
                          ? '> DEPLOYED_PROJECTS --ALL'
                          : cfg.isCyberMatrix
                              ? '[SECURITY LABS & TARGETS]'
                              : 'Hardening Labs & Projects',
                      Icons.rocket_launch,
                      cfg.secondaryColor,
                      cfg.textColor,
                      cfg,
                    ),
                    const SizedBox(height: 10),
                    ...profile.projects.map((proj) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: _buildProjectCard(proj, cfg),
                        )),
                    const SizedBox(height: 10),
                  ],

                  // Work Experience Section
                  if (profile.experience.isNotEmpty) ...[
                    _buildSectionHeader(
                      cfg.isTerminal
                          ? '> CAREER_TRACE --HISTORY'
                          : cfg.isEditorial
                              ? 'Professional Engagements'
                              : 'Work Experience',
                      Icons.work_outline,
                      cfg.primaryColor,
                      cfg.textColor,
                      cfg,
                    ),
                    const SizedBox(height: 10),
                    ...profile.experience.map((exp) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: _buildExperienceCard(exp, cfg),
                        )),
                    const SizedBox(height: 10),
                  ],

                  // Education Section
                  if (profile.education.isNotEmpty) ...[
                    _buildSectionHeader(
                      cfg.isTerminal
                          ? '> CREDENTIALS --ACADEMIC'
                          : cfg.isEditorial
                              ? 'Academic Foundations'
                              : 'Education & Credentials',
                      Icons.school_outlined,
                      cfg.primaryColor,
                      cfg.textColor,
                      cfg,
                    ),
                    const SizedBox(height: 10),
                    ...profile.education.map((edu) => Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: _buildEducationCard(edu, cfg),
                        )),
                    const SizedBox(height: 10),
                  ],

                  // Bottom Watermark
                  const SizedBox(height: 24),
                  Center(
                    child: Text(
                      'Generated with Portfolify Studio • 21 Verified Styles',
                      style: _getBodyStyle(cfg, fontSize: 10, color: cfg.subtextColor),
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // --- THEMATIC TOP BANNERS MATCHING THE WEBSITE ---

  Widget _buildThematicTopBar(TemplateConfig cfg) {
    if (cfg.isPopArt) {
      // Canva Pop Art Top Banner (Gradient + Sticker)
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFFDE68A), Color(0xFFFDA4AF), Color(0xFFA5B4FC)],
          ),
          border: Border(
            bottom: BorderSide(color: Color(0xFF0F172A), width: 2.5),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF0F172A), width: 2),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0xFF0F172A),
                    offset: Offset(2, 2),
                  ),
                ],
              ),
              child: const Text(
                '✨ CANVA POP STYLE',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: const Color(0xFFF59E0B),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: const Color(0xFF0F172A), width: 2),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0xFF0F172A),
                    offset: Offset(2, 2),
                  ),
                ],
              ),
              child: const Text(
                '🚀 OPEN TO WORK',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Colors.white),
              ),
            ),
          ],
        ),
      );
    }

    if (cfg.isTerminal) {
      // macOS / Linux Terminal Window Bar
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        color: const Color(0xFF070D1E),
        child: Row(
          children: [
            Row(
              children: [
                Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFFEF4444), shape: BoxShape.circle)),
                const SizedBox(width: 5),
                Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFFF59E0B), shape: BoxShape.circle)),
                const SizedBox(width: 5),
                Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle)),
              ],
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                '> ${cfg.id} ~/profile.config.ts',
                style: _getMonospaceStyle(fontSize: 11, color: const Color(0xFF94A3B8)),
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: cfg.primaryColor.withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                'LIVE_CLI',
                style: _getMonospaceStyle(fontSize: 9, fontWeight: FontWeight.bold, color: cfg.primaryColor),
              ),
            ),
          ],
        ),
      );
    }

    if (cfg.isCyberMatrix) {
      // Cybersecurity HUD Top Bar
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        color: const Color(0xFF05080A),
        child: Row(
          children: [
            Container(
              width: 8,
              height: 8,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: cfg.primaryColor,
                boxShadow: [
                  BoxShadow(color: cfg.primaryColor.withValues(alpha: 0.8), blurRadius: 6),
                ],
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                'SYS_DEFENSE: NOMINAL // PORT 443 ENCRYPTED',
                style: _getMonospaceStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: cfg.primaryColor,
                  letterSpacing: 0.5,
                ),
              ),
            ),
            Text(
              '[SECURE]',
              style: _getMonospaceStyle(
                fontSize: 10,
                fontWeight: FontWeight.w900,
                color: cfg.primaryColor,
              ),
            ),
          ],
        ),
      );
    }

    if (cfg.isEditorial) {
      // Editorial Magazine Top Bar
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        decoration: BoxDecoration(
          color: cfg.primaryColor.withValues(alpha: 0.08),
          border: Border(bottom: BorderSide(color: cfg.primaryColor.withValues(alpha: 0.2), width: 1)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '— CURRICULUM VITAE & PORTFOLIO —',
              style: _getEditorialStyle(
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.5,
                color: cfg.primaryColor,
              ),
            ),
          ],
        ),
      );
    }

    if (cfg.isAiResearcher) {
      // AI Researcher Top Bar
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 7),
        color: const Color(0xFF140D26),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'arXiv:2409.STUDIO // PEER REVIEWED',
              style: _getMonospaceStyle(fontSize: 10, color: cfg.subtextColor, fontWeight: FontWeight.bold),
            ),
            Text(
              'LOSS: 0.0014',
              style: _getMonospaceStyle(fontSize: 10, color: cfg.primaryColor, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      );
    }

    // Default Glass / Modern bar
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      color: cfg.primaryColor.withValues(alpha: 0.08),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.verified, size: 14, color: cfg.primaryColor),
          const SizedBox(width: 6),
          Text(
            cfg.roleBadge,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.5,
              color: cfg.primaryColor,
            ),
          ),
        ],
      ),
    );
  }

  // --- HERO PROFILE CARD (UNIQUE PER ARCHETYPE) ---

  Widget _buildHeroCard(BuildContext context, TemplateConfig cfg) {
    if (cfg.isPopArt) {
      // Canva Pop Art Hero: Bold 3px Black Border, Drop Shadow, Bouncy Sticker Pills
      return Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: const Color(0xFF0F172A), width: 2.5),
          boxShadow: const [
            BoxShadow(
              color: Color(0xFF0F172A),
              offset: Offset(4, 4),
              blurRadius: 0,
            ),
          ],
        ),
        child: Column(
          children: [
            // Avatar with Pop Art Outline
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFFDE68A),
                border: Border.all(color: const Color(0xFF0F172A), width: 3),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0xFF0F172A),
                    offset: Offset(3, 3),
                  ),
                ],
              ),
              child: ClipOval(
                child: _buildAvatarImage(profile.personal.avatarUrl, profile.personal.fullName, cfg),
              ),
            ),
            const SizedBox(height: 14),

            // Highlighted Sticker Name Box
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              decoration: BoxDecoration(
                color: const Color(0xFFFEF08A),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF0F172A), width: 2),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0xFF0F172A),
                    offset: Offset(2, 2),
                  ),
                ],
              ),
              child: Text(
                profile.personal.fullName,
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF0F172A),
                  letterSpacing: -0.5,
                ),
              ),
            ),
            const SizedBox(height: 8),

            Text(
              profile.personal.headline,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w800,
                color: Color(0xFFE11D48),
              ),
            ),
            const SizedBox(height: 10),

            Text(
              profile.personal.bio,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: Color(0xFF334155),
                height: 1.4,
              ),
            ),
            const SizedBox(height: 14),

            // Pop Art Action Buttons
            Wrap(
              spacing: 8,
              runSpacing: 8,
              alignment: WrapAlignment.center,
              children: [
                if (profile.personal.location.isNotEmpty)
                  _buildPopStickerPill(Icons.location_on, profile.personal.location, const Color(0xFFF1F5F9)),
                if (profile.personal.email.isNotEmpty)
                  _buildPopActionPill(Icons.mail, 'Email', () => _launchUrl('mailto:${profile.personal.email}')),
                if (profile.personal.githubUrl.isNotEmpty)
                  _buildPopActionPill(Icons.code, 'GitHub', () => _launchUrl(profile.personal.githubUrl)),
                if (profile.personal.linkedinUrl.isNotEmpty)
                  _buildPopActionPill(Icons.link, 'LinkedIn', () => _launchUrl(profile.personal.linkedinUrl)),
              ],
            ),
          ],
        ),
      );
    }

    if (cfg.isTerminal) {
      // Terminal CLI Window Card: Monospace Shell, Command Prompts
      return Container(
        decoration: BoxDecoration(
          color: const Color(0xFF080C16),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFF1E293B), width: 1.5),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Terminal Header Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: const BoxDecoration(
                color: Color(0xFF0F172A),
                borderRadius: BorderRadius.vertical(top: Radius.circular(14)),
              ),
              child: Row(
                children: [
                  Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFFEF4444), shape: BoxShape.circle)),
                  const SizedBox(width: 5),
                  Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFFF59E0B), shape: BoxShape.circle)),
                  const SizedBox(width: 5),
                  Container(width: 8, height: 8, decoration: const BoxDecoration(color: Color(0xFF10B981), shape: BoxShape.circle)),
                  const SizedBox(width: 10),
                  Text('bash ~ user@profile', style: _getMonospaceStyle(fontSize: 10, color: const Color(0xFF64748B))),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Terminal Avatar Box
                      Container(
                        width: 64,
                        height: 64,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: cfg.primaryColor, width: 1.5),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(6),
                          child: _buildAvatarImage(profile.personal.avatarUrl, profile.personal.fullName, cfg),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('\$ whoami', style: _getMonospaceStyle(fontSize: 10, color: const Color(0xFF10B981))),
                            Text(
                              '${profile.personal.fullName} ▌',
                              style: _getMonospaceStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              profile.personal.headline,
                              style: _getMonospaceStyle(fontSize: 11, color: cfg.primaryColor),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text('\$ cat bio.txt', style: _getMonospaceStyle(fontSize: 10, color: const Color(0xFF10B981))),
                  const SizedBox(height: 4),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF030712),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: const Color(0xFF1F2937)),
                    ),
                    child: Text(
                      profile.personal.bio,
                      style: _getMonospaceStyle(fontSize: 11, color: const Color(0xFFCBD5E1), height: 1.4),
                    ),
                  ),
                  const SizedBox(height: 12),
                  // Shell action buttons
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      if (profile.personal.email.isNotEmpty)
                        _buildTerminalAction('mail', () => _launchUrl('mailto:${profile.personal.email}')),
                      if (profile.personal.githubUrl.isNotEmpty)
                        _buildTerminalAction('github', () => _launchUrl(profile.personal.githubUrl)),
                      if (profile.personal.linkedinUrl.isNotEmpty)
                        _buildTerminalAction('linkedin', () => _launchUrl(profile.personal.linkedinUrl)),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      );
    }

    if (cfg.isEditorial) {
      // Editorial Magazine Style: Serif Masthead, Pull-Quote Border, Warm Clean Layout
      return Container(
        padding: const EdgeInsets.all(22),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFFE2E8F0), width: 1.2),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF0F172A).withValues(alpha: 0.04),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Pill
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
              decoration: BoxDecoration(
                color: cfg.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                'WELCOME TO MY PORTFOLIO',
                style: _getEditorialStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1.2,
                  color: cfg.primaryColor,
                ),
              ),
            ),
            const SizedBox(height: 14),

            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Hi, I'm",
                        style: _getEditorialStyle(fontSize: 16, color: const Color(0xFF64748B)),
                      ),
                      Text(
                        profile.personal.fullName,
                        style: _getEditorialStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w900,
                          color: const Color(0xFF0F172A),
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        profile.personal.headline,
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: cfg.primaryColor,
                        ),
                      ),
                    ],
                  ),
                ),
                if (profile.personal.avatarUrl.isNotEmpty) ...[
                  const SizedBox(width: 14),
                  Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: cfg.primaryColor.withValues(alpha: 0.3), width: 2),
                      boxShadow: [
                        BoxShadow(
                          color: cfg.primaryColor.withValues(alpha: 0.15),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: _buildAvatarImage(profile.personal.avatarUrl, profile.personal.fullName, cfg),
                    ),
                  ),
                ],
              ],
            ),
            const SizedBox(height: 14),

            // Pull-Quote Bio Border
            Container(
              decoration: BoxDecoration(
                border: Border(left: BorderSide(color: cfg.primaryColor, width: 3)),
              ),
              padding: const EdgeInsets.only(left: 12),
              child: Text(
                profile.personal.bio,
                style: _getEditorialStyle(
                  fontSize: 13,
                  color: const Color(0xFF475569),
                  height: 1.5,
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Editorial Links
            Row(
              children: [
                if (profile.personal.location.isNotEmpty) ...[
                  Icon(Icons.location_on, size: 14, color: cfg.primaryColor),
                  const SizedBox(width: 4),
                  Text(profile.personal.location, style: const TextStyle(fontSize: 11, color: Color(0xFF64748B))),
                  const SizedBox(width: 12),
                ],
                const Spacer(),
                if (profile.personal.email.isNotEmpty)
                  _buildSocialIcon(Icons.mail, () => _launchUrl('mailto:${profile.personal.email}'), cfg),
                if (profile.personal.githubUrl.isNotEmpty)
                  _buildSocialIcon(Icons.code, () => _launchUrl(profile.personal.githubUrl), cfg),
                if (profile.personal.linkedinUrl.isNotEmpty)
                  _buildSocialIcon(Icons.link, () => _launchUrl(profile.personal.linkedinUrl), cfg),
              ],
            ),
          ],
        ),
      );
    }

    if (cfg.isCyberMatrix) {
      // Cybersecurity HUD Card: Tactical Borders, Crosshairs, Status Meters
      return Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: const Color(0xFF090D0F),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: cfg.primaryColor, width: 1.5),
          boxShadow: [
            BoxShadow(
              color: cfg.primaryColor.withValues(alpha: 0.15),
              blurRadius: 16,
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.shield, size: 16, color: cfg.primaryColor),
                const SizedBox(width: 6),
                Text(
                  '[OPERATIVE IDENT: CONFIRMED]',
                  style: _getMonospaceStyle(fontSize: 10, fontWeight: FontWeight.bold, color: cfg.primaryColor),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                // Tactical Avatar
                Container(
                  width: 68,
                  height: 68,
                  decoration: BoxDecoration(
                    color: const Color(0xFF05080A),
                    border: Border.all(color: cfg.primaryColor, width: 2),
                  ),
                  child: _buildAvatarImage(profile.personal.avatarUrl, profile.personal.fullName, cfg),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        profile.personal.fullName.toUpperCase(),
                        style: _getMonospaceStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        profile.personal.headline,
                        style: _getMonospaceStyle(fontSize: 11, color: cfg.subtextColor),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: const Color(0xFF05080A),
                border: Border.all(color: cfg.primaryColor.withValues(alpha: 0.3)),
              ),
              child: Text(
                profile.personal.bio,
                style: _getMonospaceStyle(fontSize: 11, color: const Color(0xFFCBD5E1), height: 1.4),
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              children: [
                if (profile.personal.email.isNotEmpty)
                  _buildCyberPill('MAIL_NODE', () => _launchUrl('mailto:${profile.personal.email}'), cfg),
                if (profile.personal.githubUrl.isNotEmpty)
                  _buildCyberPill('GIT_REPOS', () => _launchUrl(profile.personal.githubUrl), cfg),
                if (profile.personal.linkedinUrl.isNotEmpty)
                  _buildCyberPill('NET_PROFILE', () => _launchUrl(profile.personal.linkedinUrl), cfg),
              ],
            ),
          ],
        ),
      );
    }

    // Default Glass / Bento / Nordic Card
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: _cardBoxDecoration(cfg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 68,
                height: 68,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [cfg.primaryColor, cfg.secondaryColor],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: cfg.primaryColor.withValues(alpha: 0.4),
                    width: 2.5,
                  ),
                ),
                child: ClipOval(
                  child: _buildAvatarImage(profile.personal.avatarUrl, profile.personal.fullName, cfg),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      profile.personal.fullName,
                      style: _getTitleStyle(cfg, fontSize: 20),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      profile.personal.headline,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: cfg.primaryColor,
                      ),
                    ),
                    if (profile.personal.location.isNotEmpty) ...[
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(Icons.location_on, size: 12, color: cfg.subtextColor),
                          const SizedBox(width: 3),
                          Text(
                            profile.personal.location,
                            style: TextStyle(fontSize: 11, color: cfg.subtextColor),
                          ),
                        ],
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          Text(
            profile.personal.bio,
            style: _getBodyStyle(cfg, fontSize: 13, color: cfg.textColor.withValues(alpha: 0.85), height: 1.45),
          ),
          const SizedBox(height: 16),
          // Action Buttons
          Row(
            children: [
              if (profile.personal.email.isNotEmpty)
                _buildSocialIcon(Icons.mail_outline, () => _launchUrl('mailto:${profile.personal.email}'), cfg),
              if (profile.personal.githubUrl.isNotEmpty) ...[
                const SizedBox(width: 8),
                _buildSocialIcon(Icons.code, () => _launchUrl(profile.personal.githubUrl), cfg),
              ],
              if (profile.personal.linkedinUrl.isNotEmpty) ...[
                const SizedBox(width: 8),
                _buildSocialIcon(Icons.link, () => _launchUrl(profile.personal.linkedinUrl), cfg),
              ],
              const Spacer(),
              if (profile.personal.resumeUrl != null && profile.personal.resumeUrl!.isNotEmpty)
                ElevatedButton.icon(
                  onPressed: () => _launchUrl(profile.personal.resumeUrl!),
                  icon: const Icon(Icons.download, size: 14),
                  label: const Text('Resume PDF', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: cfg.primaryColor,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  // --- SCORECARD BAR (NO LIVE VIEWS!) ---

  Widget _buildScorecardBar(TemplateConfig cfg) {
    final projectsCount = '${profile.projects.length}';
    final skillsCount = '${profile.skills.languages.length + profile.skills.frameworks.length}';
    final rolesCount = '${profile.experience.length}';

    if (cfg.isPopArt) {
      // Pop Art Hard-Shadow Metric Boxes
      return Row(
        children: [
          Expanded(child: _buildPopStatBox(projectsCount, 'PROJECTS', const Color(0xFFFEF08A))),
          const SizedBox(width: 8),
          Expanded(child: _buildPopStatBox(skillsCount, 'TECH SKILLS', const Color(0xFFFBCFE8))),
          const SizedBox(width: 8),
          Expanded(child: _buildPopStatBox(rolesCount, 'WORK ROLES', const Color(0xFFBAE6FD))),
        ],
      );
    }

    if (cfg.isTerminal) {
      // Terminal Monospace Stats Line
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
        decoration: BoxDecoration(
          color: const Color(0xFF080C16),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildTerminalStatItem('projects', projectsCount, cfg),
            Text('|', style: _getMonospaceStyle(color: const Color(0xFF334155))),
            _buildTerminalStatItem('stack_size', skillsCount, cfg),
            Text('|', style: _getMonospaceStyle(color: const Color(0xFF334155))),
            _buildTerminalStatItem('work_nodes', rolesCount, cfg),
          ],
        ),
      );
    }

    if (cfg.isCyberMatrix) {
      // Cyber Matrix HUD Metrics
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
        decoration: BoxDecoration(
          color: const Color(0xFF05080A),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: cfg.primaryColor.withValues(alpha: 0.4)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildCyberStatItem('DEPLOYED_LABS', projectsCount, cfg),
            _buildCyberStatItem('SECURITY_VECTORS', skillsCount, cfg),
            _buildCyberStatItem('ROLES_AUDITED', rolesCount, cfg),
          ],
        ),
      );
    }

    // Default Scorecard (No Live Views!)
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
      decoration: _cardBoxDecoration(cfg),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildStatItem(projectsCount, 'Projects', cfg),
          _buildDivider(cfg),
          _buildStatItem(skillsCount, 'Tech Skills', cfg),
          _buildDivider(cfg),
          _buildStatItem(rolesCount, 'Work Roles', cfg),
        ],
      ),
    );
  }

  // --- SKILLS CARD (UNIQUE PER ARCHETYPE) ---

  Widget _buildSkillsCard(TemplateConfig cfg) {
    final allSkills = [
      ...profile.skills.languages,
      ...profile.skills.frameworks,
      ...profile.skills.tools,
    ];

    if (cfg.isPopArt) {
      // Colorful candy tags with 2px black borders and shadows
      final colors = [
        const Color(0xFFFEF08A),
        const Color(0xFFFBCFE8),
        const Color(0xFFBAE6FD),
        const Color(0xFFBBF7D0),
        const Color(0xFFFED7AA),
      ];

      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFF0F172A), width: 2),
          boxShadow: const [
            BoxShadow(color: Color(0xFF0F172A), offset: Offset(3, 3)),
          ],
        ),
        child: Wrap(
          spacing: 8,
          runSpacing: 8,
          children: allSkills.asMap().entries.map((entry) {
            final color = colors[entry.key % colors.length];
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF0F172A), width: 1.5),
                boxShadow: const [
                  BoxShadow(color: Color(0xFF0F172A), offset: Offset(1.5, 1.5)),
                ],
              ),
              child: Text(
                entry.value,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF0F172A),
                ),
              ),
            );
          }).toList(),
        ),
      );
    }

    if (cfg.isTerminal) {
      // Terminal bash chip list with $ command prefix
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: const Color(0xFF080C16),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Wrap(
          spacing: 8,
          runSpacing: 8,
          children: allSkills.map((s) {
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(6),
                border: Border.all(color: cfg.primaryColor.withValues(alpha: 0.3)),
              ),
              child: Text(
                '\$ $s',
                style: _getMonospaceStyle(fontSize: 11, color: cfg.primaryColor, fontWeight: FontWeight.bold),
              ),
            );
          }).toList(),
        ),
      );
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: _cardBoxDecoration(cfg),
      child: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: allSkills.map((s) => _buildSkillChip(s, cfg)).toList(),
      ),
    );
  }

  // --- PROJECT CARDS ---

  Widget _buildProjectCard(ProjectItem project, TemplateConfig cfg) {
    if (cfg.isPopArt) {
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFF0F172A), width: 2),
          boxShadow: const [
            BoxShadow(color: Color(0xFF0F172A), offset: Offset(3, 3)),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    project.title,
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
                  ),
                ),
                if (project.liveUrl != null && project.liveUrl!.isNotEmpty)
                  GestureDetector(
                    onTap: () => _launchUrl(project.liveUrl!),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFDE68A),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: const Color(0xFF0F172A), width: 1.5),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.open_in_new, size: 12, color: Color(0xFF0F172A)),
                          SizedBox(width: 4),
                          Text('Live Demo', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Color(0xFF0F172A))),
                        ],
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              project.description,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500, color: Color(0xFF475569), height: 1.4),
            ),
            if (project.technologies.isNotEmpty) ...[
              const SizedBox(height: 10),
              Wrap(
                spacing: 6,
                runSpacing: 6,
                children: project.technologies.map((t) {
                  return Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: const Color(0xFFCBD5E1)),
                    ),
                    child: Text(t, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFF334155))),
                  );
                }).toList(),
              ),
            ],
          ],
        ),
      );
    }

    if (cfg.isTerminal) {
      return Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: const Color(0xFF080C16),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: const Color(0xFF1E293B)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.terminal, size: 14, color: cfg.primaryColor),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    'repo: ${project.title.toLowerCase().replaceAll(' ', '_')}.git',
                    style: _getMonospaceStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text('[BUILD: PASSING]', style: _getMonospaceStyle(fontSize: 9, color: const Color(0xFF10B981), fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text(
              project.description,
              style: _getMonospaceStyle(fontSize: 11, color: const Color(0xFF94A3B8), height: 1.4),
            ),
            if (project.technologies.isNotEmpty) ...[
              const SizedBox(height: 8),
              Wrap(
                spacing: 6,
                children: project.technologies.map((t) {
                  return Text('#$t ', style: _getMonospaceStyle(fontSize: 10, color: cfg.primaryColor));
                }).toList(),
              ),
            ],
          ],
        ),
      );
    }

    // Default Project Card
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: _cardBoxDecoration(cfg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  project.title,
                  style: _getTitleStyle(cfg, fontSize: 15),
                ),
              ),
              if (project.liveUrl != null && project.liveUrl!.isNotEmpty)
                IconButton(
                  icon: const Icon(Icons.open_in_new, size: 16),
                  color: cfg.primaryColor,
                  onPressed: () => _launchUrl(project.liveUrl!),
                ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            project.description,
            style: _getBodyStyle(cfg, fontSize: 12, color: cfg.subtextColor, height: 1.4),
          ),
          if (project.technologies.isNotEmpty) ...[
            const SizedBox(height: 10),
            Wrap(
              spacing: 6,
              runSpacing: 4,
              children: project.technologies.map((t) {
                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: cfg.primaryColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    t,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: cfg.primaryColor,
                    ),
                  ),
                );
              }).toList(),
            ),
          ],
        ],
      ),
    );
  }

  // --- EXPERIENCE & EDUCATION CARDS ---

  Widget _buildExperienceCard(ExperienceItem exp, TemplateConfig cfg) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: _cardBoxDecoration(cfg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                exp.role,
                style: _getTitleStyle(cfg, fontSize: 14),
              ),
              Text(
                '${exp.startDate} - ${exp.endDate}',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: cfg.primaryColor),
              ),
            ],
          ),
          Text(
            exp.company,
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: cfg.subtextColor),
          ),
          if (exp.description.isNotEmpty) ...[
            const SizedBox(height: 6),
            Text(
              exp.description.join(' • '),
              style: _getBodyStyle(cfg, fontSize: 11, color: cfg.subtextColor, height: 1.4),
            ),

          ],
        ],
      ),
    );
  }

  Widget _buildEducationCard(EducationItem edu, TemplateConfig cfg) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: _cardBoxDecoration(cfg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  edu.degree,
                  style: _getTitleStyle(cfg, fontSize: 14),
                ),
              ),
              Text(
                '${edu.startYear} - ${edu.endYear}',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: cfg.primaryColor),
              ),
            ],
          ),
          Text(
            edu.institution,
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: cfg.subtextColor),
          ),
          if (edu.fieldOfStudy.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(
              'Field: ${edu.fieldOfStudy}',
              style: TextStyle(fontSize: 11, color: cfg.subtextColor),
            ),
          ],
        ],
      ),
    );
  }

  // --- STATS HELPERS (NO LIVE VIEWS!) ---

  Widget _buildPopStatBox(String number, String label, Color bgColor) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF0F172A), width: 2),
        boxShadow: const [
          BoxShadow(color: Color(0xFF0F172A), offset: Offset(2, 2)),
        ],
      ),
      child: Column(
        children: [
          Text(number, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A))),
          const SizedBox(height: 2),
          Text(label, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Color(0xFF334155))),
        ],
      ),
    );
  }

  Widget _buildTerminalStatItem(String label, String value, TemplateConfig cfg) {
    return Column(
      children: [
        Text(value, style: _getMonospaceStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
        Text(label, style: _getMonospaceStyle(fontSize: 9, color: cfg.subtextColor)),
      ],
    );
  }

  Widget _buildCyberStatItem(String label, String value, TemplateConfig cfg) {
    return Column(
      children: [
        Text(value, style: _getMonospaceStyle(fontSize: 16, fontWeight: FontWeight.w900, color: cfg.primaryColor)),
        Text(label, style: _getMonospaceStyle(fontSize: 8, fontWeight: FontWeight.bold, color: const Color(0xFF94A3B8))),
      ],
    );
  }

  Widget _buildStatItem(String count, String label, TemplateConfig cfg) {
    return Column(
      children: [
        Text(
          count,
          style: cfg.isEditorial
              ? _getEditorialStyle(fontSize: 20, fontWeight: FontWeight.w900, color: cfg.textColor)
              : TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w900,
                  color: cfg.textColor,
                ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w600,
            color: cfg.subtextColor,
          ),
        ),
      ],
    );
  }

  Widget _buildDivider(TemplateConfig cfg) {
    return Container(
      width: 1,
      height: 24,
      color: cfg.isDark ? Colors.white12 : Colors.grey.shade200,
    );
  }

  // --- STYLING & DECORATION HELPERS ---

  BoxDecoration _cardBoxDecoration(TemplateConfig cfg) {
    if (cfg.isPopArt) {
      return BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF0F172A), width: 2),
        boxShadow: const [
          BoxShadow(color: Color(0xFF0F172A), offset: Offset(3, 3)),
        ],
      );
    }

    if (cfg.isTerminal) {
      return BoxDecoration(
        color: const Color(0xFF080C16),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF1E293B)),
      );
    }

    if (cfg.isCyberMatrix) {
      return BoxDecoration(
        color: const Color(0xFF05080A),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: cfg.primaryColor.withValues(alpha: 0.4)),
      );
    }

    return BoxDecoration(
      color: cfg.cardBgColor,
      borderRadius: BorderRadius.circular(20),
      border: Border.all(
        color: cfg.isDark ? Colors.white.withValues(alpha: 0.08) : Colors.grey.shade200,
      ),
      boxShadow: [
        if (!cfg.isDark)
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
      ],
    );
  }

  Widget _buildSectionHeader(String title, IconData icon, Color iconColor, Color textColor, TemplateConfig cfg) {
    return Row(
      children: [
        Icon(icon, size: 16, color: iconColor),
        const SizedBox(width: 8),
        Text(
          title,
          style: cfg.isTerminal || cfg.isCyberMatrix
              ? _getMonospaceStyle(fontSize: 13, fontWeight: FontWeight.bold, color: textColor)
              : cfg.isEditorial
                  ? _getEditorialStyle(fontSize: 16, fontWeight: FontWeight.w800, color: textColor)
                  : TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w900,
                      color: textColor,
                    ),
        ),
      ],
    );
  }

  Widget _buildSkillChip(String skill, TemplateConfig cfg) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: cfg.primaryColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: cfg.primaryColor.withValues(alpha: 0.25),
        ),
      ),
      child: Text(
        skill,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          color: cfg.isDark ? cfg.textColor : cfg.primaryColor,
        ),
      ),
    );
  }

  Widget _buildSocialIcon(IconData icon, VoidCallback onTap, TemplateConfig cfg) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: cfg.primaryColor.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, size: 16, color: cfg.primaryColor),
      ),
    );
  }

  Widget _buildPopStickerPill(IconData icon, String text, Color bgColor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF0F172A), width: 1.5),
        boxShadow: const [
          BoxShadow(color: Color(0xFF0F172A), offset: Offset(1.5, 1.5)),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: const Color(0xFF0F172A)),
          const SizedBox(width: 4),
          Text(text, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Color(0xFF0F172A))),
        ],
      ),
    );
  }

  Widget _buildPopActionPill(IconData icon, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: const Color(0xFF0F172A), width: 1.5),
          boxShadow: const [
            BoxShadow(color: Color(0xFF0F172A), offset: Offset(2, 2)),
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 13, color: const Color(0xFF0F172A)),
            const SizedBox(width: 5),
            Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: Color(0xFF0F172A))),
          ],
        ),
      ),
    );
  }

  Widget _buildTerminalAction(String cmd, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        decoration: BoxDecoration(
          color: const Color(0xFF0F172A),
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: const Color(0xFF334155)),
        ),
        child: Text('./$cmd.sh', style: _getMonospaceStyle(fontSize: 11, color: const Color(0xFF38BDF8))),
      ),
    );
  }

  Widget _buildCyberPill(String tag, VoidCallback onTap, TemplateConfig cfg) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: const Color(0xFF05080A),
          border: Border.all(color: cfg.primaryColor),
        ),
        child: Text('[$tag]', style: _getMonospaceStyle(fontSize: 10, fontWeight: FontWeight.bold, color: cfg.primaryColor)),
      ),
    );
  }

  // --- TYPOGRAPHY ENGINE ---

  TextStyle _getTitleStyle(TemplateConfig cfg, {required double fontSize}) {
    if (cfg.isEditorial) {
      return _getEditorialStyle(fontSize: fontSize, fontWeight: FontWeight.bold, color: cfg.textColor);
    }
    if (cfg.isTerminal || cfg.isCyberMatrix) {
      return _getMonospaceStyle(fontSize: fontSize, fontWeight: FontWeight.bold, color: cfg.textColor);
    }
    return TextStyle(
      fontSize: fontSize,
      fontWeight: FontWeight.w900,
      color: cfg.textColor,
    );
  }

  TextStyle _getBodyStyle(TemplateConfig cfg, {required double fontSize, Color? color, double? height}) {
    if (cfg.isTerminal || cfg.isCyberMatrix) {
      return _getMonospaceStyle(fontSize: fontSize, color: color ?? cfg.subtextColor, height: height);
    }
    if (cfg.isEditorial) {
      return _getEditorialStyle(fontSize: fontSize, color: color ?? cfg.textColor, height: height);
    }
    return TextStyle(
      fontSize: fontSize,
      color: color ?? cfg.textColor,
      height: height,
    );
  }

  TextStyle _getMonospaceStyle({
    double fontSize = 12,
    FontWeight fontWeight = FontWeight.normal,
    Color color = Colors.white,
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.firaCode(
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
      letterSpacing: letterSpacing,
      height: height,
    );
  }

  TextStyle _getEditorialStyle({
    double fontSize = 14,
    FontWeight fontWeight = FontWeight.normal,
    Color color = const Color(0xFF0F172A),
    double? letterSpacing,
    double? height,
  }) {
    return GoogleFonts.playfairDisplay(
      fontSize: fontSize,
      fontWeight: fontWeight,
      color: color,
      letterSpacing: letterSpacing,
      height: height,
    );
  }

  Widget _buildAvatarImage(String avatarUrl, String fullName, TemplateConfig cfg) {
    if (avatarUrl.isNotEmpty) {
      if (avatarUrl.startsWith('data:image')) {
        try {
          final base64Part = avatarUrl.split(',').last;
          return Image.memory(
            base64Decode(base64Part),
            fit: BoxFit.cover,
            width: double.infinity,
            height: double.infinity,
          );
        } catch (_) {}
      } else if (avatarUrl.startsWith('http')) {
        return Image.network(
          avatarUrl,
          fit: BoxFit.cover,
          width: double.infinity,
          height: double.infinity,
          errorBuilder: (_, __, ___) => _buildPlaceholderInitial(fullName, cfg),
        );
      }
    }
    return _buildPlaceholderInitial(fullName, cfg);
  }

  Widget _buildPlaceholderInitial(String fullName, TemplateConfig cfg) {
    return Center(
      child: Text(
        fullName.isNotEmpty ? fullName[0].toUpperCase() : 'P',
        style: TextStyle(
          fontSize: 26,
          fontWeight: FontWeight.w900,
          color: cfg.isDark ? Colors.white : cfg.primaryColor,
        ),
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.tryParse(url);
    if (uri != null && await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }
}
