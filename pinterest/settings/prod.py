import dj_database_url

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
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
AWS_DEFAULT_ACL = 'public-read'


PUBLIC_MEDIA_LOCATION = 'media'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
