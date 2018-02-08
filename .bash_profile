VIRTUALENVWRAPPER_PYTHON='/usr/local/bin/python3'
source /usr/local/bin/virtualenvwrapper.sh
export WORKON_HOME=$HOME/.virtualenvs
alias gs='git status'
alias gl='git log | head'
alias hstag='export HEROKU_APP=booklycategorizerstaging && echo $HEROKU_APP'
alias hprod='export HEROKU_APP=booklycategorizer && echo $HEROKU_APP'
alias ls='ls -lh'
alias lsh='ls -lth | head'
