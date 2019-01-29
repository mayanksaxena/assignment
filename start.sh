# Start docker 
echo 'Starting docker'
sudo docker-compose up -d

echo 'Installing dependencies...'
sleep 60

# Start Test Cases
docker exec -it order_service npm test

exit 0