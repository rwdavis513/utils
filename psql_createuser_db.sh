#!/bin/sh

if [!$1] || [!$2] || [!$3]
then
    echo "Please pass in the username, password and database name"
    exit
fi

user = $1
pw = $2
db = $3
psql -c CREATE ROLE $user WITH LOGIN PASSWORD '$pw'
psql -c CREATE DATABASE $db
psql -c GRANT ALL PRIVILEGES ON DATABASE $db TO $user;

