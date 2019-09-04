# Dockerfile for production.

# Does some building that requires Node.
FROM node:10 as builder
WORKDIR /home/node/app
COPY ./tracker/package*.json ./tracker/
RUN cd tracker && yarn
COPY . /home/node/app/
RUN cd tracker && yarn build-css

# The actual tracker is ran in this stage.
FROM python:2.7
RUN apt-get update && apt-get install -y nginx locales-all
WORKDIR /var/www
# If the db folder is not made, the setup fails later.
RUN mkdir db
COPY --from=builder /home/node/app /var/www
COPY ./requirements.txt /var/www/
COPY ./tracker/requirements.txt /var/www/tracker/
COPY ./tracker.conf /etc/nginx/conf.d/
RUN pip install gunicorn
RUN pip install -r requirements.txt
# Setup some Django stuff including a default admin user.
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput
RUN python manage.py createsuperuser --noinput --email nobody@example.com --username admin
RUN yes password | python manage.py changepassword admin
EXPOSE 8000
CMD service nginx restart && gunicorn wsgi -b 0.0.0.0:8001