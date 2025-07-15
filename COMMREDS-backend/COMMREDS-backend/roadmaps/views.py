from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Roadmap, RoadmapStep, RoadmapProgress
from .serializer import (
    RoadmapSerializer,
    RoadmapStepSerializer,
    NestedRoadmapSerializer,
    RoadmapProgressSerializer
)


class RoadmapListView(APIView):
    """
    GET: List all roadmaps
    POST: Create a new roadmap
    """
    def get(self, request):
        try:
            roadmaps = Roadmap.objects.all()
            serializer = RoadmapSerializer(roadmaps, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            user = request.user.id
            request.data["created_by"] = user
            serializer = RoadmapSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RoadmapDetailView(APIView):
    """
    GET: Retrieve a roadmap with nested steps
    PUT: Update a roadmap
    DELETE: Delete a roadmap
    """
    def get(self, request, pk):
        try:
            roadmap = get_object_or_404(Roadmap, pk=pk)
            serializer = NestedRoadmapSerializer(roadmap)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            roadmap = get_object_or_404(Roadmap, pk=pk)
            serializer = RoadmapSerializer(roadmap, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            roadmap = get_object_or_404(Roadmap, pk=pk)
            roadmap.delete()
            return Response({"message": "Roadmap deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RoadmapStepListView(APIView):
    """
    GET: List all steps for a roadmap
    POST: Add a step to a roadmap
    """
    def get(self, request, roadmap_pk):
        try:
            steps = RoadmapStep.objects.filter(roadmap_id=roadmap_pk).order_by("order")
            serializer = RoadmapStepSerializer(steps, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, roadmap_pk):
        try:
            request.data["roadmap"] = roadmap_pk  # Assign roadmap to step
            serializer = RoadmapStepSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RoadmapStepDetailView(APIView):
    """
    GET: Retrieve a single step
    PUT: Update a step
    DELETE: Delete a step
    """
    def get(self, request, roadmap_pk, step_pk):
        try:
            step = get_object_or_404(RoadmapStep, roadmap_id=roadmap_pk, pk=step_pk)
            serializer = RoadmapStepSerializer(step)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, roadmap_pk, step_pk):
        try:
            step = get_object_or_404(RoadmapStep, roadmap_id=roadmap_pk, pk=step_pk)
            serializer = RoadmapStepSerializer(step, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, roadmap_pk, step_pk):
        try:
            step = get_object_or_404(RoadmapStep, roadmap_id=roadmap_pk, pk=step_pk)
            step.delete()
            return Response({"message": "Step deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RoadmapProgressView(APIView):
    """
    POST: Mark steps as completed for a user
    GET: Retrieve user's roadmap progress
    """
    def get(self, request, roadmap_pk):
        try:
            progress = RoadmapProgress.objects.get(user=request.user, roadmap_id=roadmap_pk)
            serializer = RoadmapProgressSerializer(progress)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RoadmapProgress.DoesNotExist:
            return Response({"detail": "No progress found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, roadmap_pk):
        try:
            progress, created = RoadmapProgress.objects.get_or_create(
                user=request.user,
                roadmap_id=roadmap_pk
            )
            step_ids = request.data.get("completed_steps", [])
            progress.completed_steps.set(step_ids)
            progress.progress = (progress.completed_steps.count() / RoadmapStep.objects.filter(roadmap_id=roadmap_pk).count()) * 100
            progress.save()
            serializer = RoadmapProgressSerializer(progress)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
