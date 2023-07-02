# install dependencies
pipenv install

#  collect static files
mkdir static

bash map/scripts/install.sh
bash frontend/mainpage/scripts/install.sh

echo done
# read -n 1
