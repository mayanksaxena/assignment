#!/bin/sh

npm install
echo "npm install finished."
n=0
until [ $n -ge 5 ]
do
	echo "Trying to migrate ($n)"
	npm run migrate-up && echo "Migration complete" && break
	n=$((n+1))
	sleep 10
done
echo "Database migrations finished."

exec $@
