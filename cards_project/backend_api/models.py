import os
from django.db import models
import datetime

# # Create your models here.
    
class Countries(models.Model):
    short_name = models.CharField(max_length=255)
    name_eng = models.CharField(max_length=255)
    name_rus = models.CharField(max_length=255)

class Processing(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Countries, on_delete=models.CASCADE,  null=False)

class Hosts(models.Model):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Countries, on_delete=models.CASCADE, null=False)

class Banks(models.Model):
    name_eng = models.CharField(max_length=255, null=False)
    name_rus = models.CharField(max_length=255, null=True)
    full_name_eng = models.CharField(max_length=255, null=True, blank=True)
    full_name_rus = models.CharField(max_length=255, null=True, blank=True)
    address_eng = models.CharField(max_length=255, null=True, blank=True)
    address_rus = models.CharField(max_length=255, null=True, blank=True)
    country = models.ForeignKey(Countries, on_delete=models.CASCADE, null=False, blank=False)
    processing = models.ForeignKey(Processing, on_delete=models.CASCADE, null=True, blank=True)
    host = models.ForeignKey(Hosts, on_delete=models.CASCADE, null=True, blank=True)
    tolerance = models.IntegerField(null=True, blank=True)

class BankEmployees(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=255, null=True)
    bank = models.ForeignKey(Banks, on_delete=models.CASCADE, null=False)
    other = models.CharField(max_length=255, null=True)

class PaymentSystems(models.Model):
    name = models.CharField(max_length=255)
    
class TestKeys(models.Model):
    test_number = models.CharField(max_length=255)
    kcv_test = models.CharField(max_length=255)

class ChipColors(models.Model):
    name = models.CharField(max_length=255)

class Chips(models.Model):
    short_name = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    test_key = models.ForeignKey(TestKeys, on_delete=models.CASCADE, null=True)
    payment_system = models.ForeignKey(PaymentSystems, on_delete=models.CASCADE, null=False)

class Datasheets(models.Model):
    name = models.CharField(max_length=255)

class ChipDatasheets(models.Model):
    chip = models.ForeignKey(Chips, on_delete=models.CASCADE, null=False)
    datasheet = models.ForeignKey(Datasheets, on_delete=models.CASCADE, null=False)
    active = models.BooleanField()

class EMV(models.Model):
    name = models.CharField(max_length=255)
    time_stamp = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=False)
    actual_date_time = models.DateTimeField(auto_now=False)
    chip = models.ForeignKey(Chips, on_delete=models.CASCADE, null=False)

class KCVKeys(models.Model):
    name = models.CharField(max_length=255)
    active = models.BooleanField()
    bank = models.ForeignKey(Banks, on_delete=models.CASCADE, null=False)

class Statuses(models.Model):
    name = models.CharField(max_length=255)

class BanksChips(models.Model):
    bank = models.ForeignKey(Banks, on_delete=models.CASCADE, null=False)
    chip = models.ForeignKey(Chips, on_delete=models.CASCADE, null=False)
    status = models.ForeignKey(Statuses, on_delete=models.CASCADE, null=False)

class MaterialTypes(models.Model):
    name = models.CharField(max_length=255)

class MaterialColors(models.Model):
    name = models.CharField(max_length=255)

class MagstripeColors(models.Model):
    name = models.CharField(max_length=255)

class Effects(models.Model):
    name = models.CharField(max_length=255)

class CardsCategories(models.Model):
    name = models.CharField(max_length=255)
    payment_system = models.ForeignKey(PaymentSystems, on_delete=models.CASCADE, null=False)



# class OrderLine(models.Model):

class ProcessList(models.Model):
    url_name = models.CharField(max_length=255)
    component_name = models.CharField(max_length=255)
    position_number = models.IntegerField()

class ProjectLine(models.Model):
        
    def upload_PreviewFiles(instance, filname):
        main_folder = 'Превью'
        line_type = 'Проект'
            
        country = instance.bank.country.name_rus
        bank_name = instance.bank.name_eng
        year = str(datetime.datetime.now().year)
        
        return '/'.join([main_folder, line_type, country, bank_name, year, filname])
    
    number = models.SlugField(unique=True, blank=True, null=True) # изменить на автоматическое заполнение
    general_line_status = models.CharField(max_length=255, default='Проект', blank=True, null=True)
    bank = models.ForeignKey(Banks, on_delete=models.CASCADE, blank=True, null=True)
    bank_employee = models.ForeignKey(BankEmployees, on_delete=models.CASCADE, blank=True, null=True)
    payment_system = models.ForeignKey(PaymentSystems, on_delete=models.CASCADE, blank=True, null=True)
    card_category = models.ForeignKey(CardsCategories, on_delete=models.CASCADE, blank=True, null=True)
    card_name = models.CharField(max_length=255, blank=True, null=True)
    card_code = models.CharField(max_length=255, blank=True, null=True) 
    card_revision = models.CharField(max_length=255, blank=True, null=True) 
    card_qty = models.IntegerField(blank=True, null=True)
    card_qty_fact = models.IntegerField(blank=True, null=True) 
    chip = models.ForeignKey(Chips, on_delete=models.CASCADE, blank=True, null=True)
    chip_color = models.ForeignKey(ChipColors, on_delete=models.CASCADE, blank=True, null=True)
    material_type = models.ForeignKey(MaterialTypes, on_delete=models.CASCADE, blank=True, null=True)
    material_color = models.ForeignKey(MaterialColors, on_delete=models.CASCADE, blank=True, null=True)    
    magstripe_color = models.ForeignKey(MagstripeColors, on_delete=models.CASCADE, blank=True, null=True)    
    card_effects = models.CharField(max_length=255, blank=True, null=True)
    bank_communication = models.TextField(blank=True, null=True)
    vendor_communication = models.TextField(blank=True, null=True) 
    general_comment = models.TextField(blank=True, null=True) 
    created_by_name = models.CharField(max_length=255, blank=True, null=True) 
    created_date = models.DateTimeField(auto_now=True)
    modified_by_name = models.CharField(max_length=255, blank=True, null=True) 
    modified_date = models.CharField(max_length=255, blank=True, null=True) 
    in_archive = models.BooleanField(default=False)
    preview_image = models.FileField(max_length=250, upload_to=upload_PreviewFiles, default='/Превью/Empty.png', blank=True, null=True)

    def __str__(self):
        return f"{self.bank.name_eng} {self.payment_system.name} {self.card_category.name} {self.card_name}"
        
class LinesFiles(models.Model):
    
    def upload_LinesFiles(instance, filname):
        if instance.line_type == 'projects':
            line_type = ProjectLine.objects.get(id=instance.line_number)
                
        if instance.process_step == 'input-pictures':
            process_step = "Исходники"
        elif instance.process_step == 'offers':
            # main_process_folder = "Дизайны"
            process_step = "КП"
        elif instance.process_step == 'contracts':
            process_step = "Договора"
        elif instance.process_step == 'annexes':
            process_step = "Приложения"
        elif instance.process_step == 'payments':
            process_step = "Оплаты"
        elif instance.process_step == 'purchase-orders':
            process_step = "PO"
        elif instance.process_step == 'tests':
            process_step = "Тестирования"
        elif instance.process_step == 'proofs':
            process_step = "Пруфы"
        elif instance.process_step == 'production':
            process_step = "Производство"
        elif instance.process_step == 'deliveries':
            process_step = "Доставка"                      
            
        country = line_type.bank.country.name_rus
        bank_name = line_type.bank.name_eng
        year = str(datetime.datetime.now().year)

        return '/'.join([process_step, country, bank_name, year, filname])
    
    file = models.FileField(upload_to=upload_LinesFiles)
    name = models.CharField(max_length=255, blank=False)
    file_extension = models.CharField(max_length=255, blank=True)
    line_type = models.CharField(max_length=255, blank=False)
    process_step = models.CharField(max_length=255, blank=False)
    line_number = models.IntegerField(blank=False)  
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255, default="Активен", blank=False)
    # created_by
    
    def save(self, *args, **kwargs):
             
        if not self.file_extension:
            filename, extension = os.path.splitext(self.file.name)
            self.file_extension = extension.lstrip('.')
            
        super().save(*args, **kwargs)
        
class ProcessData(models.Model):
    line_type = models.CharField(max_length=255, blank=False)
    line_number = models.IntegerField(blank=False) # нужно ли сделать поле по ключу?
    process_step = models.CharField(max_length=255, blank=False) # нужно ли сделать поле по ключу?
    step_status = models.CharField(max_length=255, blank=False) # нужно ли сделать поле по ключу?
    # modified_date = models.CharField(max_length=255, blank=True, null=True) # автоматическая дата, но с возможностью обновлять
    # modified_by_name = models.CharField(max_length=255, blank=True, null=True) # автоматическое поле
    step_comment = models.TextField(null=True, blank=True)
    