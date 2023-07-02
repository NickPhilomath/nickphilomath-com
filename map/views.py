import os
import base64
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.core.cache import cache
from django.http import HttpResponse
from django.conf import settings

# Create your views here.

def checkMapdataFolder():
    print('yes')
    if not os.path.exists(settings.MAP_DATA_PATH):
        os.mkdir(os.path.join('./', settings.MAP_DATA_PATH))

    for i in range(24):
        os.mkdir(os.path.join('./', settings.MAP_DATA_PATH + '/z' + str(i)))


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def mapdata(request):
    x = request.GET.get('x')
    y = request.GET.get('y')
    z = request.GET.get('z')
    file_path = f'{settings.MAP_DATA_PATH}/z{z}/{x}-{y}-{z}.jfif'
    file_exists = os.path.exists(file_path)

    if request.method == "GET":
        if file_exists:
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="image/jpeg")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "POST":
        str_data = request.data["data"]

        # check if data is not too few
        if len(str_data) < 3000:
            return Response(status=200)

        if not file_exists:
            img_data = base64.b64decode(str_data)

            try:
                with open(file_path, 'wb') as handler:
                    handler.write(img_data)
            except FileNotFoundError:
                checkMapdataFolder()

            return Response(status=status.HTTP_200_OK)
        return Response({'info': 'exists'}, status=status.HTTP_400_BAD_REQUEST)