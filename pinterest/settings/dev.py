import django_on_heroku

from .common import *

SECRET_KEY = "@z!0-qzw6t2y)_=n@4*#q+!r9pn2nhp@0@fptqc5at8#j#h(6&"
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'pinterest_db',
        'HOST': 'localhost',
        'USER': 'postgres',
        'PASSWORD': 'pass123',
        'PORT': '5432',
    }
}

STATIC_URL = '/static/'
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
MEDIA_URL = '/media/'

django_on_heroku.settings(locals())

BASE_DIR = Path(__file__).resolve().parent.parent.parent
