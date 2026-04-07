import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object({
    email: yup.string().required(t("error_required")).email(t("error_email_invalid")),
    password: yup.string().required(t("error_required")).min(6, t("error_password_min"))
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await loginApi(data);
      login(res.data.token);
      enqueueSnackbar(t("success_logged_in"), { variant: "success" });
      navigate("/expenses");
    } catch {
      enqueueSnackbar(t("error_login_failed"), { variant: "error" });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
          {t("login")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label={t("email")}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label={t("password")}
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isSubmitting}
            startIcon={<LoginIcon />}
          >
            {t("login")}
          </Button>
          <Typography textAlign="center" variant="body2">
            <Link onClick={() => navigate("/register")} sx={{ cursor: "pointer" }}>
              {t("register")}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
