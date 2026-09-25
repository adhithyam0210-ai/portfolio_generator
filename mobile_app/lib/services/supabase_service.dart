import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../core/constants/supabase_config.dart';
import '../models/portfolio_models.dart';

class SupabaseService {
  static final SupabaseService _instance = SupabaseService._internal();
  factory SupabaseService() => _instance;
  SupabaseService._internal();

  SupabaseClient? _client;
  bool _isInitialized = false;

  bool get isReady => _isInitialized && _client != null;
  SupabaseClient get client => _client!;

  Future<void> initialize() async {
    try {
      await Supabase.initialize(
        url: SupabaseConfig.supabaseUrl,
        anonKey: SupabaseConfig.supabaseAnonKey,
      );
      _client = Supabase.instance.client;
      _isInitialized = true;
      debugPrint('Supabase initialized successfully!');
    } catch (e) {
      debugPrint('Supabase initialization error: $e');
    }
  }

  /// Sync complete portfolio to Supabase
  Future<bool> savePortfolio(PortfolioProfile profile) async {
    if (!isReady) return false;
    try {
      // 1. Upsert profile table
      await client.from('profiles').upsert({
        'id': profile.userId,
        'username': profile.username,
        'email': profile.personal.email,
        'full_name': profile.personal.fullName,
        'headline': profile.personal.headline,
        'bio': profile.personal.bio,
        'location': profile.personal.location,
        'avatar_url': profile.personal.avatarUrl,
        'resume_url': profile.personal.resumeUrl,
        'resume_file_name': profile.personal.resumeFileName,
        'github': profile.personal.githubUrl,
        'linkedin': profile.personal.linkedinUrl,
        'website': profile.personal.portfolioUrl,
        'template_id': profile.settings.templateId,
        'theme_color': profile.settings.primaryColor,
        'font_family': profile.settings.fontFamily,
        'is_published': profile.isPublished,
        'portfolio_json': profile.toJson(),
        'updated_at': DateTime.now().toIso8601String(),
      });

      // 2. Sync Education
      if (profile.education.isNotEmpty) {
        await client.from('education').delete().eq('profile_id', profile.userId);
        final eduData = profile.education.map((e) => {
              'id': e.id,
              'profile_id': profile.userId,
              'institution': e.institution,
              'degree': e.degree,
              'field_of_study': e.fieldOfStudy,
              'start_year': e.startYear,
              'end_year': e.endYear,
              'gpa': e.gpa,
              'coursework': e.coursework,
            }).toList();
        await client.from('education').insert(eduData);
      }

      // 3. Sync Experience
      if (profile.experience.isNotEmpty) {
        await client.from('experience').delete().eq('profile_id', profile.userId);
        final expData = profile.experience.map((e) => {
              'id': e.id,
              'profile_id': profile.userId,
              'role': e.role,
              'company': e.company,
              'location': e.location,
              'start_date': e.startDate,
              'end_date': e.endDate,
              'description': e.description,
            }).toList();
        await client.from('experience').insert(expData);
      }

      // 4. Sync Projects
      if (profile.projects.isNotEmpty) {
        await client.from('projects').delete().eq('profile_id', profile.userId);
        final projData = profile.projects.map((p) => {
              'id': p.id,
              'profile_id': profile.userId,
              'title': p.title,
              'description': p.description,
              'technologies': p.technologies,
              'github_url': p.githubUrl,
              'live_url': p.liveUrl,
              'featured': p.featured,
              'category': p.category,
            }).toList();
        await client.from('projects').insert(projData);
      }

      // 5. Sync Skills
      await client.from('skills').delete().eq('profile_id', profile.userId);
      await client.from('skills').insert({
        'profile_id': profile.userId,
        'languages': profile.skills.languages,
        'frameworks': profile.skills.frameworks,
        'tools': profile.skills.tools,
        'other': profile.skills.softSkills,
      });

      return true;
    } catch (e) {
      debugPrint('Error saving portfolio to Supabase: $e');
      return false;
    }
  }

  /// Fetch portfolio by username from Supabase
  Future<PortfolioProfile?> getPortfolioByUsername(String username) async {
    if (!isReady) return null;
    try {
      final response = await client
          .from('profiles')
          .select()
          .eq('username', username)
          .maybeSingle();

      if (response != null && response['portfolio_json'] != null) {
        return PortfolioProfile.fromJson(
            Map<String, dynamic>.from(response['portfolio_json']));
      }
      return null;
    } catch (e) {
      debugPrint('Error fetching portfolio from Supabase: $e');
      return null;
    }
  }

  /// Upload file (e.g. resume or avatar) to Supabase Storage
  Future<String?> uploadFile({
    required String bucket,
    required String path,
    required Uint8List bytes,
    required String contentType,
  }) async {
    if (!isReady) return null;
    try {
      await client.storage.from(bucket).uploadBinary(
            path,
            bytes,
            fileOptions: FileOptions(contentType: contentType, upsert: true),
          );
      final publicUrl = client.storage.from(bucket).getPublicUrl(path);
      return publicUrl;
    } catch (e) {
      debugPrint('Storage upload error: $e');
      return null;
    }
  }
}
