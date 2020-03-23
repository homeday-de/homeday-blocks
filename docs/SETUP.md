# Setup

- [Setup](#setup)
  - [Setup on OSX](#setup-on-osx)
  - [Setup on Ubuntu](#setup-on-ubuntu)

All our dependencies can be installed by a little script. During the installation process you could be asked to type in your password to install everything that is needed.

## Setup on OSX

Run `scripts/setup.osx.sh` to handle the installation process. The script does the following:

- Install [Homebrew][homebrew].
- Install [git][git].
- Install [nvm][nvm].
- Install the project [node][node] version.
- Install Node dependencies.

## Setup on Ubuntu

Run `scripts/setup.ubuntu.sh` to handle the installation process. The script does the following:

- Update [apt][apt].
- Install [git][git].
- Install [nvm][nvm].
- Install the project [node][node] version.
- Install Node dependencies.

<!-- Links references -->

[homebrew]: https://brew.sh/
[git]: https://git-scm.com/
[git_flow]: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
[nvm]: https://github.com/creationix/nvm
[node]: https://nodejs.org/en/
[apt]: https://help.ubuntu.com/lts/serverguide/apt.html