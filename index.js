//const { execAsync } = require("child_process");

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const commandForCurrentBranch = "git rev-parse --abbrev-ref HEAD";
const commandForMainBranch = "git symbolic-ref refs/remotes/origin/HEAD";

async function getBranchByCommand(command) {
    try {
      const { stdout } = await execAsync(command);
      return stdout.trim();
    } catch (error) {
      console.error(`Error at following command: ${command}`, error);
      throw error;
    }
  }

async function pullAndMerge(){
    const currentBranch = await getBranchByCommand(commandForCurrentBranch)
    console.log('Current Branch:', currentBranch)
    const mainBranch = await getBranchByCommand(commandForMainBranch)
    console.log('Main Branch:', mainBranch); // Korrigierter console.log-Aufruf
    console.log(`Switching to branch ${mainBranch}`)
    
}

pullAndMerge()
