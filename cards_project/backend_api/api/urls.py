from django.urls import path
from rest_framework import routers

from .views import (
    ProjectLineViewSet, 
    # OrderLineViewSet, 
    BanksSet,
    ChipsSet, 
    PaymentSystemsSet,
    CardsCategoriesSet, 
    ChipColorsSet,
    MaterialTypesSet,
    MaterialColorsSet,
    MagstripeColorsSet,
    EffectsSet,
    BankEmployeesSet,
    LinesFilesSet,
    ProcessListSet,
    ProcessDataSet,

    urls_list
    )

# router = routers.SimpleRouter()
router = routers.DefaultRouter()

router.register('projects', ProjectLineViewSet, basename='projects')
# router.register('orders', OrderLineViewSet, basename='orders')
router.register('banks', BanksSet, basename='banks')
router.register('chips', ChipsSet, basename='chips')
router.register('payment-systems', PaymentSystemsSet, basename='payment-systems')
router.register('cards-categories', CardsCategoriesSet, basename='cards-categories')
router.register('chip-colors', ChipColorsSet, basename='chip-colors')
router.register('material-types', MaterialTypesSet, basename='material-types')
router.register('material-colors', MaterialColorsSet, basename='material-colors')
router.register('magstripe-colors', MagstripeColorsSet, basename='magstripe-colors')
router.register('effects', EffectsSet, basename='effects')
router.register('bank-employees', BankEmployeesSet, basename='bank-employees')
router.register('files', LinesFilesSet, basename='files')
router.register('process-list', ProcessListSet, basename='process-list')
router.register('process-data', ProcessDataSet, basename='process-data')

[router.register(item[0], item[1], basename=item[2]) for item in urls_list]                 # автоматическое создание url исходя из полученного списка из Views

urlpatterns = []
urlpatterns += router.urls
