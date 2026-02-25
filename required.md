# 🚀 Workshop Setup: SonarQube Community Build via Docker Compose

[cite_start]To get this workshop rolling, we are using Docker to run the SonarQube server and SonarScanner[cite: 11, 12]. [cite_start]This approach keeps your host machine clean (no Java required) and makes future upgrades frictionless[cite: 13, 14].

## 🛠️ 1. Required Tools

Ensure you have the following installed on your machine:

- **Git**
- **Docker & Docker Compose** (Docker Desktop includes Compose; Linux users may need the standalone plugin)
- **Node.js 20+** (Includes npm)
- **Sonar CLI** (`@sonar/scan` npm package)

### Quick Install (macOS via Homebrew)

If you're on a Mac, you can speedrun the setup:

```bash
# Git
brew install git

# Docker (Docker Desktop)
brew install --cask docker

# Install nvm (Node Version Manager)
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash

# Restart your shell, then install Node 20
nvm install 20

# Install Sonar CLI globally for local dev
npm install -g @sonar/scan
```

## ✅ 2. Verify Installations

Run a quick vibe check to ensure everything is ready to go:

```bash
git --version
docker --version
docker compose version
node -v
npm -v
```
