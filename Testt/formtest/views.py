# |=============================================================|
# |===============|         BIBLIOTECAS         |===============|
# |=============================================================|

# |=========================================|
# |=====|       BIBLIOTECAS BASE      |=====|
# |=========================================|
from django.shortcuts import render,redirect
from django.http import JsonResponse

# |=========================================|
# |=====|       BIBLIOTECAS BASE      |=====|
# |=========================================|
from django.contrib import messages

# |=========================================|
# |=====|     BIBLILIOTECAS EXTRAS    |=====|
# |=========================================|

# |=========================================|
# |=====|     REFERENCIAS A MODELOS   |=====|
# |=========================================|
from .models import testform,question,answer,answerusr

# |=========================================|
# |=====|  REFERENCIAS A FORMULARIOS  |=====|
# |=========================================|
from .forms import AnswerusrForm

# |=============================================================|
# |===============|      COMIENZAN VISTAS       |===============|
# |=============================================================|

def formQuestion(request):
    questiontest = []
    data1_questiontest =  question.objects.all().filter(questionTestform=1)
    data2_anwsertest = answer.objects.all().filter()

    form1_answerToquestion = AnswerusrForm() 
    # |=============================================================|
    if request.method == 'POST':
        form1_answerToquestion = AnswerusrForm(request.POST)
        print('Aquí entro a post')
        # |=============================================================|
        if form1_answerToquestion.is_valid():
            print('Sí soy válido1')

            answerusrToquestion1 = request.POST['answerusrToquestion1']
            answerusrQuestion1 = question.objects.get(id = request.POST['answerusrQuestion1'] )  

            print(answerusrToquestion1)
            print(answerusrQuestion1)
            # |=============================================================|
            answerusr1= answerusr.objects.create(
                answerusrToquestion = answerusrToquestion1,
                answerusrQuestion = answerusrQuestion1,
                answerusrMember = request.user
              )
            print('Ya leí datos1')

            answerusr1.save()
            # |=============================================================|
            answerusrToquestion2 = request.POST['answerusrToquestion2']
            answerusrQuestion2 = question.objects.get(id = request.POST['answerusrQuestion2'] ) 

            print(answerusrToquestion2)
            print(answerusrQuestion2)
            # |=============================================================|
            answerusr2 = answerusr.objects.create(
                answerusrToquestion = answerusrToquestion2,
                answerusrQuestion = answerusrQuestion2,
                answerusrMember = request.user
              )
            print('Ya leí datos2')

            answerusr2.save()

        else:
            print('Válio madres')

    print('valio quezo')

    context = {
    'questiontest':data1_questiontest,
    'anwsertest': data2_anwsertest,
    'form': form1_answerToquestion,
        }
    return render(request, 'formtest/form.html', context)
