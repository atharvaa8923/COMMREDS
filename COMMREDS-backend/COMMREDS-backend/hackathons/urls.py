from django.urls import path
from .views import (
    HackathonListView,
    HackathonDetailView,
    HackathonRegistrationView
)

urlpatterns = [
    path("", HackathonListView.as_view(), name="hackathon-list"),
    path("<uuid:pk>/", HackathonDetailView.as_view(), name="hackathon-detail"),
    path("<uuid:hackathon_pk>/register/", HackathonRegistrationView.as_view(), name="hackathon-register"),
]
