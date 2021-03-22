import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Category, CategoryResponse } from 'core/types/Category';
import { Product } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
  name: string;
  price: string;
  description: string;
  imgUrl: string;
  categories: Category[];
}

type ParamsType = {
  productId: string;
}

const Form = () => {
  const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
  const history = useHistory();
  const { productId } = useParams<ParamsType>();
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const isEditing = productId !== 'create';
  const formTitle = isEditing ? 'Editar produto' : 'cadastrar um produto';

  useEffect(() => {
    if (isEditing) {
      makeRequest<Product>({ url: `/products/${productId}` })
        .then(({ data }) => {
          setValue('name', data.name);
          setValue('price', data.price);
          setValue('description', data.description);
          setValue('imgUrl', data.imgUrl);
          setValue('categories', data.categories);
        });
    }
  }, [productId, isEditing, setValue]);

  useEffect(() => {
    setIsLoadingCategories(true);
    makeRequest<CategoryResponse>({ url: '/categories' })
      .then(response => setCategories(response.data.content))
      .finally(() => setIsLoadingCategories(false));
  }, []);

  const onSubmit = (data: FormState) => {
    makePrivateRequest({
      url: isEditing ? `/products/${productId}` : '/products',
      method: isEditing ? 'PUT' : 'POST',
      data
    })
      .then(() => {
        toast.info('Produto salvo com sucesso!');
        history.push('/admin/products');
      })
      .catch(() => {
        toast.error('Erro ao salvar produto!');
      });
  }

  const isNotEmpty = (array: any[]) => array && array.length > 0

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseForm
        title={formTitle}
      >
        <div className="row">
          <div className="col-6">
            <div className="margin-bottom-30">
              <input
                ref={register({
                  required: "Campo obrigatório",
                  minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres' },
                  maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres' }
                })}
                name="name"
                type="text"
                className="form-control input-base"
                placeholder="Nome do produto"
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>
            <div className="margin-bottom-30">
              <Controller
                as={Select}
                name="categories"
                options={categories}
                control={control}
                isLoading={isLoadingCategories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                classNamePrefix="categories-select"
                placeholder="Categorias"
                register={register}
                isMulti
                defaultValue={[]}
                rules={{ 
                  required: true,
                  validate: isNotEmpty
                }}
              />
              {errors.categories && (
                <div className="invalid-feedback d-block">
                  Campo obrigatório
                </div>
              )}
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="price"
                type="number"
                className="form-control input-base"
                placeholder="Preço"
              />
              <div className="invalid-feedback d-block">
                {errors.price?.message}
              </div>
            </div>
            <div className="margin-bottom-30">
              <input
                ref={register({ required: "Campo obrigatório" })}
                name="imgUrl"
                type="text"
                className="form-control input-base"
                placeholder="Imagem do produto"
              />
              <div className="invalid-feedback d-block">
                {errors.imgUrl?.message}
              </div>
            </div>
          </div>
          <div className="col-6">
            <textarea
              ref={register({ required: "Campo obrigatório" })}
              name="description"
              className="form-control input-base"
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
