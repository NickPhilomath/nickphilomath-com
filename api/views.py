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


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def mapdata(request):
    if request.method == "GET":
        x = request.GET.get('x')
        y = request.GET.get('y')
        z = request.GET.get('z')

        file_path = f'{settings.MAP_DATA_URL}/z{z}/{x}-{y}-{z}.jfif'
        file_exists = os.path.exists(file_path)

        if file_exists:
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="image/jpeg")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "POST":
        x = request.GET.get('x')
        y = request.GET.get('y')
        z = request.GET.get('z')

        str_data = request.data["data"]
        file_path = f'{settings.MAP_DATA_URL}/z{z}/{x}-{y}-{z}.jfif'
        file_exists = os.path.exists(file_path)

        # check if data is not too few
        if len(str_data) < 3000:
            return Response(status=200)

        if not file_exists:
            img_data = base64.b64decode(str_data)

            with open(file_path, 'wb') as handler:
                handler.write(img_data)

            return Response(status=status.HTTP_200_OK)
        return Response({'info': 'exists'}, status=status.HTTP_400_BAD_REQUEST)
        
