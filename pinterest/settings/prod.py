import dj_database_url
import django_on_heroku

from .common import *

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = ['pinterest-mamume.herokuapp.com']

DATABASES = {
    'default': dj_database_url.config(conn_max_age=500, ssl_require=True)
}

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME')
AWS_URL = os.environ.get('AWS_URL')
AWS_DEFAULT_ACL = None
AWS_S3_REGION_NAME = 'us-east-2'
AWS_S3_SIGNATURE_VERSION = 's3v4'
AWS_S3_ADDRESSING_STYLE = "virtual"

STATIC_URL = AWS_URL + '/static/'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = AWS_URL + '/media/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# django_on_heroku.settings(locals(), staticfiles=False)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
