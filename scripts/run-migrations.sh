#!/usr/bin/env bash

set -e

TXT_RED=$(tput setaf 1)
TXT_GREEN=$(tput setaf 2)
TXT_YELLOW=$(tput setaf 3)
TXT_BLUE=$(tput setaf 6)
TXT_RESET=$(tput sgr0)

LOCK_FILE=./migrations/.migrations.lock

if [ -f ./.env.production ]
  then
    export $(cat ./.env.production | xargs)
  else 
    echo "${TXT_RED}no .env file found${TXT_RESET}"
    exit 1
fi

MIGRATIONS_DIR=migrations/*

MIGRATIONS_RUN=0
MIGRATIONS_SKIPPED=0

for MIGRATIONS_FILE_PATH in $MIGRATIONS_DIR
do
  MIGRATIONS_FILE_NAME=$(basename "$MIGRATIONS_FILE_PATH")
  
  if grep -q $MIGRATIONS_FILE_NAME $LOCK_FILE;
    then
      echo -e "${TXT_YELLOW}Skipping migration:${TXT_RESET} $MIGRATIONS_FILE_NAME"
      ((MIGRATIONS_SKIPPED++))

    else
      echo -e "${TXT_BLUE}Running migration:${TXT_RESET} $MIGRATIONS_FILE_NAME \n"
    
      node_modules/.bin/ts-node node_modules/.bin/contentful-migration \
        -s $CONTENTFUL_SPACE_ID -a $CONTENTFUL_MANAGEMENT_TOKEN -y \
          $MIGRATIONS_FILE_PATH || exit 1
      
      echo $MIGRATIONS_FILE_NAME >> $LOCK_FILE
      echo -e "\n"

      ((MIGRATIONS_RUN++))
  fi
done


echo -e "\n${TXT_BLUE}Finished running migrations${TXT_RESET}"
echo -e "${TXT_YELLOW}  Skipped: ${TXT_RESET}$MIGRATIONS_SKIPPED"
echo -e "${TXT_YELLOW}  Run:     ${TXT_RESET}$MIGRATIONS_RUN"

if [ $MIGRATIONS_RUN -eq "0" ]
  then
    echo -e "\n${TXT_RED}No migrations run${TXT_RESET}"
fi

