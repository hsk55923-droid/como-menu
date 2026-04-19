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

  const badgeMap = {
    대표메뉴: "BEST",
    시그니처: "SIGNATURE",
    인기: "POPULAR",
    추천: "RECOMMENDED",
    BEST: "BEST",
    SIGNATURE: "SIGNATURE",
    POPULAR: "POPULAR",
    RECOMMENDED: "RECOMMENDED",
  };

  const getHighlightLabel = (badges = []) => {
    const matched = badges.find((badge) => badgeMap[badge]);
    return matched ? badgeMap[matched] : null;
  };

  const getBadgeClassName = (label) => {
    if (label === "BEST") return "highlight-badge best";
    if (label === "SIGNATURE") return "highlight-badge signature";
    if (label === "POPULAR") return "highlight-badge popular";
    if (label === "RECOMMENDED") return "highlight-badge recommended";
    return "highlight-badge";
  };

  return (
    <div className="menu-page">
      <section className="hero-card">
        <div className="brand-lockup">
          <p className="brand-top">Osteria</p>
          <h1>COMO</h1>
          <p className="brand-sub">MENU</p>
        </div>
      </section>

      <section className="section-card">
        <div className="section-head">
          <div>
            <p className="section-label">MENU</p>
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
                      <div className="image-placeholder">MENU IMAGE</div>
                    )}

                    {highlightLabel && (
                      <span className={getBadgeClassName(highlightLabel)}>
                        {highlightLabel}
                      </span>
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