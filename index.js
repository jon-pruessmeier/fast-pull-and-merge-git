#!/usr/bin/env node

const { exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)

const commandForCurrentBranch = 'git rev-parse --abbrev-ref HEAD'
const commandForMainBranch = 'git remote show origin'

async function execute(command) {
  try {
    const { stdout } = await execAsync(command)
    return stdout.trim()
  } catch (error) {
    console.error(`Error at following command: ${command}`, error)
    throw error
  }
}

async function getMainBranchName() {
  const stdout = await execute(commandForMainBranch)
  const lines = stdout.trim().split('\n')
  for (const line of lines) {
    if (line.includes('HEAD branch')) {
      const branchParts = line.split(':')
      if (branchParts.length === 2) {
        const masterBranchName = branchParts[1].trim()
        return masterBranchName
      }
    }
  }

  throw new Error('Main branch not found')
}

async function pullAndMerge() {
  const currentBranch = await execute(commandForCurrentBranch)
  console.log('Current Branch:', currentBranch)


  let mainBranch
  try {
    mainBranch = await getMainBranchName()
  } catch (error) {
    console.error(
      'Something went wrong finding the name of the main branch in your repository.',
      error,
    )
    return
  }
  console.log('Main Branch:', mainBranch) // Korrigierter console.log-Aufruf


  console.log(`Switching to branch: ${mainBranch}`)
  await execAsync(`git switch ${mainBranch}`)


  console.log(`Pulling changes for branch ${mainBranch}...`)
  await execAsync('git pull')


  console.log(`Switching to branch: ${currentBranch}`)
  await execAsync(`git switch ${currentBranch}`)

  console.log(`Merging ${mainBranch} into ${currentBranch}`)
  await execAsync(`git merge ${mainBranch}`)
}

pullAndMerge()
