#!/usr/bin/env bash

TXT_RED=$(tput setaf 1)
TXT_GREEN=$(tput setaf 2)
TXT_YELLOW=$(tput setaf 3)
TXT_RESET=$(tput sgr0)

if [ -f ./.env.production ]
  then
    export $(cat ./.env.production | xargs)
  else 
    echo "${TXT_RED}no .env file found${TXT_RESET}"
    exit 1
fi

if [ -z "$1" ]
  then
    echo -n  "${TXT_YELLOW}Please enter a migrations name:${TXT_RESET} "
    read -r
    INPUT_STR=$REPLY
  else
    INPUT_STR=$1
fi

if [[ ! $INPUT_STR =~ ^[A-Za-z0-9_\ \-]+$ ]]; then
  echo "${TXT_RED}invalid migration name${TXT_RESET}"
  exit 1
fi


DATETIME=`date +"%Y%m%d%H%M%S"`
MIGRATION_NAME=$DATETIME-$INPUT_STR

# replace spaces and underscores with hyphens
MIGRATION_NAME=${MIGRATION_NAME//[\ \_]/-} 

# add hypen before uppercase characters
MIGRATION_NAME=$(sed 's/\([A-Z]\)/-\1/g' <<< $MIGRATION_NAME)

# To lowercase
MIGRATION_NAME=$(tr "[:upper:]" "[:lower:]" <<< $MIGRATION_NAME)

# Reduce consecutive hypens to one
MIGRATION_NAME=$(tr -s "-" <<< $MIGRATION_NAME)

# Remove trailing hypen
MIGRATION_NAME=$(sed 's/-$//' <<< $MIGRATION_NAME)

cp ./migrations/.template.ts ./migrations/$MIGRATION_NAME.ts

echo "${TXT_GREEN}migration created at ${TXT_RESET}./migrations/${TXT_YELLOW}$MIGRATION_NAME${TXT_RESET}.ts"