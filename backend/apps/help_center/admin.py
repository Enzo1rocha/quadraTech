from django.contrib import admin
from .models import HelpCategory, HelpArticle

# Register your models here.

admin.site.register(HelpCategory)
admin.site.register(HelpArticle)