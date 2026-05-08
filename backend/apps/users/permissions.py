from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    
    def has_permission(self, request, view):
        return request.user.role == 'ADMIN'


class IsAdminOrSelf(BasePermission):

    def has_object_permission(self, request, view, obj):

        return (
            request.user.role == 'ADMIN'
            or obj == request.user
        )
    

class isTeacher(BasePermission):
    
    def has_permission(self, request, view):
        return request.user.role == 'TEACHER'


class IsDirector(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == 'DIRECTOR'
    