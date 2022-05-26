from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from board.models import Board
from pin.models import Category, Note, Pin, Section

from .serializers import (CategorySerializer, NoteSerializer, PinSerializer,
                          SectionSerializer)


@api_view(['POST'])
def link_board(request):
    if request.method == 'POST':
        pin_id = int(request.data.dict().get('pin_id'))
        board_id = int(request.data.dict().get('board_id'))

        board = Board.objects.get(pk=board_id)
        pin = Pin.objects.get(pk=pin_id)
        board.pins.add(pin)

        return JsonResponse("Successfully added to board", safe=False)


@api_view(['POST'])
def pin_create(request):
    if request.method == 'POST':
        temp = request.data
        temp = temp.dict()
        board_id = temp.get("board_id")
        serializer = PinSerializer(data=request.data, context={
                                   'board_id': board_id})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Read


@api_view(["GET"])
def pin_list(request):
    pins = Pin.objects.all()

    serialized_pins = PinSerializer(
        instance=pins, many=True, context={"request": request})
    return Response(data=serialized_pins.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([])
def single_pin(request, pk):
    try:
        pin = Pin.objects.get(pk=pk)
    except Exception as e:
        return Response(data={"msg": "this pin does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    serializer_context = {'request': request}
    serialized_pin = PinSerializer(instance=pin, context=serializer_context)

    return Response(data=serialized_pin.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([])
def user_pins(request, user_id):
    try:
        pins = Pin.objects.select_related(
            "UserProfile").filter(owner__id=user_id)
    except Exception as e:
        return Response(data={"msg": "failed to fetch this users' pins"}, status=status.HTTP_400_BAD_REQUEST)

    serialized_pins = PinSerializer(instance=pins, many=True)

    return Response(data=serialized_pins.data, status=status.HTTP_200_OK)


@api_view(["PUT", "PATCH"])
def update_pin(request, pk):
    try:
        pin = Pin.objects.get(pk=pk)
    except Exception as e:
        return Response(data={"msg": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    serialized_pin = PinSerializer(instance=pin, data=request.data)
    if serialized_pin.is_valid():
        serialized_pin.save()
        return Response(serialized_pin.data, status=status.HTTP_200_OK)

    return Response(serialized_pin.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_pin(request, pk):
    res = {}
    try:
        pin = Pin.objects.get(pk=pk)
        pin.delete()
        res['data'] = 'Successfully deleted the pin'
        res['status'] = status.HTTP_200_OK
    except Exception as e:
        res['data'] = 'Error While Deleting: {}'.format(str(e))
        res['status'] = status.HTTP_400_BAD_REQUEST

    return Response(data=res.get('data'), status=res.get('status'))


@api_view(['POST'])
def note_create(request, pin_id):
    if request.method == 'POST':
        data = request.data
        serializer = NoteSerializer(data=data, context={'pin_id': pin_id})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
def update_note(request, pk):
    try:
        note = Note.objects.get(pk=pk)
    except Exception as e:
        return Response(data={"msg": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    serialized_note = NoteSerializer(instance=note, data=request.data)
    if serialized_note.is_valid():
        serialized_note.save()
        return Response(serialized_note.data, status=status.HTTP_200_OK)

    return Response(serialized_note.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_note(request, pk):
    res = {}
    try:
        note = Note.objects.get(pk=pk)
        note.delete()
        res['data'] = 'Successfully deleted the note'
        res['status'] = status.HTTP_200_OK
    except Exception as e:
        res['data'] = 'Error While Deleting: {}'.format(str(e))
        res['status'] = status.HTTP_400_BAD_REQUEST

    return Response(data=res.get('data'), status=res.get('status'))


@api_view(['POST'])
def category_create(request, pin_id):

    if request.method == 'POST':
        data = request.data
        serializer = CategorySerializer(data=data, context={'pin_id': pin_id})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
def update_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Exception as e:
        return Response(data={"msg": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    serialized_category = CategorySerializer(
        instance=category, data=request.data)
    if serialized_category.is_valid():
        serialized_category.save()
        return Response(serialized_category.data, status=status.HTTP_200_OK)

    return Response(serialized_category.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_category(request, pk):
    res = {}
    try:
        category = Category.objects.get(pk=pk)
        category.delete()
        res['data'] = 'Successfully deleted the category'
        res['status'] = status.HTTP_200_OK
    except Exception as e:
        res['data'] = 'Error While Deleting: {}'.format(str(e))
        res['status'] = status.HTTP_400_BAD_REQUEST

    return Response(data=res.get('data'), status=res.get('status'))


@api_view(['POST'])
def section_create(request, pin_id):

    if request.method == 'POST':
        data = request.data
        serializer = SectionSerializer(data=data, context={'pin_id': pin_id})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "PATCH"])
def update_section(request, pk):
    try:
        section = Section.objects.get(pk=pk)
    except Exception as e:
        return Response(data={"msg": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    serialized_section = SectionSerializer(instance=section, data=request.data)
    if serialized_section.is_valid():
        serialized_section.save()
        return Response(serialized_section.data, status=status.HTTP_200_OK)

    return Response(serialized_section.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_section(request, pk):
    res = {}
    try:
        section = Section.objects.get(pk=pk)
        section.delete()
        res['data'] = 'Successfully deleted the section'
        res['status'] = status.HTTP_200_OK
    except Exception as e:
        res['data'] = 'Error While Deleting: {}'.format(str(e))
        res['status'] = status.HTTP_400_BAD_REQUEST

    return Response(data=res.get('data'), status=res.get('status'))
