from django.shortcuts import get_object_or_404
from rest_framework import serializers

from board.models import Board
from pin.models import Category, Note, Pin, Section


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

    def create(self, validated_data):
        note = Note.objects.create(**validated_data)
        return note


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

    def create(self, validated_data):
        section = Section.objects.create(**validated_data)
        return section


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['title', 'id', 'owner']


class PinSerializer(serializers.ModelSerializer):
    board = serializers.SerializerMethodField("get_board")

    class Meta:
        model = Pin
        fields = '__all__'

    def create(self, validated_data):
        try:
            boards = get_object_or_404(Board, pk=self.context.get("board_id"))
            pin = Pin.objects.create(**validated_data)
            boards.pins.add(pin)
        except:
            pin = Pin.objects.create(**validated_data)

        return pin

    def get_board(self, instance: Pin):
        try:
            board = Board.objects.filter(pins=instance)[0]
            return BoardSerializer(board).data
        except:
            return "None"
