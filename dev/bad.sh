#!/usr/bin/env bash

bin/juji-chat-test -f Danny5 "https://test.juji-inc.com/pre-chat/678004ef-6b68-4679-9e95-da20ac3595ba?mode=test" tests/bad.txt
echo "Test rc=" $?
