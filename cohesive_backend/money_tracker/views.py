from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import UserSerializer, TransactionSerializer, LogSerializer, ProfileSerializer
from django.http.response import JsonResponse
from .models import Profile, Transaction, Log
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from django.http import JsonResponse
from django.core.serializers import serialize

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):

    # authentication_classes = [ TokenAuthentication, ]
    # permission_classes = [ IsAuthenticated, ]
    queryset = User.objects.all()
    serializer_class =  UserSerializer

class ProfileView(APIView):

    authentication_classes = [ TokenAuthentication, ]
    permission_classes = [ IsAuthenticated, ]

    def get_profile(self, pk):
        try:
            profile = Profile.objects.get(user=pk)
            return profile
        except Profile.DoesNotExist():
            raise Http404 

    def get(self, request, pk=None):
        if pk:
            data = self.get_profile(pk)
            serializer = ProfileSerializer(data)
        else:
            # data = Profile.objects.all()
            data = Profile.objects.filter(user=request.user.id)
            data1 = data[0].friends.all()
            newData = []
            for i in data1:
                newData.append(i.username)
            serializer = ProfileSerializer(data, many=True)
            serializer.data[0]['friends'] = newData
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data
        print(request.user.id)
        data['user'] = request.user.id
        serializer = ProfileSerializer(data=data)
    
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Profile Created Successfully!", safe=False)
        return JsonResponse("Failed To Create A New Profile!", safe=False)

    def put(self, request):
        data=request.data

        profile = Profile.objects.filter(user=request.user.id)
        profileFriends = profile[0].friends.all()
        prevFriends = []
        for i in profileFriends:
            prevFriends.append(i.username)
        print(prevFriends)
        prevBudget = profile[0].budget
        print(prevBudget)
        prevExpenditure = profile[0].expenditure
        print(prevExpenditure)

        data["user"] = request.user.id
        # print(data["friends"])
        # print(data["budget"])

        if "friends" in request.data:        
            profile_to_update = Profile.objects.get(user=request.user.id)
            print(profile_to_update)
            profile_to_update.friends.add(User.objects.get(id=data["friends"]))
            print("Check 1")
            # data["friends"] = int(data["friends"])
            serializer = ProfileSerializer(instance=profile_to_update, data=data, partial=True)
            print("Check 2")
            print(serializer) 
            if serializer.is_valid():
                print("is here")
                serializer.save()
                return JsonResponse("Friend Added Successfully!", safe=False)
            return JsonResponse("Failed To Add Friend!", safe=False)
            
        if "budget" in request.data:
            profile_to_update = Profile.objects.get(user=request.user.id)
            print(profile_to_update)
            serializer = ProfileSerializer(instance=profile_to_update, data=data, partial=True)
            print(serializer)
            if serializer.is_valid():
                print("is here")
                serializer.save()
                return JsonResponse("Budget Added Successfully!", safe=False)
            return JsonResponse("Failed To Add Budget!", safe=False)
        return JsonResponse("Failed To Add !", safe=False)

    def delete(self, request):
        transaction_to_delete = Profile.objects.get(user=request.user.id)
        transaction_to_delete.delete()
        return JsonResponse("Profile Deleted Successfully!", safe=False)
    

class TransactionView(APIView):

    authentication_classes = [ TokenAuthentication, ]
    permission_classes = [ IsAuthenticated, ]

    def get_transaction(self, pk):
        try:
            transaction = Transaction.objects.get(transactionId=pk)
            return transaction
        except Transaction.DoesNotExist():
            raise Http404 

    def get(self, request, pk=None):
        print(request.user)
        print(request.user.id)
        if pk:
            data = self.get_transaction(pk)
            serializer = TransactionSerializer(data)
        else:
            data = Transaction.objects.filter(createdBy=request.user.id)
            print(data)
            serializer = TransactionSerializer(data, many= True)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data
        print(data)
        data['createdBy'] = request.user.id
        # data['createdBy'] = User.objects.get(id=int(data['createdBy'])).username
        # print(data)
        transId = 0
        flag = False
        payers = data['payers'].split(',')
        no_of_payers = len(data['payers'].split(','))
        data['amount'] = float(data['totalAmount'])/no_of_payers
        serializer = TransactionSerializer(data=data)
        if serializer.is_valid():
            n = serializer.save()
            transId = n.transactionId
        data['transactionId'] = transId
        del data['category']
        del data['totalAmount']
        del data['createdBy']
        for uid in payers:
            data['payers'] = uid
            serializer = LogSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                continue
            else:
                flag=True
                break
        if flag:
            return JsonResponse("Failed To Create A New Transaction!", safe=False)
        return JsonResponse("Transaction Created Successfully!", safe=False)
        
    def put(self, request, pk=None):
        # transaction_to_update = Transaction.objects.get(transactionId=pk)
        # serializer = TransactionSerializer(instance=transaction_to_update, data=request.data, partial=True)

        # if serializer.is_valid():
        #     serializer.save()
        #     return JsonResponse("Transaction Data Updated Successfully!", safe=False)
        # return JsonResponse("Failed To Update The Transaction!", safe=False)
        transaction_to_update = Transaction.objects.get(transactionId=pk)
        print(transaction_to_update, type(transaction_to_update))
        data = request.data            
        serializer = TransactionSerializer(instance=transaction_to_update, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        payers = data['payers'].split(',')
        no_of_payers = len(data['payers'].split(','))
        data['amount'] = data['totalAmount']/no_of_payers
        del data['category']
        del data['totalAmount']
        del data['createdBy']
        del data['payers'] 
        mydata = Log.objects.filter(transactionId=pk).values()
        print(mydata)
        existing_payers = []
        print(payers)
        try:
            for x in mydata:
                print(x)
                print(x['payers'])
                existing_payers.append(x['payers'])
                if x['payers'] not in payers:
                    log_to_delete = Log.objects.get(logId=x['logId'])
                    log_to_delete.delete()
                else:
                    data['payers'] = x['payers']
                    ins = x['logId']
                    serializer1 = LogSerializer(instance=ins, data=data, partial=True)
                    if serializer1.is_valid():
                        serializer1.save()
            print(existing_payers)
            for x in payers:
                if x not in existing_payers:
                    data['transactionId'] = pk
                    data['payers'] = x
                    serializer1 = LogSerializer(data=data)
                    if serializer1.is_valid():
                        serializer1.save()
            return JsonResponse("Transaction Created Successfully!", safe=False)
        except:
            return JsonResponse("Failed To Create A New Transaction!", safe=False) 
            

    def delete(self, request, pk=None):
        transaction_to_delete = Transaction.objects.get(transactionId=pk)
        transaction_to_delete.delete()
        return JsonResponse("Transaction Deleted Successfully!", safe=False)

class LogView(APIView):

    authentication_classes = [ TokenAuthentication, ]
    permission_classes = [ IsAuthenticated, ]

    def get_log(self, pk):
        try:
            log = Log.objects.get(logId=pk)
            return log
        except Log.DoesNotExist():
            raise Http404 

    def get(self, request, pk=None):
        if pk:
            data = self.get_log(pk)
            serializer = LogSerializer(data)
        else:
            data = Log.objects.all()
            serializer = LogSerializer(data, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data
        serializer = LogSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Log Created Successfully!", safe=False)
        return JsonResponse("Failed To Create A New Log!", safe=False)

    def put(self, request, pk=None):
        log_to_update = Log.objects.get(logId=pk)
        serializer = LogSerializer(instance=log_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Log Data Updated Successfully!", safe=False)
        return JsonResponse("Failed To Update The Log!", safe=False)

    def delete(self, request, pk=None):
        transaction_to_delete = Log.objects.get(logId=pk)
        transaction_to_delete.delete()
        return JsonResponse("Log Deleted Successfully!", safe=False)
