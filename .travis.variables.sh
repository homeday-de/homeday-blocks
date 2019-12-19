#!/bin/bash

export ENV=test

if [ "$TRAVIS_BRANCH" = "develop" ]
  then
    echo "Running STAGING build"

    export ENV=staging
    export PERCY_TARGET_BRANCH=develop
fi

if [ "$TRAVIS_BRANCH" = "master" ]
  then
    echo "Running PRODUCTION build"

    export ENV=production
    export PERCY_TARGET_BRANCH=master
fi

echo "ENV: $ENV"
echo "PERCY_TARGET_BRANCH: $PERCY_TARGET_BRANCH"