---
sidebar_position: 2
tag: [
    "k8s",
    "minikube",
    "helm",
    "lens"
]
---

# K8s Setup Guide

You may need a local Kubernetes cluster to develop and test your code. This guide will help you set up a local Kubernetes cluster using Minikube.

:::tip

You should install the k8s environment directly in your hosting OS, not in a virtual machine or WSL.

:::

## Minikube Installation

Minikube helps you easily get a local Kubernetes cluster up and running on your machine.

Follow the [Getting Started Guide](https://minikube.sigs.k8s.io/docs/start/) to install Minikube on your machine.
By installing Minikube, you will also install `kubectl`, the Kubernetes command-line tool.

## Helm Installation

OJ Lab use Helm Chart to manage Kubernetes resources.
You may easily get a runnable OJ Lab cluster by using Helm.
The Chart is available in the [oj-lab-helm](https://github.com/OJ-lab/oj-lab-helm) repository.

Helm is a package manager for Kubernetes that helps you define, install, and upgrade even the most complex Kubernetes applications.
Follow the [Helm Installation Guide](https://helm.sh/docs/intro/install/) to install Helm on your machine.

## Lens Installation

Lens is a Kubernetes IDE that helps you manage your Kubernetes clusters.
Although you still edit the Chart yamls in VSCode or other editors, Lens gives you a visualized view of your cluster.

Get Lens from the [Lens Official Site](https://k8slens.dev/).

:::warning

The official Lens is only free for personal use. If you are using Lens for commercial purposes, you should purchase a Pro license.

You can use [Open Lens](https://github.com/MuhammedKalkan/OpenLens) plus [OpenLens Node/Pod Menu Extension](https://github.com/alebcay/openlens-node-pod-menu) for a totally free alternative.

:::
