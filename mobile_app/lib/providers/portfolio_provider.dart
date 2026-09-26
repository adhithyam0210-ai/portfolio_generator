import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/portfolio_models.dart';
import '../services/supabase_service.dart';

class PortfolioProvider extends ChangeNotifier {
  late PortfolioProfile _profile;
  bool _isLoading = false;
  bool _isSyncing = false;
  String? _syncMessage;

  PortfolioProfile get profile => _profile;
  bool get isLoading => _isLoading;
  bool get isSyncing => _isSyncing;
  String? get syncMessage => _syncMessage;

  PortfolioProvider() {
    _profile = PortfolioProfile.initial();
    _loadFromLocalAndCloud();
  }

  Future<void> reload() => _loadFromLocalAndCloud();

  Future<void> _loadFromLocalAndCloud() async {
    _isLoading = true;
    notifyListeners();

    try {
      final prefs = await SharedPreferences.getInstance();
      final cached = prefs.getString('cached_portfolio_profile');
      if (cached != null) {
        _profile = PortfolioProfile.fromJson(jsonDecode(cached));
        // Reset legacy hardcoded mock analytics (148 / 32) to actual 0 if not yet synced from cloud
        if (_profile.analytics.viewsCount == 148 && _profile.analytics.resumeDownloads == 32) {
          _profile.analytics.viewsCount = 0;
          _profile.analytics.resumeDownloads = 0;
          _profile.analytics.lastViewedAt = 'No views yet';
        }
      }

      // Try syncing from Supabase with generous timeout for mobile
      final cloudProfile = await SupabaseService()
          .getPortfolioByUsername(_profile.username)
          .timeout(const Duration(seconds: 6), onTimeout: () => null);
      if (cloudProfile != null) {
        _profile = cloudProfile;
        await _saveLocal();
      }

    } catch (e) {
      debugPrint('Local/Cloud load error: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> _saveLocal() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(
          'cached_portfolio_profile', jsonEncode(_profile.toJson()));
    } catch (e) {
      debugPrint('Error saving locally: $e');
    }
  }

  Future<bool> saveAndSync() async {
    _isSyncing = true;
    _syncMessage = 'Syncing to Supabase...';
    notifyListeners();

    await _saveLocal();
    final success = await SupabaseService().savePortfolio(_profile);

    _isSyncing = false;
    _syncMessage = success ? 'Saved & Synced to Cloud!' : 'Saved locally (Offline)';
    notifyListeners();

    Future.delayed(const Duration(seconds: 3), () {
      _syncMessage = null;
      notifyListeners();
    });

    return success;
  }

  // --- Profile Completion Score ---
  double get completionPercentage {
    int total = 7;
    int completed = 0;

    if (_profile.personal.fullName.isNotEmpty) completed++;
    if (_profile.personal.headline.isNotEmpty) completed++;
    if (_profile.personal.bio.isNotEmpty) completed++;
    if (_profile.education.isNotEmpty) completed++;
    if (_profile.experience.isNotEmpty) completed++;
    if (_profile.projects.isNotEmpty) completed++;
    if (_profile.personal.resumeUrl != null && _profile.personal.resumeUrl!.isNotEmpty) completed++;

    return (completed / total) * 100;
  }

  // --- Step 1: Template Selection ---
  void selectTemplate(String templateId) {
    _profile.settings.templateId = templateId;
    saveAndSync();
    notifyListeners();
  }

  // --- Step 2: Personal Bio ---
  void updatePersonal(PersonalInfo personal) {
    _profile.personal = personal;
    saveAndSync();
    notifyListeners();
  }

  // --- Step 3: Education ---
  void addEducation(EducationItem item) {
    _profile.education.add(item);
    saveAndSync();
    notifyListeners();
  }

  void removeEducation(String id) {
    _profile.education.removeWhere((e) => e.id == id);
    saveAndSync();
    notifyListeners();
  }

  // --- Step 4: Experience ---
  void addExperience(ExperienceItem item) {
    _profile.experience.add(item);
    saveAndSync();
    notifyListeners();
  }

  void removeExperience(String id) {
    _profile.experience.removeWhere((e) => e.id == id);
    saveAndSync();
    notifyListeners();
  }

  // --- Step 5: Projects ---
  void addProject(ProjectItem item) {
    _profile.projects.add(item);
    saveAndSync();
    notifyListeners();
  }

  void removeProject(String id) {
    _profile.projects.removeWhere((p) => p.id == id);
    saveAndSync();
    notifyListeners();
  }

  // --- Step 6: Skills ---
  void updateSkills(SkillsData skills) {
    _profile.skills = skills;
    saveAndSync();
    notifyListeners();
  }

  // --- Publish toggle ---
  void togglePublish() {
    _profile.isPublished = !_profile.isPublished;
    saveAndSync();
    notifyListeners();
  }
}
