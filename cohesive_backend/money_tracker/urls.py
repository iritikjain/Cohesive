from django.urls import path
from django.conf.urls import include
from .views import UserViewSet,  ProfileView, TransactionView, LogView
from rest_framework import routers

router = routers.DefaultRouter()
router.register("user", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path("profile/", ProfileView.as_view()),
    path("profile/<int:pk>/", ProfileView.as_view()),
    path("transaction/", TransactionView.as_view()),
    path("transaction/<int:pk>/", TransactionView.as_view()),
    path("log/", LogView.as_view()),
    path("log/<int:pk>/", LogView.as_view()),
]
