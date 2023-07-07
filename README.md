# fpamg (Fast-pull-and-merge-git)

fpamg is a command-line tool designed to streamline the process of updating your current feature branch from the main/master/dev, or any other default branch of your project. It combines multiple steps into a single command. First, it switches to the default branch (main/master/dev) of your project, then pulls the latest changes, switches back to your feature branch, and finally merges the updates from the default branch into your feature branch. With fpamg, developers can effortlessly stay up to date with the default branch in their feature branch, reducing the complexity of manual steps involved.

## Installation

To install fpamg globally on your system, you can use npm:

```bash
npm install -g fast-pull-and-merge-git
```

## Usage

Once fpamg is installed, you can use it in any Git repository. When you are in your feature branch, simply type the command in your terminal.

```bash
fpamg
```

## License

This project is licensed under the MIT License. See the LICENSE.md file for details.
