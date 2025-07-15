from rest_framework import serializers
from .models import Hackathon, HackathonRegistration
from roadmaps.serializer import TagSerializer  # Reuse Tag serializer


class HackathonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hackathon
        fields = [
            "hackathon_id", "title", "description", "slug",
            "location", "start_date", "end_date",
            "created_by", "is_published", "created_at", "updated_at"
        ]
        read_only_fields = ("slug", "created_by", "created_at", "updated_at")


class HackathonRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Shows username
    hackathon = serializers.StringRelatedField(read_only=True)  # Shows hackathon title

    class Meta:
        model = HackathonRegistration
        fields = [
            "hackathonRegistration_id", "user", "hackathon", "status", "registered_at"
        ]
        read_only_fields = ("registered_at",)
