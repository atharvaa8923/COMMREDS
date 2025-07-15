import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import { CustomCard, CustomInput, CustomButton } from "../components";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const HackathonsPage = () => {
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "Online",
    start_date: "",
    end_date: "",
    is_published: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [userRole, setUserRole] = useState(""); // Either 'admin' or 'student'

  // Fetch hackathons
  const fetchHackathons = async () => {
    try {
      const res = await axiosInstance.get("hackathons/");
      setHackathons(res.data);
    } catch (err) {
      setError("Failed to load hackathons.");
    }
  };

  // Fetch user role
  const fetchUserRole = async () => {
    try {
      const res = await axiosInstance.get("user/profile/"); // Adjust to your user endpoint
      setUserRole(res.data.role); // Assume API returns role
    } catch (err) {
      setError("Failed to fetch user role.");
    }
  };

  useEffect(() => {
    fetchHackathons();
    fetchUserRole();
  }, []);

  // Create/Update hackathon
  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axiosInstance.put(`hackathons/${editingId}/`, form);
      } else {
        await axiosInstance.post("hackathons/", form);
      }
      handleCloseForm();
      fetchHackathons();
    } catch (err) {
      setError("Failed to save hackathon.");
    }
  };

  // Delete hackathon
  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`hackathons/${deletingId}/`);
      setShowDeleteConfirm(false);
      setDeletingId(null);
      fetchHackathons();
    } catch (err) {
      setError("Failed to delete hackathon.");
    }
  };

  // Open edit form
  const handleEdit = (event, hackathon) => {
    event.stopPropagation();
    setForm({
      title: hackathon.title,
      description: hackathon.description,
      location: hackathon.location,
      start_date: hackathon.start_date,
      end_date: hackathon.end_date,
      is_published: hackathon.is_published,
    });
    setEditingId(hackathon.hackathon_id);
    setIsEditing(true);
    setShowForm(true);
  };

  // Open delete confirmation
  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    setDeletingId(id);
    setShowDeleteConfirm(true);
  };

  // Close form and reset
  const handleCloseForm = () => {
    setShowForm(false);
    setForm({
      title: "",
      description: "",
      location: "Online",
      start_date: "",
      end_date: "",
      is_published: true,
    });
    setEditingId(null);
    setIsEditing(false);
  };

  // Handle hackathon card click
  const handleHackathonClick = (hackathon) => {
    if (userRole === "student") {
      navigate(`/hackathons/${hackathon.hackathon_id}`);
    }
  };

  // Get status chip color and text
  const getStatusChip = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return { text: "Upcoming", color: "info" };
    } else if (now >= start && now <= end) {
      return { text: "Live", color: "success" };
    } else {
      return { text: "Ended", color: "default" };
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      {/* Header Section */}
      <CustomCard  size = "100%" sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#2c3e50", mb: 1 }}>
              🏆 Hackathons
            </Typography>
            <Typography variant="body1" sx={{ color: "#7f8c8d" }}>
              Join competitions and test your skills
            </Typography>
          </Box>
          {userRole === "mentor" && (
            <CustomButton
              variant="contained"
              onClick={() => setShowForm(true)}
              sx={{
                backgroundColor: "#3498db",
                "&:hover": { backgroundColor: "#2980b9" }
              }}
            >
              Add Hackathon
            </CustomButton>
          )}
        </Box>
      </CustomCard>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Hackathon Cards */}
      <Grid container spacing={3}>
        {hackathons.length === 0 ? (
          <Grid item xs={12}>
            <CustomCard sx={{ height: "100%" }}>
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" sx={{ color: "#7f8c8d", mb: 2 }}>
                  No hackathons available
                </Typography>
                <Typography variant="body2" sx={{ color: "#95a5a6" }}>
                  {userRole === "mentor" 
                    ? "Create your first hackathon to get started" 
                    : "Check back later for upcoming competitions"}
                </Typography>
              </Box>
            </CustomCard>
          </Grid>
        ) : (
          hackathons.map((hackathon) => {
            const statusChip = getStatusChip(hackathon.start_date, hackathon.end_date);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={hackathon.hackathon_id}>
                <CustomCard
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: userRole === "student" ? "pointer" : "default",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: userRole === "student" ? "translateY(-4px)" : "none",
                      boxShadow: userRole === "student" ? "0 8px 25px rgba(0,0,0,0.15)" : "none"
                    }
                  }}
                  onClick={() => handleHackathonClick(hackathon)}
                >
                  {/* Card Header */}
                  <Box sx={{ mb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: "#2c3e50",
                          flex: 1,
                          pr: 1
                        }}
                      >
                        {hackathon.title}
                      </Typography>
                      <Chip
                        label={statusChip.text}
                        color={statusChip.color}
                        size="small"
                        sx={{ minWidth: 60 }}
                      />
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="body2" sx={{ color: "#7f8c8d", display: "flex", alignItems: "center" }}>
                        📍 {hackathon.location}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card Content */}
                  <Box sx={{ flex: 1, mb: 2 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#7f8c8d", 
                        lineHeight: 1.6,
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {hackathon.description}
                    </Typography>
                    
                    {/* Date Information */}
                    <Box sx={{ 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "8px", 
                      p: 2,
                      border: "1px solid #e9ecef"
                    }}>
                      <Typography variant="caption" sx={{ color: "#6c757d", fontWeight: 500 }}>
                        📅 {new Date(hackathon.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })} - {new Date(hackathon.end_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Actions */}
                  {userRole === "mentor" && (
                    <Box sx={{ 
                      display: "flex", 
                      gap: 1, 
                      mt: "auto",
                      pt: 2,
                      borderTop: "1px solid #e9ecef"
                    }}>
                      <CustomButton
                        size="small"
                        variant="outlined"
                        onClick={(e) => handleEdit(e, hackathon)}
                        sx={{
                          flex: 1,
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
                        onClick={(e) => handleDeleteClick(e, hackathon.hackathon_id)}
                        sx={{
                          flex: 1,
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
                  )}
                </CustomCard>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* Hackathon Form Dialog */}
      {userRole === "mentor" && (
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
            {isEditing ? "Edit Hackathon" : "Create New Hackathon"}
          </DialogTitle>
          <DialogContent sx={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 3, 
            mt: 2,
            px: 3
          }}>
            <CustomInput
              label="Hackathon Title"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter hackathon title"
              fullWidth
              variant="outlined"
            />
            <CustomInput
              label="Description"
              name="description"
              multiline
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the hackathon objectives and requirements"
              fullWidth
              variant="outlined"
            />
            <CustomInput
              label="Location"
              name="location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g., Online, New York, etc."
              fullWidth
              variant="outlined"
            />
            <CustomInput
              // label="Start Date & Time"
              type="datetime-local"
              name="start_date"
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              fullWidth
              variant="outlined"
            />
            <CustomInput
              // label="End Date & Time"
              type="datetime-local"
              name="end_date"
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              fullWidth
              variant="outlined"
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
              {isEditing ? "Update Hackathon" : "Create Hackathon"}
            </CustomButton>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: "1.25rem", 
          fontWeight: 600, 
          color: "#e74c3c",
          borderBottom: "1px solid #ecf0f1",
          pb: 2
        }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography sx={{ color: "#2c3e50" }}>
            Are you sure you want to delete this hackathon? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          pt: 2,
          borderTop: "1px solid #ecf0f1",
          gap: 2
        }}>
          <CustomButton 
            onClick={() => setShowDeleteConfirm(false)}
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
            onClick={confirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#e74c3c",
              "&:hover": { backgroundColor: "#c0392b" }
            }}
          >
            Delete
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HackathonsPage;