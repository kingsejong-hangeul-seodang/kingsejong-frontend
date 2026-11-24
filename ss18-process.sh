#!/usr/bin/env bash
set -eu
cd "$(mktemp -d "$HOME/ss18-process.XXXXXX")"
cat > zombie.c <<'C'
#include <stdio.h>
#include <unistd.h>
int main(void) {
    pid_t child = fork();
    if (child < 0) { perror("fork"); return 1; }
    if (!child) { puts("Child: exiting immediately."); return 0; }
    printf("Parent: child will become zombie. PID=%d\n", child);
    sleep(20);
    return 0;
}
C
cat > zombie_wait.c <<'C'
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
int main(void) {
    int status;
    pid_t child = fork();
    if (child < 0) { perror("fork"); return 1; }
    if (!child) { puts("Child: exiting immediately."); return 7; }
    pid_t ret = wait(&status);
    if (ret < 0) { perror("wait"); return 1; }
    printf("Parent: child (%d) reaped by wait()\n", ret);
    if (WIFEXITED(status)) printf("Parent: child exit code = %d\n", WEXITSTATUS(status));
    return 0;
}
C
cat > orphan.c <<'C'
#include <stdio.h>
#include <unistd.h>
int main(void) {
    pid_t initial = getpid();
    pid_t child = fork();
    if (child < 0) { perror("fork"); return 1; }
    if (child) { puts("Parent: exiting immediately."); return 0; }
    printf("Child: initial parent = %d\n", initial);
    sleep(5);
    printf("Child: after 5s, new parent = %d\n", getppid());
    return 0;
}
C
for name in zombie zombie_wait orphan; do gcc -Wall -Wextra "$name.c" -o "$name"; done
clear
echo '1. ./zombie &'
./zombie &
parent=$!
sleep 1
echo '$ ps -o pid,ppid,stat,cmd (parent and child)'
ps -p "$parent" --ppid "$parent" -o pid,ppid,stat,cmd
wait "$parent"
echo
echo '2. ./zombie_wait'
./zombie_wait | tee wait.log
child=$(sed -n 's/.*child (\([0-9]*\)) reaped.*/\1/p' wait.log)
ps -p "$child" -o pid,ppid,stat,cmd || echo "PID $child is absent from ps."
echo
echo '3. ./orphan'
stdbuf -oL ./orphan | tee orphan.log
adopter=$(awk '/new parent/ {print $NF}' orphan.log)
ps -p "$adopter" -o pid,ppid,stat,comm
echo "Saved in $PWD"
read -r -p 'Press Enter to close.' || true
