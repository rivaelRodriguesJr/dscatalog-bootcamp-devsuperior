import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
};

const Form = () => {
  const { register, handleSubmit, errors } = useForm<FormState>();
  const history = useHistory();

  const onSubmit = (data: FormState) => {
    makePrivateRequest({ url: '/products', method: 'POST', data })
      .then(() => {
        toast.info('Produto salvo com sucesso!');
        history.push('/admin/products');
      })
      .catch(() => {
        toast.error('Erro ao salvar produto!');
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm title="cadastrar um produto">
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input
                ref={register({
                  required: "Campo obrigatório",
                  minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres'},
                  maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres'}
                })}
                name="name"
                type="text"
                className={`form-control input-base ${errors.name && 'is-invalid'}`}
                placeholder="Nome do produto"
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="price"
                type="number"
                className={`form-control input-base ${errors.price && 'is-invalid'}`}
                placeholder="Preço"
              />
              <div className="invalid-feedback d-block">
                {errors.price?.message}
              </div>
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="imageUrl"
                type="text"
                className={`form-control input-base ${errors.imageUrl && 'is-invalid'}`}
                placeholder="Imagem do produto"
              />
              <div className="invalid-feedback d-block">
                {errors.imageUrl?.message}
              </div>
            </div>
          </div>
          <div className="col-6">
            <textarea
              ref={register({ required: "Campo obrigatório" })}
              name="description"
              className={`form-control input-base ${errors.description && 'is-invalid'}`}
              placeholder="Descrição"
              cols={30}
              rows={10}
            />
            <div className="invalid-feedback d-block">
              {errors.description?.message}
            </div>
          </div>
        </div>
      </BaseForm>
    </form>
  );
}

export default Form;
