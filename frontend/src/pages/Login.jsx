import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      
      if (isRegister) {
        result = await register(formData);
      } else {
        result = await login(formData.email, formData.password);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setFormData({ email: '', password: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {isRegister ? 'Criar Conta' : 'Entrar'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isRegister 
              ? 'Crie sua conta para começar a comprar' 
              : 'Entre com sua conta para continuar'
            }
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="email"
          />

          <TextField
            fullWidth
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
          />

          {isRegister && (
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="name"
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isRegister ? 'Criar Conta' : 'Entrar'
            )}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            ou
          </Typography>
        </Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={toggleMode}
            disabled={loading}
          >
            {isRegister 
              ? 'Já tem uma conta? Entre aqui' 
              : 'Não tem conta? Registre-se aqui'
            }
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            component={Link}
            to="/"
            variant="text"
            color="primary"
          >
            Voltar para a loja
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 