from .models import (
    Tag,
    Roadmap,
    RoadmapStep,
    RoadmapProgress,
)
from rest_framework.serializers import ModelSerializer

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]

class RoadmapSerializer(ModelSerializer):
    class Meta:
        model = Roadmap
        fields = "__all__"

class RoadmapStepSerializer(ModelSerializer):
    class Meta:
        model = RoadmapStep
        fields = "__all__"

class NestedRoadmapSerializer(ModelSerializer):
    class Meta:
        steps = RoadmapStepSerializer(many=True, read_only=True)  # Include related steps

    class Meta:
        model = Roadmap
        fields = [
            "roadmap_id", "title", "description", "slug", "level",
            "created_by", "created_at", "updated_at",
            "is_published", "steps"  # include steps in response
        ]

class RoadmapProgressSerializer(ModelSerializer):
    class Meta:
        model = RoadmapProgress
        fields = "__all__"