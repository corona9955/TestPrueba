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

def formQuestion(request,pk):
    questiontest = []
    data1_questiontest =  question.objects.all().filter(questionTestform=pk)
    data2_anwsertest = answer.objects.all().filter()

    get_countQuestion = []
    get_countQuestion = len(question.objects.all().filter(questionTestform=pk))

    print(get_countQuestion)

    form1_answerToquestion = AnswerusrForm() 
    # |=============================================================|
    if request.method == 'POST':
        form1_answerToquestion = AnswerusrForm(request.POST)
        print('Aquí entro a post')
        # |=============================================================|
        if form1_answerToquestion.is_valid():
            print('Sí soy válido1')
            # |=============================================================|
            for nQuestion in range(1,get_countQuestion+1):
                # |=============================================================|
                answerusrToquestionx = "answerusrToquestion" + str(nQuestion)
                answerusrQuestionx = "answerusrQuestion" + str(nQuestion)
                answerusrx = "answerusrx" + str(nQuestion)
                
                answerusrToquestion = request.POST[answerusrToquestionx]
                answerusrQuestion = question.objects.get(id = request.POST[answerusrQuestionx])  

                # |=============================================================|
                answerusrx = answerusr.objects.create(
                    answerusrToquestion = answerusrToquestion,
                    answerusrQuestion = answerusrQuestion,
                    answerusrMember = request.user
                )
                print('Ya leí datos1')
                answerusrx.save()
        else:
            print('Válio madres')
    print('valio quezo')
    context = {
    'questiontest':data1_questiontest,
    'anwsertest': data2_anwsertest,
    'count_question': get_countQuestion,
    'form': form1_answerToquestion,
        }
    return render(request, 'formtest/form.html', context)


def teachableMachine(request):
    context ={

    }
    return render(request, 'teachablemachine/teachable.html',context)