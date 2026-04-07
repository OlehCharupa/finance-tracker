import { useEffect, useState } from "react";
import {
  Box, Button, Typography, Paper, IconButton,
  TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, List, ListItem, ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../api/categoriesApi";
import { CategoryIcon } from "../components/UI/CategoryIcon";
import type { IconName } from "../model/iconMap";
import { IconPicker } from "../components/UI/IconPicker";

interface Category { _id: string; name: string; icon?: IconName; }

const Categories = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<IconName | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      enqueueSnackbar(t("error_server"), { variant: "error" });
    }
  };

  useEffect(() => { load(); }, []);

  const handleOpen = (cat?: Category) => {
    setEditing(cat || null);
    setName(cat?.name || "");
    setOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      if (editing) {
        await updateCategory(editing._id, { name, icon: icon as string });
        enqueueSnackbar(t("success_category_updated"), { variant: "success" });
      } else {
        await createCategory({ name, icon: icon as string });
        enqueueSnackbar(t("success_category_created"), { variant: "success" });
      }
      setOpen(false);
      load();
    } catch {
      enqueueSnackbar(t("error_server"), { variant: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      enqueueSnackbar(t("success_category_deleted"), { variant: "success" });
      setConfirmDelete(null);
      load();
    } catch {
      enqueueSnackbar(t("error_server"), { variant: "error" });
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>{t("nav_categories")}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          {t("add_category")}
        </Button>
      </Box>

      <Paper>
        <List disablePadding>
          {categories.map((cat, i) => (
            <ListItem
              key={cat._id}
              divider={i < categories.length - 1}
              sx={{gap: 1}}
              secondaryAction={
                <Box>
                  <IconButton onClick={() => handleOpen(cat)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setConfirmDelete(cat._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              {cat?.icon && <CategoryIcon name={cat.icon} />}
              <ListItemText primary={cat.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Діалог створення/редагування */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{editing ? t("edit_category") : t("add_category")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("category_name")}
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ mt: 1, mb: 2 }}
            autoFocus
          />
          <IconPicker
            selectedIcon={icon as IconName}
            onSelect={(iconName) => setIcon(iconName)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t("cancel")}</Button>
          <Button variant="contained" onClick={handleSave}>{t("save")}</Button>
        </DialogActions>
      </Dialog>

      {/* Діалог підтвердження видалення */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} maxWidth="xs">
        <DialogTitle>{t("confirm_delete")}</DialogTitle>
        <DialogContent>
          <Typography>{t("confirm_delete_text")}</Typography>
        </DialogContent>
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

export default Categories;
