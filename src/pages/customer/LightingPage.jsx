import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/CategoryPage.module.css";

const LightingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLightingProducts = async () => {
      try {
        const resCat = await fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Categories");
        const catRes = await resCat.json();
        const categories = catRes.items || catRes || [];

        const lightingCats = categories.filter((cat) => {
          const name = cat.name?.toLowerCase();
          return name?.includes("lamp") || name?.includes("lighting") || name?.includes("đèn");
        });

        const lightingCatIds = lightingCats.map((cat) => cat.id);

        const resProd = await fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Furniture");
        const prodRes = await resProd.json();
        const furniture = prodRes.items || prodRes || [];

        const filtered = furniture.filter((item) =>
          lightingCatIds.includes(item.categoryId)
        );

        setProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch lighting products:", err);
      }
    };

    fetchLightingProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Lighting & Lamps</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className={styles.card}>
            <img src={product.imageUrl || "/placeholder.png"} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.basePrice?.toLocaleString("vi-VN") || "N/A"} ₫</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LightingPage;
