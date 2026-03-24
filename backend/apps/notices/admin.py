from django.contrib import admin
from .models import Notice, NoticeType, NoticeDuration

admin.site.register(Notice)
admin.site.register(NoticeType)
admin.site.register(NoticeDuration)