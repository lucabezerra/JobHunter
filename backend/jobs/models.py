from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django_extensions.db.models import TimeStampedModel


# class User(AbstractUser, TimeStampedModel):
#     pass


class SearchRecord(models.Model):
    # locations
    BEIJING = 'Beijing'
    CHICAGO = 'Chicago'
    LONDON = 'London'
    PARIS = 'Paris'
    PHOENIX = 'Phoenix'
    SAN_FRANCISCO = 'San Francisco'
    # descriptions
    GO = 'Go'
    JAVASCRIPT = 'Javascript'
    JAVA = 'Java'
    PYTHON = 'Python'
    REACT = 'React'
    RUBY = 'Ruby'

    LOCATION_CHOICES = [
        (BEIJING, BEIJING),
        (CHICAGO, CHICAGO),
        (LONDON, LONDON),
        (PARIS, PARIS),
        (PHOENIX, PHOENIX),
        (SAN_FRANCISCO, SAN_FRANCISCO),
    ]

    DESCRIPTION_CHOICES = [
        (GO, GO),
        (JAVASCRIPT, JAVASCRIPT),
        (JAVA, JAVA),
        (PYTHON, PYTHON),
        (REACT, REACT),
        (RUBY, RUBY),
    ]


    time = models.DateTimeField(auto_now_add=True)
    description = models.CharField(choices=DESCRIPTION_CHOICES, max_length=20)
    location = models.CharField(choices=LOCATION_CHOICES, max_length=20)
    ip_address = models.GenericIPAddressField()
