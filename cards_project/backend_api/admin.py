from django.contrib import admin

# Register your models here.
from .models import (
    ProjectLine, 
    Chips, 
    TestKeys, 
    Banks, 
    BankEmployees, 
    LinesFiles,
    ProcessList,
    ProcessData,
    PaymentSystems,
    CardsCategories
    
)

admin.site.register(ProjectLine)
admin.site.register(Chips)
admin.site.register(TestKeys)
admin.site.register(Banks)
admin.site.register(BankEmployees)
admin.site.register(LinesFiles)
admin.site.register(ProcessList)
admin.site.register(ProcessData)
admin.site.register(PaymentSystems)
admin.site.register(CardsCategories)
# admin.site.register(OrderLine)
