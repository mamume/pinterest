import dj_database_url

from .common import *

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = ['pinterest-mamume.herokuapp.com']

DATABASES = {
    'default': dj_database_url.config(conn_max_age=500)
}
