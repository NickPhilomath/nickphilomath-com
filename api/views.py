import os
import base64
import time
import datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.core.cache import cache
from django.http import HttpResponse
from django.conf import settings
# from django.core.servers.basehttp import FileWrapper


@api_view(["GET"])
@permission_classes([AllowAny])
def trailers_location(request):
    if request.method == "GET":
        zip_file = open("C:/temp/core/files/CDX_COMPOSITES_20140626.zip", "rb")
        response = HttpResponse(FileWrapper(zip_file), content_type="application/zip")
        response["Content-Disposition"] = (
            'attachment; filename="%s"' % "CDX_COMPOSITES_20140626.zip"
        )
        return response
        # return Response(cached_data, status=status.HTTP_200_OK)

        
