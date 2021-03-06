import os

ALLOWED_HOSTS = ['127.0.0.1', 'localhost'];

# Leave this as true during development, so that you get error pages describing what went wrong
DEBUG = False

# You can add your e-mail if you want to receive notifications of failures I think , but its probably not a good idea
ADMINS = [
	#('Your Name', 'your_email@example.com'),
]

# You can also make local sqlite databases in your current directory
# if you want to test changes to the data model
DATABASES = {
    'default': {
      'ENGINE': 'django.db.backends.sqlite3',
      'NAME': 'db/testdb',
  },
}

# set this to your site's prefix, This allows handling multiple deployments from a common url base
SITE_PREFIX = '/'

STATICFILES_DIRS = (
  os.path.abspath('tracker/static/'),
);

STATIC_URL = "/static" + SITE_PREFIX
STATIC_ROOT = "/var/www/static" + SITE_PREFIX

HAS_GDOC = False
# GDOC_USERNAME = 'person@gmail.com'
# GDOC_PASSWORD = '12345678'

HAS_EMAIL = False
# EMAIL_HOST = 'mail.somwhere.com'
# EMAIL_PORT = 465
# EMAIL_HOST_USER = 'dude@somewhere.com'
# EMAIL_HOST_PASSWORD = '1234567878'
# EMAIL_FROM_USER = 'someone_else@somewhere.com'

HAS_GOOGLE_APP_ID = False
# GOOGLE_CLIENT_ID = 'the.google.apps.url.thingy'
# GOOGLE_CLIENT_SECRET = 'secretpasswordthing'

HAS_GIANTBOMB_API_KEY = False
# GIANTBOMB_API_KEY = 'Itsreallynicetohaveanditsfreetomakeanaccountbutnotneccessary'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

ADDITIONAL_APPS = [
    # place additional apps here
]
