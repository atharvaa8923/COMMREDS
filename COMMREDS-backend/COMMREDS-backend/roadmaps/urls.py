from django.urls import path
from .views import (
    RoadmapListView,
    RoadmapDetailView,
    RoadmapStepListView,
    RoadmapStepDetailView,
    RoadmapProgressView
)

urlpatterns = [
    path("", RoadmapListView.as_view(), name="roadmap-list"),
    path("<uuid:pk>/", RoadmapDetailView.as_view(), name="roadmap-detail"),
    path("<uuid:roadmap_pk>/steps/", RoadmapStepListView.as_view(), name="roadmap-steps"),
    path("<uuid:roadmap_pk>/steps/<uuid:step_pk>/", RoadmapStepDetailView.as_view(), name="roadmap-step-detail"),
    path("<uuid:roadmap_pk>/progress/", RoadmapProgressView.as_view(), name="roadmap-progress"),
]
