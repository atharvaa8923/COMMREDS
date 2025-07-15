from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Hackathon, HackathonRegistration
from .serializer import HackathonSerializer, HackathonRegistrationSerializer


class HackathonListView(APIView):
    """
    GET: List all hackathons
    POST: Create a hackathon
    """
    def get(self, request):
        try:
            hackathons = Hackathon.objects.filter(is_published=True)
            serializer = HackathonSerializer(hackathons, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = HackathonSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(created_by=request.user)  # Automatically assign creator
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HackathonDetailView(APIView):
    """
    GET: Retrieve hackathon details
    PUT: Update hackathon
    DELETE: Delete hackathon
    """
    def get(self, request, pk):
        try:
            hackathon = get_object_or_404(Hackathon, pk=pk)
            serializer = HackathonSerializer(hackathon)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            hackathon = get_object_or_404(Hackathon, pk=pk)
            serializer = HackathonSerializer(hackathon, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            hackathon = get_object_or_404(Hackathon, pk=pk)
            hackathon.delete()
            return Response({"message": "Hackathon deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class HackathonRegistrationView(APIView):
    """
    POST: Register for a hackathon
    GET: Get user's registration status for a hackathon
    """
    def get(self, request, hackathon_pk):
        try:
            registration = HackathonRegistration.objects.get(user=request.user, hackathon_id=hackathon_pk)
            serializer = HackathonRegistrationSerializer(registration)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except HackathonRegistration.DoesNotExist:
            return Response({"detail": "Not registered for this hackathon."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, hackathon_pk):
        try:
            # Prevent duplicate registrations
            if HackathonRegistration.objects.filter(user=request.user, hackathon_id=hackathon_pk).exists():
                return Response({"detail": "You have already registered for this hackathon."}, status=status.HTTP_400_BAD_REQUEST)

            hackathon = get_object_or_404(Hackathon, pk=hackathon_pk)
            registration = HackathonRegistration.objects.create(
                user=request.user,
                hackathon=hackathon,
                status="Pending"
            )
            serializer = HackathonRegistrationSerializer(registration)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
