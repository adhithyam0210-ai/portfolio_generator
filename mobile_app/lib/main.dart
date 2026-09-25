import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'providers/portfolio_provider.dart';
import 'screens/builder_wizard_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/portfolio_preview_screen.dart';
import 'services/supabase_service.dart';

import 'screens/splash_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Supabase PostgreSQL Cloud Sync
  await SupabaseService().initialize();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => PortfolioProvider()),
      ],
      child: const PortfolifyApp(),
    ),
  );
}

class PortfolifyApp extends StatelessWidget {
  const PortfolifyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Portfolify Studio',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          primary: const Color(0xFF2563EB),
          surface: const Color(0xFFF8FAFC),
        ),
        textTheme: GoogleFonts.interTextTheme(Theme.of(context).textTheme),
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
      ),
      home: const SplashScreen(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<PortfolioProvider>(context);

    final screens = [
      const DashboardScreen(),
      const BuilderWizardScreen(initialStep: 1),
      PortfolioPreviewScreen(
        profile: provider.profile,
        onBack: () => setState(() => _currentIndex = 0),
      ),
    ];

    return PopScope(
      canPop: _currentIndex == 0,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop && _currentIndex != 0) {
          setState(() => _currentIndex = 0);
        }
      },
      child: Scaffold(
        body: IndexedStack(
          index: _currentIndex,
          children: screens,
        ),

      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() => _currentIndex = index);
        },
        backgroundColor: Colors.white,
        elevation: 8,
        indicatorColor: const Color(0xFFEFF6FF),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined),
            selectedIcon: Icon(Icons.dashboard, color: Color(0xFF2563EB)),
            label: 'Dashboard',
          ),
          NavigationDestination(
            icon: Icon(Icons.edit_note_outlined),
            selectedIcon: Icon(Icons.edit_note, color: Color(0xFF2563EB)),
            label: 'Builder',
          ),
          NavigationDestination(
            icon: Icon(Icons.visibility_outlined),
            selectedIcon: Icon(Icons.visibility, color: Color(0xFF2563EB)),
            label: 'Live Preview',
          ),
        ],
      ),
    ),
  );
}

}
