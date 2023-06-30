from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import HttpRequest
from rest_framework import routers
from django.urls import include, path


# from rest_framework.views import APIView


from .serializers import (
    BanksSerializer,
    ChipsSerializer,
    ProjectLineSerializer,
    ProjectLineListRetrieveSerializer,
    # OrderLineSerializer,
    PaymentSystemsSerializer,
    CardsCategoriesSerializer,
    ChipColorsSerializer,
    MaterialTypesSerializer,
    MaterialColorsSerializer,
    MagstripeColorsSerializer,
    EffectsSerializer,
    BankEmployeesSerializer,
    LinesFilesSerializer,
    ProcessListSerializer,
    ProcessDataSerializer,
)
from backend_api.models import (
    ProjectLine,
    # OrderLine, 
    Banks,
    Chips, 
    PaymentSystems, 
    CardsCategories, 
    ChipColors, 
    MaterialTypes, 
    MaterialColors, 
    MagstripeColors,
    Effects,
    BankEmployees,
    LinesFiles,
    ProcessList,
    ProcessData,
    )

class ProjectLineViewSet(viewsets.ModelViewSet):
    
    queryset = ProjectLine.objects.all()
    serializer_class = ProjectLineSerializer

    action_to_serializer = {
        "list": ProjectLineListRetrieveSerializer,
        "retrieve": ProjectLineListRetrieveSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(self.action, self.serializer_class)     
        
class BanksSet(viewsets.ModelViewSet):
    
    queryset = Banks.objects.all()
    serializer_class = BanksSerializer

class ChipsSet(viewsets.ModelViewSet):
    
    queryset = Chips.objects.all()
    serializer_class = ChipsSerializer

class PaymentSystemsSet(viewsets.ModelViewSet):
    
    queryset = PaymentSystems.objects.all()
    serializer_class = PaymentSystemsSerializer

class CardsCategoriesSet(viewsets.ModelViewSet):
    
    queryset = CardsCategories.objects.all()
    serializer_class = CardsCategoriesSerializer
    
class ChipColorsSet(viewsets.ModelViewSet):
    
    queryset = ChipColors.objects.all()
    serializer_class = ChipColorsSerializer
    
class MaterialTypesSet(viewsets.ModelViewSet):
    
    queryset = MaterialTypes.objects.all()
    serializer_class = MaterialTypesSerializer

class MaterialColorsSet(viewsets.ModelViewSet):
    
    queryset = MaterialColors.objects.all()
    serializer_class = MaterialColorsSerializer

class MagstripeColorsSet(viewsets.ModelViewSet):
    
    queryset = MagstripeColors.objects.all()
    serializer_class = MagstripeColorsSerializer

class EffectsSet(viewsets.ModelViewSet):
    
    queryset = Effects.objects.all()
    serializer_class = EffectsSerializer
    
class BankEmployeesSet(viewsets.ModelViewSet):
    
    queryset = BankEmployees.objects.all()
    serializer_class = BankEmployeesSerializer

class ProcessListSet(viewsets.ModelViewSet):
    
    queryset = ProcessList.objects.all()
    serializer_class = ProcessListSerializer
    
class LinesFilesSet(viewsets.ModelViewSet):
    
    queryset = LinesFiles.objects.all()
    serializer_class = LinesFilesSerializer
    
    def post(self, request, *args, **kwargs):
        file = request.data['file']
        name = request.data['name']
        # project_line = request.data['project_line']
        LinesFiles.objects.create(name=name, file=file)
        return HttpRequest({'message': 'Okey'}, status=200)
    
    def put(self, request, pk):
        try:
            files = LinesFiles.objects.get(pk=pk)
        except LinesFiles.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = LinesFilesSerializer(files, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

class ProcessDataSet(viewsets.ModelViewSet):
    
    queryset = ProcessData.objects.all()
    serializer_class = ProcessDataSerializer
    
    def post(self, request, *args, **kwargs):
        line_type = request.data['line_type']
        line_number = request.data['line_number']
        process_step = request.data['process_step']
        step_status = request.data['step_status']
        step_comment = request.data['step_comment']
        # project_line = request.data['project_line']
        ProcessData.objects.create(
            line_type=line_type, 
            line_number=line_number, 
            process_step=process_step, 
            step_status=step_status,
            step_comment=step_comment
            )
        return HttpRequest({'message': 'Okey'}, status=200)
    
    def put(self, request, pk):
        try:
            current_data = ProcessData.objects.get(pk=pk)
        except ProcessData.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ProcessDataSerializer(current_data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# создание Views для процесса подготовки карт в цикле (из списка в ProcessList)    
process_list_objects = ProcessList.objects.all()                          # получение данных из модели со списком процессов
processes = [obj.url_name for obj in process_list_objects]                # создание списка из полученных данных модели
urls_list = []                                                            # пустой список для будущих данных для Url          
for process in processes:                                                 # динамическое создание Views и Urls из списка значений
    queryset = LinesFiles.objects.filter(process_step=process)            # настраиваем queryset в зависимости от полученного названия из списка
    viewset_name = f"{process.capitalize()}ViewSet"                       # создаем имя нового ViewSet
    viewset = type(viewset_name, (viewsets.ModelViewSet,), {              # создаем новый ViewSet
        'queryset': queryset,
        'serializer_class': LinesFilesSerializer
    })
    urls_list.append([process, viewset, process])                         # добавляем данные в список для отправки в Url

  