# Background Agents base environment for Cursor
# - Do NOT copy project code
# - Include common dev tools
# - Non-root user with home workspace

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive \
    TZ=Etc/UTC \
    LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en

# System deps and common CLI tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      ca-certificates \
      sudo \
      git \
      curl \
      wget \
      unzip \
      gnupg \
      build-essential \
      python3 \
      python3-pip \
      python3-venv \
      openssh-client \
      jq \
      ripgrep \
      fd-find \
      locales && \
    sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen && \
    ln -s /usr/bin/fdfind /usr/local/bin/fd && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user 'ubuntu' with passwordless sudo
RUN useradd -m -s /bin/bash ubuntu && \
    echo 'ubuntu ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/90-ubuntu-nopasswd

# Node.js 20 + Corepack (pnpm/yarn)
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" \
      > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y --no-install-recommends nodejs && \
    corepack enable && corepack prepare pnpm@latest --activate && \
    rm -rf /var/lib/apt/lists/*

# Default workdir and user as recommended
USER ubuntu
WORKDIR /home/ubuntu

# Keep container alive for agent sessions
CMD ["sleep", "infinity"]


