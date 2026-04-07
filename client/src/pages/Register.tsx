import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object({
    email: yup.string().required(t("error_required")).email(t("error_email_invalid")),
    password: yup.string().required(t("error_required")).min(6, t("error_password_min")),
    confirm_password: yup.string()
      .required(t("error_required"))
      .oneOf([yup.ref("password")], t("error_passwords_mismatch"))
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await registerApi({ email: data.email, password: data.password });
      enqueueSnackbar(t("success_registered"), { variant: "success" });
      navigate("/login");
    } catch {
      enqueueSnackbar(t("error_register_failed"), { variant: "error" });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
          {t("register")}
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
          <TextField
            label={t("confirm_password")}
            type="password"
            {...register("confirm_password")}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isSubmitting}
            startIcon={<HowToRegIcon />}
          >
            {t("register")}
          </Button>
          <Typography textAlign="center" variant="body2">
            <Link onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
              {t("login")}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
