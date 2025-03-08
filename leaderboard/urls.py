from django.urls import path
from django.http import JsonResponse

def test_view(request):
    return JsonResponse({"message": "Django Running"})

urlpatterns = [  # "urlpatterns" not "urlpattern"
    path("", test_view),
]
