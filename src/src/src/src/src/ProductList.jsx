import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night and improves air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and purifies indoor air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity and purifies air indoor spaces.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and cleans indoor air pollutants.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies air and yields soothing gel for burns.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80", description: "Calming scent, helps relieve stress.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729845772-2a54b38d3885?auto=format&fit=crop&w=800&q=80", description: "Sweet fragrance that promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating aroma used in cooking and therapy.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/27/18/30/mint-1165036_1280.jpg", description: "Refreshing scent and versatile culinary herb.", cost: "$10" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80", description: "Fresh camphoraceous scent, opens airways.", cost: "$25" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2016/07/28/19/22/lemon-balm-1548882_1280.jpg", description: "Citrusy aroma that boosts mood and calm.", cost: "$14" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Tulsi (Holy Basil)", image: "https://cdn.pixabay.com/photo/2021/01/13/08/23/tulsi-5913554_1280.jpg", description: "Revered herb known for immunity-boosting qualities.", cost: "$12" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496781_1280.jpg", description: "Soothes digestion and provides refreshing aroma.", cost: "$11" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/15/16/48/chrysanthemum-1595856_1280.jpg", description: "Soothes anxiety and promotes restful sleep.", cost: "$15" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/12/08/42/calendula-4332296_1280.jpg", description: "Heals skin irritations and reduces inflammation.", cost: "$13" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/05/28/12/23/thyme-2350847_1280.jpg", description: "Antimicrobial properties, aids respiratory health.", cost: "$12" },
        { name: "Gotu Kola", image: "https://cdn.pixabay.com/photo/2020/05/04/17/25/gotu-kola-5129994_1280.jpg", description: "Enhances memory and improves circulation.", cost: "$16" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      {/* Navbar Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2e7d32', padding: '15px 30px', color: 'white' }}>
        <h2 style={{ cursor: 'pointer', margin: 0 }} onClick={onHomeClick}>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => setShowCart(false)}>Plants</span>
          <div style={{ cursor: 'pointer', position: 'relative', fontSize: '22px' }} onClick={() => setShowCart(true)}>
            🛒
            <span style={{ backgroundColor: '#ff5722', borderRadius: '50%', padding: '2px 8px', fontSize: '14px', position: 'absolute', top: '-8px', right: '-12px' }}>
              {totalCartCount}
            </span>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', color: '#2e7d32', borderBottom: '2px solid #2e7d32', paddingBottom: '10px' }}>
                {categoryObj.category}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                {categoryObj.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '250px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }} />
                    <h3 style={{ margin: '10px 0 5px' }}>{plant.name}</h3>
                    <p style={{ fontSize: '14px', color: '#555' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                      style={{
                        backgroundColor: (addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        cursor: (addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {(addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
