#!/bin/bash
echo "Press [CTRL+C] to stop.."
while :
do
  echo `date`
  ./bin/run runnow  -i $1 < sample/crontab.txt
	sleep $1
done
