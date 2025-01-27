# About
A template for creating foundry modules using typescript. Project files are setup to be hot reloaded.
Information on hot module replacement: https://webpack.js.org/concepts/hot-module-replacement/

# Setup:
About Bundler:  
This project uses webpack to bundle your files. What this means is that every script file in src/ will get 'bundled' into one output .js file in dist/.
Likewise every static file (.html, .json, etc.) in static/ will get moved to dist.  
Because of this you should NOT have your development working directory inside the foundryuser folder. Instead you should follow the instructions below
for setting up symantic links between the dist/ folder and foundryuser.


- Run `npm install`
- powershell: `$env:NODE_OPTIONS = "--openssl-legacy-provider"`
- run: `npm run build`
- Create a symantic link between the dist/ folder to a module folder in `C:\Users\[User]\AppData\Local\FoundryVTT\Data\modules`  
--	Instructions (for windows) 
--	Open a command prompt and navigate to `C:\Users\[User]\AppData\Local\FoundryVTT\Data\modules`   
--	Run: `mklink /D MODULE_NAME [DEVELOPMENT_PATH]/dist`  

A note on typescript, it is completely optional and if you do not wish to use then rename any .ts files and their references to .js.

# Usage:
Development: 
To run with hotswap enabled run the command: npm run start

Release:
To ready the project for release run the command: npm run build:production

CD/CI:
This template is setup with automatic github release, developed by League of Foundry Developers in
their FoundryVtt-Module-Template. https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template 

# Troubleshooting:
Hot Reload force refreshes my page!
 - access foundry through localhost:8080 instead of localhost:30000
 - You might have multiple modules running HMR. It is critical that if you are working on multiple modules that only a single module is using hot module reload at a time. 

# Credits:
Used webpack and setup files as reference: https://github.com/anvil-vtt/FateX   
Used github workflow and template reference: https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template   

# TODOs:
- add type filter
- tests lol

