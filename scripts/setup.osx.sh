echo "OSX setup started..."
echo "Trying to install brew..."
command -v brew >/dev/null 2>&1 && echo "Already installed :)!" || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
echo "Running brew update..."
brew update
echo "Trying to install git..."
command -v git >/dev/null 2>&1 && echo "Already installed :)!" || brew install git
echo "Trying to install nvm..."
command -v nvm >/dev/null 2>&1 && echo "Already installed :)!" || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
echo "Adding nvm to PATH..."
command export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
echo "Loading nvm..."
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
echo "Loading nvm bash_completion..."
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
echo "Trying to install current node version..."
nvm install
echo "Installing node dependencies..."
npm install
echo "Setup finished, you're ready to go!!"