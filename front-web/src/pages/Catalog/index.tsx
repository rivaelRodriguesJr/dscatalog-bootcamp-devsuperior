import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/ProductCard';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss';

const Catalog = () => {
  // quando a lista de produtos estiver diponível,
  // popular um estado no componente, e listar os produtos dinâmicamente
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  
  // quando o componente inicial, buscar a lista de produtos
  useEffect(() => {
    const params = {
      page: 0,
      linesPerPage: 12
    }

    setIsLoading(true);
    makeRequest({ url: '/products', params })
      .then(response => setProductsResponse(response.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo de produtos</h1>
      <div className="catalog-products">
        {isLoading ? <ProductCardLoader /> : (
          productsResponse?.content.map(product => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Catalog;
