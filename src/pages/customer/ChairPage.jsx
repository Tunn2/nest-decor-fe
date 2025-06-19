import React, { useEffect, useState } from "react";
import styles from "../../styles/CategoryPage.module.css";
import { Link } from "react-router-dom";

const ChairPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchChairProducts = async () => {
            try {
                const resCat = await fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Categories");
                const catRes = await resCat.json();
                const categories = catRes.items || catRes || [];

                const chairCat = categories.find((cat) =>
                    cat.name?.toLowerCase().includes("chair")
                );
                if (!chairCat) return;

                const resProd = await fetch("https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Furniture");
                const prodRes = await resProd.json();
                const furniture = prodRes.items || prodRes || [];

                const filtered = furniture.filter(item => item.categoryId === chairCat.id);
                setProducts(filtered);
            } catch (err) {
                console.error("Failed to fetch chair products:", err);
            }
        };

        fetchChairProducts();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Chairs</h1>
            <div className={styles.grid}>
                {products.map(product => (
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

export default ChairPage;
