import { useState } from "react";

// ─── Base card list — add img URLs here ──────────────────────────────────────
const BASE_CARDS = [
  { id: "OP03-040",    name: "Nami",                    set: "Pillars of Strength",           rarity: "L",   type: "Leader",    img: "" },
  { id: "OP11-041",    name: "Nami",                    set: "Egghead Island",                rarity: "L",   type: "Leader",    img: "" },
  { id: "ST01-007",    name: "Nami",                    set: "ST-01 Starter Deck",            rarity: "C",   type: "Character", img: "" },
  { id: "OP01-016",    name: "Nami",                    set: "Romance Dawn",                  rarity: "R",   type: "Character", img: "" },
  { id: "OP02-036",    name: "Nami",                    set: "Paramount War",                 rarity: "SR",  type: "Character", img: "" },
  { id: "OP03-030",    name: "Nami",                    set: "Pillars of Strength",           rarity: "UC",  type: "Character", img: "" },
  { id: "OP04-011",    name: "Nami",                    set: "Kingdoms of Intrigue",          rarity: "UC",  type: "Character", img: "" },
  { id: "OP05-062",    name: "O-Nami",                  set: "Awakening of the New Era",      rarity: "UC",  type: "Character", img: "" },
  { id: "OP06-101",    name: "O-Nami",                  set: "Wings of the Captain",          rarity: "SR",  type: "Character", img: "" },
  { id: "OP08-013",    name: "Nami",                    set: "Two Legends",                   rarity: "C",   type: "Character", img: "" },
  { id: "OP09-050",    name: "Nami",                    set: "Emperors in the New World",     rarity: "R",   type: "Character", img: "" },
  { id: "OP10-013",    name: "Nami",                    set: "Royal Blood",                   rarity: "UC",  type: "Character", img: "" },
  { id: "OP10-033",    name: "Nami",                    set: "Royal Blood",                   rarity: "C",   type: "Character", img: "" },
  { id: "OP10-088",    name: "Nami",                    set: "Royal Blood",                   rarity: "C",   type: "Character", img: "" },
  { id: "OP11-054",    name: "Nami",                    set: "Egghead Island",                rarity: "UC",  type: "Character", img: "" },
  { id: "OP14-031",    name: "Nami",                    set: "Side: Straw Hat Crew",          rarity: "SR",  type: "Character", img: "" },
  { id: "OP15-086",    name: "Nami",                    set: "Adventure on Kami's Island",    rarity: "SR",  type: "Character", img: "" },
  { id: "EB02-017",    name: "Nami",                    set: "Memorial Collection",           rarity: "SR",  type: "Character", img: "" },
  { id: "EB03-006",    name: "Nami",                    set: "Extra Booster 3",               rarity: "R",   type: "Character", img: "" },
  { id: "ST14-006",    name: "Nami",                    set: "ST-14 Starter Deck",            rarity: "C",   type: "Character", img: "" },
  { id: "ST21-009",    name: "Nami",                    set: "ST-21 Starter Deck",            rarity: "C",   type: "Character", img: "" },
  { id: "EB03-060",    name: "Will You Be My Servant?", set: "Extra Booster 3",               rarity: "UC",  type: "Event",     img: "" },
  { id: "OP02-036_p1", name: "Nami (Alt Art)",          set: "Paramount War",                 rarity: "ALT", type: "Promo",     img: "" },
  { id: "OP06-101_p1", name: "O-Nami (SP)",             set: "Wings of the Captain",          rarity: "SP",  type: "Promo",     img: "" },
  { id: "OP14-031_p1", name: "Nami (Alt Art)",          set: "Side: Straw Hat Crew",          rarity: "ALT", type: "Promo",     img: "" },
  { id: "OP15-086_p1", name: "Nami (Alt Art)",          set: "Adventure on Kami's Island",    rarity: "ALT", type: "Promo",     img: "" },
  { id: "EB02-017_p1", name: "Nami (Alt Art)",          set: "Memorial Collection",           rarity: "ALT", type: "Promo",     img: "" },
  { id: "EB03-053",    name: "Nami (SP)",               set: "Extra Booster 3",               rarity: "SP",  type: "Promo",     img: "" },
  { id: "PRB02-012",   name: "Nami",                    set: "ONE PIECE CARD THE BEST vol.2", rarity: "R",   type: "Promo",     img: "" },
  { id: "P-053",       name: "Nami (Promo)",            set: "Nami Starter Deck Event",       rarity: "P",   type: "Promo",     img: "" },
  { id: "P-096",       name: "Nami (Promo)",            set: "OP14 Release Event",            rarity: "P",   type: "Promo",     img: "" },
  { id: "P-102",       name: "Nami (Promo)",            set: "Tournament Pack 2026 Vol.2",    rarity: "P",   type: "Promo",     img: "" },
  { id: "P-112",       name: "Nami (Promo)",            set: "Heroines Battle Winner",        rarity: "P",   type: "Promo",     img: "" },
  { id: "P-139",       name: "Nami (Live Action)",      set: "Live Action Edition Vol.2",     rarity: "P",   type: "Promo",     img: "" },
  { id: "OP15-108",    name: "Nami (Dash Pack)",        set: "Adventure on Kami's Island",    rarity: "SP",  type: "Promo",     img: "" },
];
// ─────────────────────────────────────────────────────────────────────────────

const FILTERS  = ["All", "Leader", "Character", "Event", "Promo", "Owned", "Missing"];
const TYPES    = ["Character", "Leader", "Event", "Promo"];
const RARITIES = ["C", "UC", "R", "SR", "L", "SP", "ALT", "P"];

const RARITY = {
  L:   { bg: "#0f2e0f", color: "#4de04d", border: "#2a6a2a", label: "Leader"  },
  SR:  { bg: "#2e0f05", color: "#ff7030", border: "#6a2505", label: "SR"      },
  R:   { bg: "#0a1e30", color: "#50aaff", border: "#1a4060", label: "R"       },
  UC:  { bg: "#1a1a22", color: "#aaaacc", border: "#2a2a3a", label: "UC"      },
  C:   { bg: "#121218", color: "#7777aa", border: "#1e1e2e", label: "C"       },
  P:   { bg: "#1e0a30", color: "#cc77ff", border: "#3a1a5a", label: "Promo"   },
  SP:  { bg: "#2a2005", color: "#ffcc22", border: "#5a4005", label: "SP"      },
  ALT: { bg: "#1a0a22", color: "#dd99ff", border: "#3a1a5a", label: "Alt Art" },
};

// ─── Persistence ─────────────────────────────────────────────────────────────
function loadCollection() {
  try { const r = localStorage.getItem("nami_collection"); return r ? JSON.parse(r) : {}; } catch { return {}; }
}
function saveCollection(col) {
  try { localStorage.setItem("nami_collection", JSON.stringify(col)); } catch {}
}
function loadCustomCards() {
  try { const r = localStorage.getItem("nami_custom_cards"); return r ? JSON.parse(r) : []; } catch { return []; }
}
function saveCustomCards(cards) {
  try { localStorage.setItem("nami_custom_cards", JSON.stringify(cards)); } catch {}
}

// ─── CardImg ─────────────────────────────────────────────────────────────────
function CardImg({ card }) {
  const rs = RARITY[card.rarity] || RARITY.C;
  const hasImg = card.img && card.img.trim() !== "";
  return (
    <div style={{ width: "100%", aspectRatio: "0.714", background: `linear-gradient(160deg, ${rs.bg}, #0a0c14)`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "6px 6px 0 0", position: "relative" }}>
      {hasImg ? (
        <img src={card.img} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ textAlign: "center", color: rs.color, padding: 6, opacity: 0.4 }}>
          <div style={{ fontSize: 28 }}>🃏</div>
          <div style={{ fontSize: 9, marginTop: 4 }}>{card.id}</div>
        </div>
      )}
    </div>
  );
}

// ─── CardTile ─────────────────────────────────────────────────────────────────
function CardTile({ card, owned, count, onToggle, onCountChange, onClick }) {
  const rs = RARITY[card.rarity] || RARITY.C;
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", flexDirection: "column", borderRadius: 10, overflow: "hidden", border: `1px solid ${owned ? rs.color : hover ? rs.border : "#1a2540"}`, boxShadow: owned ? `0 0 14px ${rs.border}88` : hover ? `0 4px 12px #00000088` : "none", background: owned ? `${rs.bg}88` : "#0c1220", transition: "border-color 0.15s, box-shadow 0.15s", opacity: owned ? 1 : 0.75, cursor: "pointer", position: "relative" }}
    >
      {owned && (
        <div style={{ position: "absolute", top: 6, right: 6, zIndex: 5, background: rs.color, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#000", boxShadow: "0 2px 6px #00000088" }}>✓</div>
      )}
      {card.custom && (
        <div style={{ position: "absolute", top: 6, left: 6, zIndex: 5, background: "#1a3060", border: "1px solid #f5c842", borderRadius: 4, padding: "1px 5px", fontSize: 8, fontWeight: 700, color: "#f5c842", letterSpacing: "0.05em" }}>CUSTOM</div>
      )}
      <div onClick={() => onClick(card)} style={{ cursor: "pointer" }}>
        <CardImg card={card} />
      </div>
      <div style={{ padding: "8px 8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: owned ? rs.color : "#8aaac8", lineHeight: 1.3, textAlign: "center" }}>{card.name}</div>
        <div style={{ fontSize: 9, color: "#3a5070", textAlign: "center" }}>{card.id}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 4, fontWeight: 700, background: rs.bg, color: rs.color, border: `1px solid ${rs.border}`, letterSpacing: "0.06em" }}>{rs.label}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToggle(card.id); }} style={{ marginTop: 2, padding: "4px 0", borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer", border: `1px solid ${owned ? rs.color : "#1a3050"}`, background: owned ? rs.color : "#0d1a2a", color: owned ? "#000" : "#4a7090", transition: "all 0.15s" }}>
          {owned ? "✓ Owned" : "+ Mark Owned"}
        </button>
        {owned && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <button onClick={(e) => { e.stopPropagation(); onCountChange(card.id, Math.max(0, (count || 0) - 1)); }} style={{ width: 22, height: 22, borderRadius: 5, border: `1px solid ${rs.border}`, background: "#0d1a2a", color: rs.color, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, lineHeight: 1 }}>−</button>
            <span style={{ fontSize: 13, fontWeight: 800, color: rs.color, minWidth: 18, textAlign: "center" }}>{count || 0}</span>
            <button onClick={(e) => { e.stopPropagation(); onCountChange(card.id, (count || 0) + 1); }} style={{ width: 22, height: 22, borderRadius: 5, border: `1px solid ${rs.border}`, background: "#0d1a2a", color: rs.color, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, lineHeight: 1 }}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card detail modal ────────────────────────────────────────────────────────
function Modal({ card, owned, count, onToggle, onCountChange, onClose, onDelete }) {
  if (!card) return null;
  const rs = RARITY[card.rarity] || RARITY.C;
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0d1120", border: `1px solid ${rs.border}`, borderRadius: 14, overflow: "hidden", maxWidth: 280, width: "100%", boxShadow: `0 0 50px ${rs.border}66` }}>
        <CardImg card={card} />
        <div style={{ padding: "12px 16px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ color: rs.color, fontWeight: 700, fontSize: 15 }}>{card.name}</div>
            {card.custom && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#1a3060", border: "1px solid #f5c842", color: "#f5c842", fontWeight: 700, letterSpacing: "0.05em" }}>CUSTOM</span>}
          </div>
          <div style={{ color: "#6a8cb0", fontSize: 12, marginTop: 3 }}>{card.set}</div>
          <div style={{ color: "#3a5070", fontSize: 11, marginTop: 3 }}>{card.id} · {rs.label}</div>
        </div>
        <div style={{ padding: "0 16px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={() => onToggle(card.id)} style={{ padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${owned ? rs.color : "#1a3050"}`, background: owned ? rs.color : "#0d1a2a", color: owned ? "#000" : "#4a7090" }}>
            {owned ? "✓ Owned — click to remove" : "+ Mark as Owned"}
          </button>
          {owned && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ color: "#4a6080", fontSize: 12 }}>Copies owned:</span>
              <button onClick={() => onCountChange(card.id, Math.max(0, (count || 0) - 1))} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${rs.border}`, background: "#0d1a2a", color: rs.color, fontSize: 16, cursor: "pointer", fontWeight: 700 }}>−</button>
              <span style={{ fontSize: 18, fontWeight: 900, color: rs.color, minWidth: 24, textAlign: "center" }}>{count || 0}</span>
              <button onClick={() => onCountChange(card.id, (count || 0) + 1)} style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${rs.border}`, background: "#0d1a2a", color: rs.color, fontSize: 16, cursor: "pointer", fontWeight: 700 }}>+</button>
            </div>
          )}
          {card.custom && !confirmDelete && (
            <button onClick={() => setConfirmDelete(true)} style={{ padding: "7px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #4a1010", background: "#1a0808", color: "#cc4444" }}>
              🗑 Remove Custom Card
            </button>
          )}
          {card.custom && confirmDelete && (
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { onDelete(card.id); onClose(); }} style={{ flex: 1, padding: "7px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #cc4444", background: "#2e0a0a", color: "#ff6666" }}>Confirm Delete</button>
              <button onClick={() => setConfirmDelete(false)} style={{ flex: 1, padding: "7px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #1a3050", background: "#0d1a2a", color: "#4a7090" }}>Cancel</button>
            </div>
          )}
        </div>
        <button onClick={onClose} style={{ display: "block", width: "100%", padding: "10px", background: "#12192b", border: "none", borderTop: `1px solid ${rs.border}`, color: "#6a8cb0", fontSize: 12, cursor: "pointer" }}>✕ Close</button>
      </div>
    </div>
  );
}

// ─── Add card modal ───────────────────────────────────────────────────────────
const BLANK = { id: "", name: "", set: "", rarity: "C", type: "Character", img: "" };

function AddCardModal({ onClose, onAdd, existingIds }) {
  const [form, setForm] = useState(BLANK);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAdd = () => {
    if (!form.id.trim())   return setError("Card ID is required.");
    if (!form.name.trim()) return setError("Name is required.");
    if (!form.set.trim())  return setError("Set name is required.");
    if (existingIds.has(form.id.trim())) return setError(`ID "${form.id.trim()}" already exists.`);
    onAdd({ ...form, id: form.id.trim(), name: form.name.trim(), set: form.set.trim(), img: form.img.trim(), custom: true });
    onClose();
  };

  const fieldStyle = { width: "100%", boxSizing: "border-box", padding: "7px 10px", borderRadius: 7, border: "1px solid #1a3050", background: "#0d1a2a", color: "#c0d4e8", fontSize: 12, fontFamily: "system-ui, sans-serif", outline: "none" };
  const labelStyle = { fontSize: 11, color: "#4a6080", marginBottom: 4, display: "block" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0d1120", border: "1px solid #1a3050", borderRadius: 14, overflow: "hidden", maxWidth: 320, width: "100%", boxShadow: "0 0 50px #00000088" }}>
        {/* Header */}
        <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #141e30", background: "linear-gradient(180deg,#101828,#0d1120)" }}>
          <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.08em", background: "linear-gradient(120deg,#f5c842,#e06010)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>+ ADD CUSTOM CARD</div>
          <div style={{ fontSize: 11, color: "#3a5070", marginTop: 2 }}>Card will be saved to your browser</div>
        </div>

        {/* Form fields */}
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={labelStyle}>Card ID <span style={{ color: "#cc4444" }}>*</span></label>
            <input style={fieldStyle} placeholder="e.g. OP16-055" value={form.id} onChange={e => set("id", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Name <span style={{ color: "#cc4444" }}>*</span></label>
            <input style={fieldStyle} placeholder="e.g. Nami" value={form.name} onChange={e => set("name", e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Set <span style={{ color: "#cc4444" }}>*</span></label>
            <input style={fieldStyle} placeholder="e.g. Cross Epoch" value={form.set} onChange={e => set("set", e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={labelStyle}>Rarity</label>
              <select style={{ ...fieldStyle }} value={form.rarity} onChange={e => set("rarity", e.target.value)}>
                {RARITIES.map(r => <option key={r} value={r}>{RARITY[r]?.label || r}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Type</label>
              <select style={{ ...fieldStyle }} value={form.type} onChange={e => set("type", e.target.value)}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Image URL <span style={{ color: "#3a5070" }}>(optional)</span></label>
            <input style={fieldStyle} placeholder="https://..." value={form.img} onChange={e => set("img", e.target.value)} />
          </div>

          {/* Preview */}
          {form.img.trim() && (
            <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #1a3050", maxHeight: 120 }}>
              <img src={form.img.trim()} alt="preview" style={{ width: "100%", objectFit: "cover", display: "block", maxHeight: 120 }} />
            </div>
          )}

          {error && <div style={{ fontSize: 11, color: "#ff6666", background: "#1a0808", border: "1px solid #4a1010", borderRadius: 6, padding: "6px 10px" }}>{error}</div>}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, padding: "0 16px 14px" }}>
          <button onClick={handleAdd} style={{ flex: 1, padding: "9px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #f5c842", background: "#1a3060", color: "#f5c842" }}>Add Card</button>
          <button onClick={onClose} style={{ flex: 1, padding: "9px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #1a3050", background: "#0d1a2a", color: "#4a7090" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [filter, setFilter]           = useState("All");
  const [search, setSearch]           = useState("");
  const [selected, setSelected]       = useState(null);
  const [collection, setCollection]   = useState(() => loadCollection());
  const [customCards, setCustomCards] = useState(() => loadCustomCards());
  const [showAdd, setShowAdd]         = useState(false);

  // All cards = base + custom
  const allCards = [...BASE_CARDS, ...customCards];

  const updateCollection = (next) => { setCollection(next); saveCollection(next); };
  const toggleOwned = (id) => {
    const next = { ...collection };
    if (next[id] !== undefined) { delete next[id]; } else { next[id] = { owned: true, count: 1 }; }
    updateCollection(next);
  };
  const setCount = (id, count) => {
    const next = { ...collection };
    if (count <= 0) { delete next[id]; } else { next[id] = { owned: true, count }; }
    updateCollection(next);
  };

  const addCustomCard = (card) => {
    const next = [...customCards, card];
    setCustomCards(next);
    saveCustomCards(next);
  };

  const deleteCustomCard = (id) => {
    const next = customCards.filter(c => c.id !== id);
    setCustomCards(next);
    saveCustomCards(next);
    // also remove from collection if owned
    const col = { ...collection };
    delete col[id];
    updateCollection(col);
  };

  const existingIds = new Set(allCards.map(c => c.id));
  const ownedIds    = new Set(Object.keys(collection));
  const ownedCount  = ownedIds.size;
  const totalCopies = Object.values(collection).reduce((sum, v) => sum + (v.count || 0), 0);

  const q = search.trim().toLowerCase();

  const visible = allCards.filter(c => {
    const matchesFilter =
      filter === "Owned"   ? ownedIds.has(c.id) :
      filter === "Missing" ? !ownedIds.has(c.id) :
      filter === "All"     ? true :
      c.type === filter;
    if (!matchesFilter) return false;
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.set.toLowerCase().includes(q) ||
      (RARITY[c.rarity]?.label || "").toLowerCase().includes(q) ||
      c.rarity.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  });

  const selectedCard = selected ? allCards.find(c => c.id === selected) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c14", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "20px 16px 12px", background: "linear-gradient(180deg,#101828,#0a0c14)", borderBottom: "1px solid #1e2d4a" }}>
        <div style={{ fontSize: "clamp(1.1rem,4vw,1.7rem)", fontWeight: 900, letterSpacing: "0.1em", background: "linear-gradient(120deg,#f5c842 0%,#e06010 50%,#f5c842 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          NAMI · ONE PIECE TCG
        </div>
        <div style={{ marginTop: 10, maxWidth: 300, margin: "10px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4a6080", marginBottom: 4 }}>
            <span>Collection Progress</span>
            <span style={{ color: "#f5c842", fontWeight: 700 }}>{ownedCount} / {allCards.length}</span>
          </div>
          <div style={{ height: 6, background: "#0f1a2a", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 6, width: `${(ownedCount / allCards.length) * 100}%`, background: "linear-gradient(90deg,#f5c842,#e06010)", transition: "width 0.4s ease" }} />
          </div>
          <div style={{ fontSize: 10, color: "#3a5070", marginTop: 4 }}>{totalCopies} total copies · {customCards.length} custom card{customCards.length !== 1 ? "s" : ""}</div>
        </div>
      </div>

      {/* Sticky search + filters */}
      <div style={{ background: "#0a0e1a", borderBottom: "1px solid #141e30", position: "sticky", top: 0, zIndex: 10, padding: "8px 12px" }}>
        {/* Search bar + Add button */}
        <div style={{ maxWidth: 540, margin: "0 auto 8px", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#3a5070", pointerEvents: "none" }}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, set, card ID, rarity..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", padding: "7px 32px 7px 32px", borderRadius: 8, border: "1px solid #1a3050", background: "#0d1a2a", color: "#c0d4e8", fontSize: 12, outline: "none", fontFamily: "system-ui, sans-serif" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#4a6080", cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1 }}>✕</button>
            )}
          </div>
          <button
            onClick={() => setShowAdd(true)}
            title="Add a custom card"
            style={{ flexShrink: 0, padding: "7px 13px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "1px solid #f5c842", background: "#1a3060", color: "#f5c842", whiteSpace: "nowrap" }}
          >+ Add Card</button>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
          {FILTERS.map(f => {
            let n;
            if (f === "All") n = allCards.length;
            else if (f === "Owned") n = ownedCount;
            else if (f === "Missing") n = allCards.length - ownedCount;
            else n = allCards.filter(c => c.type === f).length;
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "3px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 600, background: active ? (f === "Owned" ? "#0f2e0f" : f === "Missing" ? "#2e0a0a" : "#1a3060") : "#0f1828", border: `1px solid ${active ? (f === "Owned" ? "#4de04d" : f === "Missing" ? "#cc4444" : "#f5c842") : "#1a2a40"}`, color: active ? (f === "Owned" ? "#4de04d" : f === "Missing" ? "#ff6666" : "#f5c842") : "#4a6888", transition: "all 0.15s" }}>
                {f === "Owned" ? "✓ " : f === "Missing" ? "○ " : ""}{f} ({n})
              </button>
            );
          })}
        </div>

        {q && (
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 11, color: visible.length === 0 ? "#cc4444" : "#f5c842" }}>
            {visible.length === 0 ? `No cards match "${search}"` : `${visible.length} card${visible.length !== 1 ? "s" : ""} found`}
          </div>
        )}
      </div>

      {/* Card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, padding: 14, maxWidth: 1100, margin: "0 auto" }}>
        {visible.map(card => (
          <CardTile
            key={card.id} card={card}
            owned={ownedIds.has(card.id)}
            count={collection[card.id]?.count || 0}
            onToggle={toggleOwned}
            onCountChange={setCount}
            onClick={(c) => setSelected(c.id)}
          />
        ))}
      </div>

      {visible.length === 0 && !q && (
        <div style={{ textAlign: "center", color: "#2a4060", padding: 60, fontSize: 14 }}>
          {filter === "Owned" ? "No cards owned yet — mark some below!" : "No cards found."}
        </div>
      )}

      {/* Card detail modal */}
      <Modal
        card={selectedCard}
        owned={selectedCard ? ownedIds.has(selectedCard.id) : false}
        count={selectedCard ? (collection[selectedCard.id]?.count || 0) : 0}
        onToggle={toggleOwned}
        onCountChange={setCount}
        onClose={() => setSelected(null)}
        onDelete={deleteCustomCard}
      />

      {/* Add card modal */}
      {showAdd && (
        <AddCardModal
          onClose={() => setShowAdd(false)}
          onAdd={addCustomCard}
          existingIds={existingIds}
        />
      )}
    </div>
  );
}