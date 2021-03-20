import Pagination from 'core/components/Pagination';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import './styles.scss';

const List = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();

  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 4,
      direction: 'DESC',
      orderBy: 'id'
    }

    setIsLoading(true);
    makeRequest<ProductsResponse>({ url: '/products', params })
      .then(response => setProductsResponse(response.data))
      .finally(() => setIsLoading(false));
  }, [activePage]);

  useEffect(() => {
    getProducts()
  }, [getProducts]);

  const handleCreate = () => {
    history.push('/admin/products/create')
  }

  const onRemove = (productId: number) => {
    const confirm = window.confirm('Deseja realmente excluir este produto?');

    if (confirm) {
      makePrivateRequest<void>({ url: `/products/${productId}`, method: 'DELETE' })
        .then(() => {
          toast.info('Produto removido com sucesso!');
          getProducts();
        })
        .catch(() => {
          toast.error('Erro ao remover produto!');
        });
    }
  }

  return (
    <div className="admin-products-list">
      <button className="btn btn-primary btn-lg" onClick={handleCreate}>
        ADICIONAR
      </button>
      <div className="admin-list-container">
        {productsResponse?.content.map(product => (
          <Card key={product.id} product={product} onRemove={onRemove} />
        ))}
        {productsResponse && (
          <Pagination
            activePage={activePage}
            totalPages={productsResponse.totalPages}
            onChange={page => setActivePage(page)}
          />
        )}
      </div>
    </div>
  );
}

export default List;
