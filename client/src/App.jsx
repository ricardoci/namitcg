import { useState, useEffect } from "react";

const CARDS = [
  { id: "OP03-040",    name: "Nami",                    set: "Pillars of Strength",          rarity: "L",   type: "Leader"    },
  { id: "OP11-041",    name: "Nami",                    set: "Egghead Island",               rarity: "L",   type: "Leader"    },
  { id: "ST01-007",    name: "Nami",                    set: "ST-01 Starter Deck",           rarity: "C",   type: "Character" },
  { id: "OP01-016",    name: "Nami",                    set: "Romance Dawn",                 rarity: "R",   type: "Character" },
  { id: "OP02-036",    name: "Nami",                    set: "Paramount War",                rarity: "SR",  type: "Character" },
  { id: "OP03-030",    name: "Nami",                    set: "Pillars of Strength",          rarity: "UC",  type: "Character" },
  { id: "OP04-011",    name: "Nami",                    set: "Kingdoms of Intrigue",         rarity: "UC",  type: "Character" },
  { id: "OP05-062",    name: "O-Nami",                  set: "Awakening of the New Era",     rarity: "UC",  type: "Character" },
  { id: "OP06-101",    name: "O-Nami",                  set: "Wings of the Captain",         rarity: "SR",  type: "Character" },
  { id: "OP08-013",    name: "Nami",                    set: "Two Legends",                  rarity: "C",   type: "Character" },
  { id: "OP09-050",    name: "Nami",                    set: "Emperors in the New World",    rarity: "R",   type: "Character" },
  { id: "OP10-013",    name: "Nami",                    set: "Royal Blood",                  rarity: "UC",  type: "Character" },
  { id: "OP10-033",    name: "Nami",                    set: "Royal Blood",                  rarity: "C",   type: "Character" },
  { id: "OP10-088",    name: "Nami",                    set: "Royal Blood",                  rarity: "C",   type: "Character" },
  { id: "OP11-054",    name: "Nami",                    set: "Egghead Island",               rarity: "UC",  type: "Character" },
  { id: "OP14-031",    name: "Nami",                    set: "Side: Straw Hat Crew",         rarity: "SR",  type: "Character" },
  { id: "OP15-086",    name: "Nami",                    set: "Adventure on Kami's Island",   rarity: "SR",  type: "Character" },
  { id: "EB02-017",    name: "Nami",                    set: "Memorial Collection",          rarity: "SR",  type: "Character" },
  { id: "EB03-006",    name: "Nami",                    set: "Extra Booster 3",              rarity: "R",   type: "Character" },
  { id: "ST14-006",    name: "Nami",                    set: "ST-14 Starter Deck",           rarity: "C",   type: "Character" },
  { id: "ST21-009",    name: "Nami",                    set: "ST-21 Starter Deck",           rarity: "C",   type: "Character" },
  { id: "EB03-060",    name: "Will You Be My Servant?", set: "Extra Booster 3",              rarity: "UC",  type: "Event"     },
  { id: "OP02-036_p1", name: "Nami (Alt Art)",          set: "Paramount War",                rarity: "ALT", type: "Promo", imgId: "OP02-036_p1" },
  { id: "OP06-101_p1", name: "O-Nami (SP)",             set: "Wings of the Captain",         rarity: "SP",  type: "Promo", imgId: "OP06-101_p1" },
  { id: "OP14-031_p1", name: "Nami (Alt Art)",          set: "Side: Straw Hat Crew",         rarity: "ALT", type: "Promo", imgId: "OP14-031_p1" },
  { id: "OP15-086_p1", name: "Nami (Alt Art)",          set: "Adventure on Kami's Island",   rarity: "ALT", type: "Promo", imgId: "OP15-086_p1" },
  { id: "EB02-017_p1", name: "Nami (Alt Art)",          set: "Memorial Collection",          rarity: "ALT", type: "Promo", imgId: "EB02-017_p1" },
  { id: "EB03-053",    name: "Nami (SP)",               set: "Extra Booster 3",              rarity: "SP",  type: "Promo", imgId: "EB03-053" },
  { id: "PRB02-012",   name: "Nami",                    set: "ONE PIECE CARD THE BEST vol.2",rarity: "R",   type: "Promo"     },
  { id: "P-053",       name: "Nami (Promo)",            set: "Nami Starter Deck Event",      rarity: "P",   type: "Promo"     },
  { id: "P-096",       name: "Nami (Promo)",            set: "OP14 Release Event",           rarity: "P",   type: "Promo"     },
  { id: "P-102",       name: "Nami (Promo)",            set: "Tournament Pack 2026 Vol.2",   rarity: "P",   type: "Promo"     },
  { id: "P-112",       name: "Nami (Promo)",            set: "Heroines Battle Winner",       rarity: "P",   type: "Promo"     },
  { id: "P-139",       name: "Nami (Live Action)",      set: "Live Action Edition Vol.2",    rarity: "P",   type: "Promo"     },
  { id: "OP15-108",    name: "Nami (Dash Pack)",        set: "Adventure on Kami's Island",   rarity: "SP",  type: "Promo"     },
];

const FILTERS = ["All", "Leader", "Character", "Event", "Promo", "Owned", "Missing"];

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

function getImgSources(card) {
  const rawId = (card.imgId || card.id).replace("_p1", "");
  const isParallel = (card.imgId || card.id).endsWith("_p1");
  const suffix = isParallel ? "_p1" : "";

  return [
  `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/en/${rawId}${suffix}.webp`,
  `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/${rawId}${suffix}.webp`,
  `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/en/${rawId}.webp`,
  `/card-img/${rawId}${suffix}.webp`,
];
}

function loadCollection() {
  try {
    const raw = localStorage.getItem("nami_collection");
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveCollection(col) {
  try { localStorage.setItem("nami_collection", JSON.stringify(col)); } catch {}
}

function CardImg({ card }) {
  const [errCount, setErrCount] = useState(0);
  const sources = getImgSources(card);
  const failed = errCount >= sources.length;
  const rs = RARITY[card.rarity] || RARITY.C;

  return (
    <div style={{
      width: "100%", aspectRatio: "0.714",
      background: `linear-gradient(160deg, ${rs.bg}, #0a0c14)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", borderRadius: "6px 6px 0 0", position: "relative"
    }}>
      {!failed ? (
        <img
          src={sources[Math.min(errCount, sources.length - 1)]}
          alt={card.name}
          crossOrigin="anonymous"
          onError={() => setErrCount(n => n + 1)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{ textAlign: "center", color: rs.color, padding: 6, opacity: 0.4 }}>
          <div style={{ fontSize: 28 }}>🃏</div>
          <div style={{ fontSize: 9, marginTop: 4, color: rs.color }}>{card.id.replace("_p1","")}</div>
        </div>
      )}
    </div>
  );
}

function CardTile({ card, owned, count, onToggle, onCountChange, onClick }) {
  const rs = RARITY[card.rarity] || RARITY.C;
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", flexDirection: "column",
        borderRadius: 10, overflow: "hidden",
        border: `1px solid ${owned ? rs.color : hover ? rs.border : "#1a2540"}`,
        boxShadow: owned ? `0 0 14px ${rs.border}88` : hover ? `0 4px 12px #00000088` : "none",
        background: owned ? `${rs.bg}88` : "#0c1220",
        transition: "border-color 0.15s, box-shadow 0.15s",
        opacity: owned ? 1 : 0.75,
        cursor: "pointer",
        position: "relative"
      }}
    >
      {owned && (
        <div style={{
          position: "absolute", top: 6, right: 6, zIndex: 5,
          background: rs.color, borderRadius: "50%",
          width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 900, color: "#000", boxShadow: "0 2px 6px #00000088"
        }}>✓</div>
      )}

      <div onClick={() => onClick(card)} style={{ cursor: "pointer" }}>
        <CardImg card={card} />
      </div>

      <div style={{ padding: "8px 8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: owned ? rs.color : "#8aaac8", lineHeight: 1.3, textAlign: "center" }}>
          {card.name}
        </div>
        <div style={{ fontSize: 9, color: "#3a5070", textAlign: "center" }}>
          {card.id.replace("_p1", "")}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{
            fontSize: 8, padding: "2px 6px", borderRadius: 4, fontWeight: 700,
            background: rs.bg, color: rs.color, border: `1px solid ${rs.border}`,
            letterSpacing: "0.06em"
          }}>{rs.label}</span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggle(card.id); }}
          style={{
            marginTop: 2, padding: "4px 0", borderRadius: 6, fontSize: 10, fontWeight: 700,
            cursor: "pointer", border: `1px solid ${owned ? rs.color : "#1a3050"}`,
            background: owned ? rs.color : "#0d1a2a",
            color: owned ? "#000" : "#4a7090",
            transition: "all 0.15s"
          }}
        >
          {owned ? "✓ Owned" : "+ Mark Owned"}
        </button>

        {owned && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <button
              onClick={(e) => { e.stopPropagation(); onCountChange(card.id, Math.max(0, (count||0) - 1)); }}
              style={{ width: 22, height: 22, borderRadius: 5, border: `1px solid ${rs.border}`, background: "#0d1a2a", color: rs.color, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, lineHeight: 1 }}
            >−</button>
            <span style={{ fontSize: 13, fontWeight: 800, color: rs.color, minWidth: 18, textAlign: "center" }}>
              {count || 0}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onCountChange(card.id, (count||0) + 1); }}
              style={{ width: 22, height: 22, borderRadius: 5, border: `1px solid ${rs.border}`, background: "#0d1a2a", color: rs.color, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, lineHeight: 1 }}
            >+</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Modal({ card, owned, count, onToggle, onCountChange, onClose }) {
  if (!card) return null;
  const rs = RARITY[card.rarity] || RARITY.C;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 999, padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0d1120", border: `1px solid ${rs.border}`,
        borderRadius: 14, overflow: "hidden", maxWidth: 280, width: "100%",
        boxShadow: `0 0 50px ${rs.border}66`
      }}>
        <CardImg card={card} />
        <div style={{ padding: "12px 16px 8px" }}>
          <div style={{ color: rs.color, fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{card.name}</div>
          <div style={{ color: "#6a8cb0", fontSize: 12 }}>{card.set}</div>
          <div style={{ color: "#3a5070", fontSize: 11, marginTop: 3 }}>{card.id.replace("_p1","")} · {rs.label}</div>
        </div>
        <div style={{ padding: "0 16px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => onToggle(card.id)}
            style={{ padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1px solid ${owned ? rs.color : "#1a3050"}`, background: owned ? rs.color : "#0d1a2a", color: owned ? "#000" : "#4a7090" }}
          >
            {owned ? "✓ Owned — click to remove" : "+ Mark as Owned"}
          </button>
          {owned && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ color: "#4a6080", fontSize: 12 }}>Copies owned:</span>
              <button onClick={() => onCountChange(card.id, Math.max(0, (count||0)-1))}
                style={{ width:26, height:26, borderRadius:6, border:`1px solid ${rs.border}`, background:"#0d1a2a", color:rs.color, fontSize:16, cursor:"pointer", fontWeight:700 }}>−</button>
              <span style={{ fontSize:18, fontWeight:900, color:rs.color, minWidth:24, textAlign:"center" }}>{count||0}</span>
              <button onClick={() => onCountChange(card.id, (count||0)+1)}
                style={{ width:26, height:26, borderRadius:6, border:`1px solid ${rs.border}`, background:"#0d1a2a", color:rs.color, fontSize:16, cursor:"pointer", fontWeight:700 }}>+</button>
            </div>
          )}
        </div>
        <button onClick={onClose} style={{ display: "block", width: "100%", padding: "10px", background: "#12192b", border: "none", borderTop: `1px solid ${rs.border}`, color: "#6a8cb0", fontSize: 12, cursor: "pointer" }}>✕ Close</button>
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [collection, setCollection] = useState(() => loadCollection());

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

  const ownedIds = new Set(Object.keys(collection));
  const ownedCount = ownedIds.size;
  const totalCopies = Object.values(collection).reduce((sum, v) => sum + (v.count || 0), 0);

  const visible = CARDS.filter(c => {
    if (filter === "Owned") return ownedIds.has(c.id);
    if (filter === "Missing") return !ownedIds.has(c.id);
    if (filter === "All") return true;
    return c.type === filter;
  });

  const selectedCard = selected ? CARDS.find(c => c.id === selected) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c14", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ textAlign: "center", padding: "20px 16px 12px", background: "linear-gradient(180deg,#101828,#0a0c14)", borderBottom: "1px solid #1e2d4a" }}>
        <div style={{ fontSize: "clamp(1.1rem,4vw,1.7rem)", fontWeight: 900, letterSpacing: "0.1em", background: "linear-gradient(120deg,#f5c842 0%,#e06010 50%,#f5c842 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          NAMI · ONE PIECE TCG
        </div>
        <div style={{ marginTop: 10, maxWidth: 300, margin: "10px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#4a6080", marginBottom: 4 }}>
            <span>Collection Progress</span>
            <span style={{ color: "#f5c842", fontWeight: 700 }}>{ownedCount} / {CARDS.length}</span>
          </div>
          <div style={{ height: 6, background: "#0f1a2a", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 6, width: `${(ownedCount / CARDS.length) * 100}%`, background: "linear-gradient(90deg,#f5c842,#e06010)", transition: "width 0.4s ease" }} />
          </div>
          <div style={{ fontSize: 10, color: "#3a5070", marginTop: 4 }}>{totalCopies} total copies in collection</div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", padding: "8px 12px", background: "#0a0e1a", borderBottom: "1px solid #141e30", position: "sticky", top: 0, zIndex: 10 }}>
        {FILTERS.map(f => {
          let n;
          if (f === "All") n = CARDS.length;
          else if (f === "Owned") n = ownedCount;
          else if (f === "Missing") n = CARDS.length - ownedCount;
          else n = CARDS.filter(c => c.type === f).length;
          const active = filter === f;
          return (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "3px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontWeight: 600, background: active ? (f === "Owned" ? "#0f2e0f" : f === "Missing" ? "#2e0a0a" : "#1a3060") : "#0f1828", border: `1px solid ${active ? (f === "Owned" ? "#4de04d" : f === "Missing" ? "#cc4444" : "#f5c842") : "#1a2a40"}`, color: active ? (f === "Owned" ? "#4de04d" : f === "Missing" ? "#ff6666" : "#f5c842") : "#4a6888", transition: "all 0.15s" }}>
              {f === "Owned" ? "✓ " : f === "Missing" ? "○ " : ""}{f} ({n})
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, padding: 14, maxWidth: 1100, margin: "0 auto" }}>
        {visible.map(card => (
          <CardTile key={card.id} card={card} owned={ownedIds.has(card.id)} count={collection[card.id]?.count || 0} onToggle={toggleOwned} onCountChange={setCount} onClick={(c) => setSelected(c.id)} />
        ))}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: "center", color: "#2a4060", padding: 60, fontSize: 14 }}>
          {filter === "Owned" ? "No cards owned yet — mark some below!" : "No cards found."}
        </div>
      )}

      <Modal
        card={selectedCard}
        owned={selectedCard ? ownedIds.has(selectedCard.id) : false}
        count={selectedCard ? (collection[selectedCard.id]?.count || 0) : 0}
        onToggle={toggleOwned}
        onCountChange={setCount}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}