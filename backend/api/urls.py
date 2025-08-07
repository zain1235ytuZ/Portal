from django.urls import path 
from accounts import views as userViews

urlpatterns = [
    path('register/', userViews.UserCreateView.as_view()),
]