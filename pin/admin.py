from django.contrib import admin

from .models import (Category, Note, Pin, PinCategory, PinNote, PinSection,
                     Section)

# Register your models here.
admin.site.register(Pin)
admin.site.register(PinNote)
admin.site.register(Category)
admin.site.register(PinCategory)
admin.site.register(PinSection)
admin.site.register(Note)
admin.site.register(Section)
