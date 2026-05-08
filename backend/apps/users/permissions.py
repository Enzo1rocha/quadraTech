from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN'
    

class isTeacher(BasePermission):
    
    def has_permission(self, request, view):
        return request.user.role == 'TEACHER'


class IsDirector(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == 'DIRECTOR'
    