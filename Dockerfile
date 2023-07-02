FROM python:3.10

WORKDIR /app
COPY . .
RUN pip install pipenv
RUN ./scripts/install.sh
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
EXPOSE 8000