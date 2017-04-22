service redis_6379 start
service mongod start

pip install -r requirement.txt

cd news_pipeline_launcher.sh
python news_monitor.py &
python news_fetcher.py &
python news_depuder.py &

echo "==================================================="
read -p "PRESS [ENTER] TO TERMINATE THE PROCESS." PRESSKEY

kill $(jobs -p)