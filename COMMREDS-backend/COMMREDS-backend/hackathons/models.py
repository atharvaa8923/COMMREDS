from uuid import uuid4
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()


class Hackathon(models.Model):
    """Hackathon model"""
    hackathon_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(unique=True, blank=True)
    tags = models.ManyToManyField("roadmaps.Tag", blank=True)  # Reusing Tag model
    location = models.CharField(max_length=255, default="Online")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="hackathons")
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class HackathonRegistration(models.Model):
    """Student registrations for hackathons"""
    STATUS_CHOICES = (
        ("Pending", "Pending"),
        ("Confirmed", "Confirmed"),
        ("Rejected", "Rejected"),
    )
    hackathonRegistration_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="hackathon_registrations")
    hackathon = models.ForeignKey(Hackathon, on_delete=models.CASCADE, related_name="registrations",  to_field="hackathon_id",)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Pending")
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "hackathon")

    def __str__(self):
        return f"{self.user.username} - {self.hackathon.title}"
