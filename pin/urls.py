
from django.urls import path

from . import views

urlpatterns = [
    path('create', views.pin_create),
    path('link_board', views.link_board),
    path('pins/', views.pin_list),
    path('<int:pk>/', views.single_pin),
    path('<int:user_id>/', views.user_pins),
    path('update/<int:pk>/', views.update_pin),
    path('delete/<int:pk>/', views.delete_pin),
    path('<int:pin_id>/pin_notes', views.note_create),
    path('<int:pin_id>/pin-note/update/<int:pk>/', views.update_note),
    path('<int:pin_id>/pin-note/delete/<int:pk>/', views.delete_note),
    path('<int:pin_id>/pin_categories', views.category_create),
    path('<int:pin_id>/pin-category/update/<int:pk>/', views.update_category),
    path('<int:pin_id>/pin-category/delete/<int:pk>/', views.delete_category),
    path('<int:pin_id>/pin_sections', views.section_create),
    path('<int:pin_id>/pin-section/update/<int:pk>/', views.update_section),
    path('<int:pin_id>/pin-section/delete/<int:pk>/', views.delete_section),
]
