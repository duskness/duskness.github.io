# Linux

```bash
# Login as root
useradd -m -g sudo langbamit
passwd langbamit
echo 'langbamit ALL=(ALL) ALL' | tee /etc/sudoers.d/langbamit

sudo su langbamit
cd /home/langbamit
sudo pacman -Syu --no-confirm
sudo pacman --no-confirm linux-firmware linux-headers base base-devel wget fish sddm awesome git
sudo pacman --no-confirm visual-studio-code-bin
```

**Note**: Using [nushell](https/github.com/nushell/nushell) when it stable.
