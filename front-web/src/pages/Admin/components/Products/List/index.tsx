import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Card from '../Card';
import './styles.scss';

const List = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
  
  console.log(productsResponse);

  useEffect(() => {
    const params = {
      page: activePage,
      linesPerPage: 12
    }

    setIsLoading(true);
    makeRequest({ url: '/products', params })
      .then(response => setProductsResponse(response.data))
      .finally(() => setIsLoading(false));
  }, [activePage]);

  const handleCreate = () => {
    history.push('/admin/products/create')
  }

  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        <Card />
        <Card />
        <Card />
        {/* <Card /> */}
        {/* <Card /> */}
      </div>
    </div>
  );
}

export default List;
