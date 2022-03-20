from lib2to3.pgen2 import token
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

UserModel = get_user_model()            

@csrf_exempt
def signup(request):
    if request.method == "POST":
        proceed = True
        try:
            user = UserModel.objects.get(email=request.POST['email'])
            return JsonResponse({'EmailError':'This email is already registered'})
        except UserModel.DoesNotExist:
            new_user = UserModel()
            new_user.email = request.POST['email']
            new_user.first_name = request.POST['first_name']
            new_user.last_name = request.POST['last_name']
            new_user.gender = request.POST['gender']
            new_user.image = request.FILES['image']
            new_user.set_password(request.POST['password'])
            new_user.save()
            return JsonResponse({'success':'Account created succesfully'})


class signin(ObtainAuthToken):
    def post(self ,request, *args, **kwargs):
        try:
            print(request.POST)
            checkuser = UserModel.objects.get(email=request.POST['username'])
            if checkuser.check_password(request.POST['password']):
                serializer =self.serializer_class(data=request.data,context={'request':request})
                serializer.is_valid(raise_exception=True)
                user = serializer.validated_data['user']
                token, created = Token.objects.get_or_create(user=user)
                usr_dict = {'session_token' : token.key,'email' : user.email,'image':user.image.url}
                return Response({'user':usr_dict})
            elif not checkuser.check_password(request.POST['password']):
                return Response({'PasswordError':'Wrong password'})
        except UserModel.DoesNotExist:
            return Response({'EmailError':'Invalid email'})


class change_picture(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        user = UserModel.objects.get(email=request.POST['email'])
        user.image = request.FILES['new_image']
        user.save()
        return JsonResponse({'success':'Image updated'})


class change_password(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            user = UserModel.objects.get(email=request.POST['email'])
            if user.check_password(request.POST['current_password']):
                user.set_password(request.POST['new_password'])
                user.save()
                return Response({'success':'Password updated succesfully'})
            elif not user.check_password(request.POST['current_password']):
                return Response({'PasswordError':'Wrong password'})
        except UserModel.DoesNotExist:
            return Response({'EmailError':'Invalid session'})


class delete_account(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            user = UserModel.objects.get(email=request.POST['email'])
            if user.check_password(request.POST['password']):
                user.delete()
                return Response({'success':'Account deleted succesfully'})
            elif not user.check_password(request.POST['password']):
                return Response({'PasswordError':'Wrong password'})

        except UserModel.DoesNotExist:
            return Response({'EmailError':'Invalid Email'})

class view_profile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        return Response({'profile':self})