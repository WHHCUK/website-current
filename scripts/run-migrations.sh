#!/usr/bin/env bash

set -e

TXT_RED=$(tput setaf 1)
TXT_GREEN=$(tput setaf 2)
TXT_YELLOW=$(tput setaf 3)
TXT_BLUE=$(tput setaf 6)
TXT_RESET=$(tput sgr0)

LOCK_FILE=./migrations/.migrations.lock

if [ -f ./.env ]
  then
    export $(cat .env | xargs)
  else 
    echo "${TXT_RED}no .env file found${TXT_RESET}"
    exit 1
fi

MIGRATIONS_DIR=migrations/*

MIGRATIONS_sRUN=0
MIGRATIONS_SKIPPED=0

for MIGRATION_FILE in "$MIGRATIONS_DIR"
do
  if [grep -q $MIGRATION_FILE $LOCK_FILE]
    then
      echo -e "${TXT_YELLOW}Skipping migration:${TXT_RESET} $MIGRATION_FILE"
      ((MIGRATIONS_SKIPPED++))
    else
      echo -e "${TXT_BLUE}Running migration:${TXT_RESET} $MIGRATION_FILE \n"
    
      node_modules/.bin/ts-node node_modules/.bin/contentful-migration \
        -s $CONTENTFUL_SPACE_ID -a $CONTENTFUL_MANAGEMENT_TOKEN -y \
          $MIGRATION_FILE || exit 1
      
      echo $MIGRATION_FILE >> $LOCK_FILE
      ((MIGRATIONS_RUN++))
      echo -e "\n"
  fi

done


echo -e "\n${TXT_BLUE}Finished running migrations${TXT_RESET}"
echo -e "${TXT_YELLOW}  Skipped: ${TXT_RESET}$MIGRATIONS_SKIPPED"
echo -e "${TXT_YELLOW}  Run:     ${TXT_RESET}$MIGRATIONS_RUN"

if [ $MIGRATIONS_RUN -eq "0" ]
  then
    echo -e "\n${TXT_RED}No migrations run${TXT_RESET}"
fi

