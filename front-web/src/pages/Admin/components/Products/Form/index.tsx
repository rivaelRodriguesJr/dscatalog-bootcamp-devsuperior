import { makePrivateRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
  name: string;
  price: string;
  category: string;
  description: string;
};

const initialState: FormState = {
  name: '',
  price: '',
  category: '',
  description: ''
};

type FormEvent =  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
  const [formData, setFormData] = useState<FormState>(initialState);

  const handleOnChange = (event: FormEvent) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...formData,
      imgUrl: 'https://cdn.leroymerlin.com.br/products/smart_speaker_echo_dot_3a_geracao_cinza_alexa_amazon_90623232_7f25_600x600.jpeg',
      categories: [{ id: formData.category}]
    }

    makePrivateRequest({ url: '/products', method: 'POST', data: payload })
      .then(() => {
        setFormData(initialState);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <BaseForm title="cadastrar um produto">
        <div className="row">
          <div className="col-6">
            <input
              value={formData.name}
              name="name"
              type="text"
              className="form-control mb-5"
              onChange={handleOnChange}
              placeholder="Nome do produto"
            />
            <select 
              value={formData.category}
              name="category"
              className="form-control mb-5" 
              onChange={handleOnChange}
            >
              <option value="1">Livros</option>
              <option value="2">Eletrônicos</option>
              <option value="3">Computadores</option>
            </select>
            <input
              value={formData.price}
              name="price"
              type="text"
              className="form-control"
              onChange={handleOnChange}
              placeholder="Preço"
            />
          </div>
          <div className="col-6">
            <textarea 
              value={formData.description} 
              name="description" 
              onChange={handleOnChange}
              className="form-control"
              cols={30} 
              rows={10} 
            />
          </div>
        </div>
      </BaseForm>
    </form>
  );
}

export default Form;
