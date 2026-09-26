import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../core/constants/supabase_config.dart';
import '../models/portfolio_models.dart';

class ShareBottomSheet extends StatelessWidget {
  final PortfolioProfile profile;
  final VoidCallback onTogglePublish;

  const ShareBottomSheet({
    super.key,
    required this.profile,
    required this.onTogglePublish,
  });

  static void show(BuildContext context, PortfolioProfile profile, VoidCallback onTogglePublish) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => ShareBottomSheet(
        profile: profile,
        onTogglePublish: onTogglePublish,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final publicUrl = '${SupabaseConfig.webBaseUrl}/u/${profile.username}';

    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
      ),
      padding: const EdgeInsets.fromLTRB(24, 16, 24, 32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Drag handle
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.grey.shade300,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 20),

          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Share Portfolio',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF0F172A),
                    ),
                  ),
                  Text(
                    'Instant QR code & recruiter link',
                    style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                  ),
                ],
              ),
              IconButton(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close, color: Colors.black54),
              ),
            ],
          ),
          const SizedBox(height: 24),

          // QR Code Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              children: [
                QrImageView(
                  data: publicUrl,
                  version: QrVersions.auto,
                  size: 160.0,
                  backgroundColor: Colors.white,
                  padding: const EdgeInsets.all(12),
                ),
                const SizedBox(height: 12),
                Text(
                  'Scan with any phone camera to view',
                  style: TextStyle(fontSize: 11, color: Colors.grey.shade600, fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Public Link Copy Box
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade300),
            ),
            child: Row(
              children: [
                const Icon(Icons.link, size: 20, color: Color(0xFF2563EB)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    publicUrl,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF1E293B),
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                ElevatedButton.icon(
                  onPressed: () {
                    Clipboard.setData(ClipboardData(text: publicUrl));
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Public portfolio link copied to clipboard!'),
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  },
                  icon: const Icon(Icons.copy, size: 14),
                  label: const Text('Copy', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2563EB),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Share Actions Grid
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildShareButton(
                icon: Icons.share,
                label: 'System Share',
                color: const Color(0xFF0F172A),
                onTap: () {
                  Share.share(
                    'Check out my tech portfolio: $publicUrl\nCreated with Portfolify',
                  );
                },
              ),
              _buildShareButton(
                icon: Icons.chat_bubble_outline,
                label: 'WhatsApp',
                color: const Color(0xFF25D366),
                onTap: () {
                  final text = Uri.encodeComponent(
                      'Check out my tech portfolio: $publicUrl');
                  launchUrl(Uri.parse('https://api.whatsapp.com/send?text=$text'),
                      mode: LaunchMode.externalApplication);
                },
              ),
              _buildShareButton(
                icon: Icons.work_outline,
                label: 'LinkedIn',
                color: const Color(0xFF0A66C2),
                onTap: () {
                  final url = Uri.encodeComponent(publicUrl);
                  launchUrl(
                      Uri.parse(
                          'https://www.linkedin.com/sharing/share-offsite/?url=$url'),
                      mode: LaunchMode.externalApplication);
                },
              ),
              _buildShareButton(
                icon: Icons.email_outlined,
                label: 'Email',
                color: const Color(0xFFEA4335),
                onTap: () {
                  final subject = Uri.encodeComponent(
                      'Candidate Portfolio - ${profile.personal.fullName}');
                  final body = Uri.encodeComponent(
                      'Hi,\n\nPlease review my candidate portfolio:\n$publicUrl\n\nBest regards,\n${profile.personal.fullName}');
                  launchUrl(Uri.parse('mailto:?subject=$subject&body=$body'));
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildShareButton({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        child: Column(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.12),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: 22),
            ),
            const SizedBox(height: 6),
            Text(
              label,
              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF334155)),
            ),
          ],
        ),
      ),
    );
  }
}
