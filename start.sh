# Start docker 
echo 'Starting docker'
sudo docker-compose up -d

echo 'Installing dependencies...'
sleep 150

# Start Test Cases
docker exec -it order npm test

exit 0