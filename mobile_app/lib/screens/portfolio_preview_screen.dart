import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/portfolio_models.dart';
import '../widgets/share_bottom_sheet.dart';

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
  final bool isPopArt;
  final bool isTerminal;
  final bool isCyberMatrix;
  final bool isNordic;
  final String roleBadge;

  const TemplateConfig({
    required this.id,
    required this.title,
    required this.bgColor,
    required this.cardBgColor,
    required this.textColor,
    required this.subtextColor,
    required this.primaryColor,
    required this.secondaryColor,
    this.isDark = false,
    this.isPopArt = false,
    this.isTerminal = false,
    this.isCyberMatrix = false,
    this.isNordic = false,
    required this.roleBadge,
  });
}

class PortfolioPreviewScreen extends StatelessWidget {
  final PortfolioProfile profile;

  const PortfolioPreviewScreen({super.key, required this.profile});

  static TemplateConfig getTemplateConfig(String templateId) {
    switch (templateId) {
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
          roleBadge: 'BENTO FIGMA CASE STUDIES',
        );

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
          isTerminal: true,
          roleBadge: 'TERMINAL // FULLSTACK ACTIVE',
        );

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
          roleBadge: 'arXiv // NEURIPS CITATIONS',
        );

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
          isCyberMatrix: true,
          roleBadge: 'SEC_OPS // CLEARANCE VERIFIED',
        );

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
          isTerminal: true,
          roleBadge: 'CI/CD PASSING • K8S CLUSTER 99.99%',
        );

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
          roleBadge: 'TEST SUITES 100% PASSED',
        );

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
          roleBadge: 'ACCURACY: 98.4% • PYTORCH CUDA',
        );

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
          roleBadge: 'EXECUTIVE BI SCORECARD',
        );

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
          isPopArt: true,
          roleBadge: '✨ CANVA POP ART • OPEN TO WORK',
        );

      case 'adobe-behance':
        return const TemplateConfig(
          id: 'adobe-behance',
          title: 'Adobe Creative Studio',
          bgColor: Color(0xFF121212),
          cardBgColor: Color(0xFF1E1E1E),
          textColor: Colors.white,
          subtextColor: Color(0xFF94A3B8),
          primaryColor: Color(0xFF3B82F6),
          secondaryColor: Color(0xFF60A5FA),
          isDark: true,
          roleBadge: 'BEHANCE CREATIVE SHOWCASE',
        );

      case 'figma-glass':
        return const TemplateConfig(
          id: 'figma-glass',
          title: 'Figma Neo-Glass',
          bgColor: Color(0xFF0D0E15),
          cardBgColor: Color(0xFF181926),
          textColor: Colors.white,
          subtextColor: Color(0xFFC084FC),
          primaryColor: Color(0xFFA855F7),
          secondaryColor: Color(0xFF06B6D4),
          isDark: true,
          roleBadge: 'FIGMA AUTO-LAYOUT SYSTEM',
        );

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
          isNordic: true,
          roleBadge: 'SCANDINAVIAN ARCHITECTURAL',
        );

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
          roleBadge: 'AURORA MESH GRADIENT',
        );

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
          roleBadge: 'CRYSTAL ICE ACADEMIC',
        );

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
          roleBadge: 'EDITORIAL CORAL MODERNIST',
        );

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
          roleBadge: 'ELECTRIC VIOLET GLOW',
        );

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
          isTerminal: true,
          roleBadge: 'NEXUS GIT COMMITS // LIVE',
        );

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
          roleBadge: 'MONOCHROME EDITORIAL DIVIDERS',
        );

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
          roleBadge: 'LUXURY RUBY STUDIO',
        );

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
          roleBadge: 'EXECUTIVE BOARD ADVISORY',
        );

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
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
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
                    style: TextStyle(
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
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: cfg.textColor,
                    ),
                  ),
                ),
              ],
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

                  // Analytics / Scorecard Bar
                  _buildScorecardBar(cfg),
                  const SizedBox(height: 20),

                  // Skills & Technologies Section
                  if (profile.skills.languages.isNotEmpty ||
                      profile.skills.frameworks.isNotEmpty ||
                      profile.skills.tools.isNotEmpty) ...[
                    _buildSectionHeader(
                      'Technical Arsenal & Skills',
                      Icons.code,
                      cfg.primaryColor,
                      cfg.textColor,
                    ),
                    const SizedBox(height: 10),
                    _buildSkillsCard(cfg),
                    const SizedBox(height: 20),
                  ],

                  // Featured Projects Section
                  if (profile.projects.isNotEmpty) ...[
                    _buildSectionHeader(
                      'Hardening Labs & Projects',
                      Icons.rocket_launch_outlined,
                      cfg.primaryColor,
                      cfg.textColor,
                    ),
                    const SizedBox(height: 10),
                    ...profile.projects.map((p) => _buildProjectCard(p, cfg)),
                    const SizedBox(height: 16),
                  ],

                  // Work Experience Timeline
                  if (profile.experience.isNotEmpty) ...[
                    _buildSectionHeader(
                      'Work Experience & Audits',
                      Icons.work_outline,
                      cfg.primaryColor,
                      cfg.textColor,
                    ),
                    const SizedBox(height: 10),
                    ...profile.experience.map((e) => _buildExperienceCard(e, cfg)),
                    const SizedBox(height: 16),
                  ],

                  // Education & Credentials
                  if (profile.education.isNotEmpty) ...[
                    _buildSectionHeader(
                      'Education & Degrees',
                      Icons.school_outlined,
                      cfg.primaryColor,
                      cfg.textColor,
                    ),
                    const SizedBox(height: 10),
                    ...profile.education.map((edu) => _buildEducationCard(edu, cfg)),
                    const SizedBox(height: 24),
                  ],

                  // Direct Resume / CV Download Action
                  _buildResumeDownloadButton(context, cfg),
                  const SizedBox(height: 36),
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
            bottom: BorderSide(color: Color(0xFF0F172A), width: 2),
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
                style: GoogleFonts.firaCode(fontSize: 11, color: const Color(0xFF94A3B8)),
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
                style: GoogleFonts.firaCode(fontSize: 9, fontWeight: FontWeight.bold, color: cfg.primaryColor),
              ),
            ),
          ],
        ),
      );
    }

    if (cfg.isCyberMatrix) {
      // Cybersecurity Tactical Matrix Top Bar
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        color: const Color(0xFF050505),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    color: Color(0xFF00FF66),
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  'SEC_OPS // TACTICAL_MATRIX',
                  style: GoogleFonts.firaCode(fontSize: 10, fontWeight: FontWeight.bold, color: const Color(0xFF00FF66)),
                ),
              ],
            ),
            Text(
              '[ENCRYPTED]',
              style: GoogleFonts.firaCode(fontSize: 9, color: const Color(0xFF86EFAC)),
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

  // --- HERO PROFILE CARD ---

  Widget _buildHeroCard(BuildContext context, TemplateConfig cfg) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: _cardBoxDecoration(cfg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Avatar
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
                    color: cfg.isPopArt ? const Color(0xFF0F172A) : cfg.primaryColor.withValues(alpha: 0.4),
                    width: cfg.isPopArt ? 2 : 2.5,
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
                      style: GoogleFonts.inter(
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        color: cfg.textColor,
                      ),
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

          // Bio Text
          Text(
            profile.personal.bio,
            style: TextStyle(
              fontSize: 12,
              height: 1.45,
              color: cfg.subtextColor,
            ),
          ),

          const SizedBox(height: 14),

          // Contact & Social Icons Row
          Row(
            children: [
              if (profile.personal.email.isNotEmpty)
                _buildSocialIconButton(
                  icon: Icons.email_outlined,
                  onTap: () => launchUrl(Uri.parse('mailto:${profile.personal.email}')),
                  cfg: cfg,
                ),
              if (profile.personal.githubUrl.isNotEmpty) ...[
                const SizedBox(width: 8),
                _buildSocialIconButton(
                  icon: Icons.code,
                  onTap: () => launchUrl(Uri.parse(profile.personal.githubUrl), mode: LaunchMode.externalApplication),
                  cfg: cfg,
                ),
              ],
              if (profile.personal.linkedinUrl.isNotEmpty) ...[
                const SizedBox(width: 8),
                _buildSocialIconButton(
                  icon: Icons.link,
                  onTap: () => launchUrl(Uri.parse(profile.personal.linkedinUrl), mode: LaunchMode.externalApplication),
                  cfg: cfg,
                ),
              ],
              const Spacer(),
              if (profile.personal.targetRole.isNotEmpty)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: cfg.primaryColor.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: cfg.primaryColor.withValues(alpha: 0.3)),
                  ),
                  child: Text(
                    profile.personal.targetRole,
                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: cfg.primaryColor),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }

  // --- SCORECARD BAR ---

  Widget _buildScorecardBar(TemplateConfig cfg) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
      decoration: _cardBoxDecoration(cfg),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildStatItem('${profile.projects.length}', 'Projects', cfg),
          _buildDivider(cfg),
          _buildStatItem('${profile.skills.languages.length + profile.skills.frameworks.length}', 'Tech Skills', cfg),
          _buildDivider(cfg),
          _buildStatItem('${profile.experience.length}', 'Work Roles', cfg),
          _buildDivider(cfg),
          _buildStatItem('${profile.analytics.viewsCount}', 'Live Views', cfg),
        ],
      ),
    );
  }

  // --- SKILLS CARD ---

  Widget _buildSkillsCard(TemplateConfig cfg) {
    final allSkills = [
      ...profile.skills.languages,
      ...profile.skills.frameworks,
      ...profile.skills.tools,
    ];

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

  // --- PROJECT CARD ---

  Widget _buildProjectCard(ProjectItem p, TemplateConfig cfg) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
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
                  p.title,
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: cfg.textColor),
                ),
              ),
              if (p.githubUrl != null && p.githubUrl!.isNotEmpty)
                IconButton(
                  icon: const Icon(Icons.open_in_new, size: 16),
                  color: cfg.primaryColor,
                  constraints: const BoxConstraints(),
                  padding: EdgeInsets.zero,
                  onPressed: () => launchUrl(Uri.parse(p.githubUrl!), mode: LaunchMode.externalApplication),
                ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            p.description,
            style: TextStyle(fontSize: 11, height: 1.4, color: cfg.subtextColor),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: p.technologies
                .map((t) => Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: cfg.isDark ? Colors.white10 : Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(color: cfg.primaryColor.withValues(alpha: 0.2)),
                      ),
                      child: Text(
                        t,
                        style: TextStyle(fontSize: 9, color: cfg.primaryColor, fontWeight: FontWeight.bold),
                      ),
                    ))
                .toList(),
          ),
        ],
      ),
    );
  }

  // --- EXPERIENCE CARD ---

  Widget _buildExperienceCard(ExperienceItem e, TemplateConfig cfg) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: _cardBoxDecoration(cfg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(e.role, style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: cfg.textColor)),
          const SizedBox(height: 2),
          Text('${e.company} • ${e.startDate} - ${e.endDate}',
              style: TextStyle(fontSize: 11, color: cfg.primaryColor, fontWeight: FontWeight.bold)),
          const SizedBox(height: 6),
          ...e.description.map((d) => Padding(
                padding: const EdgeInsets.only(top: 2),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('• ', style: TextStyle(color: cfg.primaryColor)),
                    Expanded(child: Text(d, style: TextStyle(fontSize: 11, color: cfg.subtextColor, height: 1.3))),
                  ],
                ),
              )),
        ],
      ),
    );
  }

  // --- EDUCATION CARD ---

  Widget _buildEducationCard(EducationItem edu, TemplateConfig cfg) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: _cardBoxDecoration(cfg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(edu.institution, style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: cfg.textColor)),
          const SizedBox(height: 2),
          Text('${edu.degree} in ${edu.fieldOfStudy} (${edu.startYear} - ${edu.endYear})',
              style: TextStyle(fontSize: 11, color: cfg.primaryColor, fontWeight: FontWeight.bold)),
          if (edu.gpa != null) ...[
            const SizedBox(height: 4),
            Text('GPA: ${edu.gpa}', style: TextStyle(fontSize: 10, color: cfg.subtextColor, fontWeight: FontWeight.bold)),
          ],
        ],
      ),
    );
  }

  // --- RESUME DOWNLOAD ACTION ---

  Widget _buildResumeDownloadButton(BuildContext context, TemplateConfig cfg) {
    final hasResume = profile.personal.resumeUrl != null && profile.personal.resumeUrl!.isNotEmpty;

    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton.icon(
        style: ElevatedButton.styleFrom(
          backgroundColor: cfg.primaryColor,
          foregroundColor: (cfg.primaryColor.computeLuminance() > 0.5) ? Colors.black : Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: cfg.isPopArt ? const BorderSide(color: Color(0xFF0F172A), width: 2) : BorderSide.none,
          ),
          elevation: cfg.isPopArt ? 4 : 2,
        ),
        icon: const Icon(Icons.download, size: 20),
        label: Text(
          hasResume ? 'Download Verified CV (PDF)' : 'Preview ATS Resume Format',
          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
        ),
        onPressed: () {
          if (hasResume) {
            launchUrl(Uri.parse(profile.personal.resumeUrl!), mode: LaunchMode.externalApplication);
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: const Text('Attach your PDF resume in Builder Step 2 to enable direct candidate download!'),
                backgroundColor: cfg.primaryColor,
              ),
            );
          }
        },
      ),
    );
  }

  // --- REUSABLE CARD DECORATION ---

  BoxDecoration _cardBoxDecoration(TemplateConfig cfg) {
    if (cfg.isPopArt) {
      // Retro Canva Pop Art Card with thick border and solid offset shadow
      return BoxDecoration(
        color: cfg.cardBgColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF0F172A), width: 2),
        boxShadow: const [
          BoxShadow(
            color: Color(0xFF0F172A),
            offset: Offset(3, 3),
          ),
        ],
      );
    }

    if (cfg.isNordic) {
      // Architectural Nordic Minimalist Card
      return BoxDecoration(
        color: cfg.cardBgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE7E5E4)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      );
    }

    // Default Glass / Terminal card
    return BoxDecoration(
      color: cfg.cardBgColor,
      borderRadius: BorderRadius.circular(20),
      border: Border.all(
        color: cfg.isDark ? cfg.primaryColor.withValues(alpha: 0.25) : Colors.grey.shade200,
      ),
      boxShadow: [
        BoxShadow(
          color: cfg.isDark
              ? cfg.primaryColor.withValues(alpha: 0.08)
              : Colors.black.withValues(alpha: 0.04),
          blurRadius: 12,
          offset: const Offset(0, 4),
        ),
      ],
    );
  }

  Widget _buildSectionHeader(String title, IconData icon, Color color, Color textColor) {
    return Row(
      children: [
        Icon(icon, size: 16, color: color),
        const SizedBox(width: 6),
        Text(
          title,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: textColor),
        ),
      ],
    );
  }

  Widget _buildStatItem(String val, String label, TemplateConfig cfg) {
    return Column(
      children: [
        Text(
          val,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: cfg.textColor),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(fontSize: 9, color: cfg.subtextColor, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildDivider(TemplateConfig cfg) {
    return Container(
      width: 1,
      height: 22,
      color: cfg.isDark ? Colors.white12 : Colors.grey.shade200,
    );
  }

  Widget _buildSkillChip(String skill, TemplateConfig cfg) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: cfg.isDark
            ? cfg.primaryColor.withValues(alpha: 0.12)
            : cfg.primaryColor.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: cfg.isPopArt ? const Color(0xFF0F172A) : cfg.primaryColor.withValues(alpha: 0.35),
          width: cfg.isPopArt ? 1.5 : 1,
        ),
      ),
      child: Text(
        skill,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.bold,
          color: cfg.primaryColor,
        ),
      ),
    );
  }

  Widget _buildSocialIconButton({
    required IconData icon,
    required VoidCallback onTap,
    required TemplateConfig cfg,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: cfg.isDark ? Colors.white12 : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(10),
          border: cfg.isPopArt ? Border.all(color: const Color(0xFF0F172A), width: 1.5) : null,
        ),
        child: Icon(icon, size: 16, color: cfg.textColor),
      ),
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
          errorBuilder: (_, __, ___) => _buildInitialLetter(fullName),
        );
      }
    }
    return _buildInitialLetter(fullName);
  }

  Widget _buildInitialLetter(String fullName) {
    return Center(
      child: Text(
        fullName.isNotEmpty ? fullName[0].toUpperCase() : 'P',
        style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white),
      ),
    );
  }
}
