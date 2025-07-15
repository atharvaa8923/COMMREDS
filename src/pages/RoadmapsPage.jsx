import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { CustomCard, CustomInput, CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Clock,
  Star,
} from "lucide-react";

const RoadmapsPage = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "Beginner",
    is_published: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch roadmaps
  const fetchRoadmaps = async () => {
    try {
      const res = await axiosInstance.get("roadmaps/");
      setRoadmaps(res.data);
    } catch (err) {
      setError("Failed to load roadmaps.");
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  // Handle create/update roadmap
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axiosInstance.put(`roadmaps/${editingId}/`, form);
      } else {
        await axiosInstance.post("roadmaps/", form);
      }
      setShowForm(false);
      setForm({
        title: "",
        description: "",
        level: "Beginner",
        is_published: true,
      });
      setEditingId(null);
      setIsEditing(false);
      fetchRoadmaps();
    } catch (err) {
      setError("Failed to save roadmap.");
    }
  };

  // Delete roadmap
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`roadmaps/${deletingId}/`);
      setShowDeleteConfirm(false);
      setDeletingId(null);
      fetchRoadmaps();
    } catch (err) {
      setError("Failed to delete roadmap.");
    }
  };

  // Open edit form
  const handleEdit = (event, roadmap) => {
    event.stopPropagation();
    setForm({
      title: roadmap.title,
      description: roadmap.description,
      level: roadmap.level,
      is_published: roadmap.is_published,
    });
    setEditingId(roadmap.roadmap_id);
    setIsEditing(true);
    setShowForm(true);
  };

  // Open delete confirmation
  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    setDeletingId(id);
    setShowDeleteConfirm(true);
  };

  // Get level color
  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "#4CAF50";
      case "Intermediate":
        return "#FF9800";
      case "Advanced":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  // Get level icon
  const getLevelIcon = (level) => {
    switch (level) {
      case "Beginner":
        return <Star size={16} />;
      case "Intermediate":
        return <BarChart3 size={16} />;
      case "Advanced":
        return <BookOpen size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <BookOpen size={32} color="#1976d2" />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#1976d2",
              fontSize: "2rem",
            }}
          >
            Learning Roadmaps
          </Typography>

          <CustomButton
            startIcon={<Plus size={20} />}
            onClick={() => setShowForm(true)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 500,
              align: "right",
            }}
          >
            Create New Roadmap
          </CustomButton>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#666",
            mb: 3,
            fontSize: "1.1rem",
          }}
        >
          Track your progress and follow structured learning paths
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Roadmap Cards Grid */}
      <Grid container spacing={3}>
        {roadmaps.map((roadmap) => {
          return (
            <CustomCard
  title={roadmap.title}
  hoverEffect
  sx={{
    minWidth: "30%",
    maxWidth: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 250, // 🔥 Fixed height for all cards
    overflow: "hidden",
    borderRadius: "12px", // Optional: smooth corners
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)", // Optional hover effect
    },
  }}
  onClick={() => navigate(`/roadmaps/${roadmap.roadmap_id}`)}
>
  {/* Card Content */}
  <Box sx={{ flexGrow: 1 }}>
    {/* Description with ellipsis */}
    <Typography
      variant="subtitle1"
      sx={{
        mb: 2,
        color: "#555",
        fontSize: "0.95rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 3, // ✅ Show max 3 lines
        WebkitBoxOrient: "vertical",
      }}
    >
      {roadmap.description}
    </Typography>

    {/* Chips */}
    <Box display="flex" alignItems="center" gap={1} mt={1}>
      <Chip
        icon={getLevelIcon(roadmap.level)}
        label={roadmap.level}
        size="small"
        sx={{
          backgroundColor: getLevelColor(roadmap.level),
          color: "white",
          fontWeight: 500,
          fontSize: "0.75rem",
          "& .MuiChip-icon": {
            color: "white"
          }
        }}
      />
      {roadmap.is_published && (
        <Chip
          label="Published"
          size="small"
          sx={{
            backgroundColor: "#e8f5e8",
            color: "#2e7d32",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      )}
    </Box>
  </Box>

  {/* Actions fixed at bottom */}
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mt={2}
  >
    <Button
      size="small"
      variant="outlined"
      startIcon={<Edit size={16} />}
      onClick={(e) => {
        e.stopPropagation();
        handleEdit(e, roadmap);
      }}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        fontSize: "0.875rem",
        color: "#1976d2",
        borderColor: "#1976d2",
        "&:hover": {
          backgroundColor: "#f5f5f5",
          borderColor: "#1565c0",
        }
      }}
    >
      Edit
    </Button>
    <Button
      size="small"
      variant="outlined"
      color="error"
      startIcon={<Trash2 size={16} />}
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteClick(e, roadmap.roadmap_id);
      }}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        fontSize: "0.875rem",
        "&:hover": {
          backgroundColor: "#ffebee",
        }
      }}
    >
      Delete
    </Button>
  </Box>
</CustomCard>

          );
        })}
      </Grid>

      {/* Empty State */}
      {roadmaps.length === 0 && !error && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={8}
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: 3,
            border: "2px dashed #e0e0e0",
          }}
        >
          <BookOpen size={64} color="#bdbdbd" />
          <Typography variant="h6" sx={{ mt: 2, color: "#666" }}>
            No roadmaps yet
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", mb: 3 }}>
            Create your first learning roadmap to get started
          </Typography>
          <CustomButton
            startIcon={<Plus size={20} />}
            onClick={() => setShowForm(true)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.5,
            }}
          >
            Create Roadmap
          </CustomButton>
        </Box>
      )}

      {/* Roadmap Form Dialog */}
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <BookOpen size={24} color="#1976d2" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {isEditing ? "Edit Roadmap" : "Create New Roadmap"}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}
        >
          <CustomInput
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter roadmap title"
            fullWidth
          />
          <CustomInput
            label="Description"
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe what this roadmap covers"
            multiline
            rows={3}
            fullWidth
          />
          <CustomInput
            label="Level"
            name="level"
            select
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
            fullWidth
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </CustomInput>
          <Box display="flex" alignItems="center" gap={2}>
            <input
              type="checkbox"
              id="published"
              checked={form.is_published}
              onChange={(e) =>
                setForm({ ...form, is_published: e.target.checked })
              }
            />
            <label htmlFor="published">
              <Typography variant="body2">
                Publish roadmap (make it visible to others)
              </Typography>
            </label>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setShowForm(false)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              color: "#666",
            }}
          >
            Cancel
          </Button>
          <CustomButton
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
            }}
          >
            {isEditing ? "Update Roadmap" : "Create Roadmap"}
          </CustomButton>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Trash2 size={24} color="#f44336" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Confirm Delete
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this roadmap? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setShowDeleteConfirm(false)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              color: "#666",
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={confirmDelete}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1,
              backgroundColor: "#f44336",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Delete Roadmap
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoadmapsPage;
