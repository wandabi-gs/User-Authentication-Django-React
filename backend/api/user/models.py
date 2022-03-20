from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser,PermissionsMixin)
        
class UserManager(BaseUserManager):
    def create_superuser(self, email, password):
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True)
    first_name = models.CharField(max_length=100,blank=True,null=True)
    last_name = models.CharField(max_length=100,blank=True,null=True)
    gender = models.CharField(max_length=20,blank=True,null=True)
    image = models.ImageField(upload_to='profiles/',default='profiles/anonymous.png')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    objects = UserManager()
