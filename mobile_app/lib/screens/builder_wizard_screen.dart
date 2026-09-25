import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:file_picker/file_picker.dart';
import '../main.dart';
import '../models/portfolio_models.dart';
import '../providers/portfolio_provider.dart';
import 'portfolio_preview_screen.dart';

class BuilderWizardScreen extends StatefulWidget {
  final int initialStep;
  final VoidCallback? onBack;
  const BuilderWizardScreen({super.key, this.initialStep = 1, this.onBack});

  @override
  State<BuilderWizardScreen> createState() => _BuilderWizardScreenState();
}

class _BuilderWizardScreenState extends State<BuilderWizardScreen> {
  late int _currentStep;
  Uint8List? _avatarBytesCache;

  // Controllers for Personal Bio
  late TextEditingController _nameController;
  late TextEditingController _headlineController;
  late TextEditingController _bioController;
  late TextEditingController _locationController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  late TextEditingController _githubController;
  late TextEditingController _linkedinController;
  late TextEditingController _yearsExpController;
  late TextEditingController _projectsCountController;

  // Controllers for Skills
  final TextEditingController _skillInputController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _currentStep = widget.initialStep;
    final profile = Provider.of<PortfolioProvider>(context, listen: false).profile;

    if (profile.personal.avatarUrl.isNotEmpty && profile.personal.avatarUrl.startsWith('data:image')) {
      try {
        final base64Part = profile.personal.avatarUrl.split(',').last;
        _avatarBytesCache = base64Decode(base64Part);
      } catch (_) {}
    }

    _nameController = TextEditingController(text: profile.personal.fullName);
    _headlineController = TextEditingController(text: profile.personal.headline);
    _bioController = TextEditingController(text: profile.personal.bio);
    _locationController = TextEditingController(text: profile.personal.location);
    _emailController = TextEditingController(text: profile.personal.email);
    _phoneController = TextEditingController(text: profile.personal.phone);
    _githubController = TextEditingController(text: profile.personal.githubUrl);
    _linkedinController = TextEditingController(text: profile.personal.linkedinUrl);
    _yearsExpController = TextEditingController(text: profile.personal.yearsExperience);
    _projectsCountController = TextEditingController(text: profile.personal.completedProjects);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _headlineController.dispose();
    _bioController.dispose();
    _locationController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _githubController.dispose();
    _linkedinController.dispose();
    _yearsExpController.dispose();
    _projectsCountController.dispose();
    _skillInputController.dispose();
    super.dispose();
  }

  void _saveCurrentStep() {
    final provider = Provider.of<PortfolioProvider>(context, listen: false);
    if (_currentStep == 2) {
      provider.updatePersonal(
        provider.profile.personal
          ..fullName = _nameController.text
          ..headline = _headlineController.text
          ..bio = _bioController.text
          ..location = _locationController.text
          ..email = _emailController.text
          ..phone = _phoneController.text
          ..githubUrl = _githubController.text
          ..linkedinUrl = _linkedinController.text
          ..yearsExperience = _yearsExpController.text
          ..completedProjects = _projectsCountController.text,
      );
    }
    provider.saveAndSync();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context);
    final profile = provider.profile;

    final steps = [
      {'num': 1, 'title': 'Template', 'icon': Icons.palette_outlined},
      {'num': 2, 'title': 'Bio', 'icon': Icons.person_outline},
      {'num': 3, 'title': 'Education', 'icon': Icons.school_outlined},
      {'num': 4, 'title': 'Experience', 'icon': Icons.work_outline},
      {'num': 5, 'title': 'Projects', 'icon': Icons.code_outlined},
      {'num': 6, 'title': 'Skills', 'icon': Icons.auto_awesome_outlined},
    ];

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF0F172A)),
          onPressed: () {
            _saveCurrentStep();
            if (widget.onBack != null) {
              widget.onBack!();
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
        title: const Text(
          'Portfolio Builder',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
        ),
        actions: [
          TextButton.icon(
            onPressed: () {
              _saveCurrentStep();
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => PortfolioPreviewScreen(profile: profile)),
              );
            },
            icon: const Icon(Icons.visibility, size: 16, color: Color(0xFF2563EB)),
            label: const Text('Preview', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF2563EB))),
          ),
          const SizedBox(width: 4),
        ],
      ),
      body: Column(
        children: [
          // Step Navigator Bar
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              physics: const BouncingScrollPhysics(),
              child: Row(
                children: steps.map((s) {
                  final isCurrent = s['num'] == _currentStep;
                  return InkWell(
                    onTap: () {
                      _saveCurrentStep();
                      setState(() => _currentStep = s['num'] as int);
                    },
                    borderRadius: BorderRadius.circular(16),
                    child: Container(
                      margin: const EdgeInsets.only(right: 8),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: isCurrent ? const Color(0xFF2563EB) : const Color(0xFFF1F5F9),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        children: [
                          Icon(s['icon'] as IconData, size: 14, color: isCurrent ? Colors.white : Colors.black54),
                          const SizedBox(width: 6),
                          Text(
                            '${s['num']}. ${s['title']}',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: isCurrent ? Colors.white : const Color(0xFF475569),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
          ),
          const Divider(height: 1),

          // Active Step Content
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              physics: const BouncingScrollPhysics(),
              child: _buildStepContent(provider),
            ),
          ),

          // Bottom Step Controls
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                OutlinedButton.icon(
                  onPressed: _currentStep > 1
                      ? () {
                          _saveCurrentStep();
                          setState(() => _currentStep--);
                        }
                      : null,
                  icon: const Icon(Icons.arrow_back, size: 16),
                  label: const Text('Previous'),
                  style: OutlinedButton.styleFrom(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () {
                    _saveCurrentStep();
                    if (_currentStep < 6) {
                      setState(() => _currentStep++);
                    } else {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (_) => PortfolioPreviewScreen(profile: profile)),
                      );
                    }
                  },
                  icon: Icon(_currentStep < 6 ? Icons.arrow_forward : Icons.check, size: 16),
                  label: Text(_currentStep < 6 ? 'Save & Continue' : 'Finish & Preview'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2563EB),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepContent(PortfolioProvider provider) {
    switch (_currentStep) {
      case 1:
        return _buildStep1Templates(provider);
      case 2:
        return _buildStep2Bio(provider);
      case 3:
        return _buildStep3Education(provider);
      case 4:
        return _buildStep4Experience(provider);
      case 5:
        return _buildStep5Projects(provider);
      case 6:
        return _buildStep6Skills(provider);
      default:
        return const SizedBox();
    }
  }

  // --- STEP 1: CHOOSE TEMPLATE FIRST ---
  Widget _buildStep1Templates(PortfolioProvider provider) {
    final templates = [
      {
        'id': 'modern-glass',
        'title': 'Modern Glass (Featured)',
        'category': 'FEATURED',
        'desc': 'Frosted glassmorphism, gradient glow, clean typography & CV download.',
        'color': const Color(0xFF10B981),
      },
      {
        'id': 'role-uiux',
        'title': 'UI/UX Designer (Bento Grid)',
        'category': 'DESIGN',
        'desc': 'Clean minimalist layout, coral accents (#FF6B6B), case-study thumbnail cards.',
        'color': const Color(0xFFFF6B6B),
      },
      {
        'id': 'role-fullstack',
        'title': 'Full Stack Developer',
        'category': 'DEV',
        'desc': 'Developer-centric dark mode, deep navy & electric blue, terminal header.',
        'color': const Color(0xFF2563EB),
      },
      {
        'id': 'role-ai-researcher',
        'title': 'AI Researcher',
        'category': 'AI / RESEARCH',
        'desc': 'Futuristic academic theme, midnight purple, glowing magenta & cyan accents.',
        'color': const Color(0xFFD946EF),
      },
      {
        'id': 'role-cybersecurity',
        'title': 'Cybersecurity Analyst',
        'category': 'SECURITY',
        'desc': 'Command-center tactical matrix, obsidian dark & neon green (#00FF66).',
        'color': const Color(0xFF00FF66),
      },
      {
        'id': 'role-devops',
        'title': 'DevOps Engineer',
        'category': 'INFRASTRUCTURE',
        'desc': 'Cloud-infrastructure systematic layout, CI/CD pipeline status, steel & orange.',
        'color': const Color(0xFF38BDF8),
      },
      {
        'id': 'role-qa',
        'title': 'Software Tester / QA',
        'category': 'TESTING',
        'desc': 'Diagnostic precision, bug-hunt badge, automated test coverage metrics.',
        'color': const Color(0xFF2A9D8F),
      },
      {
        'id': 'role-ml-engineer',
        'title': 'Machine Learning Engineer',
        'category': 'ML / COMPUTE',
        'desc': 'Computational tensor layout, dark graphite & electric indigo with accuracy tags.',
        'color': const Color(0xFF6366F1),
      },
      {
        'id': 'role-data-analyst',
        'title': 'Data Analyst',
        'category': 'BI & ANALYTICS',
        'desc': 'Insight-driven BI dashboard, executive scorecard blocks, visual cyan (#0EA5E9).',
        'color': const Color(0xFF0EA5E9),
      },
      {
        'id': 'canva-pop',
        'title': 'Canva Pop Art',
        'category': 'CREATIVE',
        'desc': 'Canva inspired vibrant pastel tags, playful card borders, sticker badges.',
        'color': const Color(0xFFF59E0B),
      },
      {
        'id': 'adobe-behance',
        'title': 'Adobe Creative Studio',
        'category': 'PORTFOLIO',
        'desc': 'Adobe Behance inspired dark grid cards, project covers & clean typography.',
        'color': const Color(0xFF3B82F6),
      },
      {
        'id': 'figma-glass',
        'title': 'Figma Neo-Glass',
        'category': 'NEO-GLASS',
        'desc': 'Frosted glass panels, radiant cyan & purple gradients, glowing tags.',
        'color': const Color(0xFFA855F7),
      },
      {
        'id': 'minimal-nordic',
        'title': 'Minimalist Nordic',
        'category': 'EDITORIAL',
        'desc': 'Architectural studio layout inspired by Scandinavian design, serif typography.',
        'color': const Color(0xFF78716C),
      },
      {
        'id': 'aurora-creative',
        'title': 'Creative Aurora',
        'category': 'AURORA',
        'desc': 'Vibrant aurora radial gradients, neon glass cards, tech stack tags.',
        'color': const Color(0xFFEC4899),
      },
      {
        'id': 'frost-academic',
        'title': 'Frost Academic',
        'category': 'ACADEMIC',
        'desc': 'Light ice-blue theme with impact stats bar and structured academic sections.',
        'color': const Color(0xFF0284C7),
      },
      {
        'id': 'coral-modernist',
        'title': 'Coral Modernist',
        'category': 'MODERNIST',
        'desc': 'Crisp white with vibrant coral accents, floating portrait photo, project grid.',
        'color': const Color(0xFFFA5252),
      },
      {
        'id': 'cyber-violet',
        'title': 'Cyber Violet (Dark)',
        'category': 'CYBER',
        'desc': 'Midnight dark theme with electric violet glow, stats counter & projects grid.',
        'color': const Color(0xFF8B5CF6),
      },
      {
        'id': 'nexus-developer',
        'title': 'Nexus Developer',
        'category': 'CODE',
        'desc': 'Sleek dark developer theme, glowing badges, terminal bar, code snippets.',
        'color': const Color(0xFF06B6D4),
      },
      {
        'id': 'slate-editorial',
        'title': 'Slate Editorial',
        'category': 'MONOCHROME',
        'desc': 'Clean, editorial typography-focused layout with refined border dividers.',
        'color': const Color(0xFF475569),
      },
      {
        'id': 'crimson-studio',
        'title': 'Crimson Studio',
        'category': 'LUXURY',
        'desc': 'High-contrast luxury dark aesthetic with rich ruby and crimson accents.',
        'color': const Color(0xFFE11D48),
      },
      {
        'id': 'executive-classic',
        'title': 'Executive Classic',
        'category': 'EXECUTIVE',
        'desc': 'Corporate board-level layout with navy prestige and gold leadership accents.',
        'color': const Color(0xFFD97706),
      },
    ];

    final currentTemplate = provider.profile.settings.templateId;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Step 1: Choose Your Template',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
        ),
        const SizedBox(height: 4),
        Text(
          'Select your role-specific theme first. Your data will instantly adapt.',
          style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
        ),
        const SizedBox(height: 16),
        ...templates.map((tmpl) {
          final isSelected = currentTemplate == tmpl['id'];
          final color = tmpl['color'] as Color;

          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: isSelected ? color : Colors.grey.shade200,
                width: isSelected ? 2 : 1,
              ),
              boxShadow: [
                BoxShadow(
                  color: isSelected ? color.withValues(alpha: 0.12) : Colors.black.withValues(alpha: 0.02),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: ListTile(
              contentPadding: const EdgeInsets.all(16),
              leading: Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(Icons.style, color: color, size: 22),
              ),
              title: Row(
                children: [
                  Expanded(
                    child: Text(
                      tmpl['title'] as String,
                      style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
                    ),
                  ),
                  if (isSelected)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: color,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text('ACTIVE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white)),
                    ),
                ],
              ),
              subtitle: Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Text(
                  tmpl['desc'] as String,
                  style: TextStyle(fontSize: 11, color: Colors.grey.shade600, height: 1.3),
                ),
              ),
              onTap: () {
                provider.selectTemplate(tmpl['id'] as String);
              },
            ),
          );
        }),
      ],
    );
  }

  // --- STEP 2: PERSONAL BIO & RESUME ---
  Widget _buildStep2Bio(PortfolioProvider provider) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Step 2: Personal Bio & Contact Info',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
        ),
        const SizedBox(height: 16),

        // Profile Picture Upload from Device
        Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.grey.shade200),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.03),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Row(
            children: [
              // Avatar circle
              Stack(
                children: [
                  Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: const LinearGradient(
                        colors: [Color(0xFF2563EB), Color(0xFF60A5FA)],
                      ),
                      border: Border.all(color: const Color(0xFF2563EB), width: 2),
                    ),
                    child: ClipOval(
                      child: _buildAvatarPreview(
                        provider.profile.personal.avatarUrl,
                        provider.profile.personal.fullName,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: GestureDetector(
                      onTap: () => _pickAvatarImage(provider),
                      child: Container(
                        padding: const EdgeInsets.all(6),
                        decoration: BoxDecoration(
                          color: const Color(0xFF2563EB),
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 2),
                        ),
                        child: const Icon(Icons.camera_alt, color: Colors.white, size: 14),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Profile Picture',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Upload your headshot or portrait from device',
                      style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        ElevatedButton.icon(
                          onPressed: () => _pickAvatarImage(provider),
                          icon: const Icon(Icons.upload, size: 14),
                          label: Text(
                            provider.profile.personal.avatarUrl.isNotEmpty ? 'Change' : 'Upload Photo',
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF2563EB),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                        ),
                        if (provider.profile.personal.avatarUrl.isNotEmpty) ...[
                          const SizedBox(width: 8),
                          OutlinedButton.icon(
                            onPressed: () => _removeAvatar(provider),
                            icon: const Icon(Icons.delete_outline, size: 14, color: Colors.red),
                            label: const Text('Remove', style: TextStyle(fontSize: 11, color: Colors.red, fontWeight: FontWeight.bold)),
                            style: OutlinedButton.styleFrom(
                              side: BorderSide(color: Colors.red.shade200),
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                              minimumSize: Size.zero,
                              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),

        _buildTextField('Full Name', _nameController, Icons.person),
        _buildTextField('Headline / Target Role', _headlineController, Icons.badge),
        _buildTextField('Bio / Summary', _bioController, Icons.description, maxLines: 3),
        _buildTextField('Location (City, Country)', _locationController, Icons.location_on),
        _buildTextField('Email Address', _emailController, Icons.email),
        _buildTextField('Phone Number', _phoneController, Icons.phone),
        _buildTextField('GitHub Profile URL', _githubController, Icons.code),
        _buildTextField('LinkedIn Profile URL', _linkedinController, Icons.business),
        _buildTextField('Years of Experience (e.g. 2+)', _yearsExpController, Icons.timeline),
        _buildTextField('Completed Projects (e.g. 10+)', _projectsCountController, Icons.check_circle),

        const SizedBox(height: 12),
        // Resume Upload Box
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.grey.shade200),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                children: [
                  Icon(Icons.file_upload_outlined, color: Color(0xFF2563EB)),
                  SizedBox(width: 8),
                  Text('Resume / CV Document', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                provider.profile.personal.resumeFileName ?? 'No resume uploaded yet (PDF, DOCX)',
                style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
              ),
              const SizedBox(height: 12),
              ElevatedButton.icon(
                onPressed: () async {
                  final result = await FilePicker.platform.pickFiles(
                    type: FileType.custom,
                    allowedExtensions: ['pdf', 'doc', 'docx'],
                  );
                  if (result != null && result.files.isNotEmpty) {
                    final file = result.files.first;
                    provider.profile.personal.resumeFileName = file.name;
                    provider.profile.personal.resumeUrl = 'https://portfolify.app/resumes/${file.name}';
                    provider.saveAndSync();
                    if (!mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Attached resume: ${file.name}'), behavior: SnackBarBehavior.floating),
                    );
                  }
                },
                icon: const Icon(Icons.attach_file, size: 16),
                label: const Text('Pick Resume File'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF0F172A),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // --- STEP 3: EDUCATION ---
  Widget _buildStep3Education(PortfolioProvider provider) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Step 3: Education', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
            IconButton(
              icon: const Icon(Icons.add_circle, color: Color(0xFF2563EB), size: 28),
              onPressed: () {
                provider.addEducation(
                  EducationItem(
                    id: 'edu_${DateTime.now().millisecondsSinceEpoch}',
                    institution: 'University Name',
                    degree: 'B.S.',
                    fieldOfStudy: 'Computer Science',
                    startYear: '2021',
                    endYear: '2025',
                    gpa: '3.8',
                  ),
                );
              },
            ),
          ],
        ),
        const SizedBox(height: 12),
        ...provider.profile.education.map((edu) => Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Row(
                children: [
                  const Icon(Icons.school, color: Color(0xFF2563EB)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(edu.institution, style: const TextStyle(fontWeight: FontWeight.bold)),
                        Text('${edu.degree} in ${edu.fieldOfStudy} (${edu.startYear} - ${edu.endYear})',
                            style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete_outline, color: Colors.red),
                    onPressed: () => provider.removeEducation(edu.id),
                  ),
                ],
              ),
            )),
      ],
    );
  }

  // --- STEP 4: EXPERIENCE ---
  Widget _buildStep4Experience(PortfolioProvider provider) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Step 4: Experience', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
            IconButton(
              icon: const Icon(Icons.add_circle, color: Color(0xFF2563EB), size: 28),
              onPressed: () {
                provider.addExperience(
                  ExperienceItem(
                    id: 'exp_${DateTime.now().millisecondsSinceEpoch}',
                    role: 'Software Engineer Intern',
                    company: 'Tech Corp',
                    startDate: 'May 2024',
                    endDate: 'Aug 2024',
                    description: ['Developed scalable backend APIs.'],
                  ),
                );
              },
            ),
          ],
        ),
        const SizedBox(height: 12),
        ...provider.profile.experience.map((exp) => Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Row(
                children: [
                  const Icon(Icons.work, color: Color(0xFF2563EB)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(exp.role, style: const TextStyle(fontWeight: FontWeight.bold)),
                        Text('${exp.company} • ${exp.startDate} - ${exp.endDate}',
                            style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete_outline, color: Colors.red),
                    onPressed: () => provider.removeExperience(exp.id),
                  ),
                ],
              ),
            )),
      ],
    );
  }

  // --- STEP 5: PROJECTS ---
  Widget _buildStep5Projects(PortfolioProvider provider) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Step 5: Projects', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
            IconButton(
              icon: const Icon(Icons.add_circle, color: Color(0xFF2563EB), size: 28),
              onPressed: () {
                provider.addProject(
                  ProjectItem(
                    id: 'proj_${DateTime.now().millisecondsSinceEpoch}',
                    title: 'New Innovation App',
                    description: 'Full-stack application solving technical problems.',
                    technologies: ['Flutter', 'Next.js', 'Supabase'],
                  ),
                );
              },
            ),
          ],
        ),
        const SizedBox(height: 12),
        ...provider.profile.projects.map((proj) => Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Row(
                children: [
                  const Icon(Icons.code, color: Color(0xFF2563EB)),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(proj.title, style: const TextStyle(fontWeight: FontWeight.bold)),
                        Text(proj.description,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.delete_outline, color: Colors.red),
                    onPressed: () => provider.removeProject(proj.id),
                  ),
                ],
              ),
            )),
      ],
    );
  }

  // --- STEP 6: SKILLS ---
  Widget _buildStep6Skills(PortfolioProvider provider) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Step 6: Skills & Technologies', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 8),
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _skillInputController,
                decoration: InputDecoration(
                  hintText: 'Add language or tool (e.g. Flutter, Go)',
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ),
            const SizedBox(width: 8),
            ElevatedButton(
              onPressed: () {
                final text = _skillInputController.text.trim();
                if (text.isNotEmpty) {
                  provider.profile.skills.languages.add(text);
                  provider.saveAndSync();
                  _skillInputController.clear();
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2563EB),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: const Text('Add'),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: provider.profile.skills.languages.map((s) {
            return Chip(
              label: Text(s, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              backgroundColor: const Color(0xFFEFF6FF),
              deleteIcon: const Icon(Icons.close, size: 14),
              onDeleted: () {
                provider.profile.skills.languages.remove(s);
                provider.saveAndSync();
              },
            );
          }).toList(),
        ),
      ],
    );
  }

  Future<void> _pickAvatarImage(PortfolioProvider provider) async {
    try {
      final result = await FilePicker.platform.pickFiles(
        type: FileType.image,
        withData: true,
      );
      if (result != null && result.files.isNotEmpty) {
        final file = result.files.first;
        List<int>? bytes = file.bytes;
        if (bytes == null && file.path != null) {
          bytes = await File(file.path!).readAsBytes();
        }
        if (bytes != null) {
          final uint8 = Uint8List.fromList(bytes);
          final base64String = base64Encode(uint8);
          final ext = file.extension ?? 'jpg';
          final dataUri = 'data:image/$ext;base64,$base64String';
          setState(() {
            _avatarBytesCache = uint8;
            provider.profile.personal.avatarUrl = dataUri;
          });
          provider.saveAndSync();
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Profile picture updated successfully!'),
                behavior: SnackBarBehavior.floating,
              ),
            );
          }
        }
      }
    } catch (e) {
      debugPrint('Avatar pick error: $e');
    }
  }

  void _removeAvatar(PortfolioProvider provider) {
    setState(() {
      _avatarBytesCache = null;
      provider.profile.personal.avatarUrl = '';
    });
    provider.saveAndSync();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Profile picture removed'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  Widget _buildAvatarPreview(String avatarUrl, String fullName) {
    if (avatarUrl.isNotEmpty) {
      if (avatarUrl.startsWith('data:image')) {
        try {
          if (_avatarBytesCache != null) {
            return Image.memory(
              _avatarBytesCache!,
              key: ValueKey(_avatarBytesCache.hashCode),
              gaplessPlayback: true,
              fit: BoxFit.cover,
              width: double.infinity,
              height: double.infinity,
            );
          }
          final base64Part = avatarUrl.split(',').last;
          _avatarBytesCache = base64Decode(base64Part);
          return Image.memory(
            _avatarBytesCache!,
            key: ValueKey(_avatarBytesCache.hashCode),
            gaplessPlayback: true,
            fit: BoxFit.cover,
            width: double.infinity,
            height: double.infinity,
          );
        } catch (_) {}
      } else if (avatarUrl.startsWith('http')) {
        return Image.network(
          avatarUrl,
          key: ValueKey(avatarUrl),
          gaplessPlayback: true,
          fit: BoxFit.cover,
          width: double.infinity,
          height: double.infinity,
          errorBuilder: (_, __, ___) => _buildPlaceholderInitial(fullName),
        );
      }
    }
    return _buildPlaceholderInitial(fullName);
  }

  Widget _buildPlaceholderInitial(String fullName) {
    return Center(
      child: Text(
        fullName.isNotEmpty ? fullName[0].toUpperCase() : 'P',
        style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: Colors.white),
      ),
    );
  }

  Widget _buildTextField(String label, TextEditingController controller, IconData icon, {int maxLines = 1}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: TextField(
        controller: controller,
        maxLines: maxLines,
        decoration: InputDecoration(
          labelText: label,
          prefixIcon: Icon(icon, size: 18, color: Colors.grey.shade600),
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(color: Colors.grey.shade200),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: BorderSide(color: Colors.grey.shade200),
          ),
        ),
      ),
    );
  }
}
