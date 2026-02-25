# Workshop prerequisites (required tools)

Before the SonarQube workshop make sure you have the following tools installed on your machine:

- Git
- Docker
- Docker Compose (Docker Desktop includes Compose on most platforms)
- Node.js 20+ (and npm)
- Sonar scanner (example Node package: `sonar/scan`)

Suggested install commands (macOS using Homebrew / nvm):

```bash
# Git
brew install git

# Docker (Docker Desktop)
brew install --cask docker
# Start Docker Desktop after installation

# Docker Compose (if needed separately)
brew install docker-compose

# Node.js 20+ using nvm
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20

# Sonar scanner (example - adjust if you prefer a different scanner package)
npm install -g sonar/scan
```

Verify installations:

```bash
git --version
docker --version
docker compose version
node -v
npm -v
```

Note: Docker Desktop must be running if you plan to run a local SonarQube server/container during the workshop.
