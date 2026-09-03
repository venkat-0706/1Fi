import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  // Calculate discount
  const getDiscount = (mrp, price) => {
    if (!mrp || !price) return 0;

    return Math.round(((mrp - price) / mrp) * 100);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading amazing deals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div
          className="logo"
          onClick={() => navigate("/")}
        >
          <span className="logo-icon">›</span>
          1Fi
        </div>

        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#benefits">Benefits</a>
          <a href="#how-it-works">How it works</a>
        </div>

        <button className="login-button">
          Login
        </button>

      </nav>


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ Smart shopping. Easy EMIs.
          </div>

          <h1>
            Own your dream device.
            <span> Pay in easy EMIs.</span>
          </h1>

          <p>
            Shop premium smartphones with flexible EMI plans,
            low interest rates and exciting cashback offers.
          </p>

          <button
            className="hero-button"
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Products
            <span>→</span>
          </button>

        </div>

        <div className="hero-visual">

          <div className="floating-card card-one">
            <span>💰</span>
            <div>
              <small>Starting EMI</small>
              <strong>₹4,999/mo</strong>
            </div>
          </div>

          <div className="phone-circle">
            📱
          </div>

          <div className="floating-card card-two">
            <span>🎁</span>
            <div>
              <small>Cashback</small>
              <strong>Up to ₹5,000</strong>
            </div>
          </div>

        </div>

      </section>


      {/* ================= BENEFITS ================= */}

      <section className="benefits" id="benefits">

        <div className="benefit">
          <div className="benefit-icon">💳</div>
          <div>
            <h3>Flexible EMIs</h3>
            <p>Choose a plan that fits your budget.</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">⚡</div>
          <div>
            <h3>Quick & Easy</h3>
            <p>Simple and transparent checkout.</p>
          </div>
        </div>

        <div className="benefit">
          <div className="benefit-icon">🎁</div>
          <div>
            <h3>Exciting Cashback</h3>
            <p>Get cashback on selected EMI plans.</p>
          </div>
        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section className="products-section" id="products">

        <div className="section-heading">

          <div>
            <span className="section-label">
              HANDPICKED FOR YOU
            </span>

            <h2>
              Choose your next device
            </h2>

            <p>
              Premium smartphones with flexible EMI options.
            </p>
          </div>

          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>


        {/* PRODUCT GRID */}

        {filteredProducts.length === 0 ? (

          <div className="no-products">
            <div>🔍</div>
            <h3>No products found</h3>
            <p>Try searching for another smartphone.</p>
          </div>

        ) : (

          <div className="product-grid">

            {filteredProducts.map((product) => {

              const firstVariant = product.variants?.[0];

              const discount = firstVariant
                ? getDiscount(
                    Number(firstVariant.mrp),
                    Number(firstVariant.price)
                  )
                : 0;

              const cheapestEMI =
                product.emi_plans?.length
                  ? Math.min(
                      ...product.emi_plans.map(
                        (plan) => Number(plan.monthly_payment)
                      )
                    )
                  : null;

              return (

                <div
                  className="product-card"
                  key={product.id}
                >

                  {/* Discount */}

                  {discount > 0 && (
                    <div className="discount-badge">
                      {discount}% OFF
                    </div>
                  )}


                  {/* Favorite */}

                  <button
                    className={`favorite-button ${
                      favorites.includes(product.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleFavorite(product.id)
                    }
                  >
                    {favorites.includes(product.id)
                      ? "♥"
                      : "♡"}
                  </button>


                  {/* Product Image */}

                  <div
                    className="product-image-container"
                    onClick={() =>
                      navigate(`/products/${product.slug}`)
                    }
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                  </div>


                  {/* Product Info */}

                  <div className="product-info">

                    <div className="product-category">
                      SMARTPHONE
                    </div>

                    <h3>{product.name}</h3>

                    <p className="product-description">
                      {product.description}
                    </p>


                    {/* Price */}

                    {firstVariant && (

                      <div className="price-row">

                        <div>

                          <span className="current-price">
                            ₹
                            {Number(
                              firstVariant.price
                            ).toLocaleString("en-IN")}
                          </span>

                          <span className="mrp">
                            ₹
                            {Number(
                              firstVariant.mrp
                            ).toLocaleString("en-IN")}
                          </span>

                        </div>

                        {discount > 0 && (
                          <span className="discount-text">
                            Save {discount}%
                          </span>
                        )}

                      </div>

                    )}


                    {/* EMI */}

                    {cheapestEMI && (

                      <div className="emi-box">

                        <div className="emi-icon">
                          💳
                        </div>

                        <div>

                          <span>
                            EMI starting from
                          </span>

                          <strong>
                            ₹
                            {cheapestEMI.toLocaleString(
                              "en-IN"
                            )}
                            /month
                          </strong>

                        </div>

                      </div>

                    )}


                    {/* Stats */}

                    <div className="product-stats">

                      <span>
                        📦 {product.variants?.length || 0} Variants
                      </span>

                      <span>
                        💳 {product.emi_plans?.length || 0} Plans
                      </span>

                    </div>


                    {/* Button */}

                    <button
                      className="view-button"
                      onClick={() =>
                        navigate(
                          `/products/${product.slug}`
                        )
                      }
                    >
                      View Details
                      <span>→</span>
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-label">
          SIMPLE & TRANSPARENT
        </div>

        <h2>
          How 1Fi works
        </h2>

        <div className="steps">

          <div className="step">

            <div className="step-number">
              01
            </div>

            <h3>
              Choose your device
            </h3>

            <p>
              Pick your favorite smartphone and
              select your preferred variant.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              02
            </div>

            <h3>
              Select an EMI plan
            </h3>

            <p>
              Compare different tenures,
              interest rates and cashback offers.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              03
            </div>

            <h3>
              Proceed
            </h3>

            <p>
              Select your plan and proceed with
              your purchase.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-logo">
          <span>›</span> 1Fi
        </div>

        <p>
          Smart shopping with flexible EMIs.
        </p>

        <span className="copyright">
          © 2026 1Fi Assignment
        </span>

      </footer>

    </div>
  );
}

export default Home;