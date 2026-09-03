import { useState } from 'react';
import { TextInput, PasswordInput, Button, Stack, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@entities/user';
import { useSlideStore } from '@/entities/slide';

interface FormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useUserStore();
  const [formError, setFormError] = useState<string | null>(null);
  const resetSlides = useSlideStore((state) => state.resetSlides);

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
        email: (value) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? null
            : 'Некорректный адрес электронной почты',
        password: (value) =>
          value.length >= 3
            ? null
            : 'Пароль должен содержать минимум 3 символа',
      }
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setFormError(null);
      clearError();
      await login(values);
      resetSlides();
      navigate('/');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {(error || formError) && (
          <Alert 
            color="red" 
            title="Error" 
            withCloseButton
            onClose={() => {
              clearError();
              setFormError(null);
            }}
          >
            {error || formError}
          </Alert>
        )}
        
        <TextInput
          label="Электронная почта"
          placeholder="ваш@email.ru"
          required
          {...form.getInputProps('email')}
        />
        
        <PasswordInput
          label="Пароль"
          placeholder="Введите пароль"
          required
          {...form.getInputProps('password')}
        />
        
        <Button type="submit" loading={isLoading} fullWidth mt="md">
          Войти
        </Button>
      </Stack>
    </form>
  );
};