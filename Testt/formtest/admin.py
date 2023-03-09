from django.contrib import admin
from .models import testform,question,answer,answerusr

# Register your models here.

@admin.register(testform)
class testformList(admin.ModelAdmin):
    list_display = ["id","testName"]

@admin.register(question)
class questionList(admin.ModelAdmin):
    list_display = ["id","questionTittle"]

@admin.register(answer)
class answerList(admin.ModelAdmin):
    list_display = ["id","answerDescription"]

@admin.register(answerusr)
class answerusrList(admin.ModelAdmin):
    list_display = ["id","answerusrToquestion","answerusrMember"]
