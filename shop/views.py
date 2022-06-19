from rest_framework import generics,mixins,viewsets,views
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# Create your views here.

class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductsSerializer
    lookup_field = 'id'

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

class CategoryView(viewsets.ViewSet):
    def list(self,request):
        query =  Category.objects.all().order_by('-id')
        serializers = CategorySerializer(query,many=True)
        return Response(serializers.data)
    def retrieve(self,request,pk=None):
        queryset = Category.objects.get(id=pk)
        serializers = CategorySerializer(queryset)
        serializers_data = serializers.data
        all_data = []
        category_products = Product.objects.filter(category_id=serializers_data['id'])
        category_product_serializer =  ProductsSerializer(category_products,many=True)
        serializers_data['category_products_me'] = category_product_serializer.data
        all_data.append(serializers_data)
        return Response(all_data)


class ProfileView(views.APIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    def get(self,request):
        try:
            query = Profile.objects.get(prouser=request.user)
            serializers = ProfileSerializer(query)
            response_msg = {'error':False,'data':serializers.data}

        except:
            response_msg = {'error':True,'message':'Somthing is Wrong'}

