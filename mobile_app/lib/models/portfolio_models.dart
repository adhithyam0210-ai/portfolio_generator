class PortfolioProfile {
  String userId;
  String username;
  bool isPublished;
  PersonalInfo personal;
  List<EducationItem> education;
  List<ExperienceItem> experience;
  List<ProjectItem> projects;
  SkillsData skills;
  TemplateSettings settings;
  AnalyticsData analytics;

  PortfolioProfile({
    required this.userId,
    required this.username,
    this.isPublished = true,
    required this.personal,
    required this.education,
    required this.experience,
    required this.projects,
    required this.skills,
    required this.settings,
    required this.analytics,
  });

  Map<String, dynamic> toJson() => {
        'userId': userId,
        'username': username,
        'isPublished': isPublished,
        'personal': personal.toJson(),
        'education': education.map((e) => e.toJson()).toList(),
        'experience': experience.map((e) => e.toJson()).toList(),
        'projects': projects.map((e) => e.toJson()).toList(),
        'skills': skills.toJson(),
        'settings': settings.toJson(),
        'analytics': analytics.toJson(),
      };

  factory PortfolioProfile.fromJson(Map<String, dynamic> json) => PortfolioProfile(
        userId: json['userId'] ?? 'user_1',
        username: json['username'] ?? 'adhithya',
        isPublished: json['isPublished'] ?? true,
        personal: PersonalInfo.fromJson(json['personal'] ?? {}),
        education: (json['education'] as List? ?? [])
            .map((e) => EducationItem.fromJson(e))
            .toList(),
        experience: (json['experience'] as List? ?? [])
            .map((e) => ExperienceItem.fromJson(e))
            .toList(),
        projects: (json['projects'] as List? ?? [])
            .map((e) => ProjectItem.fromJson(e))
            .toList(),
        skills: SkillsData.fromJson(json['skills'] ?? {}),
        settings: TemplateSettings.fromJson(json['settings'] ?? {}),
        analytics: AnalyticsData.fromJson(json['analytics'] ?? {}),
      );

  factory PortfolioProfile.initial() => PortfolioProfile(
        userId: 'user_1',
        username: 'adhithya',
        isPublished: true,
        personal: PersonalInfo(
          fullName: 'Adhithya M',
          headline: 'Software Engineer & Full Stack Developer',
          bio:
              'Senior student passionate about building scalable, high-performance web and cross-platform apps, intuitive user interfaces, and cloud architectures.',
          targetRole: 'Full Stack Developer',
          location: 'Chennai, India',
          email: 'adhithya@example.com',
          phone: '+91 98765 43210',
          githubUrl: 'https://github.com/adhithya',
          linkedinUrl: 'https://linkedin.com/in/adhithya',
          portfolioUrl: 'https://portfolio-generator-pg76.vercel.app/u/adhithya',
          avatarUrl: '',
          resumeUrl: '',
          resumeFileName: 'Adhithya_Resume.pdf',
          yearsExperience: '2+',
          completedProjects: '12+',
          happyClients: '100%',
          awardsWon: '3',
        ),
        education: [
          EducationItem(
            id: 'edu_1',
            institution: 'Anna University',
            degree: 'B.Tech',
            fieldOfStudy: 'Computer Science and Engineering',
            startYear: '2021',
            endYear: '2025',
            gpa: '8.9 / 10',
            coursework: 'Data Structures, Cloud Computing, Distributed Systems',
          ),
        ],
        experience: [
          ExperienceItem(
            id: 'exp_1',
            role: 'Full Stack Developer Intern',
            company: 'NextGen Solutions',
            location: 'Remote',
            startDate: 'May 2024',
            endDate: 'Aug 2024',
            description: [
              'Architected reactive frontends with Next.js & Flutter.',
              'Integrated PostgreSQL Supabase backend with sub-second queries.',
            ],
          ),
        ],
        projects: [
          ProjectItem(
            id: 'proj_1',
            title: 'Portfolify Studio',
            description:
                'Instant portfolio website & mobile app generator for technical students and developers.',
            technologies: ['Next.js', 'Flutter', 'Tailwind', 'Supabase'],
            githubUrl: 'https://github.com/adhithya/portfolify',
            liveUrl: 'https://portfolio-generator-pg76.vercel.app',
            featured: true,
            category: 'Full Stack',
          ),
          ProjectItem(
            id: 'proj_2',
            title: 'Neural Vision AI',
            description:
                'High-speed computer vision model for real-time edge object detection and classification.',
            technologies: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
            githubUrl: 'https://github.com/adhithya/neural-vision',
            featured: true,
            category: 'AI / ML',
          ),
        ],
        skills: SkillsData(
          languages: ['Dart', 'TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
          frameworks: ['Flutter', 'Next.js', 'React', 'Tailwind CSS', 'Node.js', 'FastAPI'],
          tools: ['Supabase', 'Git', 'Docker', 'Postman', 'Figma', 'Linux'],
          softSkills: ['Team Leadership', 'System Design', 'Agile / Scrum'],
        ),
        settings: TemplateSettings(
          templateId: 'modern-glass',
          primaryColor: '#0ea5e9',
          fontFamily: 'Inter',
          darkMode: true,
        ),
        analytics: AnalyticsData(
          viewsCount: 0,
          resumeDownloads: 0,
          lastViewedAt: 'No views yet',
        ),
      );
}

class PersonalInfo {
  String fullName;
  String headline;
  String bio;
  String targetRole;
  String location;
  String email;
  String phone;
  String githubUrl;
  String linkedinUrl;
  String portfolioUrl;
  String avatarUrl;
  String? resumeUrl;
  String? resumeFileName;
  String yearsExperience;
  String completedProjects;
  String happyClients;
  String awardsWon;

  PersonalInfo({
    required this.fullName,
    required this.headline,
    required this.bio,
    required this.targetRole,
    required this.location,
    required this.email,
    required this.phone,
    required this.githubUrl,
    required this.linkedinUrl,
    required this.portfolioUrl,
    required this.avatarUrl,
    this.resumeUrl,
    this.resumeFileName,
    this.yearsExperience = '2+',
    this.completedProjects = '10+',
    this.happyClients = '100%',
    this.awardsWon = '3',
  });

  Map<String, dynamic> toJson() => {
        'fullName': fullName,
        'headline': headline,
        'bio': bio,
        'targetRole': targetRole,
        'location': location,
        'email': email,
        'phone': phone,
        'githubUrl': githubUrl,
        'linkedinUrl': linkedinUrl,
        'portfolioUrl': portfolioUrl,
        'avatarUrl': avatarUrl,
        'resumeUrl': resumeUrl,
        'resumeFileName': resumeFileName,
        'yearsExperience': yearsExperience,
        'completedProjects': completedProjects,
        'happyClients': happyClients,
        'awardsWon': awardsWon,
      };

  factory PersonalInfo.fromJson(Map<String, dynamic> json) => PersonalInfo(
        fullName: json['fullName'] ?? json['full_name'] ?? '',
        headline: json['headline'] ?? '',
        bio: json['bio'] ?? '',
        targetRole: json['targetRole'] ?? json['target_role'] ?? '',
        location: json['location'] ?? '',
        email: json['email'] ?? '',
        phone: json['phone'] ?? '',
        githubUrl: json['githubUrl'] ?? json['github'] ?? '',
        linkedinUrl: json['linkedinUrl'] ?? json['linkedin'] ?? '',
        portfolioUrl: json['portfolioUrl'] ?? json['website'] ?? '',
        avatarUrl: json['avatarUrl'] ?? json['avatar_url'] ?? json['avatar'] ?? '',
        resumeUrl: json['resumeUrl'] ?? json['resume_url'],
        resumeFileName: json['resumeFileName'] ?? json['resume_file_name'],
        yearsExperience: json['yearsExperience'] ?? json['years_experience'] ?? '2+',
        completedProjects: json['completedProjects'] ?? json['completed_projects'] ?? '10+',
        happyClients: json['happyClients'] ?? json['happy_clients'] ?? '100%',
        awardsWon: json['awardsWon'] ?? json['awards_won'] ?? '3',
      );
}

class EducationItem {
  String id;
  String institution;
  String degree;
  String fieldOfStudy;
  String startYear;
  String endYear;
  String? gpa;
  String? coursework;

  EducationItem({
    required this.id,
    required this.institution,
    required this.degree,
    required this.fieldOfStudy,
    required this.startYear,
    required this.endYear,
    this.gpa,
    this.coursework,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'institution': institution,
        'degree': degree,
        'fieldOfStudy': fieldOfStudy,
        'startYear': startYear,
        'endYear': endYear,
        'gpa': gpa,
        'coursework': coursework,
      };

  factory EducationItem.fromJson(Map<String, dynamic> json) => EducationItem(
        id: json['id'] ?? '',
        institution: json['institution'] ?? '',
        degree: json['degree'] ?? '',
        fieldOfStudy: json['fieldOfStudy'] ?? '',
        startYear: json['startYear'] ?? '',
        endYear: json['endYear'] ?? '',
        gpa: json['gpa'],
        coursework: json['coursework'],
      );
}

class ExperienceItem {
  String id;
  String role;
  String company;
  String? location;
  String startDate;
  String endDate;
  List<String> description;

  ExperienceItem({
    required this.id,
    required this.role,
    required this.company,
    this.location,
    required this.startDate,
    required this.endDate,
    required this.description,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'role': role,
        'company': company,
        'location': location,
        'startDate': startDate,
        'endDate': endDate,
        'description': description,
      };

  factory ExperienceItem.fromJson(Map<String, dynamic> json) => ExperienceItem(
        id: json['id'] ?? '',
        role: json['role'] ?? '',
        company: json['company'] ?? '',
        location: json['location'],
        startDate: json['startDate'] ?? '',
        endDate: json['endDate'] ?? '',
        description: List<String>.from(json['description'] ?? []),
      );
}

class ProjectItem {
  String id;
  String title;
  String description;
  List<String> technologies;
  String? githubUrl;
  String? liveUrl;
  bool featured;
  String? image;
  String category;

  ProjectItem({
    required this.id,
    required this.title,
    required this.description,
    required this.technologies,
    this.githubUrl,
    this.liveUrl,
    this.featured = false,
    this.image,
    this.category = 'Web Development',
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'description': description,
        'technologies': technologies,
        'githubUrl': githubUrl,
        'liveUrl': liveUrl,
        'featured': featured,
        'image': image,
        'category': category,
      };

  factory ProjectItem.fromJson(Map<String, dynamic> json) => ProjectItem(
        id: json['id'] ?? '',
        title: json['title'] ?? '',
        description: json['description'] ?? '',
        technologies: List<String>.from(json['technologies'] ?? []),
        githubUrl: json['githubUrl'],
        liveUrl: json['liveUrl'],
        featured: json['featured'] ?? false,
        image: json['image'],
        category: json['category'] ?? 'Web Development',
      );
}

class SkillsData {
  List<String> languages;
  List<String> frameworks;
  List<String> tools;
  List<String> softSkills;

  SkillsData({
    required this.languages,
    required this.frameworks,
    required this.tools,
    required this.softSkills,
  });

  Map<String, dynamic> toJson() => {
        'languages': languages,
        'frameworks': frameworks,
        'tools': tools,
        'softSkills': softSkills,
      };

  factory SkillsData.fromJson(Map<String, dynamic> json) => SkillsData(
        languages: List<String>.from(json['languages'] ?? []),
        frameworks: List<String>.from(json['frameworks'] ?? []),
        tools: List<String>.from(json['tools'] ?? []),
        softSkills: List<String>.from(json['softSkills'] ?? []),
      );
}

class TemplateSettings {
  String templateId;
  String primaryColor;
  String fontFamily;
  bool darkMode;

  TemplateSettings({
    required this.templateId,
    required this.primaryColor,
    required this.fontFamily,
    required this.darkMode,
  });

  Map<String, dynamic> toJson() => {
        'templateId': templateId,
        'primaryColor': primaryColor,
        'fontFamily': fontFamily,
        'darkMode': darkMode,
      };

  factory TemplateSettings.fromJson(Map<String, dynamic> json) => TemplateSettings(
        templateId: json['templateId'] ?? 'modern-glass',
        primaryColor: json['primaryColor'] ?? '#0ea5e9',
        fontFamily: json['fontFamily'] ?? 'Inter',
        darkMode: json['darkMode'] ?? true,
      );
}

class AnalyticsData {
  int viewsCount;
  int resumeDownloads;
  String? lastViewedAt;

  AnalyticsData({
    required this.viewsCount,
    required this.resumeDownloads,
    this.lastViewedAt,
  });

  Map<String, dynamic> toJson() => {
        'viewsCount': viewsCount,
        'resumeDownloads': resumeDownloads,
        'lastViewedAt': lastViewedAt,
      };

  factory AnalyticsData.fromJson(Map<String, dynamic> json) => AnalyticsData(
        viewsCount: json['viewsCount'] ?? 0,
        resumeDownloads: json['resumeDownloads'] ?? 0,
        lastViewedAt: json['lastViewedAt'],
      );
}
