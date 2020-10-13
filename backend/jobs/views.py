import json
import requests

from django.http import JsonResponse

from .models import SearchRecord


def search(request):
    description = request.GET.get('description')
    location = request.GET.get('location')
    page = request.GET.get('page')
    query_string = {}
    if description:
        query_string['description'] = description
    if location:
        query_string['location'] = location
    if page:
        query_string['page'] = page

    response = requests.get(
        'https://jobs.github.com/positions.json',
        params=query_string,
    )
    return JsonResponse({'results': response.json()})


def populate_frontend(request):
    response = {
        'locations': [
            SearchRecord.BEIJING,
            SearchRecord.CHICAGO,
            SearchRecord.LONDON,
            SearchRecord.PARIS,
            SearchRecord.PHOENIX,
            SearchRecord.SAN_FRANCISCO,
        ],
        'descriptions': [
            SearchRecord.GO,
            SearchRecord.JAVA,
            SearchRecord.JAVASCRIPT,
            SearchRecord.PYTHON,
            SearchRecord.REACT,
            SearchRecord.RUBY,
        ]
    }

    return JsonResponse(response)
