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
