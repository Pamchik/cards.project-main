from rest_framework import serializers

from ..models import (
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
    Countries,
    BankEmployees,
    LinesFiles,
    ProcessList,
    ProcessData,
    )

class CountriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Countries
        fields = '__all__'

class BanksSerializer(serializers.ModelSerializer):

    country = CountriesSerializer()
    
    class Meta:
        model = Banks
        fields = '__all__'

class EffectsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Effects
        fields = '__all__'

class MagstripeColorsSerializer(serializers.ModelSerializer):

    class Meta:
        model = MagstripeColors
        fields = '__all__'       



class PaymentSystemsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PaymentSystems
        fields = ('id', 'name')
        
class ChipsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Chips
        fields = '__all__'        

class CardsCategoriesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CardsCategories
        fields = '__all__'

class ChipColorsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ChipColors
        fields = ('id', 'name')

class MaterialTypesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MaterialTypes
        fields = ('id', 'name')

class MaterialColorsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = MaterialColors
        fields = '__all__' 

class LinesFilesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LinesFiles
        fields = '__all__'  

class ProjectLineSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProjectLine
        fields = '__all__' 
        
class BankEmployeesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BankEmployees
        fields = '__all__' 

class ProcessListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProcessList
        fields = '__all__' 

class ProcessDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProcessData
        fields = '__all__' 
        
class ProjectLineListRetrieveSerializer(serializers.ModelSerializer):
    
    bank = BanksSerializer()
    bank_employee = BankEmployeesSerializer()
    payment_system = PaymentSystemsSerializer()
    card_category = CardsCategoriesSerializer()
    chip = ChipsSerializer()
    chip_color = ChipColorsSerializer()
    material_type = MaterialTypesSerializer()
    material_color = MaterialColorsSerializer()
    magstripe_color = MagstripeColorsSerializer()

    class Meta:
        model = ProjectLine
        fields = '__all__'



        


        
