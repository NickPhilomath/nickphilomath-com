from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os

# from celery.schedules import crontab

load_dotenv()

# setting up some constants

if os.getenv("DEBUG") == 'true':
    DEBUG = True
else:
    DEBUG = False

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY")
MAP_DATA_PATH = os.getenv("MAP_DATA_PATH")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")

ALLOWED_HOSTS = ['nickphilomath.com', 'caravon.uz']

if DEBUG:
    ALLOWED_HOSTS += ['127.0.0.1']


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'rest_framework',
    'rest_framework_simplejwt',
    # 'corsheaders',
    "api",
    "map"
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "frontend/mainpage/build"),
            os.path.join(BASE_DIR, "frontend/map"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        # "ENGINE": "django.db.backends.mysql",
        # "HOST": "localhost",
        # "NAME": MYSQL_DATABASE,
        # "USER": MYSQL_USER,
        # "PASSWORD": MYSQL_PASSWORD,
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

if DEBUG:
    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, "frontend/map/static"),
        os.path.join(BASE_DIR, "frontend/mainpage/build/static"),
    ]
else:
    STATIC_ROOT = os.path.join(BASE_DIR, 'frontend/map/static')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

################
REST_FRAMEWORK = {
    "COERCE_DECIMAL_TO_STRING": False,
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=2 * 60),
}

# AUTH_USER_MODEL = "core.User"

DJOSER = {
    "SERIALIZERS": {
        "user_create": "core.serializers.UserCreateSerializer",
        "user": "core.serializers.UserSerializer",
        "current_user": "core.serializers.UserSerializer",
    }
}

# cors settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
# CORS_ALLOW_ALL_ORIGINS = True

# debug toolbar settings
INTERNAL_IPS = ["127.0.0.1"]

# celery settings
CELERY_BROKER_URL = "redis://127.0.0.1:6379/1"  # /1

CELERY_BEAT_SCHEDULE = {
    # 'notifyCustomers': {
    #     'task': 'api.tasks.notify_customers',
    #     'schedule': 15, # every five seconds
    #     # 'schedule': crontab(minute='*/15') # every 15 minutes
    #     # 'schedule': crontab(day_of_week=1, hour=7, minute=30) # every monday at 7:30 am
    #     'args': ['hello world'],
    # },
    # "updateTrailers": {
    #     "task": "api.tasks.update_trailers",
    #     "schedule": 5,
    # },
    # "logTrailers": {"task": "api.tasks.log_trailers", "schedule": 2 * 60},
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/2",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}

GRAPHENE = {"SCHEMA": "api.schema.schema"}

# HTTPS settings
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True
# SECURE_SSL_REDIRECT = True

# HSTS settings
# SECURE_HSTS_SECONDS = 31536000 # 1 year
# SECURE_HSTS_PRELOAD = True
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
