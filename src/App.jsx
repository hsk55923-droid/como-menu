import { useMemo, useState } from "react";
import "./App.css";
import { menuItems, categories } from "./menuData";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const featuredItems = useMemo(
    () => menuItems.filter((item) => item.featured).slice(0, 3),
    []
  );

  const filteredItems = useMemo(() => {
    if (selectedCategory === "전체") return menuItems;
    return menuItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="app">
      <header className="hero">
        <div className="heroTop">
          <p className="brand">OSTERIA COMO</p>
          <div className="statusBadge">태블릿 메뉴판 초안</div>
        </div>

        <h1>꼬모 메뉴 바로보기</h1>
        <p className="heroText">
          시그니처 메뉴는 먼저 보이고, 시즌 메뉴와 프로모션은 유동적으로 바꿀 수 있는 구조
        </p>
      </header>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <p className="sectionLabel">STANDARD</p>
            <h2>스탠다드 메뉴</h2>
          </div>
          <p className="sectionSub">꼬모의 얼굴이 되는 고정 메뉴</p>
        </div>

        <div className="featuredGrid">
          {featuredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <p className="sectionLabel">CHANGEABLE SLOT</p>
            <h2>변동 메뉴 / 프로모션</h2>
          </div>
          <p className="sectionSub">제철 메뉴, 쉐어 코스, 와인 세트 등을 바꾸는 영역</p>
        </div>

        <div className="categoryBar">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menuGrid">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MenuCard({ item }) {
  return (
    <div className="menuCard">
      <div className="imageWrap">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="placeholder">메뉴 사진</div>
        )}
      </div>

      <div className="cardBody">
        <p className="category">{item.category}</p>

        <div className="titleRow">
          <h3>{item.name}</h3>
          <span className="price">₩ {item.price}</span>
        </div>

        <p className="description">{item.description}</p>

        <div className="tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;