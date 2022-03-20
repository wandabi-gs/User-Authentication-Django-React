from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('signin/',views.signin.as_view()),
    path('signup/',views.signup),
    path('ChangePicture/',views.change_picture.as_view()),
    path('ChangePassword/',views.change_password.as_view()),
    path('DeleteAccount/',views.delete_account.as_view()),
]
