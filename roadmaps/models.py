from uuid import uuid4
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()

class Tag(models.Model):
    """Tags for categorizing roadmaps/hackathons"""
    tag_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Roadmap(models.Model):
    """Roadmap model"""
    LEVEL_CHOICES = (
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    )
    roadmap_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(unique=True, blank=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="Beginner")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="roadmaps")
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class RoadmapStep(models.Model):
    """Steps under each roadmap"""
    roadmapstep_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    roadmap = models.ForeignKey(Roadmap,
        related_name="steps",
        on_delete=models.CASCADE,
        to_field="roadmap_id", 
        )
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.PositiveIntegerField()
    resource_link = models.URLField(blank=True, null=True)
    estimated_time = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.roadmap.title} - Step {self.order}"


class RoadmapProgress(models.Model):
    """Track student's progress on a roadmap"""
    roadmapprogress_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="roadmap_progress")
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name="progress")
    completed_steps = models.ManyToManyField(RoadmapStep, blank=True)
    progress = models.FloatField(default=0.0)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "roadmap")

    def __str__(self):
        return f"{self.user.username} - {self.roadmap.title} Progress"
