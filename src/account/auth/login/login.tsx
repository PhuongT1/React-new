import { useLocation, useNavigate } from 'react-router-dom';
import styleLogin from './login.module.scss';
import Button from '@mui/material/Button';
import http from 'services/axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from 'elements/Input/index';
import Loading from 'elements/Loading';
import { connect } from 'react-redux';
import { ErrorRespond, User } from './login.type';
import { useMutation } from '@tanstack/react-query';
import { Token } from 'services/token.service';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const {
    state: { from }
  } = useLocation();
  console.log('state', from);
  // const test: ErrorRespondsss = {
  //   email: 'ghhjgj',
  //   password: '',
  //   passwordtest: 56756756
  // }
  // Validate with yup
  const schemaLogin = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email.')
      .email('Vui lòng nhập đúng định dạng email.'),
    password: yup
      .string()
      .required('Vui lòng nhập password.')
      .matches(
        /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,30}$/,
        'Vui lòng nhập đúng định dạng password.'
      )
  });

  const form = useForm<User>({
    defaultValues: { email: 'admin2@test.com', password: 'Abcd1234@' },
    mode: 'onTouched',
    resolver: yupResolver(schemaLogin)
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = form;

  // const tokenType = (dataToken?: any) => {
  //   return {
  //     type: 'saveToken',
  //     data: dataToken
  //   }
  // }

  const postData = (data: User) => {
    const response = http.post<Token>(`/login`, data);
    return response;
  };

  const { isLoading, mutate, error } = useMutation(postData, {
    onSuccess: (response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      const navigateLink = from ? from : '/admin/member-manage';
      navigate(navigateLink, {
        state: { test: 'testing' }
      });
    }
    // onError: (error: any) => {
    //   setError(error?.error_field, { message: error?.message });
    // },
  });

  useEffect(() => {
    const errors = error as ErrorRespond;
    if (errors) {
      setError(errors.error_field, { message: errors?.message });
    }
  });
  // Submit form
  const handleSubmitForm = (data: User) => {
    mutate(data);
  };

  return (
    <div className={styleLogin['layer-item']}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={`${styleLogin['layer-content']}`}>
          <div className={`${styleLogin['row-item']}`}>
            {isLoading && <Loading />}
            <Input
              width={'100%'}
              label="Email"
              helperText={errors.email?.message}
              register={register}
              name="email"
              control={control}
            />
          </div>
          <div className={styleLogin['row-item']}>
            <Input
              width={'100%'}
              type="password"
              label="Password"
              helperText={`${
                errors.password?.message ? errors.password?.message : ''
              }`}
              register={register}
              name="password"
              control={control}
            />
          </div>
          <div
            className={`${styleLogin['row-item']} ${styleLogin['btn-login']}`}
          >
            <Button type="submit" variant="contained">
              로그인
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state
  };
};
export default connect(mapStateToProps)(Login);
