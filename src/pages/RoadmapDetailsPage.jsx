import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CustomInput, CustomButton, CustomCard } from "../components";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";

const RoadmapDetailsPage = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", order: 1 });
  const [editingStepId, setEditingStepId] = useState(null);

  // Fetch roadmap & steps
  const fetchRoadmapDetails = async () => {
    try {
      const roadmapRes = await axiosInstance.get(`roadmaps/${id}/`);
      const stepsRes = await axiosInstance.get(`roadmaps/${id}/steps/`);
      setRoadmap(roadmapRes.data);
      setSteps(stepsRes.data);
    } catch (err) {
      setError("Failed to load roadmap details.");
    }
  };

  useEffect(() => {
    fetchRoadmapDetails();
  }, [id]);

  // Handle create/update step
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axiosInstance.put(`roadmaps/${id}/steps/${editingStepId}/`, form);
      } else {
        const newStep = { ...form, roadmap_id: id };
        await axiosInstance.post(`roadmaps/${id}/steps/`, newStep);
      }
      setShowForm(false);
      setForm({ title: "", description: "", order: steps.length + 1 });
      setEditingStepId(null);
      setIsEditing(false);
      fetchRoadmapDetails();
    } catch (err) {
      setError("Failed to save step.");
    }
  };

  // Delete step
  const handleDelete = async (stepId) => {
    try {
      await axiosInstance.delete(`roadmaps/${id}/steps/${stepId}/`);
      fetchRoadmapDetails();
    } catch (err) {
      setError("Failed to delete step.");
    }
  };

  // Open edit form
  const handleEdit = (step) => {
    setForm({
      title: step.title,
      description: step.description,
      order: step.order,
    });
    setEditingStepId(step.roadmapstep_id);
    setIsEditing(true);
    setShowForm(true);
  };

  // Close form and reset
  const handleCloseForm = () => {
    setShowForm(false);
    setForm({ title: "", description: "", order: steps.length + 1 });
    setEditingStepId(null);
    setIsEditing(false);
  };

  if (!roadmap) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ py: 8 }}>
      {/* Header Section */}
      <CustomCard 
      size = "100%"
      sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#2c3e50" }}>
            {roadmap.title}
          </Typography>
          <CustomButton 
            variant="contained" 
            onClick={() => setShowForm(true)}
            sx={{ 
              backgroundColor: "#3498db",
              "&:hover": { backgroundColor: "#2980b9" }
            }}
          >
            Add Step
          </CustomButton>
        </Box>
        <Typography variant="body1" sx={{ color: "#7f8c8d", lineHeight: 1.6 }}>
          {roadmap.description}
        </Typography>
      </CustomCard>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Steps Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {steps.length === 0 ? (
          <CustomCard>
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" sx={{ color: "#7f8c8d", mb: 2 }}>
                No steps added yet
              </Typography>
              <Typography variant="body2" sx={{ color: "#95a5a6" }}>
                Start building your roadmap by adding the first step
              </Typography>
            </Box>
          </CustomCard>
        ) : (
          steps.map((step) => (
            <CustomCard key={step.roadmapstep_id}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: "#2c3e50",
                      mb: 1,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#3498db",
                        color: "white",
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                        mr: 2
                      }}
                    >
                      {step.order}
                    </Box>
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#7f8c8d", 
                      lineHeight: 1.6,
                      ml: 5
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                  <CustomButton
                    size="small"
                    variant="outlined"
                    onClick={() => handleEdit(step)}
                    sx={{
                      borderColor: "#3498db",
                      color: "#3498db",
                      "&:hover": {
                        backgroundColor: "#3498db",
                        color: "white"
                      }
                    }}
                  >
                    Edit
                  </CustomButton>
                  <CustomButton
                    size="small"
                    variant="outlined"
                    onClick={() => handleDelete(step.roadmapstep_id)}
                    sx={{
                      borderColor: "#e74c3c",
                      color: "#e74c3c",
                      "&:hover": {
                        backgroundColor: "#e74c3c",
                        color: "white"
                      }
                    }}
                  >
                    Delete
                  </CustomButton>
                </Box>
              </Box>
            </CustomCard>
          ))
        )}
      </Box>

      {/* Step Form Dialog */}
      <Dialog 
        open={showForm} 
        onClose={handleCloseForm} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: "1.5rem", 
          fontWeight: 600, 
          color: "#2c3e50",
          borderBottom: "1px solid #ecf0f1",
          pb: 2
        }}>
          {isEditing ? "Edit Step" : "Add New Step"}
        </DialogTitle>
        <DialogContent sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 3, 
          mt: 2,
          px: 3
        }}>
          <CustomInput
            label="Step Title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter step title"
            fullWidth
            variant="outlined"
          />
          <CustomInput
            label="Description"
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe this step in detail"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          <CustomInput
            label="Order"
            name="order"
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
            fullWidth
            variant="outlined"
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          pt: 2,
          borderTop: "1px solid #ecf0f1",
          gap: 2
        }}>
          <CustomButton 
            onClick={handleCloseForm}
            variant="outlined"
            sx={{
              borderColor: "#95a5a6",
              color: "#95a5a6",
              "&:hover": {
                backgroundColor: "#95a5a6",
                color: "white"
              }
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton 
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#27ae60",
              "&:hover": { backgroundColor: "#229954" }
            }}
          >
            {isEditing ? "Update Step" : "Add Step"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoadmapDetailsPage;