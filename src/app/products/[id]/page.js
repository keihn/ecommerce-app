"use client"
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import CartService from "../../services/CartService";
import { usePathname } from "next/navigation";
import Image from 'next/image';


const ProductDetailPage = () => {
  const url = usePathname();
  const productId = url.split("/").pop();
  const id = productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const data = await ProductService.fetchProductById(id);
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      try {
        const result = await CartService.addItem("your-cart-id", product.id, 1); // Replace "your-cart-id" with actual cart ID logic
        if (result.error) {
          alert("Error adding to cart: " + result.error);
        } else {
          alert("Item added to cart!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error adding to cart");
      }
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product: {error}</p>;

  return (
    <div>
      <h3>{product.title}</h3>
      <img src={product.image} width="500" height="500" alt={product.title} />
      <span>Price: ${product.price}</span>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default ProductDetailPage;
