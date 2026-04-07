import { useEffect, useState } from "react";
import {
  Box, Button, Typography, Paper, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem, Select,
  FormControl, InputLabel, ToggleButtonGroup, ToggleButton,
  Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../api/expensesApi";
import { getCategories } from "../api/categoriesApi";
import { CategoryIcon } from "../components/UI/CategoryIcon";
import type { IconName } from "../model/iconMap";

interface Category { _id: string; name: string; icon?: IconName; }
interface Expense {
  _id: string;
  amount: number;
  date: string;
  note: string;
  categoryId: Category;
}

const getToday = () => new Date().toISOString().split('T')[0];

const Expenses = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const schema = yup.object({
    amount: yup.number().required(t("error_required")).positive(t("error_amount_positive")),
    date: yup.string().required(t("error_required")),
    categoryId: yup.string().required(t("error_required")),
    note: yup.string()
  });

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
    date: getToday(),
  },
    resolver: yupResolver(schema)
  });

  const getDateRange = (f: string) => {
    const now = new Date();
    if (f === "week") {
      const from = new Date(now); from.setDate(now.getDate() - 7);
      return { from: from.toISOString().split("T")[0], to: now.toISOString().split("T")[0] };
    }
    if (f === "month") {
      const from = new Date(now); from.setMonth(now.getMonth() - 1);
      return { from: from.toISOString().split("T")[0], to: now.toISOString().split("T")[0] };
    }
    if (f === "custom") return { from: customFrom, to: customTo };
    return {};
  };

  const load = async () => {
    try {
      const range = getDateRange(filter);
      const res = await getExpenses({ ...range, sortBy: sortBy as "date" | "amount" });
      setExpenses(res.data);
    } catch {
      enqueueSnackbar(t("error_server"), { variant: "error" });
    }
  };

  useEffect(() => {
    getCategories().then(r => setCategories(r.data));
  }, []);

  useEffect(() => { load(); }, [filter, sortBy, customFrom, customTo]);

  const handleOpen = (expense?: Expense) => {
    setEditing(expense || null);
    reset(expense ? {
      amount: expense.amount,
      date: expense.date.split("T")[0],
      categoryId: expense.categoryId._id,
      note: expense.note
    } : { amount: undefined, date: getToday(), categoryId: "", note: "" });
    setOpen(true);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editing) {
        await updateExpense(editing._id, data);
        enqueueSnackbar(t("success_expense_updated"), { variant: "success" });
      } else {
        await createExpense(data);
        enqueueSnackbar(t("success_expense_created"), { variant: "success" });
      }
      setOpen(false);
      load();
    } catch {
      enqueueSnackbar(t("error_server"), { variant: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      enqueueSnackbar(t("success_expense_deleted"), { variant: "success" });
      setConfirmDelete(null);
      load();
    } catch {
      enqueueSnackbar(t("error_server"), { variant: "error" });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>{t("nav_expenses")}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          {t("add_expense")}
        </Button>
      </Box>

      {/* Фільтри */}
      <Paper sx={{ p: 2, mb: 2, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <ToggleButtonGroup value={filter} exclusive onChange={(_, v) => v && setFilter(v)} size="small">
          <ToggleButton value="all">{t("filter_all")}</ToggleButton>
          <ToggleButton value="week">{t("filter_week")}</ToggleButton>
          <ToggleButton value="month">{t("filter_month")}</ToggleButton>
          <ToggleButton value="custom">{t("filter_custom")}</ToggleButton>
        </ToggleButtonGroup>

        {filter === "custom" && (
          <>
            <TextField label={t("date_from")} type="date" size="small" value={customFrom}
              onChange={e => setCustomFrom(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ width: 160 }} />
            <TextField label={t("date_to")} type="date" size="small" value={customTo}
              onChange={e => setCustomTo(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ width: 160 }} />
          </>
        )}

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>{t("sort_by")}</InputLabel>
          <Select value={sortBy} label={t("sort_by")} onChange={e => setSortBy(e.target.value)}>
            <MenuItem value="date">{t("sort_by_date")}</MenuItem>
            <MenuItem value="amount">{t("sort_by_amount")}</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Таблиця */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f56f" }} >
            <TableRow>
              <TableCell><Typography fontWeight={600}>{t("expense_date")}</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>{t("expense_category")}</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>{t("expense_amount")}</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>{t("expense_note")}</Typography></TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map(exp => (
              <TableRow key={exp._id} hover>
                <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {exp.categoryId?.icon && <CategoryIcon name={exp.categoryId.icon} />}
                    {exp.categoryId?.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>
                    {exp.amount} ₴
                  </Typography>
                </TableCell>
                <TableCell>{exp.note}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(exp)} color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setConfirmDelete(exp._id)} color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Форма витрати */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? t("edit_expense") : t("add_expense")}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label={t("expense_amount")}
              type="number"
              {...register("amount")}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
            <TextField
              label={t("expense_date")}
              type="date"
              {...register("date")}
              error={!!errors.date}
              helperText={errors.date?.message}
              InputLabelProps={{ shrink: true }}
            />
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.categoryId}>
                  <InputLabel>{t("expense_category")}</InputLabel>
                  <Select {...field} displayEmpty label={t("expense_category")} sx={{py: 0}}>
                    {categories.map(cat => (
                      <MenuItem key={cat._id} value={cat._id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {cat?.icon && <CategoryIcon name={cat.icon} />}{cat.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <TextField
              label={t("expense_note")}
              {...register("note")}
            />
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>{t("save")}</Button>
        </DialogActions>
      </Dialog>

      {/* Підтвердження видалення */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} maxWidth="xs">
        <DialogTitle>{t("confirm_delete")}</DialogTitle>
        <Divider />
        <DialogContent><Typography>{t("confirm_delete_text")}</Typography></DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>{t("cancel")}</Button>
          <Button variant="contained" color="error" onClick={() => confirmDelete && handleDelete(confirmDelete)}>
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Expenses;
