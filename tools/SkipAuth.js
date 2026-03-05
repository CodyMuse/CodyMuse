// =============================================
//  SkipAuth.js — CodyMuse SkipAuth Tool
//  Paste vào Console (F12) để xem không cần login
//  Version: 1.0.0
// =============================================

(function SkipAuth() {

  // ── 1. Tạo fake guest user (giả lập Supabase user object) ──────────────────
  const GUEST_USER = {
    id:    "guest-00000000-0000-0000-0000-000000000000",
    email: "guest@codymuse.local",
    role:  "authenticated",
    user_metadata: {
      username:   "Khách",
      avatar_url: null,
    },
    app_metadata: {},
    aud: "authenticated",
  };

  // ── 2. Inject currentUser vào scope toàn cục ────────────────────────────────
  window.currentUser     = GUEST_USER;
  window.currentUserRole = "user";

  // Ghi vào biến local scope của auth.js thông qua window
  // (auth.js dùng biến `currentUser` ở module scope, nhưng cũng sync về window)
  // Trick: override syncCurrentUserGlobal để giữ guest không bị overwrite
  if (typeof syncCurrentUserGlobal === "function") {
    window._origSyncCurrentUserGlobal = syncCurrentUserGlobal;
    // Không làm gì — giữ nguyên window.currentUser = GUEST_USER
    window.syncCurrentUserGlobal = function() {};
  }

  // ── 3. Patch showAuthModal — ngăn modal hiện lại ────────────────────────────
  if (typeof showAuthModal === "function") {
    window._origShowAuthModal = showAuthModal;
    window.showAuthModal = function(tab) {
      console.info("[SkipAuth] showAuthModal() bị chặn (guest mode)");
    };
  } else {
    console.warn("[SkipAuth] showAuthModal không tìm thấy — có thể modal vẫn hiện");
  }

  // ── 4. Đóng auth modal ngay lập tức ────────────────────────────────────────
  const overlay = document.getElementById("authModalOverlay");
  if (overlay) {
    overlay.classList.remove("open");
    overlay.style.display = "none";
    console.info("[SkipAuth] ✅ Đã đóng auth modal");
  }

  // ── 5. Cập nhật Topbar UI (hiện tên Khách, ẩn guestPanel) ──────────────────
  if (typeof updateTopbarAuth === "function") {
    try { updateTopbarAuth(); } catch(e) {}
  }

  // ── 6. Boot app nếu chưa boot ───────────────────────────────────────────────
  if (typeof _bootApp === "function") {
    if (typeof _appBooted !== "undefined" && _appBooted === false) {
      console.info("[SkipAuth] 🚀 Đang boot app...");
      _appBooted = false; // reset flag để _bootApp có thể chạy
      _bootApp().then(() => {
        console.info("[SkipAuth] ✅ App boot thành công!");
      }).catch(e => {
        console.error("[SkipAuth] ❌ Boot lỗi:", e);
      });
    } else if (typeof _appBooted !== "undefined" && _appBooted === true) {
      // App đã boot rồi, chỉ cần show landing
      console.info("[SkipAuth] App đã boot sẵn, hiện landing...");
      if (typeof showLanding === "function") showLanding();
    }
  } else {
    console.warn("[SkipAuth] _bootApp không tìm thấy");
  }

  // ── 7. Patch onAuthStateChange — ngăn Supabase reset currentUser ────────────
  //    Khi Supabase fire INITIAL_SESSION với session=null,
  //    auth.js sẽ gọi showAuthModal lại → patch luôn
  if (window._supabase?.auth) {
    const _origOnAuthStateChange = window._supabase.auth.onAuthStateChange.bind(window._supabase.auth);
    window._supabase.auth.onAuthStateChange = function(callback) {
      return _origOnAuthStateChange(function(event, session) {
        if (!session) {
          // Giả vờ có session guest, không để auth.js nhận null
          console.info("[SkipAuth] onAuthStateChange intercepted — kept guest session");
          return;
        }
        callback(event, session);
      });
    };
    console.info("[SkipAuth] ✅ Đã patch onAuthStateChange");
  }

  // ── 8. Ẩn nút admin, đổi tên settings button ───────────────────────────────
  const adminBtn = document.getElementById("btnOpenAdminPanel");
  if (adminBtn) adminBtn.style.display = "none";

  const settingsBtn = document.getElementById("btnSettings");
  if (settingsBtn && !window.currentUser) {
    // Đã có currentUser nên updateTopbarAuth() sẽ handle
  }

  // ── 9. Console banner ───────────────────────────────────────────────────────
  console.log(
    "%c[SkipAuth] 👋 Đang chạy với tư cách Khách!\n" +
    "%c• Đọc truyện: ✅  •  Lưu danh sách: localStorage only  •  Sync cloud: ❌",
    "color:#ff4fa8;font-weight:bold;font-size:14px;",
    "color:#888;font-size:12px;"
  );

  return "[SkipAuth] OK — Guest mode active";

})();
