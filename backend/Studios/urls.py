from django.urls import path

from .views import StudiosListView, NearMeGymsView, StudioDetailView

app_name = 'Studios'

urlpatterns = [
    path('all/', StudiosListView.as_view()),
    #path('nearme/', NearMeGymsView.as_view()),
    path('<int:studio_id>/', StudioDetailView.as_view()),
]
