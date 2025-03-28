# Update your existing package list\nsudo apt update\n\n# Install required packages\nsudo apt install apt-transport-https ca-certificates curl software-properties-common -y\n\n# Add Docker’s official GPG key\ncurl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -\n\n# Add the Docker repository to APT sources\nsudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"\n\n# Update the package database with Docker packages from the newly added repo\nsudo apt update\n\n# Install Docker CE\nsudo apt install docker-ce -y\n\n# Verify Docker installation\ndocker --version\n
  424  https://docs.docker.com/get-docker/
  425  brew install --cask docker\n
  426  open /Applications/Docker.app\n
  427  docker-compose --version\n
  428  sudo -u postgres psql\n
  429  brew update\n
  430  brew install postgresql\n
  431  brew services start postgresql\n
  432  psql --version\n
  433  psql postgres\n
  434  open -a Docker\n


 429  cd express
  430  cd notejam
  431  pwd
  432  pwd
  433  cd express/notejam
  434  pwd
  435  npm install\n
  436  npm install pg pg-connection-string\n
  437  docker-compose up --build\n
  438  docker exec -it notejam_db psql -U postgres\n
  439  sudo docker exec -it notejam_db psql -U postgres\n
  440  docker-compose up --build\n
  441  docker-compose up --build\n
  442  sudo docker-compose up --build\n
  443  sudo docker-compose up --build\n
  444  sudo docker-compose up --build\n
