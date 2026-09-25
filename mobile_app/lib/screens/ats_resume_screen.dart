import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:share_plus/share_plus.dart';
import '../models/portfolio_models.dart';
import '../providers/portfolio_provider.dart';
import 'builder_wizard_screen.dart';

class AtsResumeScreen extends StatefulWidget {
  final VoidCallback? onBack;
  final VoidCallback? onNavigateToBuilder;

  const AtsResumeScreen({
    super.key,
    this.onBack,
    this.onNavigateToBuilder,
  });

  @override
  State<AtsResumeScreen> createState() => _AtsResumeScreenState();
}

class _AtsResumeScreenState extends State<AtsResumeScreen> {
  bool _forceOnePage = true;

  // Calculates estimated vertical density units:
  // ~35 units = 1 standard printed page
  // ~52 units = 1.5 pages
  int _calculateDensityScore(PortfolioProfile p) {
    int score = 0;
    if (p.personal.bio.isNotEmpty) {
      score += (p.personal.bio.length / 90).ceil();
    }
    score += p.education.length * 3;
    for (var exp in p.experience) {
      score += 2 + (exp.description.length * 2);
    }
    for (var proj in p.projects) {
      score += 2 + (proj.description.length / 100).ceil();
    }
    if (p.skills.languages.isNotEmpty) score += 2;
    if (p.skills.frameworks.isNotEmpty) score += 2;
    if (p.skills.tools.isNotEmpty) score += 2;
    return score;
  }

  void _copyPlainText(PortfolioProfile p) {
    final buffer = StringBuffer();
    buffer.writeln(p.personal.fullName.toUpperCase());
    buffer.writeln(p.personal.targetRole.isNotEmpty ? p.personal.targetRole : p.personal.headline);
    buffer.writeln([
      if (p.personal.location.isNotEmpty) p.personal.location,
      if (p.personal.email.isNotEmpty) p.personal.email,
      if (p.personal.phone.isNotEmpty) p.personal.phone,
      if (p.personal.linkedinUrl.isNotEmpty) p.personal.linkedinUrl,
      if (p.personal.githubUrl.isNotEmpty) p.personal.githubUrl,
    ].join(' | '));
    buffer.writeln('\n========================================');
    buffer.writeln('PROFESSIONAL SUMMARY');
    buffer.writeln('========================================');
    buffer.writeln(p.personal.bio);

    if (p.education.isNotEmpty) {
      buffer.writeln('\n========================================');
      buffer.writeln('EDUCATION');
      buffer.writeln('========================================');
      for (var edu in p.education) {
        buffer.writeln('${edu.institution} (${edu.startYear} - ${edu.endYear})');
        buffer.writeln('${edu.degree} in ${edu.fieldOfStudy}${edu.gpa != null && edu.gpa!.isNotEmpty ? ' | GPA: ${edu.gpa}' : ''}');
        if (edu.coursework != null && edu.coursework!.isNotEmpty) {
          buffer.writeln('Coursework: ${edu.coursework}');
        }
      }
    }

    if (p.experience.isNotEmpty) {
      buffer.writeln('\n========================================');
      buffer.writeln('WORK & LEADERSHIP EXPERIENCE');
      buffer.writeln('========================================');
      for (var exp in p.experience) {
        buffer.writeln('${exp.role} - ${exp.company} (${exp.startDate} - ${exp.endDate})');
        if (exp.location != null && exp.location!.isNotEmpty) buffer.writeln(exp.location);
        for (var b in exp.description) {
          buffer.writeln('  * $b');
        }
      }
    }

    if (p.projects.isNotEmpty) {
      buffer.writeln('\n========================================');
      buffer.writeln('PROJECTS');
      buffer.writeln('========================================');
      for (var proj in p.projects) {
        buffer.writeln('${proj.title} [${proj.technologies.join(', ')}]');
        if (proj.liveUrl != null && proj.liveUrl!.isNotEmpty) buffer.writeln(proj.liveUrl);
        buffer.writeln(proj.description);
      }
    }

    if (p.skills.languages.isNotEmpty || p.skills.frameworks.isNotEmpty || p.skills.tools.isNotEmpty) {
      buffer.writeln('\n========================================');
      buffer.writeln('TECHNICAL SKILLS');
      buffer.writeln('========================================');
      if (p.skills.languages.isNotEmpty) buffer.writeln('Languages: ${p.skills.languages.join(', ')}');
      if (p.skills.frameworks.isNotEmpty) buffer.writeln('Frameworks: ${p.skills.frameworks.join(', ')}');
      if (p.skills.tools.isNotEmpty) buffer.writeln('Tools: ${p.skills.tools.join(', ')}');
    }

    Clipboard.setData(ClipboardData(text: buffer.toString()));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('ATS Plain Text copied to clipboard for job applications!'),
        backgroundColor: Color(0xFF0F172A),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _shareResume(PortfolioProfile p) {
    final summary = '${p.personal.fullName} - ATS Resume\n'
        'Role: ${p.personal.targetRole.isNotEmpty ? p.personal.targetRole : p.personal.headline}\n'
        'Portfolio: https://portfolify.app/u/${p.username}\n'
        'Contact: ${p.personal.email}';
    Share.share(summary, subject: '${p.personal.fullName} ATS Resume');
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context);
    final profile = provider.profile;

    final densityScore = _calculateDensityScore(profile);
    // User requirement:
    // Resume should be 1 page and NOT create a 2nd page only if content is more than 1 and half page.
    // If content is below 1.5 page, make resume in 1 page with most important and meaningful info.
    final exceedsOneAndHalfPage = densityScore > 52;
    final isCompactOnePage = _forceOnePage && !exceedsOneAndHalfPage;

    // Filter curated content for 1-page compaction:
    final displayExperiences = isCompactOnePage
        ? profile.experience.take(3).map((e) => ExperienceItem(
              id: e.id,
              role: e.role,
              company: e.company,
              startDate: e.startDate,
              endDate: e.endDate,
              location: e.location,
              description: e.description.take(2).toList(),
            )).toList()
        : profile.experience;

    final displayProjects = isCompactOnePage
        ? profile.projects.take(3).toList()
        : profile.projects;

    final displayEducation = isCompactOnePage
        ? profile.education.take(2).toList()
        : profile.education;

    final hasContent = profile.personal.fullName.isNotEmpty ||
        profile.experience.isNotEmpty ||
        profile.education.isNotEmpty ||
        profile.projects.isNotEmpty;

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        scrolledUnderElevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF0F172A)),
          onPressed: () {
            if (widget.onBack != null) {
              widget.onBack!();
            } else if (Navigator.canPop(context)) {
              Navigator.pop(context);
            }
          },
        ),
        title: const Row(
          children: [
            Icon(Icons.description, color: Color(0xFF2563EB), size: 20),
            SizedBox(width: 8),
            Text(
              'ATS Resume',
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
            ),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'Copy ATS Text',
            icon: const Icon(Icons.copy, size: 20, color: Color(0xFF475569)),
            onPressed: () => _copyPlainText(profile),
          ),
          IconButton(
            tooltip: 'Share',
            icon: const Icon(Icons.share, size: 20, color: Color(0xFF475569)),
            onPressed: () => _shareResume(profile),
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
        child: Column(
          children: [
            // Top Status & Pagination Mode Bar
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE2E8F0)),
                boxShadow: const [
                  BoxShadow(color: Color(0x060F172A), blurRadius: 10, offset: Offset(0, 2)),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: isCompactOnePage ? const Color(0xFFECFDF5) : const Color(0xFFEFF6FF),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              isCompactOnePage ? Icons.check_circle : Icons.auto_stories,
                              size: 16,
                              color: isCompactOnePage ? const Color(0xFF059669) : const Color(0xFF2563EB),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                isCompactOnePage
                                    ? '1-Page Strict Compaction'
                                    : (exceedsOneAndHalfPage ? 'Multi-Page Flow (>1.5 Pages)' : 'Full Multi-Page View'),
                                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                              ),
                              Text(
                                isCompactOnePage
                                    ? 'Curated top impact bullets for 100% ATS score'
                                    : 'Showing all comprehensive historical career data',
                                style: const TextStyle(fontSize: 10.5, color: Color(0xFF64748B)),
                              ),
                            ],
                          ),
                        ],
                      ),
                      Switch(
                        value: _forceOnePage,
                        activeThumbColor: const Color(0xFF059669),
                        onChanged: (val) {
                          setState(() => _forceOnePage = val);
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  // ATS Compliance Indicators
                  Row(
                    children: [
                      _buildAtsTag('Single-Column ATS Standard'),
                      const SizedBox(width: 6),
                      _buildAtsTag('Zero Graphic Distortion'),
                      const SizedBox(width: 6),
                      _buildAtsTag(isCompactOnePage ? 'Page: 1 of 1' : (exceedsOneAndHalfPage ? 'Page: 1 of 2' : 'Full Page')),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // If empty, show helpful guide
            if (!hasContent) ...[
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                ),
                child: Column(
                  children: [
                    const Icon(Icons.edit_note, size: 48, color: Color(0xFF2563EB)),
                    const SizedBox(height: 12),
                    const Text(
                      'No Resume Details Filled Yet',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Open the Builder Wizard and enter your experience, education, and projects to automatically compile your ATS resume.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 12, color: Color(0xFF64748B), height: 1.4),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: () {
                        if (widget.onNavigateToBuilder != null) {
                          widget.onNavigateToBuilder!();
                        } else {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (_) => const BuilderWizardScreen()),
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF2563EB),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                      ),
                      icon: const Icon(Icons.edit_note, size: 18),
                      label: const Text('Open Builder Wizard', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ] else ...[
              // THE ATS RESUME PAPER SHEET (PAGE 1)
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(isCompactOnePage ? 18 : 22),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(color: const Color(0xFFCBD5E1), width: 1),
                  boxShadow: const [
                    BoxShadow(color: Color(0x15000000), blurRadius: 16, offset: Offset(0, 4)),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // PAGE NUMBER HEADER
                    Center(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF1F5F9),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          isCompactOnePage ? 'PAGE 1 OF 1 — ATS COMPLIANT SPECIFICATION' : 'PAGE 1 — CAREER SUMMARY',
                          style: GoogleFonts.firaCode(fontSize: 8.5, fontWeight: FontWeight.bold, color: const Color(0xFF64748B)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),

                    // RESUME HEADER
                    Center(
                      child: Column(
                        children: [
                          Text(
                            profile.personal.fullName.toUpperCase(),
                            style: GoogleFonts.inter(
                              fontSize: isCompactOnePage ? 20 : 23,
                              fontWeight: FontWeight.w900,
                              color: const Color(0xFF0F172A),
                              letterSpacing: 0.5,
                            ),
                          ),
                          const SizedBox(height: 3),
                          Text(
                            (profile.personal.targetRole.isNotEmpty
                                    ? profile.personal.targetRole
                                    : profile.personal.headline)
                                .toUpperCase(),
                            style: GoogleFonts.inter(
                              fontSize: 10.5,
                              fontWeight: FontWeight.w700,
                              color: const Color(0xFF334155),
                              letterSpacing: 0.8,
                            ),
                          ),
                          const SizedBox(height: 6),
                          // Contact line
                          Text(
                            [
                              if (profile.personal.location.isNotEmpty) profile.personal.location,
                              if (profile.personal.email.isNotEmpty) profile.personal.email,
                              if (profile.personal.phone.isNotEmpty) profile.personal.phone,
                              if (profile.personal.linkedinUrl.isNotEmpty) profile.personal.linkedinUrl.replaceAll('https://', ''),
                              if (profile.personal.githubUrl.isNotEmpty) profile.personal.githubUrl.replaceAll('https://', ''),
                            ].join('  •  '),
                            textAlign: TextAlign.center,
                            style: GoogleFonts.firaCode(
                              fontSize: 9.5,
                              color: const Color(0xFF475569),
                              height: 1.4,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Divider(color: Color(0xFF0F172A), thickness: 1.8, height: 1),
                    const SizedBox(height: 10),

                    // PROFESSIONAL SUMMARY
                    if (profile.personal.bio.isNotEmpty) ...[
                      _buildAtsSectionHeader('PROFESSIONAL SUMMARY'),
                      const SizedBox(height: 4),
                      Text(
                        profile.personal.bio,
                        style: GoogleFonts.inter(
                          fontSize: isCompactOnePage ? 10.5 : 11.5,
                          color: const Color(0xFF1E293B),
                          height: 1.4,
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],

                    // EDUCATION SECTION
                    if (displayEducation.isNotEmpty) ...[
                      _buildAtsSectionHeader('EDUCATION'),
                      const SizedBox(height: 4),
                      ...displayEducation.map((edu) => Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Expanded(
                                      child: Text(
                                        edu.institution,
                                        style: GoogleFonts.inter(fontSize: 11.5, fontWeight: FontWeight.bold, color: const Color(0xFF0F172A)),
                                      ),
                                    ),
                                    Text(
                                      '${edu.startYear} – ${edu.endYear}',
                                      style: GoogleFonts.firaCode(fontSize: 10, color: const Color(0xFF475569)),
                                    ),
                                  ],
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Expanded(
                                      child: Text(
                                        '${edu.degree} in ${edu.fieldOfStudy}',
                                        style: GoogleFonts.inter(fontSize: 10.5, fontStyle: FontStyle.italic, color: const Color(0xFF334155)),
                                      ),
                                    ),
                                    if (edu.gpa != null && edu.gpa!.isNotEmpty)
                                      Text(
                                        'GPA: ${edu.gpa}',
                                        style: GoogleFonts.inter(fontSize: 10, fontWeight: FontWeight.w600, color: const Color(0xFF0F172A)),
                                      ),
                                  ],
                                ),
                                if (edu.coursework != null && edu.coursework!.isNotEmpty)
                                  Text(
                                    'Relevant Coursework: ${edu.coursework}',
                                    style: GoogleFonts.inter(fontSize: 9.5, color: const Color(0xFF64748B)),
                                  ),
                              ],
                            ),
                          )),
                      const SizedBox(height: 8),
                    ],

                    // WORK & LEADERSHIP EXPERIENCE
                    if (displayExperiences.isNotEmpty) ...[
                      _buildAtsSectionHeader('WORK & LEADERSHIP EXPERIENCE'),
                      const SizedBox(height: 4),
                      ...displayExperiences.map((exp) => Padding(
                            padding: const EdgeInsets.only(bottom: 8),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Expanded(
                                      child: RichText(
                                        text: TextSpan(
                                          style: GoogleFonts.inter(fontSize: 11.5, color: const Color(0xFF0F172A)),
                                          children: [
                                            TextSpan(text: exp.role, style: const TextStyle(fontWeight: FontWeight.bold)),
                                            const TextSpan(text: ' — '),
                                            TextSpan(text: exp.company, style: const TextStyle(fontStyle: FontStyle.italic, fontWeight: FontWeight.w600)),
                                          ],
                                        ),
                                      ),
                                    ),
                                    Text(
                                      '${exp.startDate} – ${exp.endDate}',
                                      style: GoogleFonts.firaCode(fontSize: 9.5, color: const Color(0xFF475569)),
                                    ),
                                  ],
                                ),
                                if (exp.location != null && exp.location!.isNotEmpty)
                                  Text(
                                    exp.location!,
                                    style: GoogleFonts.inter(fontSize: 9.5, color: const Color(0xFF64748B), fontStyle: FontStyle.italic),
                                  ),
                                const SizedBox(height: 2),
                                ...exp.description.map((b) => Padding(
                                      padding: const EdgeInsets.only(left: 8, bottom: 2),
                                      child: Row(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          const Text('• ', style: TextStyle(fontSize: 11, color: Color(0xFF334155))),
                                          Expanded(
                                            child: Text(
                                              b,
                                              style: GoogleFonts.inter(fontSize: 10.5, color: const Color(0xFF334155), height: 1.35),
                                            ),
                                          ),
                                        ],
                                      ),
                                    )),
                              ],
                            ),
                          )),
                      const SizedBox(height: 8),
                    ],

                    // PROJECTS SECTION
                    if (displayProjects.isNotEmpty) ...[
                      _buildAtsSectionHeader('TECHNICAL PROJECTS'),
                      const SizedBox(height: 4),
                      ...displayProjects.map((proj) => Padding(
                            padding: const EdgeInsets.only(bottom: 6),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Expanded(
                                      child: RichText(
                                        text: TextSpan(
                                          style: GoogleFonts.inter(fontSize: 11, color: const Color(0xFF0F172A)),
                                          children: [
                                            TextSpan(text: proj.title, style: const TextStyle(fontWeight: FontWeight.bold)),
                                            if (proj.technologies.isNotEmpty)
                                              TextSpan(
                                                text: ' [${proj.technologies.join(', ')}]',
                                                style: GoogleFonts.firaCode(fontSize: 9.5, color: const Color(0xFF64748B)),
                                              ),
                                          ],
                                        ),
                                      ),
                                    ),
                                    if (proj.liveUrl != null && proj.liveUrl!.isNotEmpty)
                                      Text(
                                        proj.liveUrl!.replaceAll('https://', ''),
                                        style: GoogleFonts.firaCode(fontSize: 9, color: const Color(0xFF2563EB)),
                                      ),
                                  ],
                                ),
                                const SizedBox(height: 1.5),
                                Text(
                                  proj.description,
                                  style: GoogleFonts.inter(fontSize: 10.5, color: const Color(0xFF334155), height: 1.35),
                                ),
                              ],
                            ),
                          )),
                      const SizedBox(height: 8),
                    ],

                    // TECHNICAL SKILLS
                    if (profile.skills.languages.isNotEmpty ||
                        profile.skills.frameworks.isNotEmpty ||
                        profile.skills.tools.isNotEmpty) ...[
                      _buildAtsSectionHeader('TECHNICAL SKILLS & TOOLS'),
                      const SizedBox(height: 4),
                      if (profile.skills.languages.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 2),
                          child: RichText(
                            text: TextSpan(
                              style: GoogleFonts.inter(fontSize: 10.5, color: const Color(0xFF1E293B)),
                              children: [
                                const TextSpan(text: 'Programming Languages: ', style: TextStyle(fontWeight: FontWeight.bold)),
                                TextSpan(text: profile.skills.languages.join(', ')),
                              ],
                            ),
                          ),
                        ),
                      if (profile.skills.frameworks.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 2),
                          child: RichText(
                            text: TextSpan(
                              style: GoogleFonts.inter(fontSize: 10.5, color: const Color(0xFF1E293B)),
                              children: [
                                const TextSpan(text: 'Frameworks & Libraries: ', style: TextStyle(fontWeight: FontWeight.bold)),
                                TextSpan(text: profile.skills.frameworks.join(', ')),
                              ],
                            ),
                          ),
                        ),
                      if (profile.skills.tools.isNotEmpty)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 2),
                          child: RichText(
                            text: TextSpan(
                              style: GoogleFonts.inter(fontSize: 10.5, color: const Color(0xFF1E293B)),
                              children: [
                                const TextSpan(text: 'Developer Tools: ', style: TextStyle(fontWeight: FontWeight.bold)),
                                TextSpan(text: profile.skills.tools.join(', ')),
                              ],
                            ),
                          ),
                        ),
                    ],
                  ],
                ),
              ),

              // PAGE 2 (ONLY DISPLAYED IF OVERFLOW > 1.5 PAGES AND NOT COMPACTED TO 1 PAGE)
              if (!isCompactOnePage && exceedsOneAndHalfPage && profile.experience.length > 3) ...[
                const SizedBox(height: 20),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(22),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: const Color(0xFFCBD5E1), width: 1),
                    boxShadow: const [
                      BoxShadow(color: Color(0x15000000), blurRadius: 16, offset: Offset(0, 4)),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Center(
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF1F5F9),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            'PAGE 2 OF 2 — CAREER HISTORY CONTINUED',
                            style: GoogleFonts.firaCode(fontSize: 8.5, fontWeight: FontWeight.bold, color: const Color(0xFF64748B)),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      _buildAtsSectionHeader('ADDITIONAL EXPERIENCE & REPOSITORIES'),
                      const SizedBox(height: 6),
                      ...profile.experience.skip(3).map((exp) => Padding(
                            padding: const EdgeInsets.only(bottom: 8),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('${exp.role} — ${exp.company}', style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold)),
                                Text('${exp.startDate} – ${exp.endDate}', style: GoogleFonts.firaCode(fontSize: 9, color: const Color(0xFF64748B))),
                                ...exp.description.map((b) => Padding(
                                      padding: const EdgeInsets.only(left: 8, top: 1),
                                      child: Text('• $b', style: GoogleFonts.inter(fontSize: 10, color: const Color(0xFF334155))),
                                    )),
                              ],
                            ),
                          )),
                      if (profile.projects.length > 3) ...[
                        const SizedBox(height: 12),
                        _buildAtsSectionHeader('ADDITIONAL RESEARCH & ARCHIVE PROJECTS'),
                        const SizedBox(height: 6),
                        ...profile.projects.skip(3).map((proj) => Padding(
                              padding: const EdgeInsets.only(bottom: 6),
                              child: Text('${proj.title}: ${proj.description}', style: GoogleFonts.inter(fontSize: 10, color: const Color(0xFF334155))),
                            )),
                      ],
                    ],
                  ),
                ),
              ],
            ],

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  Widget _buildAtsSectionHeader(String title) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: GoogleFonts.inter(
            fontSize: 10,
            fontWeight: FontWeight.w800,
            color: const Color(0xFF0F172A),
            letterSpacing: 0.8,
          ),
        ),
        const SizedBox(height: 2),
        const Divider(color: Color(0xFF94A3B8), thickness: 0.8, height: 1),
      ],
    );
  }

  Widget _buildAtsTag(String label) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 4),
        decoration: BoxDecoration(
          color: const Color(0xFFF8FAFC),
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Color(0xFF475569)),
        ),
      ),
    );
  }
}
