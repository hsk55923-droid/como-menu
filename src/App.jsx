import { useMemo, useState } from "react";
import "./App.css";
import { categoryOrder, menuData } from "./menuData";

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

function App() {
  const [activeCategory, setActiveCategory] = useState(categoryOrder[0]);

  const filteredMenus = useMemo(() => {
    return menuData
      .filter((item) => item.category === activeCategory)
      .sort((a, b) => a.order - b.order);
  }, [activeCategory]);

  const formatPrice = (price) => `₩ ${price.toLocaleString()}`;

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

  const renderDefaultCard = (item) => {
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
  };

  const renderDrinkListItem = (item) => {
    return (
      <div key={item.id} className="drink-list-item">
        <div className="drink-list-head">
          <div className="drink-list-text">
            <p className="drink-list-title">{item.name}</p>
            <p className="drink-list-sub">{item.description}</p>
          </div>
          <strong className="drink-list-price">{formatPrice(item.price)}</strong>
        </div>
        {item.tag ? <p className="drink-list-tag">{item.tag}</p> : null}
      </div>
    );
  };

  const renderWineRow = (item) => {
    return (
      <div key={item.id} className="wine-row">
        <div className="wine-row-left">
          <p className="wine-row-ko">{item.name}</p>
          {item.englishName ? (
            <p className="wine-row-en">{item.englishName}</p>
          ) : null}
        </div>
        <strong className="wine-row-price">{formatPrice(item.price)}</strong>
      </div>
    );
  };

  const renderDrinkCategory = (menus) => {
    const adeItem = menus.find((item) => item.section === "ade");
    const nonAlcoholItems = menus.filter((item) => item.section === "basic");
    const teaItems = menus.filter((item) => item.section === "tea");
    const kidsItems = menus.filter((item) => item.section === "kids");

    const beerFeatured = menus.find((item) => item.section === "beerFeatured");
    const beerItems = menus.filter((item) => item.section === "beer");

    const sparklingWineItems = menus.filter(
      (item) => item.section === "sparklingWine"
    );
    const whiteWineItems = menus.filter((item) => item.section === "whiteWine");
    const redWineItems = menus.filter((item) => item.section === "redWine");
    const houseWineItem = menus.find((item) => item.section === "houseWine");

    return (
      <div className="drink-page-layout">
   

        <div className="drink-two-column">
          {/* 왼쪽: 와인 + 맥주 */}
          <div className="drink-left-column">
            <section className="wine-block">
              {sparklingWineItems.length > 0 && (
                <div className="wine-group">
                  <div className="wine-group-head sparkling">
                    <span>SPARKLING WINE</span>
                  </div>
                  <div className="wine-list">
                    {sparklingWineItems.map((item) => renderWineRow(item))}
                  </div>
                </div>
              )}

              {whiteWineItems.length > 0 && (
                <div className="wine-group">
                  <div className="wine-group-head white">
                    <span>WHITE WINE</span>
                  </div>
                  <div className="wine-list">
                    {whiteWineItems.map((item) => renderWineRow(item))}
                  </div>
                </div>
              )}

              {redWineItems.length > 0 && (
                <div className="wine-group">
                  <div className="wine-group-head red">
                    <span>RED WINE</span>
                  </div>
                  <div className="wine-list">
                    {redWineItems.map((item) => renderWineRow(item))}
                  </div>
                </div>
              )}

              {houseWineItem && (
                <div className="house-wine-box">
                  <div className="house-wine-left">
                    <p className="house-wine-title">HOUSE WINE</p>
                    <p>레드</p>
                    <p>화이트</p>
                    <p>스윗(모스카토)</p>
                  </div>
                  <div className="house-wine-right">
                    <p>한 병 {formatPrice(houseWineItem.bottlePrice)}</p>
                    <p>한 잔 {formatPrice(houseWineItem.glassPrice)}</p>
                  </div>
                </div>
              )}
            </section>

            <section className="drink-block">
              <div className="drink-block-head">
                <div>
                  <p className="drink-block-label">Beer</p>
                  <h3 className="drink-block-title">맥주</h3>
                </div>
              </div>

              {beerFeatured && (
                <div className="beer-feature-card">
                  <div className="beer-feature-content">
                    {beerFeatured.image ? (
                      <img
                        src={beerFeatured.image}
                        alt={beerFeatured.name}
                        className="beer-feature-image"
                      />
                    ) : (
                      <div className="beer-feature-placeholder">BEER IMAGE</div>
                    )}

                    <div className="beer-feature-text">
                      <h4>{beerFeatured.name}</h4>
                      <p>{beerFeatured.description}</p>
                      <strong>{formatPrice(beerFeatured.price)}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="drink-list">
                {beerItems.map((item) => renderDrinkListItem(item))}
              </div>
            </section>
          </div>

          {/* 오른쪽: 논알콜 */}
          <div className="drink-right-column">
            <section className="drink-block">
              <div className="drink-block-head">
                <div>
                  <p className="drink-block-label">Non-Alcoholic</p>
                  <h3 className="drink-block-title">논알콜</h3>
                </div>
              </div>

              {adeItem && (
                <div className="ade-feature-card">
                  <div className="ade-feature-content">
                    {adeItem.image ? (
                      <img
                        src={adeItem.image}
                        alt={adeItem.name}
                        className="ade-feature-image"
                      />
                    ) : (
                      <div className="ade-feature-placeholder">ADE IMAGE</div>
                    )}

                    <div className="ade-feature-text">
                      <h4>{adeItem.name}</h4>
                      <p>{adeItem.description}</p>
                      <strong>{formatPrice(adeItem.price)}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div className="drink-list">
                {nonAlcoholItems.map((item) => renderDrinkListItem(item))}
                {kidsItems.map((item) => renderDrinkListItem(item))}
              </div>
            </section>

            <section className="drink-block">
              <div className="drink-block-head">
                <div>
                  <p className="drink-block-label">Tea</p>
                  <h3 className="drink-block-title">차</h3>
                </div>
              </div>

              <div className="drink-list tea-list">
                {teaItems.map((item) => renderDrinkListItem(item))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
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
        ) : activeCategory === "음료" ? (
          renderDrinkCategory(filteredMenus)
        ) : (
          <div className="menu-grid">
            {filteredMenus.map((item) => renderDefaultCard(item))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;