#!/bin/bash
#!/bin/bash

export PS1="\e[0;34m\$(date +%k:%M:%S)\e[m \e[0;32m\w\e[m$ "

export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi
