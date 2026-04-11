import { useMemo, useState } from "react";
import "./App.css";
import { categoryOrder, menuData } from "./menuData";

function App() {
  const [activeCategory, setActiveCategory] = useState(categoryOrder[0]);

  const filteredMenus = useMemo(() => {
    return menuData
      .filter((item) => item.category === activeCategory)
      .sort((a, b) => a.order - b.order);
  }, [activeCategory]);

  const formatPrice = (price) => `₩ ${price.toLocaleString()}`;

  const getHighlightLabel = (badges = []) => {
    if (badges.includes("대표메뉴")) return "BEST";
    if (badges.includes("인기")) return "인기";
    if (badges.includes("추천")) return "추천";
    return null;
  };

  return (
    <div className="menu-page">
      <section className="hero-card">
        <div className="hero-top-row">
  <p className="eyebrow">OSTERIA COMO</p>
</div>

<h1>MENU</h1>
<p className="hero-description">
  Signature fresh pasta, pizza, risotto and mains.
</p>
      </section>

      <section className="section-card">
        <div className="section-head">
          <div>
            <p className="eyebrow">MENU</p>
            <h2>{activeCategory}</h2>
          </div>
          <p className="section-note">실제 판매 메뉴와 가격이 반영되는 영역</p>
        </div>

        <nav className="category-tabs">
          {categoryOrder.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "tab active" : "tab"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        {filteredMenus.length === 0 ? (
          <div className="empty-state">
            <p>현재 등록된 메뉴가 없습니다.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filteredMenus.map((item) => {
              const highlightLabel = getHighlightLabel(item.badges);

              return (
                <article key={item.id} className="menu-card">
                  <div className="image-wrap">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="image-placeholder">메뉴 사진</div>
                    )}

                    {highlightLabel && (
                      <span className="highlight-badge">{highlightLabel}</span>
                    )}
                  </div>

                  <div className="card-content">
                    <p className="mini-category">{item.category}</p>

                    <div className="menu-title-price">
                      <h3>{item.name}</h3>
                      <strong>{formatPrice(item.price)}</strong>
                    </div>

                    <p className="menu-description">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;