#!/bin/bash
sleep 120
npm test
bash <(curl -s https://codecov.io/bash)