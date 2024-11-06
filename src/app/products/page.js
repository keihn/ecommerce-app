"use client"
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService"; // Updated path
import Link from "next/link";
import styles from "../styles/Products.module.css"; // Create this CSS module for styling

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await ProductService.fetchProducts();
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Product Archive</h1>
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Link href={`/products/${product.id}`}>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
          </Link>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ProductsPage;
