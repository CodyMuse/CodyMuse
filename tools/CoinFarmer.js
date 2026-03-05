// =============================================
//  CoinFarmerUI.js — CodyMuse Manual Coin Farm
//  Paste vào Console (F12) — hiện UI farm thủ công
// =============================================

(function CoinFarmerUI() {

  // Xóa UI cũ nếu có
  document.getElementById("__coinFarmerUI")?.remove();

  // ── Inject CSS ────────────────────────────────────────────────────────────────
  const style = document.createElement("style");
  style.textContent = `
    #__coinFarmerUI {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 999999;
      font-family: "Be Vietnam Pro", sans-serif;
      width: 260px;
    }
    #__cfPanel {
      background: rgba(255,255,255,.97);
      border: 1.5px solid rgba(255,79,168,.35);
      border-radius: 20px;
      box-shadow: 0 16px 48px rgba(255,79,168,.22);
      overflow: hidden;
      transition: all .2s ease;
    }
    body.dark #__cfPanel {
      background: rgba(22,10,20,.97);
      border-color: rgba(255,79,168,.30);
    }
    #__cfHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px 10px;
      background: linear-gradient(135deg, rgba(255,79,168,.14), rgba(255,140,200,.10));
      border-bottom: 1px solid rgba(255,79,168,.14);
      cursor: move;
      user-select: none;
    }
    #__cfTitle {
      font-size: 13px;
      font-weight: 800;
      color: #ff4fa8;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    #__cfMinimize {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
      color: #aaa;
      padding: 0 4px;
      line-height: 1;
      transition: color .13s;
    }
    #__cfMinimize:hover { color: #ff4fa8; }
    #__cfBody {
      padding: 12px 14px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    #__cfBalance {
      text-align: center;
      font-size: 28px;
      font-weight: 900;
      color: #ff4fa8;
      letter-spacing: -0.5px;
      line-height: 1;
    }
    #__cfBalanceSub {
      text-align: center;
      font-size: 11px;
      font-weight: 600;
      color: #aaa;
      margin-top: 2px;
    }
    #__cfDivider {
      height: 1px;
      background: rgba(255,79,168,.12);
    }
    #__cfAmountRow {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    #__cfAmountLabel {
      font-size: 11px;
      font-weight: 700;
      color: #aaa;
      white-space: nowrap;
    }
    #__cfAmountInput {
      flex: 1;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1.5px solid rgba(255,79,168,.25);
      background: rgba(255,247,251,.9);
      font-size: 14px;
      font-weight: 800;
      color: #3a0f2d;
      font-family: inherit;
      outline: none;
      text-align: center;
      transition: border-color .13s;
    }
    body.dark #__cfAmountInput {
      background: rgba(40,18,36,.85);
      color: #f0e4ec;
    }
    #__cfAmountInput:focus { border-color: #ff4fa8; }
    #__cfPresets {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
    .cf-preset {
      flex: 1;
      padding: 6px 4px;
      border-radius: 8px;
      border: 1.5px solid rgba(255,79,168,.22);
      background: rgba(255,247,251,.8);
      font-size: 11px;
      font-weight: 800;
      color: #ff4fa8;
      cursor: pointer;
      font-family: inherit;
      transition: all .13s;
      text-align: center;
    }
    body.dark .cf-preset {
      background: rgba(255,79,168,.08);
    }
    .cf-preset:hover {
      background: rgba(255,79,168,.15);
      border-color: #ff4fa8;
      transform: translateY(-1px);
    }
    #__cfAddBtn {
      width: 100%;
      padding: 10px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #ff4fa8, #ff8cc8);
      color: #fff;
      font-size: 14px;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      box-shadow: 0 8px 22px rgba(255,79,168,.30);
      transition: transform .13s, box-shadow .13s;
    }
    #__cfAddBtn:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 28px rgba(255,79,168,.40);
    }
    #__cfAddBtn:active { transform: scale(.98); }
    #__cfResetBtn {
      width: 100%;
      padding: 8px;
      border-radius: 10px;
      border: 1.5px solid rgba(192,40,78,.22);
      background: rgba(192,40,78,.06);
      color: #c0284e;
      font-size: 12px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      transition: background .13s;
    }
    #__cfResetBtn:hover { background: rgba(192,40,78,.12); }
    #__cfLog {
      font-size: 11px;
      color: #4ade80;
      font-weight: 700;
      text-align: center;
      min-height: 16px;
      transition: opacity .2s;
    }
    #__cfLog.err { color: #f87171; }
  `;
  document.head.appendChild(style);

  // ── Build UI ──────────────────────────────────────────────────────────────────
  const wrap = document.createElement("div");
  wrap.id = "__coinFarmerUI";
  wrap.innerHTML = `
    <div id="__cfPanel">
      <div id="__cfHeader">
        <div id="__cfTitle">🌾 Coin Farmer</div>
        <button id="__cfMinimize" title="Thu gọn">—</button>
      </div>
      <div id="__cfBody">
        <div>
          <div id="__cfBalance">0</div>
          <div id="__cfBalanceSub">🪙 Coin hiện tại</div>
        </div>
        <div id="__cfDivider"></div>
        <div id="__cfAmountRow">
          <span id="__cfAmountLabel">+Coin:</span>
          <input id="__cfAmountInput" type="number" value="5" min="1" max="99999" />
        </div>
        <div id="__cfPresets">
          <button class="cf-preset" data-v="5">+5</button>
          <button class="cf-preset" data-v="10">+10</button>
          <button class="cf-preset" data-v="50">+50</button>
          <button class="cf-preset" data-v="100">+100</button>
          <button class="cf-preset" data-v="500">+500</button>
        </div>
        <button id="__cfAddBtn">➕ Thêm Coin</button>
        <button id="__cfResetBtn">🔄 Reset về 0</button>
        <div id="__cfLog"></div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  // ── Helpers ───────────────────────────────────────────────────────────────────
  const balEl  = document.getElementById("__cfBalance");
  const logEl  = document.getElementById("__cfLog");
  const input  = document.getElementById("__cfAmountInput");

  function _getbal() {
    return parseInt(localStorage.getItem("codymuse_coins_v1") || "0", 10);
  }
  function _setbal(n) {
    localStorage.setItem("codymuse_coins_v1", String(Math.max(0, n)));
    balEl.textContent = n.toLocaleString("vi-VN");
    const ui = document.getElementById("cmCoinAmount");
    if (ui) ui.textContent = n.toLocaleString("vi-VN");
  }
  function _log(msg, err = false) {
    logEl.textContent = msg;
    logEl.className = err ? "err" : "";
    clearTimeout(logEl._t);
    logEl._t = setTimeout(() => { logEl.textContent = ""; }, 2200);
  }

  // Hiện balance ngay
  balEl.textContent = _getbal().toLocaleString("vi-VN");

  // ── Add coin ──────────────────────────────────────────────────────────────────
  async function addCoins(amount) {
    if (isNaN(amount) || amount <= 0) return _log("Nhập số hợp lệ!", true);

    const newBal = _getbal() + amount;
    _setbal(newBal);

    // Sync Supabase nếu đã login
    if (window._supabase && window.currentUser) {
      try {
        await window._supabase.from("coin_ledger").insert({
          user_id    : window.currentUser.id,
          amount,
          reason     : "farmer_manual",
          story_slug : "manual-test",
          chapter_ref: `manual-${Date.now()}`,
        });
        await window._supabase.from("coin_balances").upsert({
          user_id    : window.currentUser.id,
          balance    : newBal,
          updated_at : new Date().toISOString(),
        });
        _log(`+${amount} 🪙 → ${newBal.toLocaleString()} (synced ☁️)`);
      } catch (e) {
        _log(`+${amount} 🪙 (local only — ${e.message})`, true);
      }
    } else {
      _log(`+${amount} 🪙 → ${newBal.toLocaleString()} (local)`);
    }

    // Show coin toast nếu có
    const toast = document.getElementById("cmCoinToast");
    if (toast) {
      toast.textContent = `🌾 +${amount} Coins`;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    }
  }

  async function resetCoins() {
    _setbal(0);
    if (window._supabase && window.currentUser) {
      try {
        await window._supabase.from("coin_balances").upsert({
          user_id    : window.currentUser.id,
          balance    : 0,
          updated_at : new Date().toISOString(),
        });
        _log("Reset về 0 ☁️");
      } catch { _log("Reset về 0 (local)"); }
    } else {
      _log("Reset về 0");
    }
  }

  // ── Events ────────────────────────────────────────────────────────────────────
  document.getElementById("__cfAddBtn").onclick = () => {
    addCoins(parseInt(input.value, 10));
  };
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") addCoins(parseInt(input.value, 10));
  });
  document.querySelectorAll(".cf-preset").forEach(btn => {
    btn.onclick = () => {
      const v = parseInt(btn.dataset.v, 10);
      input.value = v;
      addCoins(v);
    };
  });
  document.getElementById("__cfResetBtn").onclick = resetCoins;

  // ── Minimize ──────────────────────────────────────────────────────────────────
  let minimized = false;
  document.getElementById("__cfMinimize").onclick = () => {
    minimized = !minimized;
    document.getElementById("__cfBody").style.display = minimized ? "none" : "flex";
    document.getElementById("__cfMinimize").textContent = minimized ? "＋" : "—";
  };

  // ── Drag ─────────────────────────────────────────────────────────────────────
  const header = document.getElementById("__cfHeader");
  let ox = 0, oy = 0, dragging = false;
  header.addEventListener("mousedown", e => {
    dragging = true;
    ox = e.clientX - wrap.getBoundingClientRect().left;
    oy = e.clientY - wrap.getBoundingClientRect().top;
    wrap.style.transition = "none";
  });
  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    wrap.style.left   = (e.clientX - ox) + "px";
    wrap.style.bottom = "auto";
    wrap.style.top    = (e.clientY - oy) + "px";
  });
  document.addEventListener("mouseup", () => {
    dragging = false;
    wrap.style.transition = "";
  });

  // ── Close bằng Escape ────────────────────────────────────────────────────────
  document.addEventListener("keydown", function _cfEsc(e) {
    if (e.key === "Escape" && document.getElementById("__coinFarmerUI")) {
      document.getElementById("__coinFarmerUI")?.remove();
      document.removeEventListener("keydown", _cfEsc);
    }
  });

  console.log("%c[CoinFarmerUI] 🌾 UI đã mở! Nhấn ESC để đóng.", "color:#ff4fa8;font-weight:bold;");

})();
