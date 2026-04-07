import { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid2 } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { getExpenses } from "../api/expensesApi";
import { useSnackbar } from "notistack";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#E74C3C", "#2ECC71"];

const Analytics = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [total, setTotal] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getExpenses();
        const expenses = res.data;

        const grouped: Record<string, number> = {};
        expenses.forEach((exp: any) => {
          const name = exp.categoryId?.name || "—";
          grouped[name] = (grouped[name] || 0) + exp.amount;
        });

        const chartData = Object.entries(grouped).map(([name, value]) => ({ name, value }));
        setData(chartData);
        setTotal(expenses.reduce((sum: number, e: any) => sum + e.amount, 0));
      } catch {
        enqueueSnackbar(t("error_server"), { variant: "error" });
      }
    };
    load();
  }, []);

  const onPieEnter = (_: any, index: number) => {
  setActiveIndex(index);
};

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>{t("analytics_title")}</Typography>

      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="subtitle2" color="text.secondary">{t("analytics_total")}</Typography>
            <Typography variant="h4" fontWeight={700} color="primary">{total} ₴</Typography>
          </Paper>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper sx={{
            p: 3,
          }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>{t("analytics_by_category")}</Typography>
            {data.length === 0 ? (
              <Typography color="text.secondary">{t("no_data")}</Typography>
            ) : (
              <ResponsiveContainer width={`100%`} height={300}>
                <PieChart>
                  <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} label
    onMouseEnter={onPieEnter} onMouseLeave={() => setActiveIndex(null)}>
                    {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} style={{
    transform: activeIndex === i ? "scale(1.1)" : "scale(1)",
    transformOrigin: "center",
    transition: "0.3s",
  }} />)}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} ₴`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Analytics;
