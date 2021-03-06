
from urllib import response
from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


User = get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password',
                  'first_name', 'last_name', 'email')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        reed_only_fields = ['prouser']

    def validate(self, attrs):

        attrs['prouser'] = self.context['request'].user

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['prouser'] = UserSerializer(instance.prouser).data
        return response
